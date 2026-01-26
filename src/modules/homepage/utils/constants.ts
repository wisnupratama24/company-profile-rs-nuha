import { 
  Stethoscope, 
  Heart, 
  Users, 
  Award, 
  Clock, 
  MapPin,
  Phone,
  Mail,
  Activity
} from "lucide-react";
import { LucideIcon } from "lucide-react";

// Hero Section
export const HERO_CONFIG = {
  title: "Selamat Datang di",
  titleHighlight: "RS Nuha",
  description: "Memberikan pelayanan kesehatan terbaik dengan teknologi modern dan tim medis profesional untuk kesehatan Anda dan keluarga.",
  buttons: {
    primary: {
      text: "Lihat Jadwal Dokter",
      href: "/doctors",
    },
    secondary: {
      text: "Layanan Kami",
      href: "/service",
    },
  },
} as const;

// Stats Section
export interface StatItem {
  label: string;
  value: string;
  icon: LucideIcon;
}

export const STATS: StatItem[] = [
  { label: "Dokter Spesialis", value: "100+", icon: Users },
  { label: "Pasien Dilayani", value: "50K+", icon: Heart },
  { label: "Tahun Pengalaman", value: "25+", icon: Award },
  { label: "Departemen", value: "15+", icon: Stethoscope },
];

// Features Section
export interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
  gradientClass: string;
  className?: string;
}

export const FEATURES: FeatureItem[] = [
  {
    title: "Pelayanan 24/7",
    description: "Layanan medis tersedia setiap hari, 24 jam non-stop untuk kebutuhan darurat Anda.",
    icon: Clock,
    gradientClass: "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
  },
  {
    title: "Tim Dokter Profesional",
    description: "Lebih dari 100 dokter spesialis berpengalaman siap melayani kesehatan Anda.",
    icon: Stethoscope,
    gradientClass: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Teknologi Modern",
    description: "Fasilitas medis dengan peralatan terbaru dan teknologi canggih untuk diagnosis yang akurat.",
    icon: Activity,
    gradientClass: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
  },
  {
    title: "Akomodasi Nyaman",
    description: "Ruang rawat inap yang nyaman dan bersih untuk pemulihan optimal pasien.",
    icon: Heart,
    gradientClass: "bg-gradient-to-br from-pink-500/20 to-rose-500/20",
  },
  {
    title: "Akses Mudah",
    description: "Lokasi strategis dengan akses transportasi yang mudah dijangkau.",
    icon: MapPin,
    gradientClass: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "Terakreditasi",
    description: "Rumah sakit terakreditasi dengan standar internasional untuk kualitas pelayanan.",
    icon: Award,
    gradientClass: "bg-gradient-to-br from-yellow-500/20 to-amber-500/20",
  },
];

export const FEATURES_SECTION = {
  title: "Keunggulan Kami",
  description: "Komitmen kami dalam memberikan pelayanan kesehatan terbaik",
} as const;

// Services Section
export interface ServiceItem {
  title: string;
  description: string;
  link: string;
  image: string;
}

export const SERVICES: ServiceItem[] = [
  {
    title: "Rawat Jalan",
    description: "Konsultasi dengan dokter spesialis untuk berbagai keluhan kesehatan. Booking jadwal kunjungan dengan mudah melalui sistem online.",
    link: "/service",
    image: "/homepage/rawat-jalan.png",
  },
  {
    title: "Rawat Inap",
    description: "Fasilitas rawat inap lengkap dengan perawatan intensif oleh tim medis profesional 24/7.",
    link: "/service",
    image: "/homepage/rawat-inap.png",
  },
  {
    title: "Unit Gawat Darurat",
    description: "Layanan gawat darurat 24 jam dengan tim medis siap siaga untuk penanganan cepat dan tepat.",
    link: "/service",
    image: "/homepage/ugd.png",
  },
  {
    title: "Laboratorium",
    description: "Fasilitas laboratorium lengkap dengan teknologi modern untuk pemeriksaan diagnostik yang akurat.",
    link: "/service",
    image: "/homepage/lab.png",
  },
  {
    title: "Radiologi",
    description: "Pemeriksaan radiologi dengan peralatan canggih seperti CT Scan, MRI, dan USG untuk diagnosis yang tepat.",
    link: "/service",
    image: "/homepage/rad.png",
  },
  {
    title: "Fisioterapi",
    description: "Layanan fisioterapi dan rehabilitasi medis untuk pemulihan fungsi tubuh optimal.",
    link: "/service",
    image: "/homepage/fisio.png",
  },
];

export const SERVICES_SECTION = {
  title: "Layanan Kami",
  description: "Berbagai layanan kesehatan lengkap untuk kebutuhan Anda",
} as const;
