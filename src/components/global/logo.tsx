import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link to={"/"}>
      <img
        alt="logotipo"
        src="/logotipo-texto.png"
        className="w-20 h-10 flex lg:hidden object-contain"
      />
    </Link>
  )
}

export default Logo
