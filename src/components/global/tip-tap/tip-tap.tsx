import "./tip-tap.style.css"

import ToolBar from "./toolbar"
import Image from "@tiptap/extension-image"
import Youtube from "@tiptap/extension-youtube"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import { useEditor, EditorContent } from "@tiptap/react"
import Iframe from "./extensions"

type Props = {
  content?: string
  setContent: (newCont: string) => void
}

const TipTapEditor = ({ setContent }: Props) => {
  function handleContent(newContent: string) {
    setContent(newContent)
  }

  const editor = useEditor({
    extensions: [
      Iframe,
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image,
      Youtube.configure({
        width: 300,
        height: 300,
        inline: true,
        autoplay: false,
        allowFullscreen: true,
      }),
      Underline,
    ],
    editorProps: {
      attributes: {
        class: "h-full outline-none p-4",
      },
    },
    onUpdate: ({ editor }) => {
      handleContent(editor.getHTML())
    },
  })

  return (
    <div className="col-span-2 h-full flex gap-2 flex-col overflow-auto">
      <ToolBar editor={editor} />
      <EditorContent
        editor={editor}
        style={{ whiteSpace: "pre-line" }}
        className="border tip-tap-editor border-neutral-600/60 h-[100vh] overflow-y-auto p-2 outline-none rounded-lg"
      />
    </div>
  )
}

export default TipTapEditor
