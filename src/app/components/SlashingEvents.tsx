import Link from "next/link";
import { ExtendedSlashingEventsRow } from "@/lib/database";
import { Database } from "@/lib/database.types";
import SlashingEventLink from "@/app/components/SlashingEventLink";

interface SlashingEventsProps {
  slashingEvents: ExtendedSlashingEventsRow[];
}

const SlashingEvents = ({ slashingEvents }: SlashingEventsProps) => (
  <main className="flex min-h-screen flex-col items-center justify-between py-8">
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <ul className="my-auto">
        {slashingEvents.map((slashingEvent) => (
          <li key={slashingEvent.id}>
            chain:{" "}
            <SlashingEventLink
              href={`/${slashingEvent.chains.name}`}
              text={slashingEvent.chains.name}
            />
            ; address:{" "}
            <SlashingEventLink
              href={`/${slashingEvent.chains.name}/${slashingEvent.address}`}
              text={slashingEvent.address}
            />
            ; block: {slashingEvent.block_height}; reason:{" "}
            {slashingEvent.reason}
          </li>
        ))}
      </ul>
    </div>
  </main>
);

export default SlashingEvents;
