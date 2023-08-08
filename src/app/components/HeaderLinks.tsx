import HeaderLink from "@/app/components/HeaderLink";

interface HeaderLinksProps {
  chains: string[];
}

const HeadersLink = ({ chains }: HeaderLinksProps) =>
  chains.map((chain) => (
    <HeaderLink key={chain} text={chain} href={`/${chain}`} />
  ));

export default HeadersLink;
