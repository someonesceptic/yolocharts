import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/components/searchbar';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleSearch = (symbol: string) => {
    router.push(`/${symbol}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-rose-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={32}
              height={32}
              className="h-8 w-auto mr-3 cursor-pointer"
              onClick={() => router.push('/')}
              priority
            />
            <h1 
              onClick={() => router.push('/')} 
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600 cursor-pointer"
            >
              YoloTerminal
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center min-h-[calc(100vh-300px)]">
            <div className="w-full max-w-2xl text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Stock Market Analysis
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Search for any stock symbol to view detailed analysis and performance metrics
              </p>
              <SearchBar onSearch={handleSearch} className="w-full max-w-xl mx-auto" />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} YoloTerminal. All rights reserved.
          </p>
          <div className="mt-2 space-y-2 sm:space-y-0">
            <Link 
              href="/privacy" 
              className="text-sm text-red-600 hover:text-red-800 mr-0 sm:mr-4 block sm:inline"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-sm text-red-600 hover:text-red-800 block sm:inline"
            >
              Terms of Service
            </Link>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Disclaimer: YoloTerminal is not a financial advisor. The information provided on this platform should not be considered as financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
}