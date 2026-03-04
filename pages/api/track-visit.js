import { getRedis } from '../../lib/redis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const redis = getRedis();
    await redis.incr('form:visit_count');
    return res.status(200).json({ ok: true });
  } catch (err) {
    // Silently fail — visit tracking should never block the user
    console.error('Visit tracking error:', err);
    return res.status(200).json({ ok: false });
  }
}
