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
    title: "Layanan",
    items: [
      { name: "Layanan Medis", link: "/service" },
      { name: "Dokter", link: "/doctors" },
      { name: "Pendaftaran Online", link: "#" },
      { name: "Informasi Kamar", link: "#" },
    ],
  },
  {
    title: "Informasi",
    items: [
      { name: "Tentang RS Nuha", link: "#" },
      { name: "Visi & Misi", link: "#" },
      { name: "Fasilitas", link: "#" },
      { name: "Berita & Artikel", link: "#" },
    ],
  },
  {
    title: "Kontak",
    items: [
      { name: "Hubungi Kami", link: "#" },
      { name: "Lokasi", link: "#" },
      { name: "Jam Operasional", link: "#" },
      { name: "Darurat 24/7", link: "#" },
    ],
  },
  {
    title: "Ikuti Kami",
    items: [
      { name: "Facebook", link: "#" },
      { name: "Instagram", link: "#" },
      { name: "YouTube", link: "#" },
      { name: "WhatsApp", link: "#" },
    ],
  },
];

