import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full border-b border-gray-200 bg-white">

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">

        {/* Top section */}
        <div className="flex items-center justify-between gap-6">

          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 text-xl font-bold tracking-tight text-gray-900"
          >
            Habesha-Mart
          </Link>

          {/* Search */}
          <div className="hidden flex-1 max-w-xl md:flex">
            <form className="flex w-full">
              <input
                type="search"
                placeholder="Search for shoes, clothes, etc."
                className="w-full border-b border-gray-300 px-2 py-2 text-sm outline-none transition focus:border-gray-900"
              />

              <button
                type="submit"
                className="ml-3 border border-gray-900 px-4 py-2 text-xs font-medium transition hover:bg-gray-900 hover:text-white"
              >
                SEARCH
              </button>
            </form>
          </div>

          {/* Profile + Cart */}
          <div className="flex items-center gap-5">

            <Link
              href="/profile"
              className="transition-opacity hover:opacity-60"
            >
              <Image
                src="/profile.png"
                alt="Profile"
                width={24}
                height={24}
              />
            </Link>

            <Link
              href="/cart"
              className="transition-opacity hover:opacity-60"
            >
              <Image
                src="/cart.png"
                alt="Cart"
                width={24}
                height={24}
              />
            </Link>

          </div>
        </div>

        {/* Mobile search */}
        <div className="mt-4 flex md:hidden">
          <form className="flex w-full">
            <input
              type="search"
              placeholder="Search products..."
              className="w-full border-b border-gray-300 px-2 py-2 text-sm outline-none focus:border-gray-900"
            />

            <button
              type="submit"
              className="ml-2 border border-gray-900 px-3 text-xs"
            >
              SEARCH
            </button>
          </form>
        </div>

        {/* Navigation */}
        <nav className="mt-5 overflow-x-auto">
          <ul className="flex min-w-max gap-7 text-sm">

            <li>
              <Link
                href="/category/men"
                className="transition hover:text-gray-500"
              >
                Men
              </Link>
            </li>

            <li>
              <Link
                href="/category/women"
                className="transition hover:text-gray-500"
              >
                Women
              </Link>
            </li>

            <li>
              <Link
                href="/category/kids"
                className="transition hover:text-gray-500"
              >
                Kids
              </Link>
            </li>

            <li>
              <Link
                href="/category/sneakers"
                className="transition hover:text-gray-500"
              >
                Sneakers
              </Link>
            </li>

            <li>
              <Link
                href="/category/crocs"
                className="transition hover:text-gray-500"
              >
                Crocs
              </Link>
            </li>

            <li>
              <Link
                href="/category/sports"
                className="transition hover:text-gray-500"
              >
                Sports
              </Link>
            </li>

          </ul>
        </nav>

      </div>
    </header>
  );
};

export default Header;