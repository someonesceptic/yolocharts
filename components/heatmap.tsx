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

const getColorStyle = (value: number | null) => {
  if (value === null) return { backgroundColor: '#f3f4f6' } // Light gray for null values
  if (value === 0) return { backgroundColor: '#ffffff' } // White for zero

  const intensity = Math.min(Math.abs(value) * 5, 1) // Adjust multiplier for color intensity

  let red, green, blue
  if (value > 0) {
    // More visible green gradient
    red = Math.round(255 - (100 * intensity))
    green = Math.round(255 - (20 * intensity))
    blue = Math.round(255 - (100 * intensity))
  } else {
    // More visible red gradient
    red = Math.round(255 - (20 * intensity))
    green = Math.round(255 - (100 * intensity))
    blue = Math.round(255 - (100 * intensity))
  }

  return {
    backgroundColor: `rgb(${red}, ${green}, ${blue})`,
    color: intensity > 0.6 ? '#ffffff' : '#000000', // Ensure text is readable
  }
}

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
      const annualReturn = monthlyReturns.reduce((acc, curr) => acc * (1 + (curr || 0)), 1) - 1
      return { year, values: [...monthlyReturns, annualReturn] }
    })
  }, [data])

  const calculateStats = (index: number) => {
    const values = processedData.map(row => row.values[index]).filter(v => v !== null) as number[]
    const median = values.sort((a, b) => a - b)[Math.floor(values.length / 2)]
    const mean = values.reduce((acc, curr) => acc + curr, 0) / values.length
    const sd = Math.sqrt(values.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / values.length)
    return { median, sd, mean }
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
                {median.toFixed(1)}%
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-3 font-semibold text-gray-600">SD</td>
            {stats.map(({ sd }, index) => (
              <td key={index} className="p-3 text-center" style={getColorStyle(sd)}>
                {sd.toFixed(1)}%
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-3 font-semibold text-gray-600">Avg</td>
            {stats.map(({ mean }, index) => (
              <td key={index} className="p-3 text-center" style={getColorStyle(mean)}>
                {mean.toFixed(1)}%
              </td>
            ))}
          </tr>
          {processedData.map((row) => (
            <tr key={row.year}>
              <td className="p-3 font-semibold text-gray-600">{row.year}</td>
              {row.values.map((value, index) => (
                <td key={index} className="p-3 text-center" style={getColorStyle(value)}>
                  {value !== null ? `${(value * 100).toFixed(1)}%` : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}