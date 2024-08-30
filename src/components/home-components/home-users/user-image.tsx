type Props = {
  image?: string
  name: string
}

const UserImage = ({ name, image }: Props) => {
  const img = image !== "" ? image : "/icons/user.png"
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <img src={img} className="object-cover rounded-full size-12" alt={name} />
      <h4 className="text-sm text-baseColor line-clamp-1">{name}</h4>
    </div>
  )
}

export default UserImage
