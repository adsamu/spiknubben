export default function Modal({ handleChange, placeholder, value }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className="min-h-[48px] min-w-0 px-4 py-2 h-full border rounded-md"
    />
  )
}

