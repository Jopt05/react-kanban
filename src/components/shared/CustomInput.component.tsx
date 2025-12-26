interface CustomInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    disabled?: boolean;
    isTextArea?: boolean;
}

const CustomInput = ({label, name, value, onChange, onBlur, disabled, isTextArea}: CustomInputProps) => {
  return (
    <>
        {
            !disabled && <label className='block text-white text-sm font-bold'>{label}</label> 
        }
        {isTextArea ? <textarea 
            className={
                disabled
                ? "appearance-none w-full py-2 px-3 text-white mb-2 resize-none"
                : "shadow appearance-none boder rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mb-2 resize-none"
            }
            placeholder={label} 
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
        /> : <input 
            type="text" 
            className={
                disabled
                ? "appearance-none w-full py-2 px-3 text-white mb-2 font-bold text-lg"
                : "shadow appearance-none boder rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mb-2"
            }
            placeholder={label} 
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
        />}
    </>
  )
}

export default CustomInput