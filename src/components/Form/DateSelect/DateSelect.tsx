import { range } from 'lodash'
import { useEffect, useState } from 'react'

interface DateSelectProps {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ onChange, value, errorMessage }: DateSelectProps) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 2003
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value: optionValue } = event.target

    const newDate = {
      ...date,
      [name]: Number(optionValue)
    }

    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
      <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Ngày sinh</div>
      <div className='sm:w-[80%] sm:pl-5'>
        <div className='flex justify-between'>
          <select
            name='date'
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3'
            onChange={handleChange}
            value={date.date}
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
          <select
            name='month'
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3'
            onChange={handleChange}
            value={date.month}
          >
            <option disabled>Tháng</option>
            {range(1, 13).map((month) => (
              <option key={month} value={month - 1}>
                {month}
              </option>
            ))}
          </select>
          <select
            name='year'
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3'
            onChange={handleChange}
            value={date.year}
          >
            <option disabled>Năm</option>
            <option disabled>Năm</option>
            {range(1900, new Date().getFullYear() + 1)
              .reverse()
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
        </div>
        <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
      </div>
    </div>
  )
}
