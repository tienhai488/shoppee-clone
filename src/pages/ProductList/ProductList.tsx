import AsideFilter from '../../components/AsideFilter'
import Product from '../../components/Product/Product'
import SortProductList from '../../components/SortProductList'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import type { ProductListConfig } from 'src/types/product.type'
import categoryApi from 'src/apis/category.api'
import useQueryConfig from 'src/hooks/useQueryConfig'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryConfig = useQueryConfig()

  const productListQuery = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    placeholderData: (previousData) => previousData
  })

  const categoryListQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  console.log('categories', categoryListQuery.data?.data.data)

  console.log('queryConfig', queryConfig)
  console.log(productListQuery.data?.data)
  console.log('page size', productListQuery.data?.data.data.pagination.page_size)

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter queryConfig={queryConfig} categories={categoryListQuery.data?.data.data ?? []} />
          </div>
          <div className='col-span-9'>
            <SortProductList
              queryConfig={queryConfig}
              pageSize={productListQuery.data?.data.data.pagination.page_size ?? 1}
            />
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {productListQuery.data?.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
            <Pagination
              queryConfig={queryConfig}
              pageSize={productListQuery.data?.data.data.pagination.page_size ?? 1}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
