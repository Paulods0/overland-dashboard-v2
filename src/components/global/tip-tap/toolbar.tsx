import { Editor } from "@tiptap/react"
import {
  Bold,
  List,
  Redo,
  Undo,
  Quote,
  Image,
  Italic,
  Youtube,
  Heading1,
  Heading2,
  Underline,
  ListOrdered,
} from "lucide-react"
//@ts-ignore
import ToolbarButton from "./toolbar-button"

type Props = {
  editor: Editor | null
}

const Toolbar = ({ editor }: Props) => {
  if (!editor) return null

  function addImage() {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement
      const file = target.files?.[0]

      if (file) {
        const reader = new FileReader()

        reader.onload = () => {
          const url = reader.result as string
          editor!.chain().focus().setImage({ src: url }).run()
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }
  const addYouTubeVideo = () => {
    const url = prompt("Insira o URL do vídeo do YouTube:")
    if (url) {
      editor.commands.setYoutubeVideo({ src: url })
    }
  }

  return (
    <div className="px-4 py-3 rounded-lg flex justify-between items-start gap-5 flex-wrap border border-zinc-600/60">
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap">
        <ToolbarButton
          icon={Bold}
          isActive={editor.isActive("bold")}
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleBold().run()
          }}
        />

        <ToolbarButton
          icon={Italic}
          isActive={editor.isActive("italic")}
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleItalic().run()
          }}
        />

        <ToolbarButton
          icon={Underline}
          isActive={editor.isActive("underline")}
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleUnderline().run()
          }}
        />

        <ToolbarButton
          icon={Heading1}
          isActive={editor.isActive("heading", { level: 1 })}
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }}
        />

        <ToolbarButton
          icon={Heading2}
          isActive={editor.isActive("heading", { level: 2 })}
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }}
        />

        <ToolbarButton
          icon={List}
          isActive={editor.isActive("bulletList")}
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleBulletList().run()
          }}
        />

        <ToolbarButton
          icon={ListOrdered}
          isActive={editor.isActive("orderedList")}
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleOrderedList().run()
          }}
        />

        <ToolbarButton
          icon={Quote}
          isActive={editor.isActive("blockquote")}
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleBlockquote().run()
          }}
        />

        <ToolbarButton
          icon={Undo}
          isActive={editor.isActive("undo")}
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().undo().run()
          }}
        />

        <ToolbarButton
          icon={Redo}
          isActive={editor.isActive("redo")}
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().redo().run()
          }}
        />

        <ToolbarButton
          icon={Image}
          isActive={editor.isActive("image")}
          onClick={addImage}
        />

        <ToolbarButton
          icon={Youtube}
          isActive={editor.isActive("youtube")}
          onClick={addYouTubeVideo}
        />
      </div>
    </div>
  )
}

export default Toolbar
