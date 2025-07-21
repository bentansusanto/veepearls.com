import { body } from "@/components/ui/font-family";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";
import ReactQueryProvider from "@/common/ReactQuerySetup";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={body.className}>
        <ThemeProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
