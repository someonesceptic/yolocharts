import React, { useState, useCallback, useEffect } from 'react'
import { Search, X } from "lucide-react"

type StockSuggestion = {
  symbol: string
  name: string
  exchange: string
  country: string
}

type SearchBarProps = {
  onSearch: (symbol: string) => void
  className?: string
}

const debounce = <F extends (...args: any[]) => any>(func: F, delay: number) => {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export default function SearchBar({ onSearch, className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<StockSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  const handleClearInput = () => {
    setQuery('')
    setSuggestions([])
  }

  const fetchSuggestions = useCallback(async (input: string) => {
    if (input.length < 2) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/stockSuggestions?query=${encodeURIComponent(input)}`)
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions')
      }
      const data = await response.json()
      setSuggestions(data)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }, []) 

  const debouncedFetch = useCallback(
    (input: string) => {
      fetchSuggestions(input)
    },
    [fetchSuggestions]
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        debouncedFetch(query)
      } else {
        setSuggestions([])
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query, debouncedFetch])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleSuggestionClick = (suggestion: StockSuggestion) => {
    setQuery(suggestion.symbol)
    setSuggestions([])
    onSearch(suggestion.symbol)
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a stock..."
          className="w-full pl-10 pr-10 py-2 text-gray-700 bg-white border border-gray-300 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 ease-in-out"
        />
        {query && (
          <button
            type="button"
            onClick={handleClearInput}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Clear search"
          >
            <X size={20} />
          </button>
        )}
      </div>
      {isLoading && (
        <div className="absolute mt-1 w-full text-center py-2 bg-white border border-gray-300 rounded-md shadow-lg">
          Loading...
        </div>
      )}
      {!isLoading && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.symbol}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150 ease-in-out"
            >
              <div className="font-semibold">{suggestion.name}</div>
              <div className="text-sm text-gray-600">
                {suggestion.symbol} | {suggestion.exchange} | {suggestion.country}
              </div>
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}