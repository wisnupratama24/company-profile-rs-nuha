import { Header, Footer } from "@/components/layouts";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex min-h-screen flex-col w-full">
            <Header />
            <main className="flex container items-center justify-center mx-auto p-8 pt-24">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;