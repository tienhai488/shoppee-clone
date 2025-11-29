import { useMutation, useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import purchaseApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import QuantityControl from 'src/components/QuantityControl'
import { PURCHASE_STATUS } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'
import { formatCurrency, getProductDetailUrl } from 'src/utils/utils'

export default function Cart() {
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
  const location = useLocation()

  const purchasesInCart = useQuery({
    queryKey: ['purchases', { status: PURCHASE_STATUS.IN_CART }],
    queryFn: () => {
      return purchaseApi.getPurchases({ status: PURCHASE_STATUS.IN_CART })
    }
  })
  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: (data) => {
      purchasesInCart.refetch()
      console.log(data)
      toast.success('Cập nhật giỏ hàng thành công')
    }
  })
  const buyPurcharsesMutation = useMutation({
    mutationFn: purchaseApi.buyPurchases,
    onSuccess: (data) => {
      purchasesInCart.refetch()
      toast.success(data.data.message, { autoClose: 1000 })
    }
  })
  const deletePurcharsesMutation = useMutation({
    mutationFn: purchaseApi.deletePurchases,
    onSuccess: (data) => {
      purchasesInCart.refetch()
      toast.success(data.data.message, { autoClose: 1000 })
    }
  })

  const isAllChecked = useMemo(() => {
    return extendedPurchases.length > 0 && extendedPurchases.every((purchase) => purchase.checked)
  }, [extendedPurchases])

  const purchases = purchasesInCart.data?.data.data || []
  const checkedCount = useMemo(() => {
    return extendedPurchases.filter((purchase) => purchase.checked).length
  }, [extendedPurchases])
  const subTotal = useMemo(() => {
    return extendedPurchases
      .filter((purchase) => purchase.checked)
      .reduce((result, purchase) => result + purchase.product.price * purchase.buy_count, 0)
  }, [extendedPurchases])
  const savings = useMemo(() => {
    return extendedPurchases
      .filter((purchase) => purchase.checked)
      .reduce(
        (result, purchase) =>
          result + (purchase.product.price_before_discount - purchase.product.price) * purchase.buy_count,
        0
      )
  }, [extendedPurchases])

  useEffect(() => {
    const productIdBuyNow = location.state?.productIdBuyNow
    setExtendedPurchases((prev) =>
      purchases.map((purchase, index) => ({
        ...purchase,
        checked: productIdBuyNow === purchase.product._id || prev[index]?.checked || false,
        disable: prev[index]?.disable || false
      }))
    )
    location.state = null
  }, [purchases])

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked
      }))
    )
  }

  const handleChange = (purchaseIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setExtendedPurchases((prev) =>
      prev.map((purchase, index) => {
        if (index === purchaseIndex) return { ...purchase, checked }
        return purchase
      })
    )
  }

  const handleTypeQuantity = (quantity: number, purchaseIndex: number) => {
    setExtendedPurchases((prev) =>
      prev.map((purchase, index) => {
        if (index === purchaseIndex) return { ...purchase, buy_count: quantity }
        return purchase
      })
    )
  }

  const handleChangeQuantity = (quantity: number, purchaseIndex: number, canChange: boolean) => {
    console.log(
      quantity,
      purchaseIndex,
      canChange,
      extendedPurchases[purchaseIndex].buy_count,
      purchases[purchaseIndex].buy_count
    )

    if (!canChange) return

    setExtendedPurchases((prev) =>
      prev.map((purchase, index) => {
        if (index === purchaseIndex) return { ...purchase, buy_count: quantity }
        return purchase
      })
    )
    updatePurchaseMutation.mutate({
      product_id: extendedPurchases[purchaseIndex].product._id,
      buy_count: quantity
    })
  }

  const handleDelete = (purchaseId: string) => {
    deletePurcharsesMutation.mutate([purchaseId])
  }

  const handleDeleteAll = () => {
    const purchaseIds = extendedPurchases.filter((purchase) => purchase.checked).map((purchase) => purchase._id)
    deletePurcharsesMutation.mutate(purchaseIds)
  }

  const handleBuyPurchases = () => {
    if (checkedCount === 0) return
    const body = extendedPurchases
      .filter((purchase) => purchase.checked)
      .map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
    buyPurcharsesMutation.mutate(body)
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container mx-auto'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-orange cursor-pointer'
                      onChange={handleCheckAll}
                      checked={isAllChecked}
                    />
                  </div>
                  <div className='grow text-black'>Sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>
            <div className='my-3 rounded-sm bg-white p-5 shadow'>
              {extendedPurchases?.map((purchase, index) => (
                <div
                  key={purchase._id}
                  className='mb-5 grid grid-cols-12 rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'
                >
                  <div className='col-span-6'>
                    <div className='flex'>
                      <div className='flex shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange cursor-pointer'
                          onChange={handleChange(index)}
                          checked={purchase.checked}
                        />
                      </div>
                      <div className='grow'>
                        <div className='flex'>
                          <Link
                            className='h-20 w-20 shrink-0'
                            to={getProductDetailUrl(purchase.product.name, purchase.product._id)}
                          >
                            <img alt={purchase.product.name} src={purchase.product.image} />
                          </Link>
                          <div className='grow px-2 pt-1 pb-2'>
                            <Link
                              className='line-clamp-2 text-left'
                              to={getProductDetailUrl(purchase.product.name, purchase.product._id)}
                            >
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 items-center'>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center'>
                          <span className='text-gray-300 line-through'>
                            ₫{formatCurrency(purchase.product.price_before_discount)}
                          </span>
                          <span className='ml-3'>₫{formatCurrency(purchase.product.price)}</span>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <QuantityControl
                          max={purchase.product.quantity}
                          value={purchase.buy_count}
                          classNameWrapper='flex items-center'
                          onIncrease={(value) =>
                            handleChangeQuantity(
                              value,
                              index,
                              value <= purchase.product.quantity && value !== purchases[index].buy_count
                            )
                          }
                          onDecrease={(value) =>
                            handleChangeQuantity(value, index, value > 0 && value !== purchases[index].buy_count)
                          }
                          onType={(value) => handleTypeQuantity(value, index)}
                          onFocusOut={(value) =>
                            handleChangeQuantity(
                              value,
                              index,
                              value > 0 && value <= purchase.product.quantity && value !== purchases[index].buy_count
                            )
                          }
                          disabled={purchase.disable}
                        />
                      </div>
                      <div className='col-span-1'>
                        <span className='text-orange'>
                          ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                        </span>
                      </div>
                      <div className='col-span-1'>
                        <button
                          className='bg-none text-black transition-colors hover:text-orange cursor-pointer'
                          onClick={() => handleDelete(purchase._id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
          <div className='flex items-center'>
            <div className='flex shrink-0 items-center justify-center pr-3'>
              <input
                type='checkbox'
                className='h-5 w-5 accent-orange cursor-pointer'
                checked={isAllChecked}
                onChange={handleCheckAll}
              />
            </div>
            <button className='mx-3 border-none bg-none'>Chọn tất cả ({purchases.length} sản phẩm)</button>

            {checkedCount > 0 && (
              <button className='mx-3 border-none bg-none cursor-pointer' onClick={handleDeleteAll}>
                Xóa ({checkedCount} sản phẩm)
              </button>
            )}
          </div>

          <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div>Tổng thanh toán ({checkedCount} sản phẩm):</div>
                <div className='ml-2 text-2xl text-orange'>₫{formatCurrency(subTotal)}</div>
              </div>
              <div className='flex items-center text-sm sm:justify-end'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-orange'>₫{formatCurrency(savings)}</div>
              </div>
            </div>
            <Button
              className={clsx({
                'bg-gray-300 hover:bg-gray-300 cursor-not-allowed': checkedCount === 0,
                'mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0 cursor-pointer': true
              })}
              onClick={handleBuyPurchases}
              disabled={checkedCount === 0}
            >
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
