import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import SearchInput from '@/components/Search/SearchInput';
import Header from '@/components/Layout/Header';
import { MapPin, Heart } from 'lucide-react';

export default function Home() {
  const sampleBadge = {
    type: 'new' as const,
    label: 'New Trip',
    color: '#50b464'
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-primary-sand">
        <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-brand-primary-midnight mb-4">
            Intrepid Travel
          </h1>
          <h2 className="text-2xl text-brand-primary-intrepid-red mb-2">
            Urban Adventures
          </h2>
          <p className="text-lg text-brand-primary-midnight-weak max-w-2xl mx-auto">
            Discover authentic urban adventures worldwide. Explore cities like a local with our curated experiences.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <SearchInput 
            placeholder="Search destinations, experiences, or countries..."
            className="h-12 text-base"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-brand-secondary-santorini to-brand-secondary-glacier"></div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-brand-primary-midnight">
                    Tokyo Street Food Tour
                  </h3>
                  <p className="text-brand-primary-midnight-weak flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Tokyo, Japan
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <Badge badge={sampleBadge} />
                <span className="text-brand-primary-midnight font-semibold">
                  From $189
                </span>
              </div>
              <p className="text-brand-primary-midnight-weak text-sm">
                Dive deep into Tokyo's incredible street food scene, from hidden alleys to traditional markets.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-brand-secondary-sahara to-brand-secondary-luxor"></div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-brand-primary-midnight">
                    Barcelona Architecture Walk
                  </h3>
                  <p className="text-brand-primary-midnight-weak flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Barcelona, Spain
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <Badge badge={{type: 'likely_to_sell_out', label: 'Likely to Sell Out', color: '#ff2828'}} />
                <span className="text-brand-primary-midnight font-semibold">
                  From $145
                </span>
              </div>
              <p className="text-brand-primary-midnight-weak text-sm">
                Discover Gaudí's masterpieces and Barcelona's unique architectural heritage.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-brand-secondary-okvango to-brand-secondary-sa-pa"></div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-brand-primary-midnight">
                    NYC Photography Tour
                  </h3>
                  <p className="text-brand-primary-midnight-weak flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    New York, USA
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <Badge badge={{type: 'popular', label: 'Popular', color: '#ffc828'}} />
                <span className="text-brand-primary-midnight font-semibold">
                  From $225
                </span>
              </div>
              <p className="text-brand-primary-midnight-weak text-sm">
                Capture the essence of NYC with professional photography guidance.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <a href="/map">
            <Button size="lg" className="mr-4">
              Explore on Map
            </Button>
          </a>
          <Button variant="outline" size="lg">
            Browse All Adventures
          </Button>
        </div>
        </div>
      </main>
    </>
  )
}