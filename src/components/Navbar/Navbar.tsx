import { ThemeToggler } from "@/components/theme/theme-toggler";
import Logo from "./logo";

const Navbar = () => {
  return (
    <div className="px-3 py-2 flex items-center justify-between w-full">
      <Logo />
      <ThemeToggler />
    </div>
  );
};

export default Navbar;
