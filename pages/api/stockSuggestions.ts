import type { NextApiRequest, NextApiResponse } from 'next'

type StockSuggestion = {
  symbol: string
  name: string
  exchange: string
  country: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StockSuggestion[] | { error: string }>
) {
  const { query } = req.query

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter is required' })
  }

  const apiKey = process.env.TWELVE_DATA_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: 'API key is not configured' })
  }

  try {
    const response = await fetch(
      `https://api.twelvedata.com/symbol_search?symbol=${encodeURIComponent(query)}&apikey=${apiKey}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch data from 12 Data API')
    }

    const data = await response.json()

    const suggestions: StockSuggestion[] = data.data.map((item: any) => ({
      symbol: item.symbol,
      name: item.instrument_name,
      exchange: item.exchange,
      country: item.country,
    }))

    res.status(200).json(suggestions)
  } catch (error) {
    console.error('Error fetching stock suggestions:', error)
    res.status(500).json({ error: 'Failed to fetch stock suggestions' })
  }
}