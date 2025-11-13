import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { registerAccount } from 'src/apis/auth.api'
import FormInput from 'src/components/Form/FormInput'
import schema from 'src/utils/rules'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import type { ErrorResponse } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context.tsx'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import { getProfile } from 'src/utils/profile'

interface FormData {
  email: string
  password: string
  password_confirmation: string
}

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'password_confirmation'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit(
    (data) => {
      const body = omit(data, ['password_confirmation'])
      registerAccountMutation.mutate(body, {
        onSuccess(data) {
          setIsAuthenticated(true)
          setProfile(getProfile())
          navigate(path.home)
        },
        onError(error) {
          if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'password_confirmation'>>>(error)) {
            const formError = error.response?.data.data

            if (formError) {
              Object.keys(formError).forEach((key) => {
                setError(key as keyof Omit<FormData, 'password_confirmation'>, {
                  type: 'server',
                  message: formError[key as keyof Omit<FormData, 'password_confirmation'>]
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
              <div className='text-2xl'>Đăng Ký</div>
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
              <FormInput
                id='password_confirmation'
                type='password'
                className='mt-3'
                name='password_confirmation'
                placeholder='Xác nhận mật khẩu'
                register={register}
                errorMessage={errors.password_confirmation?.message}
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex items-center justify-center'
                  isLoading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}
                >
                  Đăng Ký
                </Button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-slate-400'>Bạn đã có tài khoản? </span>
                <Link to={path.login} className='text-red-500 ml-1'>
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
