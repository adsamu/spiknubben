export default function TextInput({ onChange, placeholder, value, ...props }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="min-h-[48px] max-w-[200px] min-w-0 px-4 py-2 h-full border rounded-md"
      {...props}
    />
  )
}

