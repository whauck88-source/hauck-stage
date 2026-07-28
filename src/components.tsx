import { Link, NavLink, useNavigate } from "./router";
import { LogOut } from "lucide-react";
import { useAuth } from "./auth";

export function Logo() { return <Link className="logo" to="/">HAUCK<i>.CO</i> <span className="muted">/ STAGE</span></Link>; }
export function PublicHeader() {
  return <header className="topbar"><div className="shell"><Logo/><nav><NavLink className="navlink" to="/artistas/dih-ribeiro">Artistas</NavLink><NavLink className="navlink" to="/partner">Partner</NavLink><NavLink className="navlink" to="/agencias">Agências</NavLink><Link className="btn btn-primary" to="/login">Área privada</Link></nav></div></header>;
}
export function Footer() { return <footer className="footer"><div className="shell"><span>© {new Date().getFullYear()} HAUCK.CO — HAUCK Stage.</span><span>Presença digital profissional para artistas.</span></div></footer>; }
export function DashHeader({ admin = false }: { admin?: boolean }) {
  const { signOut, profile } = useAuth(); const navigate = useNavigate();
  return <header className="dash-head"><div className="shell"><div><Logo/><div className="small muted">{admin ? "Painel administrativo" : profile?.name || "Portal do artista"}</div></div><div className="row"><Link className="btn btn-quiet" to={admin ? "/portal" : "/"}>Ir para o site</Link><button className="btn" onClick={async()=>{await signOut();navigate("/login")}}><LogOut size={16}/> Sair</button></div></div></header>;
}
export function Loading() { return <div className="auth-wrap"><div><div className="spinner"/><p className="muted">Carregando sua Stage…</p></div></div>; }
export function Status({ value }: { value: string }) { return <span className={`status ${value}`}>{value.replaceAll("_"," ")}</span>; }
export function ErrorNotice({ children }: { children: React.ReactNode }) { return <div className="notice error">{children}</div>; }
