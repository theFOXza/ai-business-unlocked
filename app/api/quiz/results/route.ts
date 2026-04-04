import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return Response.json({ ok: false, error: 'Missing id' }, { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'quiz-results', `${id}.json`);
    const raw = await fs.readFile(filePath, 'utf-8');
    const result = JSON.parse(raw);
    return Response.json({ ok: true, result });
  } catch {
    return Response.json({ ok: false, error: 'Not found' }, { status: 404 });
  }
}
