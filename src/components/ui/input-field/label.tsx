type Props = {
  title: string
}

const InputLabel = ({ title }: Props) => {
  return (
    <label htmlFor="email" className="font-semibold">
      {title}
    </label>
  )
}

export default InputLabel
