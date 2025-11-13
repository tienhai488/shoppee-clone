import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { loginAccount } from 'src/apis/auth.api'
import Button from 'src/components/Button'
import FormInput from 'src/components/Form/FormInput'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context.tsx'
import type { ErrorResponse } from 'src/types/utils.type'
import { getProfile } from 'src/utils/profile'
import { loginSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

interface FormData {
  email: string
  password: string
}

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => loginAccount(body)
  })

  const onSubmit = handleSubmit(
    (data) => {
      loginAccountMutation.mutate(data, {
        onSuccess(data) {
          setIsAuthenticated(true)
          setProfile(getProfile())
          navigate(path.home)
        },
        onError(error) {
          if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
            const formError = error.response?.data.data

            if (formError) {
              Object.keys(formError).forEach((key) => {
                setError(key as keyof FormData, {
                  type: 'server',
                  message: formError[key as keyof FormData]
                })
              })
            }
          }
        }
      })
    },
    (error) => {
      console.log('errors', error)
    }
  )

  return (
    <div className='bg-orange-600'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Nhập</div>
              <FormInput
                id='email'
                type='email'
                className='mt-8'
                name='email'
                placeholder='Email'
                register={register}
                errorMessage={errors.email?.message}
              />
              <FormInput
                id='password'
                type='password'
                className='mt-3'
                name='password'
                placeholder='Mật khẩu'
                register={register}
                errorMessage={errors.password?.message}
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex items-center justify-center'
                  isLoading={loginAccountMutation.isPending}
                  disabled={loginAccountMutation.isPending}
                >
                  Đăng Nhập
                </Button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-slate-400'>Bạn chưa có tài khoản? </span>
                <Link to={path.register} className='text-red-500 ml-1'>
                  Đăng Ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
