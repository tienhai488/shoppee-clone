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
    })
  })

export type Schema = yup.InferType<typeof schema>