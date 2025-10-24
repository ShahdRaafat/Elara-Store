import { LucideIcon } from "lucide-react";

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  icon: LucideIcon;
  placeholder: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
}

function UserFormInput({
  id,
  name,
  label,
  type = "text",
  icon: Icon,
  placeholder,
  defaultValue,
  required = false,
  disabled = false,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className=" text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2"
      >
        <Icon className="w-4 h-4 text-brand-500" />
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 ${
          disabled
            ? "border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 text-gray-500 dark:text-gray-500 cursor-not-allowed"
            : "border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
        }`}
      />
    </div>
  );
}
export default UserFormInput;
