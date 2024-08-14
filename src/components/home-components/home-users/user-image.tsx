type Props = {
  image?: string
  name: string
}

const UserImage = ({ name, image }: Props) => {
  const img = image !== "" ? image : "/icons/user.png"
  return (
    <div className="flex flex-col gap-2">
      <img src={img} className="object-cover rounded-lg size-20" alt={name} />
      <h4 className="text-sm text-white line-clamp-1">{name}</h4>
    </div>
  )
}

export default UserImage
