import { notFound } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { isPostgrestError, getSlashingEvents } from "@/lib/database";
import SlashingEvents from "@/app/components/SlashingEvents";
import Pagination from "@/app/components/Pagination";

interface PageProps {
  params: {
    chain: string;
  };
  searchParams: { page?: string };
}

const Page = async ({ params, searchParams }: PageProps) => {
  let slashingEvents = [];
  const page = Number(searchParams.page) || 1;
  try {
    const { chain: chainName } = params;
    slashingEvents = await getSlashingEvents({ chainName, page });
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
      <h2 className="capitalize">{params.chain} Slashing Events</h2>
      <main className="flex min-h-screen flex-col items-center py-8">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <SlashingEvents slashingEvents={slashingEvents} />
        </div>
        <Pagination page={page} />
      </main>
    </>
  );
};

export default Page;
