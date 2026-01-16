import { notFound } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import {
  isPostgrestError,
  getSlashingEvents,
  getValidator,
} from "@/lib/database";
import SlashingEvents from "@/app/components/SlashingEvents";
import Pagination from "@/app/components/Pagination";

interface PageProps {
  params: Promise<{
    chain: string;
    address: string;
  }>;
  searchParams: Promise<{ page?: string }>;
}

const Page = async ({ params, searchParams }: PageProps) => {
  const { chain, address } = await params;
  const { page: pageParam } = await searchParams;
  let slashingEvents = [];
  let validator;
  const page = Number(pageParam) || 1;
  try {
    const chainName = chain;
    slashingEvents = await getSlashingEvents({ chainName, address, page });
    validator = await getValidator({ address });
  } catch (error) {
    // most likely an unsupported chain
    if (isPostgrestError(error) && error.code === "PGRST116") {
      notFound();
    } else {
      throw error;
    }
  }
  return (
    <>
      <h2>
        <span className="capitalize">{chain}</span> {address} Slashing Events
      </h2>
      <main className="flex min-h-screen flex-col items-center py-8">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <ul>
            <li>Moniker: {validator.moniker}</li>
            <li>Account Address: {validator.account_address}</li>
            <li>Operator Address: {validator.valoper_address}</li>
            <li>Signer Address: {validator.valcons_address}</li>
            <li>Consensus Public Key: {validator.consensus_pubkey}</li>
          </ul>
        </div>
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex pt-8">
          <SlashingEvents slashingEvents={slashingEvents} />
        </div>
        <Pagination page={page} />
      </main>
    </>
  );
};

export default Page;
