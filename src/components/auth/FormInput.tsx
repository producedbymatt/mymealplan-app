import { Input } from "@/components/ui/input";

interface FormInputProps {
  type: string;
  placeholder?: string; // Made optional by adding ?
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  id?: string;
}

export const FormInput = ({
  type,
  placeholder,
  value,
  onChange,
  required = false,
  id,
}: FormInputProps) => (
  <div>
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      id={id}
    />
  </div>
);