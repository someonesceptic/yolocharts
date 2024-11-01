import React, { useMemo } from 'react'

type MonthlyReturn = {
  year: number
  month: number
  return: number
}

type HeatmapProps = {
  data: MonthlyReturn[]
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Annual']

export default function Heatmap({ data }: HeatmapProps) {
  const processedData = useMemo(() => {
    const yearMap = new Map<number, number[]>()
    data.forEach(({ year, month, return: monthReturn }) => {
      if (!yearMap.has(year)) {
        yearMap.set(year, Array(12).fill(null))
      }
      yearMap.get(year)![month - 1] = monthReturn
    })

    const sortedYears = Array.from(yearMap.keys()).sort((a, b) => b - a)
    return sortedYears.map(year => {
      const monthlyReturns = yearMap.get(year)!
      const annualReturn = monthlyReturns.reduce((acc, curr) => {
        if (curr === null) return acc
        return acc * (1 + (curr / 100))
      }, 1) - 1
      return {
        year,
        values: [...monthlyReturns, Number((annualReturn * 100).toFixed(2))]
      }
    })
  }, [data])

  const calculateStats = (index: number) => {
    const values = processedData.map(row => row.values[index]).filter(v => v !== null) as number[]
    if (values.length === 0) return { median: 0, sd: 0, mean: 0 }

    values.sort((a, b) => a - b)
    const median = values[Math.floor(values.length / 2)]
    const mean = values.reduce((acc, curr) => acc + curr, 0) / values.length
    const sd = Math.sqrt(values.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / values.length)
    return { 
      median: Number(median.toFixed(2)),
      sd: Number(sd.toFixed(2)),
      mean: Number(mean.toFixed(2))
    }
  }

  const stats = months.map((_, index) => calculateStats(index))

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 font-semibold text-left text-gray-600"></th>
            {months.map((month) => (
              <th key={month} className="p-3 font-semibold text-gray-600">
                {month}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 font-semibold text-gray-600">Median</td>
            {stats.map(({ median }, index) => (
              <td key={index} className="p-3 text-center" style={getColorStyle(median)}>
                {median.toFixed(2)}%
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-3 font-semibold text-gray-600">SD</td>
            {stats.map(({ sd }, index) => (
              <td key={index} className="p-3 text-center" style={getColorStyle(sd)}>
                {sd.toFixed(2)}%
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-3 font-semibold text-gray-600">Avg</td>
            {stats.map(({ mean }, index) => (
              <td key={index} className="p-3 text-center" style={getColorStyle(mean)}>
                {mean.toFixed(2)}%
              </td>
            ))}
          </tr>
          {processedData.map((row) => (
            <tr key={row.year}>
              <td className="p-3 font-semibold text-gray-600">{row.year}</td>
              {row.values.map((value, index) => (
                <td key={index} className="p-3 text-center" style={getColorStyle(value)}>
                  {value !== null ? `${value.toFixed(2)}%` : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const getColorStyle = (value: number | null) => {
  if (value === null) return { backgroundColor: '#f3f4f6' }
  if (value === 0) return { backgroundColor: '#ffffff' }

  const intensity = Math.min(Math.abs(value) / 10, 1)

  let red, green, blue
  if (value > 0) {
    red = Math.round(255 - (100 * intensity))
    green = Math.round(255 - (20 * intensity))
    blue = Math.round(255 - (100 * intensity))
  } else {
    red = Math.round(255 - (20 * intensity))
    green = Math.round(255 - (100 * intensity))
    blue = Math.round(255 - (100 * intensity))
  }

  return {
    backgroundColor: `rgb(${red}, ${green}, ${blue})`,
    color: intensity > 0.6 ? '#ffffff' : '#000000',
  }
}