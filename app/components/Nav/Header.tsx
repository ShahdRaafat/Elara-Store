import Search from "../Search";
import Logo from "./Logo";
import NavIcons from "./NavIcons";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className="border-b font-semibold border-gray-300 flex justify-between items-center  px-4 py-2 sm:px-6 sm:py-3 max-w-[1400px] w-full mx-auto">
      <Logo />
      <Navigation />
    </header>
  );
}

export default Header;
