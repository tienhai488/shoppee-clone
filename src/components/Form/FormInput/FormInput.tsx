import type { UseFormRegister } from 'react-hook-form'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
  type?: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  className?: string
  classNameInput?: string
  name?: string
  register?: UseFormRegister<any>
  rules?: Record<string, any>
}

export default function FormInput({
  id,
  type,
  errorMessage,
  placeholder,
  className,
  classNameInput,
  name,
  register,
  rules,
  ...rest
}: FormInputProps) {
  const registerResult = register && name ? register(name, rules) : null
  return (
    <div className={className}>
      <input id={id} type={type} className={classNameInput} placeholder={placeholder} {...registerResult} {...rest} />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
    </div>
  )
}
