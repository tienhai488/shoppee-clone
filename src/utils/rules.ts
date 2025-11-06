import type { UseFormGetValues, FieldValues } from "react-hook-form"

export const getRules = <TFieldValues extends FieldValues>(getValues?: UseFormGetValues<TFieldValues>): Record<string, any> => ({
  email: {
    required: {
      value: true,
      message: 'Email không được để trống'
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Email không hợp lệ'
    },
    minLength: {
      value: 5,
      message: 'Độ dài tối thiểu là 5 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài tối đa là 160 ký tự'
    },
  },
  password: {
    required: {
      value: true,
      message: 'Mật khẩu không được để trống'
    },
    minLength: {
      value: 6,
      message: 'Độ dài tối thiểu là 6 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài tối đa là 160 ký tự'
    },
  },
  password_confirmation: {
    required: {
      value: true,
      message: 'Mật khẩu nhập lại không được để trống'
    },
    minLength: {
      value: 6,
      message: 'Độ dài tối thiểu là 6 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài tối đa là 160 ký tự'
    },
    validate: typeof getValues === 'function' ? (value: any) => value === getValues('password' as any) || 'Mật khẩu nhập lại không khớp' : undefined
  }
})