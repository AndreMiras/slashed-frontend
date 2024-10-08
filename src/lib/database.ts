import { cookies } from "next/headers";
import { PostgrestError } from "@supabase/supabase-js";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { getPagination } from "@/lib/utils";
import { PAGE_SIZE } from "@/lib/constants";

type SlashingEventsRow = Database["public"]["Tables"]["slashing_events"]["Row"];
type ChainsRow = Database["public"]["Tables"]["chains"]["Row"];
type BlocksRow = Database["public"]["Tables"]["blocks"]["Row"];
type ValidatorsRow = Database["public"]["Tables"]["validators"]["Row"];
type ExtendedSlashingEventsRow = SlashingEventsRow & {
  chains: ChainsRow;
  blocks: BlocksRow;
  validators: ValidatorsRow;
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
const getSlashingEvents = async ({
  chainName = "",
  address = "",
  block = 0,
  page = 1,
}: {
  chainName?: string;
  address?: string;
  block?: number;
  page?: number;
} = {}): Promise<ExtendedSlashingEventsRow[]> => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  const { from, to } = getPagination(page, PAGE_SIZE);
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
    ),
    validators!inner (
      moniker,
      account_address,
      valoper_address,
      valcons_address
    )`,
    )
    .order("blocks(time)", { ascending: false })
    .range(from, to);
  if (chainName) {
    const { id: chainId } = await selectChain(chainName);
    query = query.eq("chain_id", chainId);
  }
  if (address) {
    query = query.or(
      `account_address.eq.${address},valoper_address.eq.${address},valcons_address.eq.${address}`,
      { foreignTable: "validators" },
    );
  }
  if (block) {
    query = query.eq("block_height", block);
  }
  const { data, error } = await query;
  const extendedData = data as ExtendedSlashingEventsRow[];
  handlePostgrestError(error);
  return extendedData!;
};

/**
 * Returns validator details, address can be any of account, valoper or valcons.
 */
const getValidator = async ({
  address,
}: {
  address: string;
}): Promise<ValidatorsRow> => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  let query = supabase
    .from("validators")
    .select("*")
    .or(
      `account_address.eq.${address},valoper_address.eq.${address},valcons_address.eq.${address}`,
    )
    .single();
  const { data, error } = await query;
  handlePostgrestError(error);
  return data!;
};

export type { ExtendedSlashingEventsRow };
export {
  isPostgrestError,
  selectChain,
  selectChains,
  getSlashingEvents,
  getValidator,
};
