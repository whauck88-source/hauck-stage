import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import type { Profile } from "./stage";

type AuthValue = {
  session: Session | null; user: User | null; profile: Profile | null; loading: boolean;
  refreshProfile: () => Promise<void>; signOut: () => Promise<void>;
};
const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (userId?: string) => {
    if (!userId) { setProfile(null); return; }
    const { data } = await supabase.from("profiles").select("user_id,name,role,status").eq("user_id", userId).maybeSingle();
    setProfile((data as Profile | null) ?? null);
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      await loadProfile(data.session?.user.id);
      setLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      void loadProfile(next?.user.id);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthValue>(() => ({
    session, user: session?.user ?? null, profile, loading,
    refreshProfile: () => loadProfile(session?.user.id),
    signOut: async () => { await supabase.auth.signOut(); },
  }), [session, profile, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth precisa estar dentro de AuthProvider");
  return value;
}
