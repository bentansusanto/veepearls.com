'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRefreshTokenMutation } from '@/store/services/auth.service'
import { setCredentials, logout } from '@/store/slices/authSlice'
import Cookies from 'js-cookie'

const AuthRefreshHandler = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch()
  const [refreshToken] = useRefreshTokenMutation()

  useEffect(() => {
    const handleRefresh = async () => {
      // Jangan refresh jika tidak ada session cookie sama sekali
      const hasSession =
        Cookies.get('token_mirror') ||
        document.cookie.includes('session_token')

      if (!hasSession) return

      try {
        const result = await refreshToken().unwrap()
        if (result && result.access_token) {
          dispatch(
            setCredentials({
              user: {
                id: result.id,
                name: result.name,
                email: result.email,
                role: result.role,
              },
              access_token: result.access_token,
            })
          )
        }
      } catch (error: any) {
        // 401 = session expired / user belum login → bersihkan state, tidak perlu log error
        const status = error?.status ?? error?.data?.status
        if (status === 401) {
          dispatch(logout())
          return
        }
        // Error lain (network, 500, dll) → log untuk debugging
        console.error('AuthRefreshHandler: Unexpected error during token refresh:', error)
      }
    }

    // Refresh saat pertama kali mount
    handleRefresh()

    // Refresh setiap 15 menit
    const intervalId = setInterval(handleRefresh, 15 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [dispatch, refreshToken])

  return <>{children}</>
}

export default AuthRefreshHandler
