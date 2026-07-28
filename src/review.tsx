import { CheckCircle2, Copy, ExternalLink, Flag, Send, ShieldCheck, Sparkles } from "lucide-react";
import { DashHeader, Status } from "./components";
import { money } from "./stage";

const goals = [
  ["Implantação", 149000],
  ["Implantação + 6 meses", 238400],
  ["Primeiro ano", 327800],
] as const;

export function PortalReviewPage() {
  return <div className="dashboard"><DashHeader/><main className="dash-main"><div className="shell">
    <div className="notice" style={{marginBottom:18}}>Prévia visual local · dados demonstrativos · não publicada</div>
    <div className="between"><div><p className="eyebrow">Portal do artista</p><h1 className="section-title">Dih Ribeiro</h1><p className="muted">Mainstage Case · ciclo de 12 meses</p></div><span className="btn">Ver página pública <ExternalLink size={16}/></span></div>
    <div className="admin-nav"><button className="tab active">Road to Zero</button><button className="tab">Missões</button><button className="tab">Content Lab</button><button className="tab">Indicações</button><button className="tab">Créditos</button></div>
    <section><div className="panel card highlight"><div className="between"><div><p className="eyebrow">Road to Zero</p><h2 className="section-title">R$ 500 conquistados</h2></div><div className="tag">15,3% do primeiro ano</div></div><div className="progress"><span style={{width:"15.3%"}}/></div><div className="metric-grid"><Metric label="Créditos liberados" value="R$ 500"/><Metric label="Por conteúdo" value="R$ 0"/><Metric label="Por indicações" value="R$ 500"/><Metric label="Teto de conteúdo" value="R$ 700"/></div></div>
      <div className="goal-grid">{goals.map(([name,target])=><article className="panel goal" key={name}><p className="eyebrow">{name}</p><h3>{money(target)}</h3><div className="progress"><span style={{width:`${50000/target*100}%`}}/></div><p className="small muted">Faltam {money(target-50000)}</p></article>)}</div>
      <div className="notice" style={{marginTop:18}}>Somente créditos aprovados entram no progresso. Valores planejados ou aguardando validação não alteram o saldo.</div>
    </section>
    <section style={{marginTop:42}}><p className="eyebrow">Stage Missions</p><h2 className="section-title">Missões e envio de links</h2><div className="mission-grid"><PreviewMission title="Apresente sua nova Mainstage" status="in_progress" credit="R$ 150"/><PreviewMission title="Compartilhe um set em destaque" status="submitted" credit="R$ 100"/></div></section>
    <section style={{marginTop:42}}><p className="eyebrow">Content Lab</p><h2 className="section-title">Prompt pronto para criar.</h2><div className="panel mission"><div className="mission-top"><span className="tag">Lançamento</span><Sparkles color="var(--ember)" size={18}/></div><h3 style={{marginTop:16}}>Apresente sua nova Mainstage</h3><pre className="prompt">Atue como estrategista de conteúdo para DJs e produtores musicais. Crie um Reel apresentando a página Mainstage de Dih Ribeiro, destacando conteúdos, booking e identidade musical. Não invente números, lançamentos ou conquistas.</pre><button className="btn btn-primary"><Copy size={16}/> Copiar prompt</button></div></section>
  </div></main></div>;
}

export function AdminReviewPage() {
  return <div className="dashboard"><DashHeader admin/><main className="dash-main"><div className="shell">
    <div className="notice" style={{marginBottom:18}}>Prévia visual local · dados demonstrativos · não publicada</div>
    <div className="between"><div><p className="eyebrow">Operação HAUCK Stage</p><h1 className="section-title">Painel administrativo</h1></div><button className="btn">Atualizar</button></div>
    <div className="admin-nav"><button className="tab active">Visão geral</button><button className="tab">Submissões</button><button className="tab">Indicações</button><button className="tab">Usuários</button><button className="tab">Artistas</button><button className="tab">Missões</button><button className="tab">Auditoria</button></div>
    <div className="metric-grid"><Metric label="Artistas" value="1"/><Metric label="Submissões pendentes" value="1"/><Metric label="Indicações" value="1"/><Metric label="Créditos liberados" value="R$ 500"/></div>
    <div className="grid-2"><div className="panel card"><ShieldCheck color="var(--ok)"/><h3>Validação humana ativa</h3><p className="muted">Nenhuma publicação libera crédito automaticamente. Aprovação, correção ou recusa passa pela fila administrativa.</p></div><div className="panel card"><CheckCircle2 color="var(--gold)"/><h3>Proteção contra duplicidade</h3><p className="muted">O banco impede lançamentos repetidos e respeita os limites definidos no contrato.</p></div></div>
    <section style={{marginTop:42}}><p className="eyebrow">Fila de validação</p><h2 className="section-title">Submissões de missões</h2><article className="panel mission"><div className="mission-top"><span className="tag">Dih Ribeiro</span><Status value="submitted"/></div><h3 style={{marginTop:16}}>Compartilhe um set em destaque</h3><p className="muted">Link enviado pelo artista e aguardando conferência.</p><div className="actions"><button className="btn"><ExternalLink size={15}/> Abrir publicação</button><button className="btn">Solicitar correção</button><button className="btn btn-primary">Aprovar e creditar</button></div></article></section>
    <section style={{marginTop:42}}><p className="eyebrow">Pipeline de indicações</p><h2 className="section-title">Crédito só após pagamento.</h2><div className="table-wrap"><table><thead><tr><th>Indicado</th><th>Produto</th><th>Status</th><th>Previsto</th><th>Ação</th></tr></thead><tbody><tr><td>Contato demonstrativo</td><td>Mainstage</td><td><Status value="paid"/></td><td>R$ 500</td><td><button className="btn btn-primary"><Flag size={15}/> Liberar crédito</button></td></tr></tbody></table></div></section>
  </div></main></div>;
}

function Metric({label,value}:{label:string;value:string}){return <div className="panel metric"><span className="eyebrow">{label}</span><div className="value">{value}</div></div>}
function PreviewMission({title,status,credit}:{title:string;status:string;credit:string}){return <article className="panel mission"><div className="mission-top"><span className="tag">Conteúdo</span><Status value={status}/></div><h3 style={{marginTop:16}}>{title}</h3><p className="muted">Briefing, requisitos, prazo e permanência mínima aparecem aqui.</p><ul className="list small"><li>{credit} planejados</li><li>Envio por link público</li><li>Validação manual</li></ul><div className="actions"><button className="btn btn-primary"><Send size={15}/> Enviar para validação</button></div></article>}
