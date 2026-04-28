import { Field, ErrorMessage } from "formik";

interface Props {
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  label?: string;
  isCompulsory?: boolean;
  isDisabled?: boolean;
}

export const InputField = ({
  name,
  type = "text",
  placeholder,
  label,
  value,
  isCompulsory = false,
  isDisabled = false,
}: Props) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium">
          {label}
          {isCompulsory && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Field name={name}>
        {({ field }: any) => (
          <input
            {...field}
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={isDisabled}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary 
              ${isDisabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
          />
        )}
      </Field>

      <ErrorMessage
        name={name}
        component="p"
        className="text-sm text-red-500"
      />
    </div>
  );
};