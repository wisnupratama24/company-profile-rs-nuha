export interface FooterLinkItem {
  name: string;
  link: string;
}

export interface FooterLinkSection {
  title: string;
  items: FooterLinkItem[];
}

export const footerLinks: FooterLinkSection[] = [
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

