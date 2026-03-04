import { getRedis } from '../../../lib/redis';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { password } = req.query;

  if (!process.env.PORTAL_PASSWORD || password !== process.env.PORTAL_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const redis = getRedis();
    const [visitCount, rawSubmissions] = await Promise.all([
      redis.get('form:visit_count'),
      redis.lrange('form:submissions', 0, -1),
    ]);

    const submissions = (rawSubmissions || []).map((item) => {
      try {
        return typeof item === 'string' ? JSON.parse(item) : item;
      } catch {
        return null;
      }
    }).filter(Boolean);

    return res.status(200).json({
      visits: visitCount || 0,
      submissions,
    });
  } catch (err) {
    console.error('Portal data error:', err);
    return res.status(500).json({ error: 'Failed to load data. Check Redis configuration.' });
  }
}
