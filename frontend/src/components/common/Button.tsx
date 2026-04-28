import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "black" | "outline";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClickHandler?: () => void;
}

export const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  loading = false,
  onClickHandler,
}: Props) => {
  const baseStyle =
    "px-4 py-2 rounded-lg transition font-medium flex items-center justify-center";

  const variants = {
    primary: "bg-primary text-white hover:opacity-90",
    secondary: "bg-secondary text-black",
    black: "bg-black text-white hover:opacity-90",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClickHandler}
      disabled={disabled || loading}
      className={clsx(
        baseStyle,
        variants[variant],
        (disabled || loading) && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};