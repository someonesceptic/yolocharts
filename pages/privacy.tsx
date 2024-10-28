import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Privacy() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-rose-100">
      <Head>
        <title>Privacy Policy - YoloTerminal</title>
        <meta name="description" content="YoloTerminal Privacy Policy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <img 
              src="/logo.png" 
              alt="YoloTerminal Logo" 
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
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b">Privacy Policy</h1>

          <div className="space-y-6 text-gray-600">
            <div className="text-sm text-gray-500 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </div>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">1. Introduction</h2>
              <p className="leading-relaxed">
                Welcome to YoloTerminal. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">2. Information We Collect</h2>
              <p className="leading-relaxed">
                We collect information you provide directly to us, such as when you create an account or use our services. This may include your name, email address, and search queries.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">3. How We Use Your Information</h2>
              <p className="leading-relaxed">
                We use the information we collect to operate, maintain, and provide the features and functionality of YoloTerminal, as well as to communicate with you.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">4. Data Security</h2>
              <p className="leading-relaxed">
                We implement reasonable precautions to protect the security of your information. However, no data transmission over the Internet or electronic storage is fully secure, so we cannot guarantee absolute security.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">5. Third-Party Links</h2>
              <p className="leading-relaxed">
                Our service may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">6. Changes to This Privacy Policy</h2>
              <p className="leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">7. Disclaimer</h2>
              <p className="leading-relaxed">
                YoloTerminal is not a financial advisor, and the information provided on this platform should not be considered as financial advice. We are not liable for any financial decisions or actions taken based on the information provided through our service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">8. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at privacy@yoloterminal.com.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t">
            <Link 
              href="/" 
              className="inline-flex items-center text-red-600 hover:text-red-800 transition-colors duration-200"
            >
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
              Return to Home
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
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