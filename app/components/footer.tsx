import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        {/* Main footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-gray-900"
            >
              Habesha-Mart
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
              Quality shoes and clothing for men, women, and kids.
              Shop your style at Habesha-Mart.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Shop
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/category/men"
                  className="text-gray-500 transition hover:text-gray-900"
                >
                  Men
                </Link>
              </li>

              <li>
                <Link
                  href="/category/women"
                  className="text-gray-500 transition hover:text-gray-900"
                >
                  Women
                </Link>
              </li>

              <li>
                <Link
                  href="/category/kids"
                  className="text-gray-500 transition hover:text-gray-900"
                >
                  Kids
                </Link>
              </li>

              <li>
                <Link
                  href="/category/sneakers"
                  className="text-gray-500 transition hover:text-gray-900"
                >
                  Sneakers
                </Link>
              </li>

              <li>
                <Link
                  href="/category/crocs"
                  className="text-gray-500 transition hover:text-gray-900"
                >
                  Crocs
                </Link>
              </li>

              <li>
                <Link
                  href="/category/sports"
                  className="text-gray-500 transition hover:text-gray-900"
                >
                  Sports
                </Link>
              </li>
            </ul>
          </div>

          {/* General */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              General
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-500 transition hover:text-gray-900"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  className="text-gray-500 transition hover:text-gray-900"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-gray-500 transition hover:text-gray-900"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-gray-500 transition hover:text-gray-900"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/cart"
                  className="text-gray-500 transition hover:text-gray-900"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Follow Us
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-500 transition hover:text-gray-900"
                >
                  Instagram
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-500 transition hover:text-gray-900"
                >
                  Facebook
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-500 transition hover:text-gray-900"
                >
                  TikTok
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-500 transition hover:text-gray-900"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment methods */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Secure Payments
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                We accept multiple local and international payment methods.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600">
                Telebirr
              </span>

              <span className="rounded-md border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600">
                CBE Birr
              </span>

              <span className="rounded-md border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600">
                Bank
              </span>

              <span className="rounded-md border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600">
                Visa
              </span>

              <span className="rounded-md border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600">
                Mastercard
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col gap-4 border-t border-gray-200 pt-8 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} Habesha-Mart. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="transition hover:text-gray-900"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-gray-900"
            >
              Terms & Conditions
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;