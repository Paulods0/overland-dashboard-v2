const UserImage = () => {
  return (
    <div className="flex flex-col gap-2">
      <img
        src="/profile.jpg"
        className="object-cover rounded-lg size-20"
        alt="foto de perfil"
      />
      <h4 className="text-sm text-white line-clamp-1">usuário</h4>
    </div>
  )
}

export default UserImage
