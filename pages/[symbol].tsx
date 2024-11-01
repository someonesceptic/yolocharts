import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import SearchBar from '@/components/searchbar'
import Heatmap from '@/components/heatmap'
import TipBanner from '@/components/TipBanner'

type MonthlyReturn = {
  year: number
  month: number
  return: number
}

export default function StockPage() {
  const router = useRouter()
  const [stockData, setStockData] = useState<MonthlyReturn[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Effect for fetching data
  useEffect(() => {
    const fetchData = async () => {
      if (!router.query.symbol) return

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/stockData?symbol=${encodeURIComponent(router.query.symbol.toString())}`)
        const data = await response.json()

        if ('error' in data) {
          throw new Error(data.error)
        }

        setStockData(data)
      } catch (err) {
        console.error('Error fetching stock data:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    if (router.isReady) {
      fetchData()
    }
  }, [router.isReady, router.query.symbol])

  const handleSearch = (newSymbol: string) => {
    router.push(`/${newSymbol}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-rose-100">
      <Head>
        <title>
          {router.query.symbol ? `${router.query.symbol.toString().toUpperCase()} - Stock Analysis` : 'Stock Analysis'}
        </title>
      </Head>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-8 w-auto mr-3 cursor-pointer"
              onClick={() => router.push('/')}
            />
            <h1 
              onClick={() => router.push('/')} 
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600 cursor-pointer"
            >
              YoloTerminal
            </h1>
          </div>
          <SearchBar onSearch={handleSearch} className="w-full sm:w-auto sm:max-w-md" />
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {router.query.symbol && (
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {router.query.symbol.toString().toUpperCase()} Analysis
            </h2>
          )}

          <div className="flex justify-center">
            <div className="w-full max-w-6xl">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-lg">Loading...</div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-red-600">{error}</div>
                </div>
              ) : stockData.length > 0 ? (
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 overflow-x-auto">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Monthly Returns Heatmap</h3>
                    <p className="text-sm text-gray-600">Historical monthly returns analysis</p>
                  </div>
                  <Heatmap data={stockData} />
                </div>
              ) : (
                <div className="flex items-center justify-center py-12">
                  <div className="text-gray-600">No data available</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <TipBanner />

      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} YoloTerminal. All rights reserved.
          </p>
          <div className="mt-2 space-y-2 sm:space-y-0">
            <a href="/privacy" className="text-sm text-red-600 hover:text-red-800 mr-0 sm:mr-4 block sm:inline">
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm text-red-600 hover:text-red-800 block sm:inline">
              Terms of Service
            </a>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Disclaimer: YoloTerminal is not a financial advisor. The information provided on this platform should not be considered as financial advice.
          </p>
        </div>
      </footer>
    </div>
  )
}