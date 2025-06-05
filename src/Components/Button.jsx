

export const Button = (
    {
    children,
    type = "button" ,
     bgColor = "bg-blue-600",
    textColor = "text-white",
     className = "",
     ...props

}) => {
  return (
    <button type={`${type}`} {...props} className={`px-4 py-2 rounded-lg  ${textColor} ${bgColor} ${className} `}>{children}</button>
  )
}
