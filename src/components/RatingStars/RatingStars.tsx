import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import path from 'src/constants/path'
import type { QueryConfig } from 'src/pages/ProductList/ProductList'

interface Props {
  queryConfig: QueryConfig
}

export default function RatingStars({ queryConfig }: Props) {
  const ratingFiler = Number(queryConfig.rating_filter)

  const isActive = (star: number) => {
    return star === ratingFiler
  }

  return (
    <ul className='my-3'>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          const star = 5 - index
          return (
            <li className='py-1 pl-2' key={index}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    rating_filter: star.toString()
                  }).toString()
                }}
                className={clsx('flex items-center text-sm relative px-2', {
                  'text-orange-600 font-semibold': isActive(star)
                })}
              >
                {isActive(star) && (
                  <svg
                    viewBox='0 0 4 7'
                    className='fill-orange h-2 w-2 absolute left-0 left-[-5px] bottom-[50%] translate-y-1/2'
                  >
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {Array(5)
                  .fill(0)
                  .map((_, indexStar) =>
                    indexStar + 1 > star ? (
                      <svg viewBox='0 0 30 30' className='mr-1 h-4 w-4' key={indexStar}>
                        <defs>
                          <linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
                            <stop offset='0%' stopColor='#FFD211' />
                            <stop offset='100%' stopColor='#FFAD27' />
                          </linearGradient>
                        </defs>
                        <path
                          fill='none'
                          fillRule='evenodd'
                          stroke='url(#star__hollow)'
                          strokeWidth={2}
                          d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                        />
                      </svg>
                    ) : (
                      <svg viewBox='0 0 9.5 8' className='w-4 h-4 mr-1' key={indexStar}>
                        <defs>
                          <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                            <stop offset={0} stopColor='#ffca11' />
                            <stop offset={1} stopColor='#ffad27' />
                          </linearGradient>
                          <polygon
                            id='ratingStar'
                            points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                          />
                        </defs>
                        <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                          <g transform='translate(-876 -1270)'>
                            <g transform='translate(155 992)'>
                              <g transform='translate(600 29)'>
                                <g transform='translate(10 239)'>
                                  <g transform='translate(101 10)'>
                                    <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    )
                  )}
                <span>Trở lên</span>
              </Link>
            </li>
          )
        })}
    </ul>
  )
}
