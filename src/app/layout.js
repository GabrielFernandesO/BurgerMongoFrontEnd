import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer/Footer";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import Loading from "./(public-routes)/(home)/loading";



const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: 'Burger',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/"/>
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <NextAuthSessionProvider>
          <ToastContainer position="top-center" autoClose={2000} />
          <Suspense fallback={<Loading />}>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer></Footer>
          </Suspense>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
