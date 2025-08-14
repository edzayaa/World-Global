import type { Metadata } from "next";
import "./globals.scss";
import { Navbar } from "@/shared/components/navbar/navbar";
import { Loader } from "@/shared/components/loader/loader";

export const metadata: Metadata = {
  title: "World Global",
  icons:{
    icon: '/icons/logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body>
        <Loader/>
        <Navbar/>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.addEventListener('load', () => setTimeout(() => {
                document.querySelector('.loader')?.classList.remove('show');
                document.dispatchEvent(new Event('loader-hidden'));
              }, 200));  `
          }}
        />
      </body>
    </html>
  );
}
