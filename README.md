# Company Profile RS Nuha - Panduan Tutorial Langkah Demi Langkah

> **Untuk Pengajar & Pembicara:** Panduan ini dirancang untuk membantu Anda mengajarkan siswa cara membangun website company profile Next.js modern dari awal. Ikuti langkah-langkah secara berurutan, dan jelaskan setiap konsep saat Anda melangkah.

Ini adalah proyek [Next.js](https://nextjs.org) untuk membangun website company profile RS Nuha, yang menampilkan modul jadwal dokter dan halaman layanan.

## 🚀 Status Saat Ini

Proyek ini saat ini menggunakan **dummy data** untuk keperluan pengembangan dan demonstrasi. Service dokter (`src/services/doctors.ts`) menghasilkan jadwal dinamis berdasarkan tanggal saat ini, memungkinkan Anda untuk menguji aplikasi tanpa backend API. Ketika backend API siap, Anda dapat dengan mudah mengganti logika dummy data dengan panggilan API aktual menggunakan `apiClient` yang telah dikonfigurasi.

---

## 📚 Daftar Isi

1. [Prasyarat & Setup](#prasyarat--setup)
2. [Langkah 1: Inisialisasi Proyek](#langkah-1-inisialisasi-proyek)
3. [Langkah 2: Instalasi Dependencies](#langkah-2-instalasi-dependencies)
4. [Langkah 3: Setup Struktur Proyek](#langkah-3-setup-struktur-proyek)
5. [Langkah 4: File Konfigurasi](#langkah-4-file-konfigurasi)
6. [Langkah 5: Membangun Fondasi - Layout & Komponen Inti](#langkah-5-membangun-fondasi---layout--komponen-inti)
7. [Langkah 6: Setup Integrasi API](#langkah-6-setup-integrasi-api)
8. [Langkah 7: Membangun Komponen UI](#langkah-7-membangun-komponen-ui)
9. [Langkah 8: Membuat Halaman](#langkah-8-membuat-halaman)
10. [Langkah 9: Membangun Modul Fitur](#langkah-9-membangun-modul-fitur)
11. [Referensi Teknologi Utama](#referensi-teknologi-utama)
12. [Masalah Umum & Solusi](#masalah-umum--solusi)

---

## Prasyarat & Setup

### Yang Perlu Diketahui Siswa

Sebelum memulai, pastikan audiens Anda memahami:
- Dasar-dasar **HTML, CSS, JavaScript**
- **Fundamental React** (komponen, props, hooks)
- Dasar-dasar **TypeScript** (types, interfaces)
- Konsep **RESTful APIs**
- Dasar-dasar **Git** (opsional tapi direkomendasikan)

### Instalasi Software yang Diperlukan

**1. Node.js (v18 atau lebih tinggi)**
```bash
# Download from https://nodejs.org/
# Verify installation:
node --version
npm --version
```

**2. Code Editor**
- Direkomendasikan: [Visual Studio Code](https://code.visualstudio.com/)
- Ekstensi Penting:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

**3. Git (Opsional)**
```bash
# Download from https://git-scm.com/
git --version
```

---

## Langkah 1: Inisialisasi Proyek

### 🎯 Tujuan Pembelajaran
Siswa akan belajar cara menginisialisasi proyek Next.js dengan TypeScript dan memahami struktur yang dihasilkan.

### Instruksi

**1.1 Membuat Proyek**

Buka terminal dan jalankan:

```bash
npx create-next-app@latest company-profile-rs-nuha
```

**Saat diminta, pilih opsi berikut:**
- ✓ **TypeScript:** Ya
- ✓ **ESLint:** Ya
- ✓ **Tailwind CSS:** Ya
- ✓ **App Router:** Ya (ini adalah default)
- ✓ **src/ directory:** Ya
- ✓ **Import alias:** `@/*` (default)

**1.2 Masuk ke Direktori Proyek**

```bash
cd company-profile-rs-nuha
```

**1.3 Verifikasi Struktur Awal**

Proyek Anda sekarang seharusnya memiliki:
```
company-profile-rs-nuha/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Homepage
│   │   └── globals.css     # Global styles
│   └── ...
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.ts
```

**1.4 Uji Setup Awal**

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) - Anda seharusnya melihat halaman default Next.js.

> **Tips Mengajar:** Jelaskan bahwa `layout.tsx` membungkus semua halaman, `page.tsx` adalah halaman beranda, dan `globals.css` berisi style global.

---

## Langkah 2: Instalasi Dependencies

### 🎯 Tujuan Pembelajaran
Siswa akan memahami dependencies apa yang diperlukan dan mengapa masing-masing penting.

### Instruksi

**2.1 Instalasi Dependencies Inti**

Jalankan perintah-perintah ini satu per satu, jelaskan apa yang dilakukan setiap package:

```bash
# Data fetching dan state management
npm install @tanstack/react-query @tanstack/react-query-devtools
# Jelaskan: React Query membantu mengelola server state, caching, dan data fetching

# HTTP client untuk panggilan API
npm install axios
# Jelaskan: Axios memudahkan membuat HTTP requests

# Library komponen UI (Radix UI - primitives yang accessible)
npm install @radix-ui/react-select @radix-ui/react-popover @radix-ui/react-scroll-area @radix-ui/react-collapsible @radix-ui/react-separator @radix-ui/react-slot
# Jelaskan: Ini menyediakan UI primitives yang accessible dan tanpa style

# Ikon
npm install @tabler/icons-react lucide-react
# Jelaskan: Library ikon untuk elemen UI

# Utilities
npm install clsx tailwind-merge class-variance-authority
# Jelaskan: Utilities untuk mengelola CSS classes

# Penanganan tanggal dan markdown
npm install date-fns react-day-picker react-markdown
# Jelaskan: Manipulasi tanggal dan rendering markdown

# Animasi
npm install motion aceternity-ui
# Jelaskan: Library animasi untuk transisi UI yang halus

# Utilities tambahan (dev dependencies)
npm install --save-dev tw-animate-css babel-plugin-react-compiler
# Jelaskan: Utilities animasi dan React compiler untuk optimasi
```

**2.2 Verifikasi Instalasi**

```bash
npm list --depth=0
```

Periksa bahwa semua package muncul dalam daftar.

> **Tips Mengajar:** Tunjukkan kepada siswa file `package.json` untuk melihat bagaimana dependencies dilacak. Jelaskan perbedaan antara `dependencies` dan `devDependencies`.

---

## Langkah 3: Setup Struktur Proyek

### 🎯 Tujuan Pembelajaran
Siswa akan belajar cara mengorganisir proyek Next.js dengan struktur folder yang dapat diskalakan.

### Instruksi

**3.1 Membuat Struktur Folder**

Buat direktori-direktori berikut di `src/`:

```bash
# In your terminal, or create manually in VS Code:
mkdir -p src/api
mkdir -p src/components/layouts/header/utils
mkdir -p src/components/layouts/footer/utils
mkdir -p src/components/ui
mkdir -p src/config
mkdir -p src/lib
mkdir -p src/modules/doctors/components
mkdir -p src/modules/doctors/hooks
mkdir -p src/modules/doctors/utils
mkdir -p src/modules/homepage
mkdir -p src/modules/service/utils
mkdir -p src/services
```

**3.2 Penjelasan Struktur**

```
src/
├── api/                    # API client configuration
├── app/                    # Next.js pages (routes)
├── components/             # Reusable components
│   ├── layouts/           # Layout components (header, footer)
│   └── ui/                # Base UI components (button, card, etc.)
├── config/                # Configuration files
├── lib/                   # Utility libraries
├── modules/               # Feature modules (organized by feature)
│   ├── doctors/           # Doctors feature
│   ├── homepage/          # Homepage feature
│   └── service/           # Service feature
└── services/              # API service functions
```

> **Tips Mengajar:** Jelaskan bahwa struktur ini mengikuti pola organisasi "feature-based", membuat lebih mudah untuk menemukan dan memelihara kode.

---

## Langkah 4: File Konfigurasi

### 🎯 Tujuan Pembelajaran
Siswa akan belajar cara mengonfigurasi environment variables dan pengaturan API.

### Instruksi

**4.1 Membuat File Environment Variables**

Buat `.env.local` di direktori root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_AUTH_API_URL=http://localhost:3000/api/auth
```

> **Penting:** Tambahkan `.env.local` ke `.gitignore` untuk menjaga keamanan rahasia!

**4.2 Membuat File Config (Opsional)**

Proyek ini menyertakan file config, tetapi API client saat ini menggunakan environment variables secara langsung. Anda dapat membuat `src/config/config.ts` untuk konfigurasi terpusat:

Create `src/config/config.ts`:

```typescript
const CONFIG = {
    ENV: process.env.NEXT_PUBLIC_ENV,
    BASE_API_URL: process.env.NEXT_PUBLIC_API_URL,
    BASE_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_API_URL,
}

export const c = {
    CONFIG: CONFIG,
}
```

Create `src/config/index.ts`:

```typescript
export * from './config';
```

> **Tips Mengajar:** 
> - Jelaskan mengapa kita memusatkan konfigurasi - ini memudahkan mengubah pengaturan dan mencegah kesalahan ketik
> - Catatan: `apiClient` saat ini menggunakan environment variables secara langsung, yang juga merupakan pendekatan yang valid
> - Anda dapat merefaktor API client untuk menggunakan objek config jika Anda lebih suka konfigurasi terpusat

---

## Langkah 5: Membangun Fondasi - Layout & Komponen Inti

### 🎯 Tujuan Pembelajaran
Siswa akan belajar membangun fondasi aplikasi: API client, setup React Query, dan root layout. **Ini adalah hal pertama yang harus dibangun!**

### Instruksi

**5.1 Membuat API Client (Fondasi untuk Data Fetching)**

Create `src/api/client.ts`:

```typescript
import axios, { AxiosInstance, AxiosError } from "axios";

// API Base URL - Change this to your actual API endpoint
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// Create axios instance with default config
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor - runs before every request
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here later
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handles responses and errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as { error?: string; message?: string };

      switch (status) {
        case 400:
          console.error("Bad Request:", data.error || data.message);
          break;
        case 401:
          console.error("Unauthorized");
          break;
        case 404:
          console.error("Not Found:", data.error || data.message);
          break;
        case 500:
          console.error("Server Error:", data.error || data.message);
          break;
        default:
          console.error("API Error:", data.error || data.message);
      }
    } else if (error.request) {
      console.error("Network Error: No response received");
    } else {
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

Create `src/api/index.ts`:

```typescript
export * from './client';
```

> **Tips Mengajar:** Jelaskan interceptors - mereka seperti middleware yang berjalan sebelum/sesudah request. Bagus untuk menambahkan auth tokens atau menangani error secara global.

**5.2 Setup React Query Provider**

Create `src/lib/react-query.tsx`:

```typescript
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // Data is fresh for 1 minute
            refetchOnWindowFocus: false, // Don't refetch when window regains focus
            retry: 1, // Retry failed requests once
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

> **Tips Mengajar:** Jelaskan bahwa `"use client"` diperlukan karena React Query menggunakan hooks (hanya client-side). QueryClient mengelola caching dan data fetching.

**5.3 Membuat Fungsi Utility**

Create `src/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Create `src/lib/index.ts`:

```typescript
export * from './utils';
export * from './react-query';
```

> **Tips Mengajar:** Fungsi `cn` menggabungkan `clsx` dan `tailwind-merge` untuk menggabungkan class Tailwind dengan benar, mencegah konflik.

**5.4 Memperbarui Root Layout**

Update `src/app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactQueryProvider } from "@/lib/react-query";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RS Nuha - Company Profile",
  description: "Company profile website for RS Nuha featuring doctors schedule and services",
};
```

Catatan: File `src/app/layout.tsx` yang sebenarnya mungkin memiliki metadata default yang harus diperbarui agar sesuai dengan branding Anda.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
```

> **Tips Mengajar:** Jelaskan bahwa root layout membungkus SEMUA halaman. Kita membungkus semuanya dalam ReactQueryProvider agar semua halaman dapat menggunakan React Query hooks.

**5.5 Membuat Komponen Layout Dasar**

Create `src/components/layouts/layout.tsx`:

```typescript
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header will go here */}
      <main className="flex-1">
        {children}
      </main>
      {/* Footer will go here */}
    </main>
  );
}
```

Create `src/components/layouts/index.ts`:

```typescript
export * from './layout';
```

Update `src/app/layout.tsx` to use the Layout component:

```typescript
import { Layout } from "@/components/layouts";
// ... other imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <Layout>
            {children}
          </Layout>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
```

> **Tips Mengajar:** Ini adalah fondasinya! Sekarang kita memiliki:
> - API client siap
> - React Query sudah disetup
> - Struktur layout dasar
> 
> Selanjutnya, kita akan membangun komponen UI, lalu halaman, lalu fitur.

---

## Langkah 6: Setup Integrasi API

### 🎯 Tujuan Pembelajaran
Siswa akan belajar cara membuat fungsi service yang berinteraksi dengan API. **Catatan:** Implementasi saat ini menggunakan dummy data untuk keperluan pengembangan sampai backend API siap.

### Instruksi

**6.1 Membuat Fungsi Service**

Create `src/services/doctors.ts`:

```typescript
import { apiClient } from "@/api/client";
import { DoctorScheduleData, doctors as dummyDoctors } from "@/modules/doctors/utils/constants";
import { format, addDays, startOfDay } from "date-fns";

export interface FetchDoctorsParams {
  department?: string;
  search?: string;
  date?: string;
}

/**
 * Menghasilkan tanggal dinamis untuk 5 hari ke depan
 */
function generateDynamicDates(): { date: string; day: string }[] {
  const today = startOfDay(new Date());
  const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  
  return Array.from({ length: 5 }, (_, i) => {
    const date = addDays(today, i);
    const dayName = daysOfWeek[date.getDay()];
    return {
      date: format(date, "yyyy-MM-dd"),
      day: dayName,
    };
  });
}

/**
 * Memfilter dokter berdasarkan params
 */
function filterDoctors(
  doctors: DoctorScheduleData[],
  params?: FetchDoctorsParams
): DoctorScheduleData[] {
  let filtered = [...doctors];

  // Filter berdasarkan departemen
  if (params?.department) {
    filtered = filtered.filter(
      (d) => d.doctor.specialization.toLowerCase() === params.department!.toLowerCase()
    );
  }

  // Filter berdasarkan pencarian (nama)
  if (params?.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter((d) =>
      d.doctor.name.toLowerCase().includes(searchLower)
    );
  }

  // Filter berdasarkan tanggal
  if (params?.date) {
    filtered = filtered.map((doctor) => {
      const matchingSchedule = doctor.schedule.find(
        (day) => day.date === params.date
      );
      if (matchingSchedule) {
        return {
          ...doctor,
          schedule: [matchingSchedule],
        };
      }
      return {
        ...doctor,
        schedule: [],
      };
    }).filter((doctor) => doctor.schedule.length > 0);
  }

  return filtered;
}

/**
 * Mengambil semua dokter beserta jadwalnya
 * Mendukung filtering berdasarkan departemen, pencarian, dan tanggal
 * Menggunakan dummy data sampai API siap
 */
export async function fetchDoctors(
  params?: FetchDoctorsParams
): Promise<DoctorScheduleData[]> {
  // Simulasi delay API
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Transform dummy data dengan tanggal dinamis
  const dynamicDates = generateDynamicDates();
  const doctors = dummyDoctors.map((doctorData) => {
    const originalSchedule = doctorData.schedule;
    const newSchedule = dynamicDates.map((dateInfo, index) => {
      const originalDay = originalSchedule[index % originalSchedule.length];
      return {
        date: dateInfo.date,
        day: dateInfo.day,
        slots: originalDay.slots.map((slot, slotIndex) => ({
          ...slot,
          id: `${doctorData.doctor.id}-${dateInfo.date}-${slotIndex}`,
        })),
      };
    });
    
    return {
      ...doctorData,
      schedule: newSchedule,
    };
  });
  
  return filterDoctors(doctors, params);
}

/**
 * Mengambil satu dokter berdasarkan ID
 * Menggunakan dummy data sampai API siap
 */
export async function fetchDoctorById(
  id: string
): Promise<DoctorScheduleData> {
  // Simulasi delay API
  await new Promise((resolve) => setTimeout(resolve, 200));

  const dynamicDates = generateDynamicDates();
  const doctors = dummyDoctors.map((doctorData) => {
    // Transform dengan tanggal dinamis (logika yang sama dengan fetchDoctors)
    // ... kode transformasi ...
  });
  
  const doctor = doctors.find((d) => d.doctor.id === id);
  
  if (!doctor) {
    throw new Error(`Dokter dengan ID ${id} tidak ditemukan`);
  }
  
  return doctor;
}
```

Create `src/services/index.ts`:

```typescript
export * from './doctors';
```

> **Tips Mengajar:** 
> - Jelaskan bahwa fungsi service adalah fungsi yang dapat digunakan kembali yang melakukan panggilan API
> - Implementasi saat ini menggunakan dummy data dengan generasi tanggal dinamis untuk pengembangan
> - Ketika backend API siap, ganti logika dummy data dengan panggilan `apiClient` yang sebenarnya
> - Logika filtering menunjukkan cara menangani filter pencarian, departemen, dan tanggal

---

## Langkah 7: Membangun Komponen UI

### 🎯 Tujuan Pembelajaran
Siswa akan belajar membangun komponen UI yang dapat digunakan kembali menggunakan Tailwind CSS dan Radix UI.

### Instruksi

**7.1 Membuat Komponen Button**

Create `src/components/ui/button.tsx`:

```typescript
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

> **Tips Mengajar:** Jelaskan:
> - `cva` (class-variance-authority) membuat varian untuk berbagai style button
> - `forwardRef` memungkinkan komponen parent mengakses elemen DOM button
> - `Slot` dari Radix memungkinkan button menggabungkan props dengan komponen child

**7.2 Membuat Komponen Card**

Create `src/components/ui/card.tsx`:

```typescript
import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent };
```

> **Tips Mengajar:** Jelaskan komposisi komponen - Card terdiri dari bagian-bagian kecil (Header, Title, Content) yang bekerja bersama.

**7.3 Membuat Komponen UI Lainnya**

Lanjutkan membuat komponen UI lainnya sesuai kebutuhan:
- `input.tsx` - Form input
- `select.tsx` - Dropdown select
- `separator.tsx` - Visual divider
- `calendar.tsx` - Date picker component
- `collapsible.tsx` - Collapsible sections
- `popover.tsx` - Popover/dropdown menus
- `scroll-area.tsx` - Custom scrollable areas
- `markdown.tsx` - Markdown content renderer
- `resizable-navbar.tsx` - Resizable navigation component

> **Tips Mengajar:** Bangun komponen secara bertahap. Mulai dengan yang paling sering digunakan (Button, Card), lalu tambahkan yang lain sesuai kebutuhan. Banyak dari komponen ini menggunakan Radix UI primitives untuk aksesibilitas.

---

## Langkah 8: Membuat Halaman

### 🎯 Tujuan Pembelajaran
Siswa akan belajar bagaimana Next.js App Router bekerja dan cara membuat halaman.

### Instruksi

**8.1 Memperbarui Halaman Beranda**

Update `src/app/page.tsx`:

```typescript
import { Homepage } from "@/modules/homepage";

export default function Home() {
  return <Homepage />;
}
```

**8.2 Membuat Halaman Dokter**

Buat `src/app/doctors/page.tsx`:

```typescript
import { Doctors } from "@/modules/doctors";

export default function DoctorsPage() {
  return <Doctors />;
}
```

**8.3 Membuat Halaman Layanan**

Create `src/app/service/page.tsx`:

```typescript
import { Service } from "@/modules/service";

export default function ServicePage() {
  return <Service />;
}
```

> **Tips Mengajar:** Jelaskan bahwa dalam Next.js App Router:
> - File `page.tsx` membuat route
> - `src/app/page.tsx` = `/` (halaman beranda)
> - `src/app/doctors/page.tsx` = `/doctors`
> - `src/app/service/page.tsx` = `/service`

---

## Langkah 9: Membangun Modul Fitur

### 🎯 Tujuan Pembelajaran
Siswa akan belajar mengorganisir kode berdasarkan fitur, membuat modul yang dapat digunakan kembali.

### Instruksi

**9.1 Membuat Modul Homepage**

Create `src/modules/homepage/homepage.tsx`:

```typescript
export function Homepage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to RS Nuha</h1>
      <p className="text-lg">Your trusted healthcare partner</p>
    </div>
  );
}
```

Create `src/modules/homepage/index.ts`:

```typescript
export * from './homepage';
```

**9.2 Membuat Modul Dokter**

Modul dokter adalah fitur komprehensif dengan kemampuan filtering, pencarian, dan melihat jadwal. Implementasi aktual (`src/modules/doctors/doctors.tsx`) mencakup:

- **Manajemen State**: Pemilihan departemen, pemilihan dokter, query pencarian, filter tanggal
- **Dual Data Fetching**: Query terpisah untuk semua dokter (untuk daftar departemen) dan dokter yang difilter
- **Filtering Dinamis**: Filter berdasarkan departemen, istilah pencarian, dan tanggal
- **UI Interaktif**: Bagian filter yang dapat dilipat, pencarian dengan date picker, daftar dokter dengan jadwal lengkap yang langsung ditampilkan sebagai card
- **Tampilan Langsung**: Setiap dokter menampilkan jadwal lengkapnya (pilihan hari dan slot waktu) langsung di daftar tanpa perlu klik - setiap dokter memiliki state `selectedDay` sendiri
- **Animasi**: Transisi halus menggunakan library Motion

Create `src/modules/doctors/doctors.tsx`:

```typescript
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useDoctors } from "./hooks/use-doctors";
import { FilterSection } from "./components/filter-section";
import { SearchSection } from "./components/search-section";
import { DoctorListView } from "./components/doctor-list-view";
import { DoctorScheduleView } from "./components/doctor-schedule-view";
import { format } from "date-fns";

export function Doctors() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorScheduleData | null>(null);
  const [searchDoctor, setSearchDoctor] = useState("");
  const [searchDate, setSearchDate] = useState<Date | undefined>(undefined);

  // Ambil semua dokter (untuk daftar departemen)
  const { data: allDoctors = [], isLoading: isLoadingAllDoctors } = useDoctors({
    search: searchDoctor.trim() || undefined,
    date: searchDate ? format(searchDate, "yyyy-MM-dd") : undefined,
  });

  // Ambil dokter yang difilter
  const { data: doctors = [], isLoading, error } = useDoctors({
    department: selectedDepartment || undefined,
    search: searchDoctor.trim() || undefined,
    date: searchDate ? format(searchDate, "yyyy-MM-dd") : undefined,
  });

  // Dapatkan departemen unik
  const departments = useMemo(() => {
    const deptSet = new Set<string>();
    allDoctors.forEach((doctor) => {
      deptSet.add(doctor.doctor.specialization);
    });
    return Array.from(deptSet).sort();
  }, [allDoctors]);

  // ... sisa logika komponen
}
```

Buat `src/modules/doctors/index.ts`:

```typescript
export * from './doctors';
```

> **Tips Mengajar:** 
> - Ini adalah modul yang lebih kompleks yang menunjukkan pola React lanjutan
> - Tunjukkan bagaimana beberapa hook `useQuery` dapat bekerja bersama
> - Jelaskan bagaimana `useMemo` mengoptimalkan perhitungan data turunan
> - Demonstrasikan manajemen state untuk filter dan interaksi UI

**9.3 Membuat Custom Hook untuk Dokter**

Create `src/modules/doctors/hooks/use-doctors.ts`:

```typescript
import { useQuery } from "@tanstack/react-query";
import {
  fetchDoctors,
  fetchDoctorById,
  FetchDoctorsParams,
} from "@/services/doctors";
import { DoctorScheduleData } from "../utils/constants";

/**
 * Hook untuk mengambil semua dokter dengan filter opsional
 */
export function useDoctors(params?: FetchDoctorsParams) {
  return useQuery<DoctorScheduleData[]>({
    queryKey: ["doctors", params],
    queryFn: () => fetchDoctors(params),
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Hook untuk mengambil satu dokter berdasarkan ID
 */
export function useDoctor(id: string | null) {
  return useQuery<DoctorScheduleData>({
    queryKey: ["doctor", id],
    queryFn: () => {
      if (!id) throw new Error("Doctor ID is required");
      return fetchDoctorById(id);
    },
    enabled: !!id,
    staleTime: 60 * 1000,
  });
}
```

> **Tips Mengajar:** Jelaskan:
> - Custom hooks mengkapsulasi logika
> - `useQuery` dari React Query menangani loading, error, dan caching secara otomatis
> - `queryKey` menyertakan params untuk caching yang tepat - params berbeda = entri cache berbeda
> - Opsi `enabled` mencegah query berjalan ketika kondisi tidak terpenuhi (misalnya, tidak ada ID)
> - `staleTime` mengontrol berapa lama data dianggap segar sebelum refetch

**9.4 Membuat Komponen Dokter**

Buat komponen seperti:
- `doctor-schedule-view.tsx` - Display doctor schedule as a card (includes doctor info, day selection, and time slots)
- `doctor-list-view.tsx` - List of doctors with their schedules displayed directly as cards
- `filter-section.tsx` - Filtering UI
- `search-section.tsx` - Search UI
- `department-card.tsx` - Display department overview

> **Tips Mengajar:** Bangun komponen dari bawah ke atas:
> 1. Komponen kecil terlebih dahulu (DoctorScheduleView sebagai card)
> 2. Lalu komposisikan (DoctorListView menggunakan DoctorScheduleView langsung)
> 3. Akhirnya, modul utama (Doctors menggunakan semua komponen)
> 
> **Catatan Penting:** Dalam implementasi saat ini, `DoctorScheduleView` ditampilkan langsung sebagai card di dalam `DoctorListView`. User tidak perlu klik untuk melihat jadwal - jadwal lengkap (termasuk pilihan hari dan slot waktu) langsung ditampilkan untuk setiap dokter. Setiap dokter memiliki state `selectedDay` sendiri yang dikelola di `DoctorListView`.

**9.5 Membuat Modul Layanan**

Pola serupa - buat `src/modules/service/service.tsx` dan komponen terkait.

---

## Referensi Teknologi Utama

### Framework Frontend
- **Next.js 16.1.1** - Framework React dengan App Router
- **React 19.2.3** - Library UI dengan React Compiler
- **TypeScript 5** - JavaScript dengan type safety

### Styling
- **Tailwind CSS 4** - Framework CSS utility-first (dengan PostCSS)
- **Radix UI** - Primitives komponen yang accessible
- **tw-animate-css** - Utilities animasi tambahan

### Data Fetching
- **React Query (TanStack Query) v5** - Manajemen server state
- **Axios v1.13.2** - HTTP client

### Animasi & UI
- **Motion (v12)** - Library animasi untuk React
- **Aceternity UI** - Library komponen UI
- **Lucide React & Tabler Icons** - Library ikon

### Development Tools
- **ESLint 9** - Linting kode (dengan konfigurasi Next.js)
- **TypeScript** - Pengecekan tipe
- **React Query DevTools** - Alat debugging
- **Babel Plugin React Compiler** - Optimasi React

---

## Workflow Pengembangan

### Menjalankan Development Server

```bash
npm run dev
```

Kunjungi [http://localhost:3000](http://localhost:3000)

### Build untuk Production

```bash
npm run build
npm start
```

### Menjalankan Linting

```bash
npm run lint
```

---

## Masalah Umum & Solusi

### Masalah: Module tidak ditemukan
**Solusi:** 
- Periksa apakah Anda telah menginstal dependencies: `npm install`
- Verifikasi path import sesuai dengan struktur file
- Periksa path aliases di `tsconfig.json` (`@/*` harus memetakan ke `./src/*`)

### Masalah: Port 3000 sudah digunakan
**Solusi:** 
```bash
npm run dev -- -p 3001
```

### Masalah: Error TypeScript
**Solusi:** 
- Periksa konfigurasi `tsconfig.json`
- Pastikan types diimpor dengan benar
- Restart TypeScript server di VS Code (Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server")
- Verifikasi definisi tipe React dan Next.js terinstal

### Masalah: Style Tailwind tidak diterapkan
**Solusi:** 
- Tailwind CSS 4 menggunakan PostCSS, pastikan `postcss.config.mjs` dikonfigurasi dengan benar
- Periksa `globals.css` mengimpor direktif Tailwind:
  ```css
  @import "tailwindcss";
  ```
  (Catatan: Tailwind CSS 4 menggunakan `@import` bukan direktif `@tailwind`)
- Verifikasi `@tailwindcss/postcss` terinstal
- Restart dev server

### Masalah: React Query tidak bekerja
**Solusi:**
- Pastikan komponen yang menggunakan React Query memiliki direktif `"use client"`
- Periksa bahwa `ReactQueryProvider` membungkus aplikasi Anda di `layout.tsx`
- Verifikasi React Query DevTools muncul di browser
- Periksa kompatibilitas versi React Query (v5 digunakan dalam proyek ini)

### Masalah: Error konfigurasi ESLint
**Solusi:**
- Proyek ini menggunakan ESLint 9 dengan format flat config (`eslint.config.mjs`)
- Pastikan `eslint-config-next` terinstal
- Jika bermigrasi dari konfigurasi ESLint lama, perbarui ke format flat config baru

### Masalah: Motion/Framer Motion tidak bekerja
**Solusi:**
- Proyek ini menggunakan `motion` (bukan `framer-motion`), pastikan import yang benar:
  ```typescript
  import { motion } from "motion/react";
  ```
- Periksa bahwa package terinstal: `npm list motion`

---

## Ringkasan Tips Mengajar

1. **Mulai dengan Fondasi:** Selalu bangun API client, React Query, dan layout terlebih dahulu
2. **Bangun dari Bawah ke Atas:** Buat komponen kecil, lalu komposisikan
3. **Jelaskan "Mengapa":** Jangan hanya menunjukkan kode - jelaskan mengapa kita menyusun hal-hal dengan cara ini
4. **Pengembangan Bertahap:** Bangun satu fitur pada satu waktu, uji saat Anda melangkah
5. **Gunakan TypeScript:** Tunjukkan kepada siswa bagaimana types membantu menangkap error lebih awal
6. **Latihan Membuat Sempurna:** Minta siswa membuat ulang komponen dari awal

---

## Sumber Daya Tambahan

- [Dokumentasi Next.js](https://nextjs.org/docs)
- [Dokumentasi React Query](https://tanstack.com/query/latest)
- [Dokumentasi Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Dokumentasi Radix UI](https://www.radix-ui.com/)

---

## Langkah Selanjutnya untuk Siswa

Setelah menyelesaikan tutorial ini, siswa dapat:

1. Menambahkan autentikasi dan otorisasi
2. Mengimplementasikan validasi form
3. Menambahkan unit dan integration tests
4. Deploy ke Vercel atau platform lainnya
5. Menambahkan lebih banyak fitur (janji temu, catatan pasien, dll.)
6. Mengoptimalkan performa (code splitting, optimasi gambar)

---

Selamat Mengajar! 🎓✨
