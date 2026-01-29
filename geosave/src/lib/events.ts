import { supabaseAdmin } from "./supabaseServer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const getEvents = async () => {
  const { data, error } = await supabaseAdmin.rpc("get_events_with_users");

  if (error) throw error;

  return data ?? [];
};
