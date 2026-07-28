# HAUCK Stage

Aplicação web da HAUCK Stage com vitrine pública, página Mainstage do Dih Ribeiro,
acesso privado do artista, Road to Zero, Content Lab, envio de links e painel
administrativo.

## Preparação local

1. Copie `.env.example` para `.env`.
2. Preencha a URL e a chave pública do projeto Supabase.
3. Execute `npm install` e `npm run dev`.

## Validação antes de produção

- aplicar e revisar a migração em `supabase/migrations`;
- cadastrar `admin_owner_email` como configuração privada no banco;
- confirmar o vínculo entre o usuário do Dih e o cadastro do artista;
- validar remetente, URL de retorno e domínio dos links mágicos;
- executar `npm run build` e a auditoria visual;
- publicar somente após aprovação expressa.

Os valores individuais e de catálogo são mantidos separadamente em
`src/stage.ts`. O WhatsApp oficial fica centralizado no mesmo arquivo.
