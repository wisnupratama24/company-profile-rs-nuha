import { Header, Footer } from "@/components/layouts";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full">
            <Header />
            <main className="container mx-auto p-8 pt-24">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;