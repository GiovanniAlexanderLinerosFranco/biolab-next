import type { Metadata } from "next";
import "./globals.css";
import PWARegister from "@/components/PWARegister";

export const metadata: Metadata = {
  title: "BioLab Virtual USTA",
  description: "Entorno de Simulación Microscópica Avanzada",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-[#020617] text-slate-200 antialiased min-h-screen w-full">
        <PWARegister />
        {children}
      </body>
    </html>
  );
}