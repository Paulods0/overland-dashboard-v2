import Box from "@/components/global/box"
import Modal from "@/components/global/modal"
import Button from "@/components/ui/button/button"
import Container from "@/components/global/container"
import Pagination from "@/components/global/pagination"
import AlertModal from "@/components/global/alert-modal"
import LinkButton from "@/components/ui/button/link-button"

import { Edit3, Plus, Save, Trash } from "lucide-react"

const PartnerPage = () => {
  return (
    <main>
      <Container>
        <section className="flex flex-col gap-2 w-full">
          <div className="w-full flex items-center justify-end">
            <LinkButton href="/novo/dica" label="Adicionar" icon={Plus} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 h-[60vh] overflow-y-auto">
            {Array.from({ length: 8 }).map((_, index) => (
              <Box key={index} className="flex flex-col gap-4">
                <img
                  src="/bg.jpg"
                  className="object-cover w-full h-[25vh]"
                  alt=""
                />
                <div className="flex items-end justify-between">
                  <div className="flex flex-col w-full">
                    <h1>Título</h1>
                    <h4>Dicas</h4>
                  </div>

                  <div className="flex flex-col w-full">
                    <h4 className="italic text-xs">19 de Junho de 2024</h4>
                    <div className="flex items-center gap-2">
                      <Modal
                        trigger={<Button icon={Edit3} buttonType="base" />}
                        actionBtn={
                          <Button
                            icon={Save}
                            label="Salvar as alterações"
                            buttonType="base"
                          />
                        }
                      >
                        Algum formulário aqui.
                      </Modal>
                      <AlertModal
                        trigger={<Button icon={Trash} buttonType="danger" />}
                        actionBtn={
                          <Button buttonType="danger" label="Remover" />
                        }
                        title="Tem a certeza que pretendes remover esta dica?"
                      />
                    </div>
                  </div>
                </div>
              </Box>
            ))}
          </div>

          <Pagination />
        </section>
      </Container>
    </main>
  )
}

export default PartnerPage
