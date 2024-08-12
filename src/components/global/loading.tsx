import { Oval } from "react-loader-spinner"

const Loading = ({ size = 16 }: { size?: number }) => {
  return (
    <Oval
      color="#fff"
      secondaryColor="#fff"
      visible
      height={size}
      width={size}
    />
  )
}

export default Loading
