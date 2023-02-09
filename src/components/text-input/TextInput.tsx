import TextInputProps from './TextInput.interface';

function TextInput({ placeholder, value, onChange }: TextInputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default TextInput;
