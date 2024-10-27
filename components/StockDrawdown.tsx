import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type DrawdownData = {
  datetime: string;
  close: number;
  drawdown: number;
};

type StockDrawdownProps = {
  symbol: string;
};

const StockDrawdown: React.FC<StockDrawdownProps> = ({ symbol }) => {
  const [data, setData] = useState<DrawdownData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrawdownData = async () => {
      if (!symbol) {
        setError('No symbol provided');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/drawdown?symbol=${encodeURIComponent(symbol.trim())}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || `Failed to fetch drawdown data: ${response.status}`);
        }

        if (!Array.isArray(result)) {
          throw new Error('Invalid data format received');
        }

        setData(result);
      } catch (err) {
        const errorMessage = `Error fetching drawdown data: ${err instanceof Error ? err.message : String(err)}`;
        console.error(errorMessage);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrawdownData();
  }, [symbol]);

  if (isLoading) {
    return <div className="text-center py-8">Loading drawdown data...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>{error}</p>
        <p className="mt-4">Please check the symbol and try again. If the problem persists, contact support.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">{symbol} Drawdowns since Oct '20</h3>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="datetime" 
              tick={{ fill: '#666', fontSize: 12 }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
            />
            <YAxis 
              tick={{ fill: '#666', fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
              domain={['dataMin', 0]}
              reversed={true}
            />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(2)}%`, 'Drawdown']}
              labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            />
            <Line 
              type="monotone" 
              dataKey="drawdown" 
              stroke="#5E35B1" 
              dot={false} 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center py-8">No drawdown data available for {symbol}</div>
      )}
    </div>
  );
};

export default StockDrawdown;