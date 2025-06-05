import { forwardRef, useId } from "react"

const Select = ({label, options,className,...props},ref) => {

    const id = useId()
  return (
    <div className="w-full">
        {label && <label className={``} htmlFor={id}></label>}

        <select {...props} className={`${className}`} id={id} ref={ref}>
            { options?.map((option) => (

                <option key={option} value={option}>{option}</option>

            ))}
        </select>
    </div>
  )
}

export default forwardRef(Select);