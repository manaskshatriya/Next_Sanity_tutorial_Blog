import Image from "next/image";
import Link from "next/link";
import logo from "../assets/Medium-Logo-Black-RGB@2x.png";
function Navbar() {
  return (
    <nav className="flex justify-between p-5 max-w-7xl mx-auto" >
      <div className="flex items-center space-x-5" >
        <Link href="/ ">
          <Image
            className="w-44 cursor-pointer object-contain"
            src={logo.src}
            width={1000}
            height={1000}
            alt={""}
          ></Image>
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5" >
            <h3>About</h3>
            <h3>Contact</h3>
            <h3 className="bg-green-600 text-white px-4 py-1 rounded-full" >Follow</h3>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-green-600" >
        <h3>Sign in</h3>
        <h3 className="border border-green-600 px-4 py-1 rounded-full " >Get Started</h3>
      </div>
    </nav>
  );
}

export default Navbar;
