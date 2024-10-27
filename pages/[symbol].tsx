import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import SearchBar from '../components/searchbar'
import Heatmap from '../components/heatmap'

type MonthlyReturn = {
  year: number
  month: number
  return: number
}

export default function StockPage() {
  const router = useRouter()
  const { symbol } = router.query
  const [stockData, setStockData] = useState<MonthlyReturn[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!symbol) return // Return early if no symbol

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/stockData?symbol=${encodeURIComponent(symbol.toString())}`)
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to fetch stock data')
        }

        const data = await response.json()
        setStockData(data)
      } catch (err) {
        console.error('Error fetching stock data:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    if (symbol) fetchData()
  }, [symbol])

  const handleSearch = async (newSymbol: string) => {
    router.push(`/${newSymbol}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>{symbol ? `${symbol.toString()} - YOLOcharts` : 'YOLOcharts'}</title>
        <meta name="description" content={`Stock analysis for ${symbol}`} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <h1 
            onClick={() => router.push('/')} 
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 sm:mb-0 cursor-pointer"
          >
            YOLOcharts
          </h1>
          <SearchBar onSearch={handleSearch} className="w-full sm:w-auto sm:max-w-md" />
        </div>
      </header>

      <main className="flex-grow px-4 py-8">
        <div className="w-full max-w-6xl mx-auto space-y-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
            {symbol && `${symbol.toString()} Analysis`}
          </h2>
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : stockData.length > 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-2 sm:p-4 md:p-6 overflow-x-auto">
              <h3 className="text-lg font-semibold mb-2">Monthly Returns Heatmap</h3>
              <Heatmap data={stockData} />
            </div>
          ) : (
            <div className="text-center py-8">No data available</div>
          )}
        </div>
      </main>

      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} YOLOcharts. All rights reserved.
          </p>
          <div className="mt-2 space-y-2 sm:space-y-0">
            <a href="/privacy" className="text-sm text-blue-600 hover:text-blue-800 mr-0 sm:mr-4 block sm:inline">
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm text-blue-600 hover:text-blue-800 block sm:inline">
              Terms of Service
            </a>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Disclaimer: YOLOcharts is not a financial advisor. The information provided on this platform should not be considered as financial advice.
          </p>
        </div>
      </footer>
    </div>
  )
}