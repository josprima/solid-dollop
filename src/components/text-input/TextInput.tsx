import TextInputProps from './TextInput.interface';

function TextInput({
  placeholder,
  value,
  onChange,
  name,
  id,
  className = '',
}: TextInputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      className={`px-4 py-2 border border-gray-300 rounded-md ${className}`}
    />
  );
}

export default TextInput;
