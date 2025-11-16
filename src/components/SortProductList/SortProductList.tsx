import { sortBy, orderType } from 'src/constants/product'
import type { QueryConfig } from '../../pages/ProductList/ProductList'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import clsx from 'clsx'
import { omit } from 'lodash'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const { sort_by = sortBy.view, order } = queryConfig
  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: string) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortBy: string) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy
      }).toString()
    })
  }

  const handlePriceOrder = (orderValue: string) => {
    if (!orderValue) {
      navigate({
        pathname: path.home,
        search: createSearchParams({
          ...omit(queryConfig, 'order'),
          sort_by: sortBy.view
        }).toString()
      })
      return
    }
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex items-center flex-wrap justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={clsx('h-8 px-4 capitalize text-sm text-center cursor-pointer', {
              'bg-orange-600 text-white': isActiveSortBy(sortBy.view),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={clsx('h-8 px-4 capitalize text-sm text-center cursor-pointer', {
              'bg-orange-600 text-white': isActiveSortBy(sortBy.createdAt),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={clsx('h-8 px-4 capitalize text-sm text-center cursor-pointer', {
              'bg-orange-600 text-white': isActiveSortBy(sortBy.sold),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            className={clsx('h-8  px-4 text-left text-sm capitalize outline-none ', {
              'bg-orange-600 text-white hover:bg-orange/80': isActiveSortBy(sortBy.price),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.price)
            })}
            defaultValue={order}
            onChange={(e) => handlePriceOrder(e.target.value)}
          >
            <option value={''} selected={!order} className='bg-white text-black'>
              Mặc định
            </option>
            <option value={orderType.asc} selected={order === orderType.asc} className='bg-white text-black'>
              Giá: Thấp đến cao
            </option>
            <option value={orderType.desc} selected={order === orderType.desc} className='bg-white text-black'>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange-600'>1</span>
            <span>/2</span>
          </div>
          <div className='ml-2'>
            <button className='px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed shadow'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='shadow px-3 h-8 rounded-tr-sm rounded-br-sm bg-white hover:bg-slate-100 '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
