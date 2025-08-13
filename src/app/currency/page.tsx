import CurrencyConversionArea from "@/components/Currency/CurrencyConversionArea";

export default function CurrencyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#757575] mb-2">
              Currency Converter
            </h1>
            <p className="text-gray-600">
              Convert prices and view exchange rates for your travel planning
            </p>
          </div>

          <CurrencyConversionArea 
            showCalculator={true}
            showTrends={true}
            showLastUpdated={true}
          />

          <div className="mt-8 bg-white border border-[#dedede] rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[#757575] mb-4">
              Integration Examples
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-[#757575]">Sample Prices</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span>Adventure Tour Package</span>
                    <span className="font-semibold">$1,299 AUD</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span>Hotel per night</span>
                    <span className="font-semibold">$180 AUD</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span>Flight to destination</span>
                    <span className="font-semibold">$850 AUD</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-[#757575]">Developer Notes</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• Currency selection persists in localStorage</p>
                  <p>• Exchange rates can be integrated with live APIs</p>
                  <p>• Price formatting adapts to currency conventions</p>
                  <p>• Conversion area is fully customizable</p>
                  <p>• Easy to integrate with booking systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}