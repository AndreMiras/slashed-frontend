import { Database } from "@/lib/database.types";

interface SlashingEventsProps {
  slashingEvents: Database["public"]["Tables"]["slashing_events"]["Row"][];
}

const SlashingEvents = ({ slashingEvents }: SlashingEventsProps) => (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <ul className="my-auto">
        {slashingEvents.map((slashingEvent) => (
          <li key={slashingEvent.id}>
            address: {slashingEvent.address}; block:{" "}
            {slashingEvent.block_height}
          </li>
        ))}
      </ul>
    </div>
  </main>
);

export default SlashingEvents;
