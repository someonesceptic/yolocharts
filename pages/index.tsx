import { useRouter } from 'next/router'
import Head from 'next/head'
import SearchBar from '../components/searchbar'

export default function Home() {
  const router = useRouter()
  const handleSearch = async (symbol: string) => {
    router.push(`/${symbol}`)
  }
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-rose-100">
      <Head>
        <title>YoloTerminal</title>
        <meta name="description" content="Search and view stock data" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <img 
              src="/logo.png" 
              alt="YoloTerminal Logo" 
              className="h-8 w-auto mr-3"
            />
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">
              YoloTerminal
            </h1>
          </div>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600 mb-12 leading-tight py-2 relative z-0">
            Discover and analyze<br className="hidden sm:inline" /> global stocks
          </h2>
          <div className="relative z-10">
            <SearchBar onSearch={handleSearch} className="w-full max-w-xl mx-auto" />
          </div>
        </div>
      </main>
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