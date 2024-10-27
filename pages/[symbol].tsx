import { useRouter } from 'next/router';
import Heatmap from '../components/heatmap';
import StockDrawdown from '../components/StockDrawdown';

const SymbolPage = () => {
  const router = useRouter();
  const { symbol } = router.query;

  if (!symbol || typeof symbol !== 'string') {
    return <div>Invalid symbol</div>;
  }

  return (
    <div>
      <Heatmap symbol={symbol} />
      <StockDrawdown symbol={symbol} />
    </div>
  );
};

export default SymbolPage;