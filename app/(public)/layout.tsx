import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col min-h-screen">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
