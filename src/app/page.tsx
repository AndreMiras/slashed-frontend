import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { getSlashingEvents } from "@/lib/database";
import SlashingEvents from "@/app/components/SlashingEvents";

const Home = async () => {
  const slashingEvents = await getSlashingEvents();
  return (
    <>
      <h2>Slashing Events</h2>
      <SlashingEvents slashingEvents={slashingEvents} />
    </>
  );
};

export default Home;
