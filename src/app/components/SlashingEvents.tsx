import Link from "next/link";
import { ExtendedSlashingEventsRow } from "@/lib/database";
import { Database } from "@/lib/database.types";
import SlashingEventLink from "@/app/components/SlashingEventLink";

interface SlashingEventsProps {
  slashingEvents: ExtendedSlashingEventsRow[];
}

const SlashingEvents = ({ slashingEvents }: SlashingEventsProps) => (
  <table className="w-full text-sm text-left rtl:text-right text-neutral-500 dark:text-neutral-400">
    <thead className="text-xs text-neutral-700 uppercase bg-neutral-50 dark:bg-neutral-700 dark:text-neutral-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Chain
        </th>
        <th scope="col" className="px-6 py-3">
          Moniker
        </th>
        <th scope="col" className="px-6 py-3">
          Address
        </th>
        <th scope="col" className="px-6 py-3">
          Block
        </th>
        <th scope="col" className="px-6 py-3">
          Date
        </th>
        <th scope="col" className="px-6 py-3">
          Reason
        </th>
      </tr>
    </thead>
    <tbody>
      {slashingEvents.map((slashingEvent) => (
        <tr
          key={slashingEvent.id}
          className="odd:bg-white odd:dark:bg-black even:bg-neutral-50 even:dark:bg-neutral-800 border-b dark:border-neutral-700"
        >
          <th
            scope="row"
            className="px-6 py-4 font-medium text-neutral-900 whitespace-nowrap dark:text-white"
          >
            <SlashingEventLink
              href={`/${slashingEvent.chains.name}`}
              text={slashingEvent.chains.name}
            />
          </th>
          <td className="px-6 py-4">
            <SlashingEventLink
              href={`/${slashingEvent.chains.name}/address/${slashingEvent.validators.valoper_address}`}
              text={slashingEvent.validators.moniker}
            />
          </td>
          <td className="px-6 py-4">
            <SlashingEventLink
              href={`/${slashingEvent.chains.name}/address/${slashingEvent.validators.valoper_address}`}
              text={slashingEvent.validators.valoper_address}
            />
          </td>
          <td className="px-6 py-4">
            <SlashingEventLink
              href={`/${slashingEvent.chains.name}/block/${slashingEvent.block_height}`}
              text={`${slashingEvent.block_height}`}
            />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            {slashingEvent.blocks.time &&
              new Date(slashingEvent.blocks.time).toISOString().slice(0, 10)}
          </td>
          <td className="px-6 py-4">{slashingEvent.reason}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default SlashingEvents;
