import Image from "next/image";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";

const Home = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  const { data: slashingEvents } = await supabase
    .from("slashing_events")
    .select();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <ul className="my-auto">
          {slashingEvents?.map((slashingEvent) => (
            <li key={slashingEvent.id}>
              address: {slashingEvent.address}; block;{" "}
              {slashingEvent.block_height}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Home;
