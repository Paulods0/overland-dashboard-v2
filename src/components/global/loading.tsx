import { useTheme } from "@/context/theme-context"
import { Oval } from "react-loader-spinner"

const Loading = ({ size = 16 }: { size?: number }) => {
  const { theme } = useTheme()
  const color = theme === "light" ? "#111111" : "#fafafa"
  return (
    <Oval
      visible
      width={size}
      height={size}
      color={color}
      secondaryColor={color}
    />
    
  )
}

export default Loading
