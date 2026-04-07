import { gunzipSync, gzipSync } from 'zlib';
import type { QuizSubmission } from '@/lib/quiz-scoring';

export function encodeQuizSnapshotToken(submission: QuizSubmission): string {
  const json = JSON.stringify(submission);
  return gzipSync(Buffer.from(json, 'utf-8')).toString('base64url');
}

export function decodeQuizSnapshotToken(token: string): QuizSubmission | null {
  try {
    const json = gunzipSync(Buffer.from(token, 'base64url')).toString('utf-8');
    return JSON.parse(json) as QuizSubmission;
  } catch {
    return null;
  }
}
