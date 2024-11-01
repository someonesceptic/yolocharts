import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"

const Terms = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-rose-100">
      <Head>
        <title>Terms of Service - YoloTerminal</title>
        <meta name="description" content="YoloTerminal Terms of Service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="YoloTerminal Logo" 
              width={32}
              height={32}
              className="mr-3 cursor-pointer"
              onClick={() => router.push("/")}
              priority
            />
            <h1 
              onClick={() => router.push("/")}
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600 cursor-pointer"
            >
              YoloTerminal
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b">Terms of Service</h1>

          <div className="space-y-6 text-gray-600">
            <div className="text-sm text-gray-500 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </div>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing or using YoloTerminal, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">2. Description of Service</h2>
              <p className="leading-relaxed">
                YoloTerminal provides a platform for users to search and view stock data. We do not provide financial advice or recommendations.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">3. User Responsibilities</h2>
              <p className="leading-relaxed">
                You are responsible for your use of the service and for any consequences thereof. You agree not to misuse the service or help anyone else do so.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">4. Intellectual Property</h2>
              <p className="leading-relaxed">
                The content, organization, graphics, design, and other matters related to YoloTerminal are protected under applicable copyrights and other proprietary laws.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">5. Disclaimer of Warranties</h2>
              <p className="leading-relaxed">
                YoloTerminal is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, and hereby disclaim all warranties.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">6. Limitation of Liability</h2>
              <p className="leading-relaxed">
                In no event shall YoloTerminal be liable for any indirect, incidental, special, consequential or punitive damages.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">7. Financial Disclaimer</h2>
              <p className="leading-relaxed">
                YoloTerminal is not a financial advisor. The information provided is for informational purposes only and should not be considered as financial advice.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t">
            <Link 
              href="/"
              className="inline-flex items-center text-red-600 hover:text-red-800 transition-colors duration-200"
            >
              ← Return to Home
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} YoloTerminal. All rights reserved.
          </p>
          <div className="mt-2">
            <Link 
              href="/privacy"
              className="text-sm text-red-600 hover:text-red-800 mr-4"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms"
              className="text-sm text-red-600 hover:text-red-800"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Terms