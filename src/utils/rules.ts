import * as yup from "yup"

const schema = yup
  .object({
    email: yup
      .string()
      .required('Email không được để trống')
      .email('Email không hợp lệ')
      .min(5, 'Độ dài tối thiểu là 5 ký tự')
      .max(160, 'Độ dài tối đa là 160 ký tự'),
    password: yup
      .string()
      .required('Mật khẩu không được để trống')
      .min(6, 'Độ dài tối thiểu là 6 ký tự')
      .max(160, 'Độ dài tối đa là 160 ký tự'),
    password_confirmation: yup
      .string()
      .required('Mật khẩu nhập lại không được để trống')
      .min(6, 'Độ dài tối thiểu là 6 ký tự')
      .max(160, 'Độ dài tối đa là 160 ký tự')
      .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không khớp')
  })
  .required()

export default schema