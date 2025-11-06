import type { UseFormRegister } from 'react-hook-form'

interface FormInputProps {
  id: string
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  className?: string
  name: string
  register: UseFormRegister<any>
  rules?: Record<string, any>
}

export default function FormInput({
  id,
  type,
  errorMessage,
  placeholder,
  className,
  name,
  register,
  rules
}: FormInputProps) {
  return (
    <div className={className}>
      <input
        id={id}
        type={type}
        className={`p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm`}
        placeholder={placeholder}
        {...register(name, rules)}
      />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
    </div>
  )
}
