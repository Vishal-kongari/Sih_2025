// Minimal sentiment detection helper
// Simulates a tiny RNN-like state machine; falls back to keyword matching

export type Sentiment = 'ok' | 'distress';

const distressKeywords = [
  // Direct suicidal ideation
  'i want to end my life',
  'i am done',
  'iam done',
  'i will die',
  'iwill die',
  'i want to kill myself',
  'iwant to kill myself',
  'kill myself',
  'end my life',
  'end it all',
  'suicide',
  'suicidal',
  'not worth living',
  'no reason to live',
  'better off dead',
  'world without me',
  
  // Hopelessness and despair
  'i can\'t go on',
  'cant go on',
  'nothing makes sense anymore',
  'nothing matters',
  'pointless',
  'hopeless',
  'give up',
  'giving up',
  'i give up',
  'no point',
  'no hope',
  'never get better',
  'always be like this',
  'can\'t take it anymore',
  'cant take it anymore',
  'too much to handle',
  'overwhelmed',
  'drowning',
  'suffocating',
  
  // Self-harm indicators
  'hurt myself',
  'cut myself',
  'self harm',
  'selfharm',
  'harm myself',
  'pain myself',
  'punish myself',
  'deserve to suffer',
  'deserve pain',
  
  // Emotional distress patterns
  'i hate myself',
  'hate myself',
  'worthless',
  'useless',
  'burden',
  'everyone hates me',
  'nobody cares',
  'no one cares',
  'alone',
  'lonely',
  'empty',
  'numb',
  'dead inside',
  'broken',
  'damaged',
  'ruined',
  'failure',
  'disappointment',
  'let everyone down',
  'disappointed everyone',
  
  // Crisis language
  'emergency',
  'crisis',
  'urgent help',
  'need help now',
  'can\'t cope',
  'cant cope',
  'breaking down',
  'falling apart',
  'losing it',
  'going crazy',
  'losing control',
  'out of control'
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


