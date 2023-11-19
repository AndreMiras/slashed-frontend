import { notFound } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import {
  isPostgrestError,
  getSlashingEvents,
  getValidator,
} from "@/lib/database";
import SlashingEvents from "@/app/components/SlashingEvents";

interface PageProps {
  params: {
    chain: string;
    address: string;
  };
}

const Page = async ({ params }: PageProps) => {
  let slashingEvents = [];
  let validator;
  try {
    const { chain: chainName, address } = params;
    slashingEvents = await getSlashingEvents({ chainName, address });
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
        <span className="capitalize">{params.chain}</span> {params.address}{" "}
        Slashing Events
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
      </main>
    </>
  );
};

export default Page;
