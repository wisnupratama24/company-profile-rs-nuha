export interface NavItem {
  name: string;
  link: string;
}

export const navItems: NavItem[] = [
  {
    name: "Beranda",
    link: "/",
  },
  {
    name: "Dokter",
    link: "/doctors",
  },
  {
    name: "Layanan",
    link: "/service",
  },
];

