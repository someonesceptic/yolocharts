import type { NextApiRequest, NextApiResponse } from 'next'

type MonthlyReturn = {
  year: number
  month: number
  return: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MonthlyReturn[] | { error: string }>
) {
  const { symbol } = req.query

  if (!symbol || typeof symbol !== 'string') {
    return res.status(400).json({ error: 'Symbol parameter is required' })
  }

  const apiKey = process.env.TWELVE_DATA_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: 'API key is not configured' })
  }

  try {
    const apiUrl = `https://api.twelvedata.com/time_series?symbol=${encodeURIComponent(symbol)}&interval=1month&outputsize=120&apikey=${apiKey}&format=JSON`

    console.log('Fetching data from:', apiUrl)

    const response = await fetch(apiUrl)
    const data = await response.json()

    if (data.status === 'error') {
      console.error('API returned an error:', data.message)
      return res.status(400).json({ error: data.message || 'API returned an error' })
    }

    if (!data.values || !Array.isArray(data.values)) {
      console.error('Invalid data format:', data)
      throw new Error('Invalid data format received from 12 Data API')
    }

    const monthlyReturns: MonthlyReturn[] = data.values.map((value: any, index: number, array: any[]) => {
      const currentClose = parseFloat(value.close)
      const previousClose = index < array.length - 1 ? parseFloat(array[index + 1].close) : currentClose
      const monthlyReturn = (currentClose - previousClose) / previousClose

      const date = new Date(value.datetime)
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        return: monthlyReturn
      }
    })

    console.log(`Processed ${monthlyReturns.length} monthly returns for symbol:`, symbol)

    res.status(200).json(monthlyReturns)
  } catch (error) {
    console.error('Error fetching stock data:', error)
    res.status(500).json({ error: 'Failed to fetch stock data' })
  }
}