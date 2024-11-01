import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase, type StockCacheEntry } from '../../lib/supabase'

type MonthlyReturn = {
  year: number
  month: number
  return: number
}

type TwelveDataResponse = {
  meta: {
    symbol: string
    interval: string
  }
  values: Array<{
    datetime: string
    open: string
    high: string
    low: string
    close: string
  }>
  status: string
}

function calculateMonthlyReturns(data: TwelveDataResponse): MonthlyReturn[] {
  const returns: MonthlyReturn[] = []
  const values = data.values // API returns data in descending order (newest first)

  // Debug the first few entries
  console.log('First few entries from API:', values.slice(0, 3).map(v => ({
    date: v.datetime,
    close: v.close
  })))

  for (let i = 0; i < values.length - 1; i++) {
    const currentMonthData = values[i]     // Current month (e.g., Feb 2024)
    const previousMonthData = values[i + 1] // Previous month (e.g., Jan 2024)

    const currentClose = parseFloat(currentMonthData.close)
    const previousClose = parseFloat(previousMonthData.close)

    // Monthly return = ((Current month close - Previous month close) / Previous month close) * 100
    const monthlyReturn = ((currentClose - previousClose) / previousClose) * 100

    const [year, month] = currentMonthData.datetime.split('-').map(Number)

    // Debug each calculation
    console.log({
      currentMonth: `${year}-${month}`,
      currentClose,
      previousClose,
      return: monthlyReturn.toFixed(2)
    })

    returns.push({
      year,
      month,
      return: Number(monthlyReturn.toFixed(2)) // Ensure 2 decimal places
    })
  }

  // Sort returns by date (newest first)
  returns.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year
    return b.month - a.month
  })

  return returns
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MonthlyReturn[] | { error: string }>
) {
  const { symbol } = req.query

  if (!symbol || typeof symbol !== 'string') {
    return res.status(400).json({ error: 'Symbol parameter is required' })
  }

  try {
    // Check cache first
    const today = new Date().toISOString().split('T')[0]
    console.log(`Checking cache for symbol ${symbol} on ${today}`)

    const { data: cachedData, error: cacheError } = await supabase
      .from('stock_cache')
      .select('*')
      .eq('symbol', symbol.toUpperCase())
      .gte('cached_at', today)
      .single()

    if (!cacheError && cachedData) {
      console.log(`Cache hit for ${symbol} - returning cached data from ${cachedData.cached_at}`)
      return res.status(200).json(cachedData.data)
    }

    console.log(`Cache miss for ${symbol} - fetching fresh data`)

    const apiKey = process.env.TWELVE_DATA_API_KEY
    if (!apiKey) {
      return res.status(500).json({ error: 'API key is not configured' })
    }

    // Calculate the start date (January 1, 1990)
    const startDate = '1990-01-01'
    const endDate = new Date().toISOString().split('T')[0] // Today's date

    const apiUrl = `https://api.twelvedata.com/time_series?` +
      `symbol=${encodeURIComponent(symbol)}` +
      `&interval=1month` +
      `&outputsize=5000` +
      `&start_date=${startDate}` +
      `&end_date=${endDate}` +
      `&order=desc` +
      `&format=JSON` +
      `&apikey=${apiKey}`

    console.log('Fetching data from:', apiUrl.replace(apiKey, 'API_KEY_HIDDEN'))

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

    console.log(`Received ${data.values.length} data points for ${symbol}`)

    // Process the data
    const monthlyReturns = calculateMonthlyReturns(data)

    // Cache the results
    const { error: insertError } = await supabase
      .from('stock_cache')
      .upsert({
        symbol: symbol.toUpperCase(),
        data: monthlyReturns,
        cached_at: new Date().toISOString()
      }, {
        onConflict: 'symbol'
      })

    if (insertError) {
      console.error('Failed to cache data:', insertError)
    } else {
      console.log(`Successfully cached data for ${symbol}`)
    }

    // Log a sample of the calculated returns for verification
    console.log('Sample of calculated returns:', monthlyReturns.slice(0, 3))

    res.status(200).json(monthlyReturns)
  } catch (error) {
    console.error('Error processing request:', error)
    const errorMessage = error instanceof Error ? 
      error.message : 
      'Failed to fetch stock data'
    res.status(500).json({ error: errorMessage })
  }
}