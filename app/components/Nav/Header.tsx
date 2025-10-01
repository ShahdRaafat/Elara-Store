import Logo from "./Logo";
import NavIcons from "./NavIcons";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className="border-b font-semibold border-gray-300 flex justify-between items-center  px-4 py-4 sm:px-6 sm:py-6 max-w-[1350px] w-full mx-auto">
      <Logo />
      <Navigation>
        <NavIcons />
      </Navigation>
    </header>
  );
}

export default Header;
