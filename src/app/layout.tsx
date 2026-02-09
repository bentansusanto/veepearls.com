import ReactQueryProvider from '@/common/ReactQuerySetup'
import { body } from '@/components/ui/font-family'
import { ThemeProvider } from '@/components/ui/theme-provider'
import './globals.css'
import MaintenancePage from './maintenance/page'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true'

  if (isMaintenanceMode) {
    return (
      <html lang="en">
        <body className={body.className}>
          <MaintenancePage />
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body className={body.className}>
        <ThemeProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
