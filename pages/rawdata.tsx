import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import SearchBar from '../components/searchbar'

type RawDataPoint = {
  datetime: string
  open: string
  high: string
  low: string
  close: string
}

export default function RawData() {
  const router = useRouter()
  const [rawData, setRawData] = useState<RawDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [symbol, setSymbol] = useState<string>('')

  useEffect(() => {
    const fetchRawData = async () => {
      if (!router.query.symbol) return

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/stockData?symbol=${encodeURIComponent(router.query.symbol.toString())}`)
        const data = await response.json()

        if ('error' in data) {
          throw new Error(data.error)
        }

        setSymbol(router.query.symbol.toString().toUpperCase())
        // Display the returned data in a table
        setRawData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRawData()
  }, [router.query.symbol])

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Raw Stock Data</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {isLoading && (
          <div className="text-center py-8">Loading data...</div>
        )}

        {error && (
          <div className="text-center text-red-600 py-8">
            Error: {error}
          </div>
        )}

        {rawData.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Raw Data for {symbol}</h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Month
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Return
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rawData.map((dataPoint) => (
                    <tr key={`${dataPoint.year}-${dataPoint.month}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {dataPoint.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {dataPoint.month}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {dataPoint.return.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}