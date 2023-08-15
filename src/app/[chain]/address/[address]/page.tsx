import { notFound } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { isPostgrestError, getSlashingEvents } from "@/lib/database";
import SlashingEvents from "@/app/components/SlashingEvents";

interface PageProps {
  params: {
    chain: string;
    address: string;
  };
}

const Page = async ({ params }: PageProps) => {
  let slashingEvents = [];
  try {
    const { chain: chainName, address } = params;
    slashingEvents = await getSlashingEvents({ chainName, address });
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
        {params.chain} {params.address} Slashing Events
      </h2>
      <SlashingEvents slashingEvents={slashingEvents} />
    </>
  );
};

export default Page;
