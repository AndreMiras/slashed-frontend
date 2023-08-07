import Link from "next/link";
import { ExtendedSlashingEventsRow } from "@/lib/database";
import { Database } from "@/lib/database.types";

interface SlashingEventsProps {
  slashingEvents: ExtendedSlashingEventsRow[];
}

const SlashingEvents = ({ slashingEvents }: SlashingEventsProps) => (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <ul className="my-auto">
        {slashingEvents.map((slashingEvent) => (
          <li key={slashingEvent.id}>
            chain:{" "}
            <Link href={`/${slashingEvent.chains.name}`}>
              {slashingEvent.chains.name}
            </Link>
            ; address:
            <Link
              href={`/${slashingEvent.chains.name}/${slashingEvent.address}`}
            >
              {slashingEvent.address}
            </Link>
            ; block: {slashingEvent.block_height}; reason:{" "}
            {slashingEvent.reason}
          </li>
        ))}
      </ul>
    </div>
  </main>
);

export default SlashingEvents;
