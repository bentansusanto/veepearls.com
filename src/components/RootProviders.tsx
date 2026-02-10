 'use client'

import { ThemeProvider } from '@/components/ui/theme-provider'
import { store } from '@/store/store'
import { Provider } from 'react-redux'

const RootProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  )
}

export default RootProviders

