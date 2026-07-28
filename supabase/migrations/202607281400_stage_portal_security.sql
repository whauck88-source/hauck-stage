-- HAUCK Stage portal security and administrative helpers.
-- Safe to run more than once.

create or replace function public.link_artist_user(p_user_id uuid, p_artist_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_artist public.artists;
begin
  if not public.is_admin() then raise exception 'Acesso negado'; end if;
  if not exists(select 1 from public.profiles where user_id=p_user_id and role <> 'admin') then
    raise exception 'Perfil pendente não encontrado';
  end if;
  if exists(select 1 from public.artists where user_id=p_user_id and id<>p_artist_id) then
    raise exception 'Usuário já vinculado a outro artista';
  end if;
  select * into v_artist from public.artists where id=p_artist_id for update;
  if v_artist.id is null then raise exception 'Artista não encontrado'; end if;
  if v_artist.user_id is not null and v_artist.user_id<>p_user_id then
    raise exception 'Artista já vinculado a outro usuário';
  end if;
  update public.artists set user_id=p_user_id,updated_at=now() where id=p_artist_id;
  update public.profiles set role='artist',status='active',updated_at=now() where user_id=p_user_id;
  insert into public.audit_log(actor_user_id,action,entity_type,entity_id,after_data,reason)
  values(auth.uid(),'link_user','artist',p_artist_id,jsonb_build_object('user_id',p_user_id),'Vínculo administrativo');
  return jsonb_build_object('artist_id',p_artist_id,'user_id',p_user_id);
end;
$$;

revoke all on function public.link_artist_user(uuid,uuid) from public;
grant execute on function public.link_artist_user(uuid,uuid) to authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_first_admin boolean;
  v_admin_email text;
begin
  select value->>'email'
    into v_admin_email
    from public.system_settings
   where key='admin_owner_email'
     and is_public=false;

  v_first_admin := v_admin_email is not null
    and lower(new.email)=lower(v_admin_email)
    and not exists(select 1 from public.profiles where role='admin' and status='active');
  insert into public.profiles(user_id,name,role,status)
  values(new.id,coalesce(new.raw_user_meta_data->>'name',split_part(new.email,'@',1)),case when v_first_admin then 'admin' else 'artist' end,case when v_first_admin then 'active' else 'pending' end)
  on conflict(user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

insert into public.system_settings(key,value,is_public)
values('product_prices','{"individual":{"Warm-Up":{"setup_cents":149000,"monthly_cents":14900},"Mainstage":{"setup_cents":399000,"monthly_cents":29900},"Headliner App":{"setup_from_cents":990000,"monthly_from_cents":79000}},"catalog":{"hub":{"setup_from_cents":490000,"monthly_cents":49000},"Warm-Up":{"setup_cents":69000,"monthly_cents":6900},"Mainstage":{"setup_cents":219000,"monthly_cents":14900},"Headliner App":{"setup_from_cents":790000,"monthly_from_cents":59000}}}'::jsonb,true)
on conflict(key) do update set value=excluded.value,is_public=true,updated_at=now();
