import { Oval } from "react-loader-spinner"

const Loading = ({ size = 16 }: { size?: number }) => {
  return (
    <Oval
      visible
      width={size}
      height={size}
      color="#6B04B6"
      secondaryColor="#6B04B6"
    />
  )
}

export default Loading
