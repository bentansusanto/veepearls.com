import RootProviders from '@/components/RootProviders'
import { body } from '@/components/ui/font-family'
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
      <html lang="en" suppressHydrationWarning>
        <body className={body.className}>
          <MaintenancePage />
        </body>
      </html>
    )
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={body.className}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  )
}
