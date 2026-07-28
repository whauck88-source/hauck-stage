export const CONTACT = {
  whatsapp: "https://wa.me/5534992018228",
  instagram: "https://instagram.com/hauck.stage",
  email: "contato@hauckco.ai",
};

export const whatsapp = (message: string) =>
  `${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;

export const PRICES = {
  individual: {
    warmup: { setup: "R$ 1.490", monthly: "R$ 149/mês" },
    mainstage: { setup: "R$ 3.990", monthly: "R$ 299/mês" },
    headliner: { setup: "A partir de R$ 9.900", monthly: "A partir de R$ 790/mês" },
  },
  catalog: {
    hub: { setup: "A partir de R$ 4.900", monthly: "R$ 490/mês" },
    warmup: { setup: "R$ 690", monthly: "R$ 69/mês" },
    mainstage: { setup: "R$ 2.190", monthly: "R$ 149/mês" },
    headliner: { setup: "A partir de R$ 7.900", monthly: "A partir de R$ 590/mês" },
  },
} as const;

export const DIH = {
  name: "Dih Ribeiro",
  slug: "dih-ribeiro",
  category: "DJ e produtor",
  plan: "Mainstage Case",
  instagram: "https://www.instagram.com/djdihribeiro?igsh=MXJkdXNua25tb3hxYw==",
  soundcloud: "https://on.soundcloud.com/YlgM0gfeutLaafyK4E",
};

export const STATUS_LABELS: Record<string, string> = {
  available: "Disponível",
  in_progress: "Em produção",
  submitted: "Enviado",
  under_review: "Em análise",
  changes_requested: "Correção solicitada",
  rejected: "Recusado",
  approved: "Aprovado",
  credited: "Crédito liberado",
  new: "Nova",
  contacted: "Contato iniciado",
  qualified: "Qualificada",
  proposal: "Proposta enviada",
  paid: "Pagamento confirmado",
};

export const money = (cents = 0) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);

export const dateBR = (value?: string | null) =>
  value ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(new Date(value)) : "Sem prazo";

export type Profile = { user_id: string; name: string | null; role: "admin" | "artist"; status: string };
export type Artist = {
  id: string; user_id: string | null; stage_name: string; slug: string; category: string | null;
  plan: string; status: string; program_starts_at: string | null; program_ends_at: string | null;
  public_page_url: string | null;
};
export type Contract = {
  id: string; artist_id: string; official_setup_cents: number; special_setup_cents: number;
  monthly_care_cents: number; cycle_months: number; setup_target_cents: number;
  six_month_target_cents: number; first_year_target_cents: number; content_credit_cap_cents: number;
};
export type Mission = {
  id: string; artist_id: string; template_id: string; status: string; due_at: string | null;
  planned_credit_cents: number; admin_notes: string | null;
  mission_templates: { title: string; category: string; objective: string; platform: string | null;
    format: string | null; instructions: string; requirements: string[]; prompt_template: string;
    credit_cents: number; repeat_limit: number; minimum_online_days: number; essential: boolean };
};
export type Submission = {
  id: string; artist_mission_id: string; submitted_by: string; submission_url: string;
  artist_comment: string | null; status: string; admin_review: string | null; submitted_at: string;
};
export type Referral = {
  id: string; artist_id: string; referred_name: string; referred_contact: string | null;
  product_interest: string; status: string; planned_credit_cents: number; released_credit_cents: number;
  artist_notes: string | null; admin_notes: string | null; created_at: string;
};
export type Credit = { id: string; artist_id: string; source_type: string; amount_cents: number; description: string; status: string; created_at: string };
export type RoadSummary = {
  credits_total_cents: number; content_credits_cents: number; referral_credits_cents: number;
  content_cap_cents: number; setup_target_cents: number; six_month_target_cents: number;
  first_year_target_cents: number; remaining_setup_cents: number; remaining_six_month_cents: number;
  remaining_first_year_cents: number; progress_first_year_percent: number;
};
