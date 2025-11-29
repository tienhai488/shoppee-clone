import * as yup from 'yup'

function testMinMaxPrice(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const schema = yup
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
      .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không khớp'),
    price_min: yup.string().required().test({
      name: 'price-not-allowed',
      message: 'Giá không phù hợp',
      test: testMinMaxPrice
    }),
    price_max: yup.string().required().test({
      name: 'price-not-allowed',
      message: 'Giá không phù hợp',
      test: testMinMaxPrice
    }),
    name: yup.string().trim().required('Tên sản phẩm không được để trống')
  })

// - name: string, maxLength = 160
// - phone: string, maxLength = 20
// - address: string, maxLength = 160
// - date_of_birth: string, ISO8601
// - avatar: string, maxLength 1000
// - password: string, length 6-160
// - new_password: string, length 6-160

export const userSchema = yup.object({
  name: yup.string().trim().max(160, 'Độ dài tối đa là 160 ký tự').required('Tên không được để trống'),
  phone: yup.string().trim().max(20, 'Độ dài tối đa là 20 ký tự').required('Số điện thoại không được để trống'),
  address: yup.string().trim().max(160, 'Độ dài tối đa là 160 ký tự').required('Địa chỉ không được để trống'),
  date_of_birth: yup.date().required('Ngày sinh không được để trống').max(new Date(), 'Ngày sinh không hợp lệ'),
  avatar: yup.string().trim().max(1000, 'Độ dài tối đa là 1000 ký tự').required('Avatar không được để trống'),
  password: yup.string().trim().min(6, 'Độ dài tối thiểu là 6 ký tự').max(160, 'Độ dài tối đa là 160 ký tự').required('Mật khẩu không được để trống'),
  password_confirmation: yup.string()
    .trim()
    .min(6, 'Độ dài tối thiểu là 6 ký tự')
    .max(160, 'Độ dài tối đa là 160 ký tự')
    .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không khớp'),
  new_password: yup.string().trim().min(6, 'Độ dài tối thiểu là 6 ký tự').max(160, 'Độ dài tối đa là 160 ký tự')
})

export type Schema = yup.InferType<typeof schema>

export type UserSchema = yup.InferType<typeof userSchema>