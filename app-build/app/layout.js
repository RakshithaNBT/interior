import { ThemeProvider } from "@/providers/ThemeProvider";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import LoadingScreen from "@/components/layout/LoadingScreen";
import "./globals.css";

export const metadata = {
  title: "ELEVA Interiors | Premium Luxury Interior Design",
  description: "Transform your space into an extraordinary experience with ELEVA Interiors. Bespoke luxury interior designs crafted for refined premium living.",
  keywords: "luxury interior design, premium home decor, modern interiors, modular kitchen, bespoke furniture, ELEVA, interior designer mumbai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col font-sans selection:bg-[var(--gold)] selection:text-white transition-colors duration-500">
        <ThemeProvider>
          <LoadingScreen />
          <SmoothScrollProvider>
            <ScrollProgress />
            <Navbar />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
