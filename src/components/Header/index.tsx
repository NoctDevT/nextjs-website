
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { HiOutlineLightBulb } from "react-icons/hi";
import { BsMoon } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

interface MenuLinkProps {
  href: string;
  children: React.ReactNode;
}

const MenuLink: React.FC<MenuLinkProps> = ({ href, children }) => (
  <li className="navMenu">
    <a
      href={href}
      className="block py-2 pl-3 pr-4 rounded md:p-0 ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 hover:cursor-none"
    >
      {children}
    </a>
  </li>
);

export const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { width } = useWindowSize();
  const isMobile = width !== undefined && width < 1024;



  
  function toggleSidebar(): void {
    setIsSidebarOpen(!isSidebarOpen);
  }

  const onThemeChange = (): void => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleClass: string =
    "ease-in-out transition-all hover:-translate-y-1 hover:scale-110 duration-300 dark:text-white text-black";
  return (
    <nav className="flex flex-wrap justify-between items-center mx-auto px-4 py-3">
      <div className="animate-bounce-slow dark:text-white text-black text-2xl font-bold hover:opacity-75 transition-opacity">
        Website Name
      </div>
      {!isSidebarOpen && (
        <button
          className="text-black text-xl hover:opacity-75 focus:outline-none lg:hidden"
          onClick={toggleSidebar}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
            <path
              className="fill-gray-700"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21 7H3v2h18V7zm0 6H3v2h18v-2zm0 6H3v2h18v-2z"
            />
          </svg>
        </button>
      )}
       <div
      className={`${
        isSidebarOpen ? 'block' : 'hidden'
      } lg:block fixed inset-0 z-50 flex flex-col justify-center items-center ${
        isMobile ? 'md:bg-white dark:md:bg-black' : 'bg-transparent'
      } dark:text-white text-black lg:relative lg:flex lg:flex-row lg:space-x-8 lg:items-center lg:justify-end lg:block transition-opacity duration-700 ease-in-out`}
    >
        <button
          className="absolute top-4 right-4 text-black text-xl hover:opacity-75 focus:outline-none lg:hidden"
          onClick={toggleSidebar}
        >
          <IoMdClose className="w-6 h-6 fill-current" />
        </button>
        <div className="li_navbar lg:flex lg:space-x-8 lg:space-y-0">
          <ul className="space-y-4 lg:space-y-0 lg:flex lg:space-x-8">
            <MenuLink href="#">Home</MenuLink>
            <MenuLink href="#">About</MenuLink>
            <MenuLink href="#">Menu</MenuLink>
          </ul>
        </div>
        <div
          className={`${toggleClass} absolute bottom-4 right-4 lg:relative lg:bottom-auto lg:right-auto`}
          onClick={onThemeChange}
          role="button"
        >
          {theme === "light" ? (
            <BsMoon fontSize={24} />
          ) : (
            <HiOutlineLightBulb fontSize={26} />
          )}
        </div>
      </div>
    </nav>
  );
};

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}