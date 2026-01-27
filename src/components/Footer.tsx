const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Logo and tagline */}
            <div>
              <div className="text-2xl font-bold mb-4">
                <img
                src="https://static.wixstatic.com/media/790a51_606f3f9208aa404bbf8268164deecdb3~mv2.png/v1/fill/w_670,h_274,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/790a51_606f3f9208aa404bbf8268164deecdb3~mv2.png"
                alt="Logo"
                width={180}
                height={180}
                className="bject-contain"
              />
              </div>
              <p className="text-primary-foreground/80">
                Global recruitment solutions for healthcare professionals
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4 text-gold">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/#home" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/#about" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/#services" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/#team" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                    Team
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold mb-4 text-gold">Contact</h4>
              <p className="text-primary-foreground/80">
                Ready to transform your healthcare staffing?
              </p>
              <a 
                href="/#contact" 
                className="inline-block mt-4 text-accent hover:text-accent/80 transition-colors font-semibold"
              >
                Schedule a consultation →
              </a>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60 text-sm">
            <p>© {currentYear} eHealthJOBS. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
