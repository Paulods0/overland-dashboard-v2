import Box from "./box"

const TextEditor = () => {
  return (
    <Box className="lg:col-span-2">
      <textarea className="w-full h-full bg-transparent outline-none border-none resize-none" />
    </Box>
  )
}

export default TextEditor
