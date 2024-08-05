const Fallback = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col gap-4 items-center justify-center">
        <img loading="lazy" src="/logotipo-tradicional.png" className="size-44 object-cover" alt="" />
        <h2 className="text-2xl font-semibold">Carregando a página...</h2>
      </div>
    </div>
  )
}

export default Fallback
