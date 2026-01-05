export interface NavItem {
  name: string;
  link: string;
}

export const navItems: NavItem[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Doctor Schedules",
    link: "/doctor-schedule",
  },
  {
    name: "Services",
    link: "/service",
  },
];

