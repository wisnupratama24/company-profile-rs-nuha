import Image from "next/image";

function Footer() {
  const footerLinks = [
    {
      title: "Product",
      items: [
        { name: "Features", link: "#features" },
        { name: "Pricing", link: "#pricing" },
        { name: "Documentation", link: "#docs" },
      ],
    },
    {
      title: "Company",
      items: [
        { name: "About", link: "#about" },
        { name: "Blog", link: "#blog" },
        { name: "Careers", link: "#careers" },
      ],
    },
    {
      title: "Resources",
      items: [
        { name: "Support", link: "#support" },
        { name: "Contact", link: "#contact" },
        { name: "Privacy", link: "#privacy" },
      ],
    },
    {
      title: "Social",
      items: [
        { name: "Twitter", link: "#" },
        { name: "LinkedIn", link: "#" },
        { name: "GitHub", link: "#" },
      ],
    },
  ];

  return (
    <footer className="relative w-full border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        {/* Desktop Footer */}
        <div className="hidden grid-cols-1 gap-8 lg:grid lg:grid-cols-5">
          {/* Logo and Description */}
          <div className="col-span-1">
            <a href="#" className="inline-block">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={134}
                height={36}
                className="h-auto"
              />
            </a>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              Building the future of healthcare technology.
            </p>
          </div>

          {/* Footer Links - 4 columns (Product, Company, Resources, Social) */}
          {footerLinks.map((section, idx) => (
            <div key={`footer-section-${idx}`} className="col-span-1">
              <h3 className="mb-4 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item, itemIdx) => (
                  <li key={`footer-item-${idx}-${itemIdx}`}>
                    <a
                      href={item.link}
                      className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden">
          <div className="mb-6">
            <a href="#" className="inline-block">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={134}
                height={36}
                className="h-auto"
              />
            </a>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              Building the future of healthcare technology.
            </p>
          </div>

          <div className="space-y-6">
            {footerLinks.map((section, idx) => (
              <div key={`mobile-section-${idx}`}>
                <h3 className="mb-3 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <li key={`mobile-item-${idx}-${itemIdx}`}>
                      <a
                        href={item.link}
                        className="text-sm text-neutral-600 dark:text-neutral-400"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              © {new Date().getFullYear()} Company Name. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#terms"
                className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                Terms
              </a>
              <a
                href="#privacy"
                className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                Privacy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;