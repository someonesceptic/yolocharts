import Head from 'next/head'
import Link from 'next/link'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Privacy Policy - YOLOcharts</title>
        <meta name="description" content="YOLOcharts Privacy Policy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Privacy Policy</h1>

        <div className="prose prose-blue">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Introduction</h2>
          <p>Welcome to YOLOcharts. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our service.</p>

          <h2>2. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you create an account or use our services. This may include your name, email address, and search queries.</p>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to operate, maintain, and provide the features and functionality of YOLOcharts, as well as to communicate with you.</p>

          <h2>4. Data Security</h2>
          <p>We implement reasonable precautions to protect the security of your information. However, no data transmission over the Internet or electronic storage is fully secure, so we cannot guarantee absolute security.</p>

          <h2>5. Third-Party Links</h2>
          <p>Our service may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites.</p>

          <h2>6. Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

          <h2>7. Disclaimer</h2>
          <p>YOLOcharts is not a financial advisor, and the information provided on this platform should not be considered as financial advice. We are not liable for any financial decisions or actions taken based on the information provided through our service.</p>

          <h2>8. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@yolocharts.com.</p>
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