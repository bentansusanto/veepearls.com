export const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL
}

export const fetchSSGData = async (endpoint: string) => {
  const baseUrl = getApiUrl()
  // Ensure baseUrl is defined, fallback or throw error if critical
  if (!baseUrl) {
    console.warn('API URL not defined for SSG fetch')
    return []
  }

  try {
    const res = await fetch(`${baseUrl}${endpoint}`, { cache: 'no-store' }) // Use no-store to ensure fresh data at build time if needed, or default cache
    if (!res.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`)
    }
    const json = await res.json()
    return json.data || [] // Adjust based on API structure
  } catch (error) {
    console.error(`Error fetching SSG data for ${endpoint}:`, error)
    return []
  }
}
