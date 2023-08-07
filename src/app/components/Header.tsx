import Link from "next/link";
import HeaderLink from "@/app/components/HeaderLink";

const Header = () => (
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
          <HeaderLink text="All" href="/" />
          <HeaderLink text="Canto" href="/canto" />
          <HeaderLink text="Kujira" href="/kujira" last />
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
