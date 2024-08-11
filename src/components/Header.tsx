import Image from "next/image";
import { ModeToggle } from "./ThemeToggle";
import UserNavigation from "./UserNavigation";
import MobileUserNavigation from "./MobileUserNavigation";
const Header = () => {
  return (
    <nav className="bg-green-500 dark:bg-green-600 p-5 flex justify-between items-center w-full">
      <Image
        src={"/logo.png"}
        alt="logo"
        width={100}
        height={100}
        className="w-auto h-auto"
        priority={true}
      />
      <div className="flex justify-between items-center gap-3">
        <UserNavigation />
        <ModeToggle />
        <MobileUserNavigation />
      </div>
    </nav>
  );
};

export default Header;
