import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import FormInput from 'src/components/Form/FormInput'
import { getRules } from 'src/utils/rules'

interface FormData {
  email: string
  password: string
  password_confirmation: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = handleSubmit(
    (data) => {
      console.log(data)
    },
    (data) => {
      const password = getValues('password')
      console.log('password', password)

      console.log('errors', data)
    }
  )

  const rules = getRules<FormData>(getValues)

  const formValues = watch()
  console.log('form values', formValues)

  return (
    <div className='bg-orange-600'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Ký</div>
              <FormInput
                id='email'
                type='email'
                className='mt-8'
                name='email'
                placeholder='Email'
                register={register}
                rules={rules.email}
                errorMessage={errors.email?.message}
              />
              <FormInput
                id='password'
                type='password'
                className='mt-3'
                name='password'
                placeholder='Mật khẩu'
                register={register}
                rules={rules.password}
                errorMessage={errors.password?.message}
              />
              <FormInput
                id='password_confirmation'
                type='password'
                className='mt-3'
                name='password_confirmation'
                placeholder='Xác nhận mật khẩu'
                register={register}
                rules={rules.password_confirmation}
                errorMessage={errors.password_confirmation?.message}
              />
              <div className='mt-3'>
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Đăng Ký
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-slate-400'>Bạn đã có tài khoản? </span>
                <Link to='/login' className='text-red-500 ml-1'>
                  Đăng Nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
