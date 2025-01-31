import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Patreon",
  description: "A Patreon clone",
  information: "This is a clone created to replicate a variation of patreon and could be added to my projects list",
  ping: ""
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <SessionWrapper>
          <Navbar/>
          <div className="min-h-screen text-white bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
          {children}
          </div>
          <Footer/>
        </SessionWrapper>
        </body>
    </html>
  );
}
