# Company Profile RS Nuha - Step-by-Step Tutorial Guide

> **For Teachers & Speakers:** This guide is designed to help you teach students how to build a modern Next.js company profile website from scratch. Follow the steps in order, and explain each concept as you go.

This is a [Next.js](https://nextjs.org) project for building a company profile website for RS Nuha, featuring a doctors schedule module and service pages.

---

## 📚 Table of Contents

1. [Prerequisites & Setup](#prerequisites--setup)
2. [Step 1: Project Initialization](#step-1-project-initialization)
3. [Step 2: Installing Dependencies](#step-2-installing-dependencies)
4. [Step 3: Project Structure Setup](#step-3-project-structure-setup)
5. [Step 4: Configuration Files](#step-4-configuration-files)
6. [Step 5: Building the Foundation - Layout & Core Components](#step-5-building-the-foundation---layout--core-components)
7. [Step 6: API Integration Setup](#step-6-api-integration-setup)
8. [Step 7: Building UI Components](#step-7-building-ui-components)
9. [Step 8: Creating Pages](#step-8-creating-pages)
10. [Step 9: Building Feature Modules](#step-9-building-feature-modules)
11. [Key Technologies Reference](#key-technologies-reference)
12. [Common Issues & Solutions](#common-issues--solutions)

---

## Prerequisites & Setup

### What Students Need to Know

Before starting, ensure your audience understands:
- **HTML, CSS, JavaScript** basics
- **React fundamentals** (components, props, hooks)
- **TypeScript basics** (types, interfaces)
- **RESTful APIs** concepts
- **Git** basics (optional but recommended)

### Required Software Installation

**1. Node.js (v18 or higher)**
```bash
# Download from https://nodejs.org/
# Verify installation:
node --version
npm --version
```

**2. Code Editor**
- Recommended: [Visual Studio Code](https://code.visualstudio.com/)
- Essential Extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

**3. Git (Optional)**
```bash
# Download from https://git-scm.com/
git --version
```

---

## Step 1: Project Initialization

### 🎯 Learning Objective
Students will learn how to initialize a Next.js project with TypeScript and understand the generated structure.

### Instructions

**1.1 Create the Project**

Open terminal and run:

```bash
npx create-next-app@latest company-profile-rs-nuha
```

**When prompted, select these options:**
- ✓ **TypeScript:** Yes
- ✓ **ESLint:** Yes
- ✓ **Tailwind CSS:** Yes
- ✓ **App Router:** Yes (this is the default)
- ✓ **src/ directory:** Yes
- ✓ **Import alias:** `@/*` (default)

**1.2 Navigate to Project**

```bash
cd company-profile-rs-nuha
```

**1.3 Verify Initial Structure**

Your project should now have:
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

**1.4 Test the Initial Setup**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - you should see the default Next.js page.

> **Teaching Tip:** Explain that `layout.tsx` wraps all pages, `page.tsx` is the homepage, and `globals.css` contains global styles.

---

## Step 2: Installing Dependencies

### 🎯 Learning Objective
Students will understand what dependencies are needed and why each one is important.

### Instructions

**2.1 Install Core Dependencies**

Run these commands one by one, explaining what each package does:

```bash
# Data fetching and state management
npm install @tanstack/react-query @tanstack/react-query-devtools
# Explain: React Query helps manage server state, caching, and data fetching

# HTTP client for API calls
npm install axios
# Explain: Axios makes it easier to make HTTP requests

# UI Component libraries (Radix UI - accessible primitives)
npm install @radix-ui/react-select @radix-ui/react-popover @radix-ui/react-scroll-area @radix-ui/react-collapsible @radix-ui/react-separator @radix-ui/react-slot
# Explain: These provide accessible, unstyled UI primitives

# Icons
npm install @tabler/icons-react lucide-react
# Explain: Icon libraries for UI elements

# Utilities
npm install clsx tailwind-merge class-variance-authority
# Explain: Utilities for managing CSS classes

# Date handling and markdown
npm install date-fns react-day-picker react-markdown
# Explain: Date manipulation and markdown rendering

# Animation
npm install motion aceternity-ui
# Explain: Animation libraries for smooth UI transitions
```

**2.2 Verify Installation**

```bash
npm list --depth=0
```

Check that all packages appear in the list.

> **Teaching Tip:** Show students the `package.json` file to see how dependencies are tracked. Explain the difference between `dependencies` and `devDependencies`.

---

## Step 3: Project Structure Setup

### 🎯 Learning Objective
Students will learn how to organize a Next.js project with a scalable folder structure.

### Instructions

**3.1 Create the Folder Structure**

Create these directories in `src/`:

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

**3.2 Explain the Structure**

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

> **Teaching Tip:** Explain that this structure follows the "feature-based" organization pattern, making it easier to find and maintain code.

---

## Step 4: Configuration Files

### 🎯 Learning Objective
Students will learn how to configure environment variables and API settings.

### Instructions

**4.1 Create Environment Variables File**

Create `.env.local` in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_AUTH_API_URL=http://localhost:3000/api/auth
```

> **Important:** Add `.env.local` to `.gitignore` to keep secrets safe!

**4.2 Create Config File**

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

> **Teaching Tip:** Explain why we centralize configuration - it makes it easier to change settings and prevents typos.

---

## Step 5: Building the Foundation - Layout & Core Components

### 🎯 Learning Objective
Students will learn to build the application foundation: API client, React Query setup, and root layout. **This is the first thing to build!**

### Instructions

**5.1 Create API Client (Foundation for Data Fetching)**

Create `src/api/client.ts`:

```typescript
import axios, { AxiosInstance, AxiosError } from "axios";
import { c } from "@/config";

// Create axios instance with default config
export const apiClient: AxiosInstance = axios.create({
  baseURL: c.CONFIG.BASE_API_URL || "http://localhost:3000/api",
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

> **Teaching Tip:** Explain interceptors - they're like middleware that run before/after requests. Great for adding auth tokens or handling errors globally.

**5.2 Set Up React Query Provider**

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

> **Teaching Tip:** Explain that `"use client"` is needed because React Query uses hooks (client-side only). The QueryClient manages caching and data fetching.

**5.3 Create Utility Functions**

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

> **Teaching Tip:** The `cn` function combines `clsx` and `tailwind-merge` to merge Tailwind classes properly, preventing conflicts.

**5.4 Update Root Layout**

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
  description: "Company profile website for RS Nuha",
};

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

> **Teaching Tip:** Explain that the root layout wraps ALL pages. We wrap everything in ReactQueryProvider so all pages can use React Query hooks.

**5.5 Create Basic Layout Component**

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

> **Teaching Tip:** This is the foundation! Now we have:
> - API client ready
> - React Query set up
> - Basic layout structure
> 
> Next, we'll build UI components, then pages, then features.

---

## Step 6: API Integration Setup

### 🎯 Learning Objective
Students will learn how to create service functions that interact with the API.

### Instructions

**6.1 Create Service Functions**

Create `src/services/doctors.ts`:

```typescript
import { apiClient } from "@/api/client";

// Define types for better TypeScript support
export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  department: string;
  schedule: Schedule[];
}

export interface Schedule {
  day: string;
  time: string;
}

// Service function to fetch doctors
export const getDoctors = async (): Promise<Doctor[]> => {
  const response = await apiClient.get("/doctors");
  return response.data;
};

// Service function to fetch a single doctor
export const getDoctorById = async (id: string): Promise<Doctor> => {
  const response = await apiClient.get(`/doctors/${id}`);
  return response.data;
};
```

Create `src/services/index.ts`:

```typescript
export * from './doctors';
```

> **Teaching Tip:** Explain that service functions are reusable functions that make API calls. They keep API logic separate from components.

---

## Step 7: Building UI Components

### 🎯 Learning Objective
Students will learn to build reusable UI components using Tailwind CSS and Radix UI.

### Instructions

**7.1 Create Button Component**

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

> **Teaching Tip:** Explain:
> - `cva` (class-variance-authority) creates variants for different button styles
> - `forwardRef` allows parent components to access the button's DOM element
> - `Slot` from Radix allows the button to merge props with child components

**7.2 Create Card Component**

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

> **Teaching Tip:** Explain component composition - Card is made of smaller parts (Header, Title, Content) that work together.

**7.3 Create Other UI Components**

Continue creating other UI components as needed:
- `input.tsx` - Form input
- `select.tsx` - Dropdown select
- `separator.tsx` - Visual divider
- etc.

> **Teaching Tip:** Build components incrementally. Start with the most commonly used ones (Button, Card), then add others as needed.

---

## Step 8: Creating Pages

### 🎯 Learning Objective
Students will learn how Next.js App Router works and how to create pages.

### Instructions

**8.1 Update Homepage**

Update `src/app/page.tsx`:

```typescript
import { Homepage } from "@/modules/homepage";

export default function Home() {
  return <Homepage />;
}
```

**8.2 Create Doctors Page**

Create `src/app/doctors/page.tsx`:

```typescript
import { Doctors } from "@/modules/doctors";

export default function DoctorsPage() {
  return <Doctors />;
}
```

**8.3 Create Service Page**

Create `src/app/service/page.tsx`:

```typescript
import { Service } from "@/modules/service";

export default function ServicePage() {
  return <Service />;
}
```

> **Teaching Tip:** Explain that in Next.js App Router:
> - `page.tsx` files create routes
> - `src/app/page.tsx` = `/` (homepage)
> - `src/app/doctors/page.tsx` = `/doctors`
> - `src/app/service/page.tsx` = `/service`

---

## Step 9: Building Feature Modules

### 🎯 Learning Objective
Students will learn to organize code by features, creating reusable modules.

### Instructions

**9.1 Create Homepage Module**

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

**9.2 Create Doctors Module**

Create `src/modules/doctors/doctors.tsx`:

```typescript
"use client";

import { useDoctors } from "./hooks/use-doctors";
import { DoctorListView } from "./components/doctor-list-view";
import { FilterSection } from "./components/filter-section";
import { SearchSection } from "./components/search-section";

export function Doctors() {
  const { doctors, isLoading, error } = useDoctors();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading doctors</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Our Doctors</h1>
      <SearchSection />
      <FilterSection />
      <DoctorListView doctors={doctors} />
    </div>
  );
}
```

Create `src/modules/doctors/index.ts`:

```typescript
export * from './doctors';
```

**9.3 Create Custom Hook for Doctors**

Create `src/modules/doctors/hooks/use-doctors.ts`:

```typescript
"use client";

import { useQuery } from "@tanstack/react-query";
import { getDoctors, type Doctor } from "@/services/doctors";

export function useDoctors() {
  const { data, isLoading, error } = useQuery<Doctor[]>({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  return {
    doctors: data || [],
    isLoading,
    error,
  };
}
```

> **Teaching Tip:** Explain:
> - Custom hooks encapsulate logic
> - React Query's `useQuery` handles loading, error, and caching automatically
> - `queryKey` is used for caching - same key = same cached data

**9.4 Create Doctor Components**

Create components like:
- `doctor-card.tsx` - Display individual doctor
- `doctor-list-view.tsx` - List of doctors
- `filter-section.tsx` - Filtering UI
- `search-section.tsx` - Search UI

> **Teaching Tip:** Build components bottom-up:
> 1. Small components first (DoctorCard)
> 2. Then compose them (DoctorListView uses DoctorCard)
> 3. Finally, the main module (Doctors uses all components)

**9.5 Create Service Module**

Similar pattern - create `src/modules/service/service.tsx` and related components.

---

## Key Technologies Reference

### Frontend Framework
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives

### Data Fetching
- **React Query (TanStack Query)** - Server state management
- **Axios** - HTTP client

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **React Query DevTools** - Debugging tool

---

## Development Workflow

### Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

### Run Linting

```bash
npm run lint
```

---

## Common Issues & Solutions

### Issue: Module not found
**Solution:** 
- Check if you installed dependencies: `npm install`
- Verify import paths match file structure
- Check `tsconfig.json` path aliases

### Issue: Port 3000 already in use
**Solution:** 
```bash
npm run dev -- -p 3001
```

### Issue: TypeScript errors
**Solution:** 
- Check `tsconfig.json` configuration
- Ensure types are properly imported
- Restart TypeScript server in VS Code (Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server")

### Issue: Tailwind styles not applying
**Solution:** 
- Check `globals.css` imports Tailwind directives:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- Verify `tailwind.config.ts` includes correct paths
- Restart dev server

### Issue: React Query not working
**Solution:**
- Ensure component using React Query has `"use client"` directive
- Check that `ReactQueryProvider` wraps your app in `layout.tsx`
- Verify React Query DevTools shows in browser

---

## Teaching Tips Summary

1. **Start with Foundation:** Always build API client, React Query, and layout first
2. **Build Bottom-Up:** Create small components, then compose them
3. **Explain "Why":** Don't just show code - explain why we structure things this way
4. **Incremental Development:** Build one feature at a time, test as you go
5. **Use TypeScript:** Show students how types help catch errors early
6. **Practice Makes Perfect:** Have students recreate components from scratch

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Radix UI Documentation](https://www.radix-ui.com/)

---

## Next Steps for Students

After completing this tutorial, students can:

1. Add authentication and authorization
2. Implement form validation
3. Add unit and integration tests
4. Deploy to Vercel or other platforms
5. Add more features (appointments, patient records, etc.)
6. Optimize performance (code splitting, image optimization)

---

Happy Teaching! 🎓✨
