          import Head from "next/head"
          import Link from "next/link"
          import { useRouter } from "next/router"
          import Image from "next/image"

          export default function Terms() {
            const router = useRouter()

            return (
              <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-rose-100">
                <Head>
                  <title>Terms of Service - YoloTerminal</title>
                  <meta name="description" content="YoloTerminal Terms of Service" />
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
                    <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

                    <section className="space-y-4">
                      <h2 className="text-xl font-semibold text-gray-800">1. Acceptance of Terms</h2>
                      <p className="leading-relaxed">
                        By accessing or using YoloTerminal, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                      </p>
                    </section>

                    <section className="space-y-4 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800">2. Use License</h2>
                      <p className="leading-relaxed">
                        Permission is granted to temporarily access the materials (information or software) on YoloTerminal for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                      </p>
                    </section>

                    <section className="space-y-4 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800">3. Disclaimer</h2>
                      <p className="leading-relaxed">
                        The materials on YoloTerminal are provided on an "as is" basis. YoloTerminal makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                      </p>
                    </section>

                    <section className="space-y-4 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800">4. Financial Disclaimer</h2>
                      <p className="leading-relaxed">
                        YoloTerminal is not a financial advisor. The information and data provided on this platform are for informational purposes only and should not be considered as financial advice. Users should conduct their own research and consult with qualified financial advisors before making any investment decisions.
                      </p>
                    </section>

                    <section className="space-y-4 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800">5. Limitations</h2>
                      <p className="leading-relaxed">
                        In no event shall YoloTerminal or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on YoloTerminal, even if YoloTerminal or a YoloTerminal authorized representative has been notified orally or in writing of the possibility of such damage.
                      </p>
                    </section>

                    <section className="space-y-4 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800">6. Revisions and Errata</h2>
                      <p className="leading-relaxed">
                        The materials appearing on YoloTerminal could include technical, typographical, or photographic errors. YoloTerminal does not warrant that any of the materials on its website are accurate, complete, or current. YoloTerminal may make changes to the materials contained on its website at any time without notice.
                      </p>
                    </section>

                    <section className="space-y-4 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800">7. Links</h2>
                      <p className="leading-relaxed">
                        YoloTerminal has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by YoloTerminal of the site. Use of any such linked website is at the user's own risk.
                      </p>
                    </section>

                    <section className="space-y-4 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800">8. Governing Law</h2>
                      <p className="leading-relaxed">
                        These terms and conditions are governed by and construed in accordance with applicable laws, and any disputes relating to these terms and conditions shall be subject to the exclusive jurisdiction of the courts.
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