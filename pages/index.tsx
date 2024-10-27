import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import SearchBar from '../components/searchbar'
import Heatmap from '../components/heatmap'
import StockDrawdown from '../components/StockDrawdown'

type MonthlyReturn = {
  year: number
  month: number
  return: number
}

export default function Home() {
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [stockData, setStockData] = useState<MonthlyReturn[]>([])
  const [stockSymbol, setStockSymbol] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (symbol: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/stockData?symbol=${encodeURIComponent(symbol)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch stock data')
      }

      setStockData(data)
      setStockSymbol(symbol)
      setSearchPerformed(true)
    } catch (error) {
      console.error('Error fetching stock data:', error)
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
      setSearchPerformed(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>YOLOcharts</title>
        <meta name="description" content="Search and view stock data" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 sm:mb-0">
            YOLOcharts
          </h1>
          {searchPerformed && (
            <SearchBar onSearch={handleSearch} className="w-full sm:w-auto sm:max-w-md" />
          )}
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-8">
        {!searchPerformed ? (
          <div className="w-full max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 leading-tight py-2">
              Discover and analyze<br className="hidden sm:inline" /> global stocks with ease
            </h2>
            <SearchBar onSearch={handleSearch} className="w-full max-w-md mx-auto" />
            {error && <p className="mt-4 text-red-600">{error}</p>}
          </div>
        ) : (
          <div className="w-full max-w-6xl space-y-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">{stockSymbol} Analysis</h2>
            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-600">{error}</div>
            ) : (
              <>
                <div className="bg-white rounded-lg shadow-lg p-2 sm:p-4 md:p-6 overflow-x-auto">
                  <h3 className="text-lg font-semibold mb-2">Monthly Returns Heatmap</h3>
                  <Heatmap data={stockData} />
                </div>
                <StockDrawdown symbol={stockSymbol} />
              </>
            )}
          </div>
        )}
      </main>

      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} YOLOcharts. All rights reserved.
          </p>
          <div className="mt-2 space-y-2 sm:space-y-0">
            <Link href="/privacy" className="text-sm text-blue-600 hover:text-blue-800 mr-0 sm:mr-4 block sm:inline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-blue-600 hover:text-blue-800 block sm:inline">
              Terms of Service
            </Link>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Disclaimer: YOLOcharts is not a financial advisor. The information provided on this platform should not be considered as financial advice.
          </p>
        </div>
      </footer>
    </div>
  )
}