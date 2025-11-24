export default defineEventHandler(async (event) => {
  try {
    const forwarded = event.node.req.headers['x-forwarded-for'];
    const ip = forwarded 
      ? (typeof forwarded === 'string' ? forwarded.split(',')[0] : forwarded[0])
      : event.node.req.socket.remoteAddress;

    const testIP = ip === '::1' || ip === '127.0.0.1' ? '' : ip;

    const response = await fetch(`https://ipapi.co/${testIP}/json/`);
    const data = await response.json();

    return {
      city: data.city || 'your city',
      region: data.region,
      country: data.country_name,
    };
  } catch (error) {
    console.error('Error fetching location:', error);
    return {
      city: 'your city',
      region: null,
      country: null,
    };
  }
});