import { cookies } from "next/headers";
import { PostgrestError } from "@supabase/supabase-js";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

type SlashingEventsRow = Database["public"]["Tables"]["slashing_events"]["Row"];
type ChainsRow = Database["public"]["Tables"]["chains"]["Row"];
type BlocksRow = Database["public"]["Tables"]["blocks"]["Row"];
type ExtendedSlashingEventsRow = SlashingEventsRow & {
  chains: ChainsRow;
  blocks: BlocksRow;
};

const isPostgrestError = (error: any): error is PostgrestError => {
  return (
    error &&
    typeof error.code === "string" &&
    typeof error.details === "string" &&
    (typeof error.hint === "string" || error.hint === null) &&
    typeof error.message === "string"
  );
};

const handlePostgrestError = (error: PostgrestError | null) => {
  if (error === null) return;
  console.error(error);
  throw error;
};

/**
 * Returns a single chain row given a chain name.
 */
const selectChain = async (name: string) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  const { data, error } = await supabase
    .from("chains")
    .select("*")
    .eq("name", name)
    .limit(1)
    .single();
  handlePostgrestError(error);
  return data!;
};

/**
 * Returns a single chain row given a chain name.
 */
const selectChains = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  const { data, error } = await supabase
    .from("chains")
    .select("*")
    .order("name");
  handlePostgrestError(error);
  return data!;
};

/**
 * Get chain specific slashing events or all of them if chainName not specified.
 */
const getSlashingEvents = async (
  chainName?: string,
  address?: string,
): Promise<ExtendedSlashingEventsRow[]> => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  let query = supabase
    .from("slashing_events")
    .select(
      `
    *,
    chains (
      name
    ),
    blocks (
      time
    )`,
    )
    .order("blocks(time)", { ascending: false });
  if (chainName) {
    const { id: chainId } = await selectChain(chainName);
    query = query.eq("chain_id", chainId);
  }
  if (address) {
    query = query.eq("address", address);
  }
  const { data, error } = await query;
  const extendedData = data as ExtendedSlashingEventsRow[];
  handlePostgrestError(error);
  return extendedData!;
};

export type { ExtendedSlashingEventsRow };
export { isPostgrestError, selectChain, selectChains, getSlashingEvents };
