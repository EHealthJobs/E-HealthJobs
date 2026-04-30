"use client"
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState<"loading" | "authenticated" | "guest">("loading");

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "About Us", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Team", href: "/#team" },
    { name: "Contact", href: "/#contact" },
    { name: "Jobs", href: "/jobs" },
  ];

  const guestLinks = [
    { name: "Login", href: "/login" },
    { name: "Sign Up", href: "/signup" },
  ];

  const isAuthenticated = authStatus === "authenticated";

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      try {
        const response = await fetch("/api/session", { cache: "no-store" });
        const session = await response.json();

        if (isMounted) {
          setAuthStatus(session.authenticated ? "authenticated" : "guest");
        }
      } catch (err) {
        console.error("Session check failed:", err);
        if (isMounted) setAuthStatus("guest");
      }
    };

    loadSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/session", { method: "DELETE" });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setAuthStatus("guest");
      setIsOpen(false);
      router.push("/");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
              <img
                src="https://static.wixstatic.com/media/790a51_606f3f9208aa404bbf8268164deecdb3~mv2.png/v1/fill/w_670,h_274,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/790a51_606f3f9208aa404bbf8268164deecdb3~mv2.png"
                alt="Logo"
                width={180}
                height={180}
                className="bject-contain"
              />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-secondary transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
            {authStatus !== "loading" && (
              isAuthenticated ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-foreground hover:text-secondary transition-colors font-medium"
                >
                  Logout
                </button>
              ) : (
                guestLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-foreground hover:text-secondary transition-colors font-medium"
                  >
                    {link.name}
                  </a>
                ))
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-foreground hover:text-secondary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            {authStatus !== "loading" && (
              isAuthenticated ? (
                <button
                  type="button"
                  className="block text-foreground hover:text-secondary transition-colors font-medium"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                guestLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-foreground hover:text-secondary transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
