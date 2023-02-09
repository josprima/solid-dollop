export default interface TextInputProps {
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
  name: string;
  id: string;
  className?: string;
}
