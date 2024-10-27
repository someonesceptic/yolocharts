import { useRouter } from 'next/router'
import Head from 'next/head'
import SearchBar from '../components/searchbar'

export default function Home() {
  const router = useRouter()

  const handleSearch = async (symbol: string) => {
    router.push(`/${symbol}`)
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
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            YOLOcharts
          </h1>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 leading-tight py-2">
            Discover and analyze<br className="hidden sm:inline" /> global stocks with ease
          </h2>
          <SearchBar onSearch={handleSearch} className="w-full max-w-md mx-auto" />
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