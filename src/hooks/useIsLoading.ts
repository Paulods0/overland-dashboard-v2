import { useState } from "react"

const useIsLoading = () => {
  const [isLoading, setIsloading] = useState(false)

  const toggleLoading = (val: boolean) => {
    setIsloading(val)
  }

  return { isLoading, toggleLoading }
}

export default useIsLoading
