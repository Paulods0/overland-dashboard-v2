import SelectPostTypeButton from "../../components/select-post-type/select-post-type-button"

const SelectPostType = () => {
  return (
    <main className="h-full flex items-center flex-col gap-12 justify-center w-full pb-12 px-8">
      <h1 className="text-2xl lg:text-3xl mt-[10vh] font-semibold">
        Selecione o tipo de publicação
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full md:size-[40vh] place-items-center gap-8">
        <SelectPostTypeButton
          img={"/icons/post.png"}
          label="Normal"
          href="/novo/post-normal"
        />
        <SelectPostTypeButton
          img={"/icons/agenda-ao.png"}
          label="Agenda AO"
          href="/novo/agenda-ao"
        />
        <SelectPostTypeButton
          img={"/icons/dicas.png"}
          label="Dicas"
          href="/novo/dica"
        />
        <SelectPostTypeButton
          img={"/icons/parceiros.png"}
          label="Parceiros"
          href="/novo/parceiro"
        />
      </div>
    </main>
  )
}

export default SelectPostType
