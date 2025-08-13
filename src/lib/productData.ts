import { Product } from '@/types';

// Sample product data based on the CSV structure - you can replace this with actual CSV data
export const sampleProducts: Product[] = [
  {
    id: '9326A53C-059F-488D-972A-E3C990820EFC',
    name: 'Daytrip: Kangaroo Island Wildlife Discovery-W1CC',
    url: 'https://www.urbanadventures.com/en/kangarooisland/daytrip-kangaroo-island-wildlife-discovery',
    slug: '/kangarooisland/daytrip-kangaroo-island-wildlife-discovery',
    baseUrl: 'daytrip-kangaroo-island-wildlife-discovery',
    destination: {
      name: 'Kangaroo Island',
      country: 'Australia',
      continent: 'Oceania'
    },
    duration: {
      hours: 16,
      days: 1
    },
    isPrivate: false,
    overview: "Take a day trip from Adelaide to Kangaroo Island with a local guide sharing their knowledge of the local landscapes and wildlife. Arrive on the island and discover the local animals that call this place home, with visits to Seal Bay Conservation Park and a Heritage-listed natural bush property.",
    highlights: [
      "Watch seals sigh and play at a special conservation park",
      "Explore Kangaroo Island's coastal and bush landscape with a local guide",
      "See kangaroos as they make their way to open pastures to graze in the afternoon",
      "Have a gourmet picnic lunch at a Heritage-listed natural bush property"
    ],
    inclusions: [
      "Local English-speaking guide",
      "Return SeaLink coach transfers from/to Adelaide Bus Station via the scenic Fleurieu Peninsula to Kangaroo Island",
      "Return SeaLink Ferry transport to/from Kangaroo Island",
      "Seal Bay Conservation Park Visit",
      "Personalized 4×4 touring",
      "Gourmet picnic-style lunch and tea",
      "All entrance fees and special permits"
    ],
    exclusions: [
      "Hotel transfers",
      "Gratuities (optional)",
      "Additional food and drinks"
    ],
    meetingPoint: "Adelaide Bus Station",
    endPoint: "Adelaide Bus Station",
    moreInformation: "This tour operates year-round and includes wildlife viewing opportunities",
    localImpact: "Supporting local conservation efforts and indigenous communities",
    pricing: {
      currency: 'AUD',
      adult: 299,
      child: 249,
      infant: 0
    },
    categories: ['Wildlife', 'Nature', 'Day Trip'],
    images: {
      hero: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1446071103084-c257b5f70672?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1541675818367-5effa1eb2c03?w=800&h=600&fit=crop'
      ]
    },
    tripadvisor: {
      url: 'https://www.tripadvisor.com/example',
      rating: 4.8,
      reviewCount: 124,
      reviewLink: 'https://www.tripadvisor.com/example/reviews',
      recommendation: '96% of travelers recommend this tour',
      description: 'Amazing wildlife experience on Kangaroo Island',
      freeCancellation: true,
      reservePayLater: true,
      lowestPriceGuarantee: true,
      highlights: [
        'Small group experience',
        'Expert local guide',
        'Wildlife viewing guaranteed'
      ],
      itinerary: 'Full day adventure exploring the natural wonders of Kangaroo Island'
    },
    faq: {
      groupSize: 'Maximum 16 people',
      findingGuide: 'Meet at Adelaide Bus Station, look for Urban Adventures guide',
      dietary: 'Please advise of any dietary requirements when booking',
      cancellations: 'Free cancellation up to 24 hours before tour starts',
      accessibility: 'This tour involves moderate walking and may not be suitable for those with mobility issues',
      walkingDistance: 'Approximately 2-3km of walking throughout the day',
      childPolicy: 'Children must be accompanied by an adult. Infant seats available.',
      importantInfo: 'Bring comfortable walking shoes, hat, sunscreen, and camera'
    }
  },
  // Melbourne tours for the homepage
  {
    id: 'MEL-BIKE-001',
    name: 'Private Melbourne: Bikes & Sights tour Melbourne highlights',
    url: 'https://www.urbanadventures.com/en/melbourne/private-melbourne-bikes-sights',
    slug: '/melbourne/private-melbourne-bikes-sights',
    baseUrl: 'private-melbourne-bikes-sights',
    destination: {
      name: 'Melbourne',
      country: 'Australia',
      continent: 'Oceania'
    },
    duration: {
      hours: 4,
      days: 1
    },
    isPrivate: true,
    overview: "Explore Melbourne's highlights on this private bike tour. Discover hidden laneways, street art, and iconic landmarks with a local guide.",
    highlights: [
      "Private bike tour through Melbourne's best sights",
      "Explore famous laneways and street art",
      "Visit Federation Square and Royal Botanic Gardens",
      "Learn about Melbourne's culture and history"
    ],
    inclusions: [
      "Private local guide",
      "Bike and helmet rental",
      "Small group tour (max 8 people)",
      "Refreshments included"
    ],
    exclusions: [
      "Hotel pickup and drop-off",
      "Lunch",
      "Gratuities"
    ],
    meetingPoint: "Federation Square",
    endPoint: "Royal Botanic Gardens",
    moreInformation: "Suitable for all fitness levels. Electric bikes available.",
    localImpact: "Supporting local businesses and sustainable tourism",
    pricing: {
      currency: 'AUD',
      adult: 798,
      child: 598,
      infant: 0
    },
    categories: ['Bikes', 'Private', 'Sightseeing'],
    images: {
      hero: 'https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&h=600&fit=crop'
      ]
    },
    tripadvisor: {
      url: 'https://www.tripadvisor.com/melbourne-bike-tour',
      rating: 4.9,
      reviewCount: 127,
      reviewLink: 'https://www.tripadvisor.com/melbourne-bike-tour/reviews',
      recommendation: '98% of travelers recommend this tour',
      description: 'Outstanding private bike tour of Melbourne',
      freeCancellation: true,
      reservePayLater: true,
      lowestPriceGuarantee: true,
      highlights: [
        'Private tour experience',
        'Expert local knowledge',
        'Perfect for families'
      ],
      itinerary: '4-hour guided bike tour covering Melbourne\'s top attractions'
    },
    faq: {
      groupSize: 'Private tour for up to 8 people',
      findingGuide: 'Meet at Federation Square visitor center',
      dietary: 'Refreshments can accommodate dietary requirements',
      cancellations: 'Free cancellation up to 48 hours before tour',
      accessibility: 'Suitable for most fitness levels, electric bikes available',
      walkingDistance: 'Minimal walking, mostly cycling',
      childPolicy: 'Children welcome, child seats and helmets provided',
      importantInfo: 'Wear comfortable clothes and closed shoes. Weather dependent.'
    }
  },
  {
    id: 'MEL-FOOD-002',
    name: 'Private Melbourne: Bikes & Sights tour Melbourne culture',
    url: 'https://www.urbanadventures.com/en/melbourne/melbourne-culture-tour',
    slug: '/melbourne/melbourne-culture-tour',
    baseUrl: 'melbourne-culture-tour',
    destination: {
      name: 'Melbourne',
      country: 'Australia',
      continent: 'Oceania'
    },
    duration: {
      hours: 3.5,
      days: 1
    },
    isPrivate: true,
    overview: "Dive deep into Melbourne's cultural scene with visits to galleries, cafes, and cultural precincts.",
    highlights: [
      "Explore Melbourne's vibrant cultural districts",
      "Visit local galleries and street art locations",
      "Experience Melbourne's famous coffee culture",
      "Learn about the city's multicultural heritage"
    ],
    inclusions: [
      "Private cultural guide",
      "Gallery entrance fees",
      "Coffee tasting experience",
      "Cultural precinct walking tour"
    ],
    exclusions: [
      "Meals",
      "Transportation",
      "Personal purchases"
    ],
    meetingPoint: "Melbourne Museum",
    endPoint: "Collins Street",
    moreInformation: "Perfect introduction to Melbourne's arts and culture scene",
    localImpact: "Supporting local artists and cultural institutions",
    pricing: {
      currency: 'AUD',
      adult: 649,
      child: 489,
      infant: 0
    },
    categories: ['Culture', 'Art', 'Private'],
    images: {
      hero: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&h=600&fit=crop'
      ]
    },
    tripadvisor: {
      url: 'https://www.tripadvisor.com/melbourne-culture',
      rating: 4.8,
      reviewCount: 89,
      reviewLink: 'https://www.tripadvisor.com/melbourne-culture/reviews',
      recommendation: '95% of travelers recommend this tour',
      description: 'Fantastic cultural immersion in Melbourne',
      freeCancellation: true,
      reservePayLater: true,
      lowestPriceGuarantee: true,
      highlights: [
        'Insider cultural knowledge',
        'Small group experience',
        'Coffee included'
      ],
      itinerary: '3.5-hour cultural exploration of Melbourne\'s arts districts'
    },
    faq: {
      groupSize: 'Maximum 6 people for intimate experience',
      findingGuide: 'Meet at Melbourne Museum main entrance',
      dietary: 'Coffee alternatives available',
      cancellations: 'Free cancellation up to 24 hours before',
      accessibility: 'Involves walking, some galleries have step access',
      walkingDistance: 'Approximately 2km of walking',
      childPolicy: 'Suitable for children 12+',
      importantInfo: 'Comfortable walking shoes recommended'
    }
  }
];

// Helper functions to work with product data
export function getProductsByDestination(destination: string): Product[] {
  return sampleProducts.filter(product => 
    product.destination.name.toLowerCase().includes(destination.toLowerCase()) ||
    product.destination.country.toLowerCase().includes(destination.toLowerCase())
  );
}

export function getMelbourneProducts(): Product[] {
  return getProductsByDestination('melbourne');
}

export function getProductById(id: string): Product | undefined {
  if (!sampleProducts || !Array.isArray(sampleProducts)) return undefined;
  return sampleProducts.find(product => product?.id === id) || undefined;
}

export function getFeaturedProducts(limit: number = 6): Product[] {
  return sampleProducts
    .filter(product => product.tripadvisor.rating >= 4.5)
    .sort((a, b) => b.tripadvisor.rating - a.tripadvisor.rating)
    .slice(0, limit);
}