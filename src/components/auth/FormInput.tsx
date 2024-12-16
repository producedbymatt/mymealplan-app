import { Input } from "@/components/ui/input";

interface FormInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const FormInput = ({
  type,
  placeholder,
  value,
  onChange,
  required = false,
}: FormInputProps) => (
  <div>
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);