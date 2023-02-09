import SelectInputProps from './SelectInput.interface';

function SelectInput({
  options,
  value,
  onChange,
  label,
  id,
  name,
  className,
}: SelectInputProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="font-medium text-sm mb-2">
        {label}
      </label>

      <select
        onChange={onChange}
        value={value}
        id={id}
        name={name}
        className="px-4 py-2 border border-gray-300 rounded-md"
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
