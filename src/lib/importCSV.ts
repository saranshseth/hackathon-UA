import { parseCSVData } from './csvParser';
import { Product } from '@/types';

/**
 * Utility to import CSV data from file
 * Usage: 
 * 1. Copy your CSV content
 * 2. Call importCSVData(csvContent) 
 * 3. The function will return parsed Product array
 */

export async function importCSVFromFile(file: File): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const csvData = event.target?.result as string;
        const products = parseCSVData(csvData);
        resolve(products);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
}

export function importCSVData(csvContent: string): Product[] {
  try {
    return parseCSVData(csvContent);
  } catch (error) {
    console.error('Error parsing CSV data:', error);
    return [];
  }
}

/**
 * To use your actual CSV data:
 * 
 * 1. Copy the content from C:\Users\saran\Downloads\UA-Product.csv
 * 2. Replace the content in this function with your actual CSV data
 * 3. Uncomment and modify the productData.ts file to use this data
 */

export function getActualCSVData(): string {
  // Paste your CSV content here between the backticks
  return `id,Name,url,slug,base url,destination name,destination country,destination continent,duration-hours,private,overview,highlight,inclusions,exclusions,meeting point,end point,more information,local impact,faq-groupsize,faq-finding-guide,faq-dietary,faq-cancellations,faq-accessability,faq-walkingdistance,faq-childpolicy,faq-important info,Currency,Adult,Child,Infant,Category 1,Category 2,Category 3,Hero Image,Image1,Image2,Image3,Image4,Image5,Image6,Image7,Image8,Image9,trip advisor URL,trip advisor rating,trip advisor review count,trip advisor review link,trip advisor recommendation,trip advisor description,trip advisor free cancellation,trip advisor reserve pay later,trip advisor lowest price guarantee,trip advisor highlights,trip advisor highlights,trip advisor itinerary,
9326A53C-059F-488D-972A-E3C990820EFC,Daytrip: Kangaroo Island Wildlife Discovery-W1CC,https://www.urbanadventures.com/en/kangarooisland/daytrip-kangaroo-island-wildlife-discovery,/kangarooisland/daytrip-kangaroo-island-wildlife-discovery,daytrip-kangaroo-island-wildlife-discovery,Kangaroo Island,Australia,Oceania ,16,,"Take a day trip from Adelaide to Kangaroo Island with a local guide sharing their knowledge of the local landscapes and wildlife. Arrive on the island and discover the local animals that call this place home, with visits to Seal Bay Conservation Park and a Heritage-listed natural bush property.","Watch seals sigh and play at a special conservation park
Explore Kangaroo Island's coastal and bush landscape with a local guide
See kangaroos as they make their way to open pastures to graze in the afternoon
Have a gourmet picnic lunch at a Heritage-listed natural bush property","Local English-speaking guide
Return SeaLink coach transfers from/to Adelaide Bus Station via the scenic Fleurieu Peninsula to Kangaroo Island
Return SeaLink Ferry transport to/from Kangaroo Island
Seal Bay Conservation Park Visit
Personalized 4×4 touring
Gourmet picnic-style lunch and tea
All entrance fees and special permits","Hotel transfers
Gratuities (optional)
Additional food and drinks","Adelaide Bus Station","Adelaide Bus Station","This tour operates year-round","Supporting conservation efforts",Maximum 16 people,Meet at Adelaide Bus Station,Dietary requirements accommodated,Free cancellation 24 hours,Moderate walking required,2-3km walking,Children welcome,Bring comfortable shoes,AUD,299,249,0,Wildlife,Nature,Day Trip,,,,,,,,,,,,4.8,124,https://tripadvisor.com/reviews,96% recommend,Amazing wildlife experience,true,true,true,"Small group, Expert guide, Wildlife guaranteed",,Full day Kangaroo Island adventure`;
}

/**
 * Process and cache the CSV data
 */
let cachedProducts: Product[] | null = null;

export function getCachedProducts(): Product[] {
  if (!cachedProducts) {
    const csvData = getActualCSVData();
    cachedProducts = parseCSVData(csvData);
  }
  return cachedProducts;
}

/**
 * Instructions for integrating your full CSV:
 * 
 * 1. Open C:\Users\saran\Downloads\UA-Product.csv
 * 2. Copy all the content (Ctrl+A, Ctrl+C)
 * 3. Replace the return value in getActualCSVData() function above
 * 4. Update productData.ts to use getCachedProducts() instead of sampleProducts
 * 5. Your application will now use the full product catalog
 */