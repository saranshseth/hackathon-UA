import Header from "@/components/Layout/Header";
import ExploreMelbourneSection from "@/components/ExploreMelbourneSection";
import MelbourneExplorer from "@/components/MelbourneExplorer";
import CurrencyConversionArea from "@/components/Currency/CurrencyConversionArea";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Currency Selector */}
      <Header />
      
      {/* Currency Conversion Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-4">
            Currency Conversion Demo
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Change the currency in the header and watch all product prices update automatically!
          </p>
          
          <div className="max-w-2xl mx-auto mb-8">
            <CurrencyConversionArea 
              showCalculator={true}
              showTrends={false}
              showLastUpdated={true}
            />
          </div>
        </div>
      </div>

      {/* Product Sections with Currency Conversion */}
      <ExploreMelbourneSection />
      
      <div className="py-8">
        <MelbourneExplorer />
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 m-8">
        <h2 className="text-lg font-semibold text-blue-800 mb-4">
          How to Test Currency Conversion:
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-blue-700">
          <li>Use the currency selector in the header ($ AUD dropdown)</li>
          <li>Select a different currency (e.g., USD, EUR, GBP)</li>
          <li>Notice how all product prices automatically update</li>
          <li>Prices convert from AUD base currency to your selected currency</li>
          <li>Currency selection is saved and persists across page reloads</li>
        </ol>
        
        <div className="mt-4 p-4 bg-blue-100 rounded">
          <h3 className="font-semibold text-blue-800 mb-2">Features Implemented:</h3>
          <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
            <li>✅ Functional currency selector with 8 major currencies</li>
            <li>✅ Real-time price conversion across all product cards</li>
            <li>✅ Persistent currency selection (localStorage)</li>
            <li>✅ Proper currency formatting (symbols, decimals)</li>
            <li>✅ Dedicated currency conversion area</li>
            <li>✅ Responsive design for all screen sizes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}