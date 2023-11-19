import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { getSlashingEvents } from "@/lib/database";
import SlashingEvents from "@/app/components/SlashingEvents";

const Home = async () => {
  const slashingEvents = await getSlashingEvents();
  return (
    <>
      <h2>Slashing Events</h2>
      <main className="flex min-h-screen flex-col items-center py-8">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <SlashingEvents slashingEvents={slashingEvents} />
        </div>
      </main>
    </>
  );
};

export default Home;
