import { useEffect, useState } from "react"

const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleNetworkChange = () => {
      setIsOnline(navigator.onLine)
    }

    window.addEventListener("online", handleNetworkChange)
    window.addEventListener("offline", handleNetworkChange)

    return () => {
      window.removeEventListener("online", handleNetworkChange)
      window.removeEventListener("offline", handleNetworkChange)
    }
  }, [])

  return { isOnline }
}

export default useIsOnline
