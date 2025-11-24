export default defineEventHandler(async (event) => {
  try {
    // Get the client's IP address
    const forwarded = event.node.req.headers['x-forwarded-for'];
    const ip = forwarded 
      ? (typeof forwarded === 'string' ? forwarded.split(',')[0] : forwarded[0])
      : event.node.req.socket.remoteAddress;

    // For local development, use a public IP for testing
    // You can change this to any IP to test different locations
    const testIP = ip === '::1' || ip === '127.0.0.1' ? '' : ip;

    // Use ipapi.co for geolocation (free tier: 1,000 requests/day)
    const response = await fetch(`https://ipapi.co/${testIP}/json/`);
    const data = await response.json();

    return {
      city: data.city || 'your city',
      region: data.region,
      country: data.country_name,
    };
  } catch (error) {
    console.error('Error fetching location:', error);
    // Fallback to a default city
    return {
      city: 'your city',
      region: null,
      country: null,
    };
  }
});

