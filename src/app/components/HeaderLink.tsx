import Link from "next/link";

interface HeaderLinkProps {
  text: string;
  href: string;
}

const HeaderLink = ({ text, href }: HeaderLinkProps) => (
  <Link
    href={href}
    className={`block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-white border-yellow-300 px-4 capitalize border-r-2 last:border-r-0`}
  >
    {text}
  </Link>
);

export default HeaderLink;
