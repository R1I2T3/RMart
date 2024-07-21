import Image from "next/image";
import { ModeToggle } from "./ThemeToggle";
const Header = () => {
  return (
    <nav className="bg-green-500 dark:bg-green-600 p-5 flex justify-between items-center">
      <Image
        src={"/logo.png"}
        alt="logo"
        width={100}
        height={100}
        className="w-auto h-auto"
        priority={true}
      />
      <div>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Header;
