import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Oloo's Portfolio",
  description: "Full stack developer portfolio",
  metaBase: "https://my-portfolio-yyul.vercel.app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 text-white`}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
