import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "./router";
import { Mail } from "lucide-react";
import { useAuth } from "./auth";
import { Logo } from "./components";
import { isSupabaseConfigured, supabase } from "./supabase";

export function LoginPage() {
  const [email,setEmail]=useState(""); const [busy,setBusy]=useState(false); const [message,setMessage]=useState(""); const [error,setError]=useState("");
  const { user, profile }=useAuth(); const navigate=useNavigate(); const location=useLocation();
  useEffect(()=>{if(user&&profile?.role==="admin")navigate("/admin");else if(user)navigate("/portal")},[user,profile,navigate]);
  const submit=async(e:FormEvent)=>{e.preventDefault();setBusy(true);setError("");setMessage("");if(!isSupabaseConfigured){setError("A conexão segura do Supabase será ativada no ambiente de preview antes do deploy.");setBusy(false);return}const redirectTo=`${window.location.origin}/login`;const {error:authError}=await supabase.auth.signInWithOtp({email,options:{emailRedirectTo:redirectTo}});if(authError)setError(authError.message);else setMessage("Link enviado. Abra seu e-mail para entrar com segurança.");setBusy(false)};
  return <main className="auth-wrap"><section className="panel auth-card"><Logo/><p className="eyebrow" style={{marginTop:28}}>Acesso privado</p><h1 className="section-title">Entre na sua Stage.</h1><p className="muted">Receba um link seguro por e-mail. Nenhuma senha precisa ser criada.</p>{location.search.includes("error")&&<div className="notice error">O link não pôde ser validado. Solicite um novo acesso.</div>}{message&&<div className="notice ok">{message}</div>}{error&&<div className="notice error">{error}</div>}<form onSubmit={submit}><div className="field"><label htmlFor="email">E-mail de acesso</label><input className="input" id="email" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="voce@email.com"/></div><button className="btn btn-primary" disabled={busy}>{busy?"Enviando…":<><Mail size={17}/> Enviar link mágico</>}</button></form><p className="small muted" style={{marginTop:20}}>Primeiro acesso? Sua conta ficará aguardando vínculo até a HAUCK Stage confirmar o artista.</p><Link className="navlink" to="/">← Voltar à vitrine</Link></section></main>;
}
