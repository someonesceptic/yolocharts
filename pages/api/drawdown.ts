import type { NextApiRequest, NextApiResponse } from 'next'

type DrawdownData = {
  datetime: string;
  close: number;
  drawdown: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DrawdownData[] | { error: string }>
) {
  const { symbol } = req.query

  console.log('Received request with symbol:', symbol)

  if (!symbol || typeof symbol !== 'string') {
    console.error('Invalid symbol provided:', symbol)
    return res.status(400).json({ error: 'Symbol parameter is required and must be a string' })
  }

  const cleanedSymbol = symbol.trim().toUpperCase()

  if (cleanedSymbol.length === 0) {
    console.error('Empty symbol after cleaning')
    return res.status(400).json({ error: 'Symbol cannot be empty' })
  }

  console.log('Cleaned symbol:', cleanedSymbol)

  const apiKey = process.env.TWELVE_DATA_API_KEY

  if (!apiKey) {
    console.error('API key is not configured')
    return res.status(500).json({ error: 'API key is not configured' })
  }

  try {
    const url = `https://api.twelvedata.com/time_series?symbol=${encodeURIComponent(cleanedSymbol)}&interval=1day&outputsize=5000&apikey=${apiKey}`

    console.log('Fetching data from:', url.replace(apiKey, '[REDACTED]'))

    const response = await fetch(url)
    const data = await response.json()

    console.log('API Response:', JSON.stringify(data).slice(0, 200) + '...')

    if (data.status === 'error') {
      throw new Error(data.message || 'Unknown error occurred')
    }

    if (!data.values || !Array.isArray(data.values)) {
      console.error('Invalid data format received:', data)
      throw new Error('Invalid data format received from Twelve Data API')
    }

    const drawdownData = calculateDrawdown(data.values)
    res.status(200).json(drawdownData)
  } catch (error) {
    console.error('Error fetching stock data:', error)
    res.status(500).json({ error: 'Failed to fetch stock data: ' + (error instanceof Error ? error.message : String(error)) })
  }
}

function calculateDrawdown(priceData: any[]): DrawdownData[] {
  let peak = -Infinity
  let drawdownData: DrawdownData[] = []

  // Reverse the array to process it from oldest to newest
  const reversedPriceData = [...priceData].reverse()

  for (let i = 0; i < reversedPriceData.length; i++) {
    const close = parseFloat(reversedPriceData[i].close)
    const datetime = reversedPriceData[i].datetime

    // Update the peak if we've reached a new high
    if (close > peak) {
      peak = close
    }

    // Calculate the drawdown
    const drawdown = ((peak - close) / peak) * 100

    drawdownData.push({
      datetime,
      close,
      drawdown: Number(drawdown.toFixed(2))
    })
  }

  return drawdownData
}