// Minimal sentiment detection helper
// Simulates a tiny RNN-like state machine; falls back to keyword matching

export type Sentiment = 'ok' | 'distress';

const distressKeywords = [
  'i want to end my life',
  'i am done',
  'iam done',
  'i will die',
  'iwill die',
  'i want to kill myself',
  'iwant to kill myself',
  'nothing makes sense anymore',
  'suicide',
  'end it all',
  'no reason to live',
  'i can\'t go on',
  'cant go on',
];

export class TinySentimentRNN {
  private prevScore = 0;

  evaluate(text: string): Sentiment {
    // Normalize text: lowercase, collapse spaces, remove punctuation
    const t = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    const tNoSpaces = t.replace(/\s+/g, '');
    if (distressKeywords.some(k => t.includes(k) || tNoSpaces.includes(k.replace(/\s+/g, '')))) return 'distress';
    // Toy RNN-like update: vowels and negatives increase score
    const negWords = ['no', 'not', "n't", 'never', 'nobody', 'nothing'];
    const base = (t.match(/[aeiou]/g)?.length || 0) * 0.01;
    const neg = negWords.reduce((acc, w) => acc + (t.includes(` ${w} `) ? 0.2 : 0), 0);
    this.prevScore = Math.max(0, Math.min(1, 0.5 * this.prevScore + base + neg));
    return this.prevScore > 0.85 ? 'distress' : 'ok';
  }
}


