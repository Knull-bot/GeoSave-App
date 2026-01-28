import { supabaseAdmin } from "./supabaseServer";

export const getEvents = async () => {
  const { data, error } = await supabaseAdmin.rpc("get_events_with_users");

  if (error) throw error;

  return data ?? [];
};
