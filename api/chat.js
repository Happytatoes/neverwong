export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify(req.body),
  });

  res.status(response.status);
  response.headers.forEach((v, k) => res.setHeader(k, v));
  response.body.pipeTo(new WritableStream({
    write(chunk) { res.write(chunk); },
    close() { res.end(); },
  }));
}