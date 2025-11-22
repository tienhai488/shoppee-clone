import { useState } from 'react'
import InputNumber, { type InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (quantity: number) => void
  onDecrease?: (quantity: number) => void
  onType?: (quantity: number) => void
  classNameWrapper?: string
}

export default function QuantityControl({
  max,
  onIncrease,
  onDecrease,
  onType,
  classNameWrapper = 'ml-10',
  value,
  ...rest
}: Props) {
  const [localValue, setLocalValue] = useState<number>(Number(value) || 1)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = Number(event.target.value)

    if (isNaN(newValue) || newValue < 1) {
      newValue = 1
    } else if (max !== undefined && newValue > max) {
      newValue = max
    }

    onType && onType(newValue)
  }

  const handleIncrease = () => {
    let newValue = Number(value || localValue) + 1
    if (max !== undefined && newValue > max) {
      newValue = max
    }
    onIncrease && onIncrease(newValue)
  }

  const handleDecrease = () => {
    let newValue = Number(value || localValue) - 1
    if (newValue < 1) {
      newValue = 1
    }
    onDecrease && onDecrease(newValue)
  }

  return (
    <div className={`${classNameWrapper} flex items-center`}>
      <button
        className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600 cursor-pointer'
        onClick={handleDecrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
        </svg>
      </button>
      <InputNumber
        className=''
        classNameError='hidden'
        classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
        value={value || localValue}
        onChange={handleChange}
        {...rest}
      />
      <button
        className='flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600 cursor-pointer'
        onClick={handleIncrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}
