import clsx from 'clsx'
import { createSearchParams, Link } from 'react-router-dom'
import path from 'src/constants/path'
import type { QueryConfig } from 'src/pages/ProductList/ProductList'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

/**
Với range = 2 áp dụng cho khoảng cách đầu, cuối và xung quanh current_page

[1] 2 3 ... 19 20
1 [2] 3 4 ... 19 20 
1 2 [3] 4 5 ... 19 20
1 2 3 [4] 5 6 ... 19 20
1 2 3 4 [5] 6 7 ... 19 20

1 2 ... 4 5 [6] 8 9 ... 19 20

1 2 ...13 14 [15] 16 17 ... 19 20


1 2 ... 14 15 [16] 17 18 19 20
1 2 ... 15 16 [17] 18 19 20
1 2 ... 16 17 [18] 19 20
1 2 ... 17 18 [19] 20
1 2 ... 18 19 [20]
 */

const RANGE = 2
export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const renderPagination = () => {
    const firstPage = 1
    const lastPage = pageSize

    let isRenderDot = true

    const renderDotBefore = (index: number) => {
      if (!isRenderDot) {
        return null
      }
      isRenderDot = false
      return (
        <span key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 border'>
          ...
        </span>
      )
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        let minPage = page - RANGE
        let maxPage = page + RANGE

        if (
          (pageNumber <= maxPage && pageNumber >= minPage) ||
          pageNumber <= firstPage + RANGE ||
          pageNumber >= lastPage - RANGE
        ) {
          if (pageNumber <= maxPage && pageNumber >= minPage) {
            isRenderDot = true
          }
          return (
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: pageNumber.toString()
                }).toString()
              }}
              key={index}
              className={clsx('bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border', {
                'border-blue-600': pageNumber === page,
                'border-transparent': pageNumber !== page
              })}
            >
              {pageNumber}
            </Link>
          )
        }

        return renderDotBefore(index)
      })
  }
  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      {page === 1 ? (
        <span className='bg-white/60 cursor-not-allowed rounded px-3 py-2 shadow-sm mx-2 border'>Prev</span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
        >
          Prev
        </Link>
      )}
      {renderPagination()}
      {page === pageSize ? (
        <span className='bg-white/60 cursor-not-allowed rounded px-3 py-2 shadow-sm mx-2 border'>Next</span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
        >
          Next
        </Link>
      )}
    </div>
  )
}
