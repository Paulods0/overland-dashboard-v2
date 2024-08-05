import Box from "@/components/global/box"
import Modal from "@/components/global/modal"
import Button from "@/components/ui/button/button"
import Container from "@/components/global/container"
import Pagination from "@/components/global/pagination"
import { Edit3, Plus, Save, Trash } from "lucide-react"
import AlertModal from "@/components/global/alert-modal"
import AddStoreForm from "@/components/store-components/add-store-form"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const StorePage = () => {
  return (
    <main>
      <Container>
        <section className="flex flex-col gap-2">
          <div className="w-full flex items-center justify-between">
            <h3 className="font-bold text-xl">
              Total de artigos:
              <span className="font-extralight text-lg"> 8</span>
            </h3>
            <Modal
              trigger={
                <Button label="Adicionar" icon={Plus} buttonType="base" />
              }
              actionBtn={
                <Button
                  icon={Save}
                  label="Salvar"
                  className="border-none bg-indigo-700 text-white"
                />
              }
            >
              <AddStoreForm />
            </Modal>
          </div>
          <Box className="h-[60vh] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Quantidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 8 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>93fndu24ca1134z</TableCell>
                    <TableCell>T-Shirt</TableCell>
                    <TableCell>12,000.00AKZ</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Modal
                          title="Atualizar o dados do produto."
                          trigger={<Button icon={Edit3} buttonType="base" />}
                          actionBtn={
                            <Button
                              icon={Save}
                              className="bg-indigo-700 text-white border-none"
                            />
                          }
                        >
                          Um formulário aqui.
                        </Modal>
                        <AlertModal
                          trigger={<Button icon={Trash} buttonType="danger" />}
                          title="Tens a certeza que pretendes eliminar este artigo?"
                          actionBtn={
                            <Button label="Eliminar" buttonType="danger" />
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <Pagination />
        </section>
      </Container>
    </main>
  )
}

export default StorePage
