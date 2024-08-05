import { Home,Plus, Users,Store,Files,UserRoundCheck,Lightbulb,Handshake } from "lucide-react"

export const HEADER_LINKS = [
  {
    label: "Início",
    link: "/",
    icon: Home,
  },
  {
    label: "Criar",
    link: "/novo",
    icon: Plus,
  },
  {
    label: "Ver posts",
    link: "/posts",
    icon: Files,
  },
  {
    label: "Usuários",
    link: "/usuários",
    icon: Users,
  },
  {
    label: "Loja",
    link: "/loja",
    icon: Store,
  },
  {
    label: "Inscritos",
    link: "/inscritos",
    icon: UserRoundCheck,
  },
  {
    label: "Dicas",
    link: "/dicas",
    icon: Lightbulb,
  },
  {
    label: "Parceiros",
    link: "/parceiros",
    icon: Handshake,
  },
]
