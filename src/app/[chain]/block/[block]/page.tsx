import { notFound } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { isPostgrestError, getSlashingEvents } from "@/lib/database";
import SlashingEvents from "@/app/components/SlashingEvents";

interface PageProps {
  params: {
    chain: string;
    block: number;
  };
}

const Page = async ({ params }: PageProps) => {
  let slashingEvents = [];
  try {
    const { chain: chainName, block } = params;
    slashingEvents = await getSlashingEvents({ chainName, block });
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
        {params.chain} {params.block} Slashing Events
      </h2>
      <main className="flex min-h-screen flex-col items-center py-8">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <SlashingEvents slashingEvents={slashingEvents} />
        </div>
      </main>
    </>
  );
};

export default Page;
