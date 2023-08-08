import Link from "next/link";
import HeaderLinks from "@/app/components/HeaderLinks";

interface HeaderProps {
  chains: string[];
}

const Header = ({ chains }: HeaderProps) => (
  // <!-- Top Navigation Menu -->
  <header className="py-4 h-24">
    <nav className="flex items-center justify-between flex-wrap text-yellow-300 h-full">
      {/* <!-- Website Logo or Branding --> */}
      <div className="flex items-center flex-no-shrink mr-6 border-y border-yellow-300 h-full">
        <Link className="text-4xl tracking-tight hover:text-white" href="/">
          SLASHED
        </Link>
      </div>
      {/* <!-- Spacer to push the navigation to the right --> */}
      <div className="flex-grow"></div>
      {/* <!-- Navigation Links --> */}
      <div className="flex border-y border-yellow-300 h-full items-center">
        <div className="text-sm lg:flex-grow">
          <HeaderLinks chains={chains} />
        </div>
      </div>
    </nav>
  </header>
);
export default Header;
