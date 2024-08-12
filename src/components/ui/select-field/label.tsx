type Props = {
  label: string
}

const Label = ({ label }: Props) => {
  return <label className="font-semibold">{label}</label>
}

export default Label
