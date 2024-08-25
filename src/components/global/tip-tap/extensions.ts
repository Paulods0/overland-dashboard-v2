import { Node, mergeAttributes } from "@tiptap/core"

const Iframe = Node.create({
  name: "iframe",

  group: "block",

  content: "inline*",

  parseHTML() {
    return [
      {
        tag: "iframe[src]",
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "iframe",
      mergeAttributes(HTMLAttributes, {
        class: "h-[315px] w-[560px]",
        frameborder: "0",
        allowfullscreen: "",
      }),
      0,
    ]
  },

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (element) => element.getAttribute("src"),
        renderHTML: (attributes) =>
          attributes.src ? { src: attributes.src } : null,
      },
    }
  },

  //@ts-ignore
  addCommands() {
    return {
      setIframe:
        (src: string) =>
        ({ chain }: any) => {
          return chain().setNode("iframe", { src }).run()
        },
    }
  },
})

export default Iframe
