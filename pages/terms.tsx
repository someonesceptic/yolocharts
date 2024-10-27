import Head from 'next/head'
import Link from 'next/link'

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Terms of Service - YOLOcharts</title>
        <meta name="description" content="YOLOcharts Terms of Service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Terms of Service</h1>

        <div className="prose prose-blue">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using YOLOcharts, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

          <h2>2. Description of Service</h2>
          <p>YOLOcharts provides a platform for users to search and view stock data. We do not provide financial advice or recommendations.</p>

          <h2>3. User Responsibilities</h2>
          <p>You are responsible for your use of the service and for any consequences thereof. You agree not to misuse the service or help anyone else do so.</p>

          <h2>4. Intellectual Property</h2>
          <p>The content, organization, graphics, design, and other matters related to YOLOcharts are protected under applicable copyrights and other proprietary laws.</p>

          <h2>5. Disclaimer of Warranties</h2>
          <p>YOLOcharts is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, and hereby disclaim all warranties, including without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>

          <h2>6. Limitation of Liability</h2>
          <p>In no event shall YOLOcharts be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.</p>

          <h2>7. Financial Disclaimer</h2>
          <p>YOLOcharts is not a financial advisor, broker, or tax advisor. The information provided through our service is for informational purposes only and should not be considered as financial advice. We are not liable for any financial decisions or actions taken based on the information provided through our service. Always consult with a qualified financial advisor before making any investment decisions.</p>

          <h2>8. Modifications to Terms</h2>
          <p>We reserve the right to modify or replace these Terms at any time. Your continued use of YOLOcharts after any such changes constitutes your acceptance of the new Terms.</p>

          <h2>9. Governing Law</h2>
          <p>These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>

          <h2>10. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at terms@yolocharts.com.</p>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}