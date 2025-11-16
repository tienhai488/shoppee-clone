import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import FormInput from 'src/components/Form/FormInput'
import path from 'src/constants/path'
import type { QueryConfig } from '../../pages/ProductList/ProductList'
import type { Category } from 'src/types/category.type'
import clsx from 'clsx'
import { schema, type Schema } from 'src/utils/rules'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputNumber from 'src/components/InputNumber'
import RatingStars from 'src/components/RatingStars'
import { omit } from 'lodash'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

// type FormData = NoUndefinedField<Pick<Schema, 'price_min' | 'price_max'>>
type FormData = Pick<Schema, 'price_min' | 'price_max'>
const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ queryConfig, categories }: Props) {
  const isActiveCategory = (categoryId: string) => queryConfig.category === categoryId
  const {
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema)
  })
  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min || '',
        price_max: data.price_max || ''
      }).toString()
    })
  })

  const handleRemoveAll = () => {
    reset()
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...omit(queryConfig, ['category', 'price_max', 'price_min', 'rating'])
      }).toString()
    })
  }

  return (
    <div className='p-4'>
      <Link to={path.home} className='flex items-center font-bold'>
        <svg viewBox='0 0 12 10' className='w-3 h-4 mr-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <ul>
        {categories.map((category) => (
          <li className='py-2 pl-2' key={category._id}>
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  category: category._id
                }).toString()
              }}
              className={clsx('relative px-2', {
                'text-orange-600 font-semibold': isActiveCategory(category._id)
              })}
            >
              {isActiveCategory(category._id) && (
                <svg viewBox='0 0 4 7' className='fill-orange h-2 w-2 absolute top-1 -left-2.5'>
                  <polygon points='4 3.5 0 0 0 7' />
                </svg>
              )}
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link to={path.home} className='flex items-center font-bold mt-4 uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='w-3 h-4 fill-current stroke-current mr-3'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <div className='my-5'>
        <div>Khoảng giá</div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='₫ TỪ'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                  />
                )
              }}
            />
            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='₫ ĐẾN'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                  />
                )
              }}
            />
          </div>
          <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div>
          <Button className='w-full p-2 uppercase bg-orange-600 text-white text-sm hover:bg-orange/80 flex justify-center items-center cursor-pointer'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <div className='text-sm'>Đánh giá</div>
      <RatingStars queryConfig={queryConfig} />
      <div className='bg-gray-300 h-[1px] my-4' />
      <Button
        className='w-full p-2 uppercase bg-orange-600 text-white text-sm hover:bg-orange/80 flex justify-center items-center cursor-pointer'
        onClick={handleRemoveAll}
      >
        Xóa tất cả
      </Button>
    </div>
  )
}
