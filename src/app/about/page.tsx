import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">About Urban Adventures</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-600 mb-6">
                Urban Adventures is the world's leading provider of day tours and experiences in cities around the globe. 
                We believe that the best way to understand a place is through the eyes of locals who are passionate about their city.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                To provide authentic, locally-guided experiences that help travelers discover the real character of destinations, 
                while supporting local communities and creating positive impact.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Makes Us Different</h2>
              <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                <li>Small groups (maximum 16 people) for personalized experiences</li>
                <li>Local guides who live and breathe their cities</li>
                <li>Off-the-beaten-path experiences you won't find elsewhere</li>
                <li>Responsible travel practices that benefit local communities</li>
                <li>Award-winning customer service and support</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Global Reach</h2>
              <p className="text-gray-600">
                With tours in over 100 cities across 6 continents, we've helped hundreds of thousands of travelers 
                discover authentic experiences in destinations worldwide. From food tours in Tokyo to street art walks 
                in Melbourne, we're passionate about showing you the real side of every city.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}