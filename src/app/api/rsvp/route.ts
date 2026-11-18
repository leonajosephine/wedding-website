import {createHash, timingSafeEqual} from 'node:crypto';

const noStore = {'Cache-Control': 'no-store'};

function supabaseRequest(query: string, options: RequestInit = {}) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error('Missing Supabase configuration');

  return fetch(new URL('/rest/v1/wedding_rsvps' + query, url), {
    ...options,
    cache: 'no-store',
    headers: {'apikey': key, ...options.headers}
  });
}

export async function POST(request: Request) {
  const data = await request.json().catch(() => null);
  if (!data || typeof data !== 'object') {
    return Response.json({error: 'Invalid response'}, {status: 400});
  }

  const {id, attending, polterabend, vegan} = data;
  const firstName = readText(data.firstName, 100);
  const lastName = readText(data.lastName, 100);
  const email = readText(data.email, 254);
  const allergies = readText(data.allergies, 1000);
  const songWish = readText(data.songWish, 500);

  if (
    typeof id !== 'string' ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id) ||
    !firstName || !lastName || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    (attending !== 'yes' && attending !== 'no') ||
    typeof polterabend !== 'boolean' || typeof vegan !== 'boolean' ||
    allergies === null || songWish === null
  ) {
    return Response.json({error: 'Invalid response'}, {status: 400});
  }

  try {
    const result = await supabaseRequest('?on_conflict=id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Prefer': 'resolution=ignore-duplicates,return=minimal'
      },
      body: JSON.stringify({
        id, firstName, lastName, email, attending, polterabend,
        vegan: attending === 'yes' && vegan,
        allergies: attending === 'yes' ? allergies : '',
        songWish: attending === 'yes' ? songWish : ''
      })
    });

    if (result.ok) return new Response(null, {status: 204});
    console.error('Supabase RSVP write failed', result.status);
  } catch {
    console.error('Supabase RSVP write unavailable');
  }

  return Response.json({error: 'Could not save response'}, {status: 503});
}

export async function GET(request: Request) {
  const password = process.env.GUESTLIST_PASSWORD;
  const authorization = request.headers.get('authorization') ?? '';
  const expected = password ? 'Bearer ' + password : '';
  if (!password || !timingSafeEqual(hash(authorization), hash(expected))) {
    return Response.json({error: 'Unauthorized'}, {status: 401, headers: noStore});
  }

  try {
    const result = await supabaseRequest('?select=*&order=submittedAt.desc');
    if (result.ok) return Response.json(await result.json(), {headers: noStore});
    console.error('Supabase guest list read failed', result.status);
  } catch {
    console.error('Supabase guest list unavailable');
  }

  return Response.json({error: 'Could not load guest list'}, {status: 503, headers: noStore});
}

function readText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length <= maxLength ? trimmed : null;
}

function hash(value: string) {
  return createHash('sha256').update(value).digest();
}
