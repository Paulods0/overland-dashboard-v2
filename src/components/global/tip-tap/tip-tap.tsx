import "./tip-tap.style.css"

import ToolBar from "./toolbar"
import Iframe from "./extensions"
import { Dispatch, SetStateAction, useEffect } from "react"
import Image from "@tiptap/extension-image"
import Youtube from "@tiptap/extension-youtube"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import { useEditor, EditorContent } from "@tiptap/react"

type Props = {
  content?: string
  setContent: Dispatch<SetStateAction<string>>
}

const TipTapEditor = ({ content, setContent }: Props) => {
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
      Image.configure({
        inline: true,
      }),
      Youtube.configure({
        width: 100,
        height: 100,
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
    content: content,
    onUpdate: ({ editor }) => {
      handleContent(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content, false)
    }
  }, [editor, content])

  return (
    <div className="col-span-2 h-full w-full flex gap-2 flex-col overflow-auto">
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
