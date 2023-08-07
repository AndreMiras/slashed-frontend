import Link from "next/link";

interface SlashingEventLinkProps {
  text: string;
  href: string;
}

const SlashingEventLink = ({ text, href }: SlashingEventLinkProps) => (
  <Link href={href} className="hover:text-yellow-300">
    {text}
  </Link>
);

export default SlashingEventLink;
