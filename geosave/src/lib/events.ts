import { supabase } from "./supabase";

export const getEvents = async () => {
  const { data, error } = await supabase.rpc("get_events_with_users");

  if (error) throw error;

  return data ?? [];
};
