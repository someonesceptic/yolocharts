import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"

export default function Privacy() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-rose-100">
      <Head>
        <title>Privacy Policy - YoloTerminal</title>
        <meta name="description" content="YoloTerminal Privacy Policy" />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={32}
              height={32}
              className="w-auto mr-3 cursor-pointer"
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

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">1. Information We Collect</h2>
            <p className="leading-relaxed">
              When you use YoloTerminal, we collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information (email address, username)</li>
              <li>Usage data and preferences</li>
              <li>Stock symbols and watchlists you create</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold text-gray-800">2. How We Use Your Information</h2>
            <p className="leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process and complete transactions</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Understand user preferences and trends</li>
            </ul>
          </section>

          <section className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold text-gray-800">3. Information Sharing</h2>
            <p className="leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
              <li>With service providers who assist in our operations</li>
            </ul>
          </section>

          <section className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold text-gray-800">4. Data Security</h2>
            <p className="leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold text-gray-800">5. Cookies and Tracking</h2>
            <p className="leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold text-gray-800">6. Your Rights</h2>
            <p className="leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Export your data</li>
            </ul>
          </section>

          <section className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold text-gray-800">7. Children&apos;s Privacy</h2>
            <p className="leading-relaxed">
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </section>

          <section className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold text-gray-800">8. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the &quot;last updated&quot; date.
            </p>
          </section>

          <section className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold text-gray-800">9. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at support@yoloterminal.com
            </p>
          </section>
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
  )
}