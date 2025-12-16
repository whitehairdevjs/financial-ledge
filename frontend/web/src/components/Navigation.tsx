"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { authStorage, User } from "@/lib/auth";
import { authApi } from "@/lib/authApi";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(authStorage.getUser());
  }, []);

  const handleLogout = () => {
    authApi.logout();
    setUser(null);
    router.push("/login");
    router.refresh();
  };

  const navItems = [
    { href: "/", label: "ABook" },
    { href: "/stats", label: "Statistics" },
    { href: "/transactions", label: "Transactions", hidden: true },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Logo size={32} showText={true} />
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems
                .filter((item) => !item.hidden)
                .map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive
                          ? "border-blue-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
            </div>
          </div>

          {/* User menu - Desktop */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700">{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                로그인
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-label="메뉴"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems
              .filter((item) => !item.hidden)
              .map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                    </Link>
                );
              })}
            {/* Mobile user menu */}
            {user ? (
              <>
                <div className="px-3 py-2 text-base font-medium text-gray-700 border-t border-gray-200">
                  {user.username}
                </div>
                <button
                  onClick={handleLogout}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md border-t border-gray-200"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

