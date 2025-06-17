export const Button = ({
  children,
  type = "button",
  bgColor = "",
  textColor = "",
  className = "",
  ...props
}) => {
  const isSubmit = type === "submit";

  const baseStyle = `
    px-2 py-1 md:px-4 md:py-2
    text-sm md:text-base
    rounded-lg font-medium
    transform transition-transform duration-200 ease-in-out
  `;

  const visualStyle = isSubmit
    ? `${bgColor || "bg-green-600"} ${textColor || "text-white"} hover:bg-green-700 active:scale-95 shadow-md hover:shadow-lg`
    : `${bgColor || "bg-white"} ${textColor || "text-black"} hover:bg-gray-200 rounded-full hover:scale-105 active:scale-95 shadow`;

  return (
    <button
      type={type}
      {...props}
      className={`${baseStyle} ${visualStyle} ${className}`}
    >
      {children}
    </button>
  );
};
