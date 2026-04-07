 'use client'

import { ThemeProvider } from '@/components/ui/theme-provider'
import { store } from '@/store/store'
import { Provider } from 'react-redux'
import AuthRefreshHandler from './AuthRefreshHandler'

const RootProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <AuthRefreshHandler>{children}</AuthRefreshHandler>
      </Provider>
    </ThemeProvider>
  )
}

export default RootProviders

