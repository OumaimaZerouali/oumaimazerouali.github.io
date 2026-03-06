import {Redis} from '@upstash/redis';

const redis = Redis.fromEnv();

const ENTRIES_KEY = 'guestbook:entries';
const MAX_ENTRIES = 100;
const RATE_LIMIT_TTL = 86400; // 24 hours in seconds

function getAllowedOrigins() {
  const env = process.env.ALLOWED_ORIGINS || 'https://ozerouali.com,https://oumaimazerouali.github.io';
  return env.split(',').map(o => o.trim());
}

function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  const allowed = getAllowedOrigins();
  if (origin && allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
}

function getClientIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

export default async function handler(req, res) {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'GET') {
    const raw = await redis.lrange(ENTRIES_KEY, 0, MAX_ENTRIES - 1);
    const entries = raw.map(item => (typeof item === 'string' ? JSON.parse(item) : item));
    return res.status(200).json(entries);
  }

  if (req.method === 'POST') {
    const { name, message, website } = req.body || {};

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ error: 'Name is required.' });
    }
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required.' });
    }
    if (message.trim().length > 300) {
      return res.status(400).json({ error: 'Message must be 300 characters or fewer.' });
    }
    if (website && typeof website === 'string' && website.trim().length > 0) {
      try {
        const url = new URL(website.trim());
        if (!['http:', 'https:'].includes(url.protocol)) {
          return res.status(400).json({ error: 'Website must be a valid http/https URL.' });
        }
      } catch {
        return res.status(400).json({ error: 'Website must be a valid URL.' });
      }
    }

    const ip = getClientIp(req);
    const rateLimitKey = `ratelimit:${ip}`;
    const existing = await redis.get(rateLimitKey);
    if (existing) {
      return res.status(429).json({ error: 'You already left a message today. Come back tomorrow!' });
    }

    const entry = {
      name: name.trim().slice(0, 80),
      message: message.trim().slice(0, 300),
      ...(website && website.trim() ? { website: website.trim().slice(0, 200) } : {}),
      date: new Date().toISOString(),
    };

    await redis.lpush(ENTRIES_KEY, JSON.stringify(entry));
    await redis.ltrim(ENTRIES_KEY, 0, MAX_ENTRIES - 1);
    await redis.set(rateLimitKey, '1', { ex: RATE_LIMIT_TTL });

    return res.status(201).json(entry);
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
