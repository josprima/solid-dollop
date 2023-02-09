type OptionType = {
  label: string;
  value: string;
};

export default interface SelectInputProps {
  options: OptionType[];
  value: string;
  onChange: (e: any) => void;
  label: string;
  name: string;
  id: string;
  className?: string;
}
