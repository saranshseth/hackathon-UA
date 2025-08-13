export interface LocationData {
  country: string;
  countryCode: string;
  currency: string;
  currencyCode: string;
  city?: string;
  timezone?: string;
}

// Map country codes to currency codes for common countries
const COUNTRY_CURRENCY_MAP: Record<string, string> = {
  'US': 'USD',
  'CA': 'CAD', 
  'GB': 'GBP',
  'AU': 'AUD',
  'NZ': 'NZD',
  'EU': 'EUR',
  'DE': 'EUR',
  'FR': 'EUR',
  'IT': 'EUR',
  'ES': 'EUR',
  'NL': 'EUR',
  'JP': 'JPY',
  'SG': 'SGD',
  'HK': 'HKD',
  'IN': 'INR',
  'CN': 'CNY',
  'KR': 'KRW',
  'TH': 'THB',
  'MY': 'MYR',
  'ID': 'IDR',
  'PH': 'PHP',
  'VN': 'VND',
  'TW': 'TWD',
};

class LocationService {
  private cache: LocationData | null = null;
  private cacheExpiry: number = 0;
  
  async getUserLocation(): Promise<LocationData | null> {
    // Check cache first (valid for 1 hour)
    if (this.cache && Date.now() < this.cacheExpiry) {
      return this.cache;
    }

    try {
      // Try multiple location services
      let locationData = await this.tryIPApi();
      if (!locationData) {
        locationData = await this.tryIPInfo();
      }
      if (!locationData) {
        locationData = await this.tryFallbackLocation();
      }

      if (locationData) {
        this.cache = locationData;
        this.cacheExpiry = Date.now() + (60 * 60 * 1000); // 1 hour
      }

      return locationData || this.getFallbackLocation();
    } catch (error) {
      console.warn('Failed to detect user location:', error);
      return this.getFallbackLocation();
    }
  }

  private async tryIPApi(): Promise<LocationData | null> {
    try {
      const response = await fetch('https://ipapi.co/json/');
      
      if (!response.ok) return null;
      
      const data = await response.json();
      
      if (data.country) {
        return {
          country: data.country_name,
          countryCode: data.country_code,
          currency: data.currency || COUNTRY_CURRENCY_MAP[data.country_code] || 'USD',
          currencyCode: data.currency || COUNTRY_CURRENCY_MAP[data.country_code] || 'USD',
          city: data.city,
          timezone: data.timezone,
        };
      }
    } catch (error) {
      console.warn('IP-API failed:', error);
    }
    return null;
  }

  private async tryIPInfo(): Promise<LocationData | null> {
    try {
      const response = await fetch('https://ipinfo.io/json');
      
      if (!response.ok) return null;
      
      const data = await response.json();
      
      if (data.country) {
        return {
          country: data.country,
          countryCode: data.country,
          currency: COUNTRY_CURRENCY_MAP[data.country] || 'USD',
          currencyCode: COUNTRY_CURRENCY_MAP[data.country] || 'USD',
          city: data.city,
          timezone: data.timezone,
        };
      }
    } catch (error) {
      console.warn('IPInfo failed:', error);
    }
    return null;
  }

  private async tryFallbackLocation(): Promise<LocationData | null> {
    // Try to use browser's Intl API for timezone-based detection
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const locale = navigator.language;
      
      // Basic timezone to country mapping
      const timezoneCountryMap: Record<string, { country: string; code: string }> = {
        'America/New_York': { country: 'United States', code: 'US' },
        'America/Los_Angeles': { country: 'United States', code: 'US' },
        'America/Chicago': { country: 'United States', code: 'US' },
        'America/Denver': { country: 'United States', code: 'US' },
        'America/Toronto': { country: 'Canada', code: 'CA' },
        'Europe/London': { country: 'United Kingdom', code: 'GB' },
        'Europe/Paris': { country: 'France', code: 'FR' },
        'Europe/Berlin': { country: 'Germany', code: 'DE' },
        'Australia/Sydney': { country: 'Australia', code: 'AU' },
        'Australia/Melbourne': { country: 'Australia', code: 'AU' },
        'Asia/Tokyo': { country: 'Japan', code: 'JP' },
        'Asia/Singapore': { country: 'Singapore', code: 'SG' },
      };

      const locationInfo = timezoneCountryMap[timezone];
      if (locationInfo) {
        return {
          country: locationInfo.country,
          countryCode: locationInfo.code,
          currency: COUNTRY_CURRENCY_MAP[locationInfo.code] || 'USD',
          currencyCode: COUNTRY_CURRENCY_MAP[locationInfo.code] || 'USD',
          timezone: timezone,
        };
      }
    } catch (error) {
      console.warn('Fallback location detection failed:', error);
    }
    return null;
  }

  private getFallbackLocation(): LocationData {
    // Default to Australia/AUD since this is an Australian travel company
    return {
      country: 'Australia',
      countryCode: 'AU',
      currency: 'AUD',
      currencyCode: 'AUD',
    };
  }

  // Get suggested trips based on user location
  getSuggestedTripsForLocation(locationData: LocationData | null): string[] {
    if (!locationData) return [];

    // Map countries to suggested trip types/locations
    const suggestionMap: Record<string, string[]> = {
      'US': ['Food & Drink', 'City Highlights', 'Art & Culture & History', 'Active'],
      'CA': ['Food & Drink', 'Art & Culture & History', 'Active', 'City Highlights'],
      'GB': ['Food & Drink', 'Art & Culture & History', 'City Highlights', 'Active'],
      'AU': ['Food & Drink', 'Art & Culture & History', 'Active', 'Off The Beaten Path'],
      'DE': ['Food & Drink', 'Art & Culture & History', 'City Highlights', 'Active'],
      'FR': ['Food & Drink', 'Art & Culture & History', 'City Highlights', 'Active'],
      'JP': ['Food & Drink', 'Art & Culture & History', 'City Highlights', 'Active'],
      'SG': ['Food & Drink', 'Art & Culture & History', 'City Highlights', 'Active'],
    };

    return suggestionMap[locationData.countryCode] || ['Food & Drink', 'Art & Culture & History', 'Active', 'City Highlights'];
  }
}

export const locationService = new LocationService();
export type { LocationData };