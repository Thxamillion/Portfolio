export async function GET() {
  return new Response('Test API works!', { status: 200 });
}

export async function POST() {
  return new Response('POST test works!', { status: 200 });
}