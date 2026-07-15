import { DiagnosisQuestion } from '@/types/diagnosis';

export const DIAGNOSIS_QUESTIONS: DiagnosisQuestion[] = [
  {
    id: 1,
    text: '新しい環境に適応するのが得意だ',
    category: 'personality',
  },
  {
    id: 2,
    text: '人間関係を築くのが得意だ',
    category: 'personality',
  },
  {
    id: 3,
    text: '計画的に物事を進めるのが好きだ',
    category: 'behavior',
  },
  {
    id: 4,
    text: '感情的になりやすい',
    category: 'emotion',
  },
  {
    id: 5,
    text: 'ストレスを感じやすい',
    category: 'emotion',
  },
  {
    id: 6,
    text: '夜型の生活をしている',
    category: 'lifestyle',
  },
  {
    id: 7,
    text: '運動をよくする',
    category: 'lifestyle',
  },
  {
    id: 8,
    text: '独創的なアイデアを思いつきやすい',
    category: 'preference',
  },
  {
    id: 9,
    text: '他者の意見に左右されやすい',
    category: 'preference',
  },
  {
    id: 10,
    text: '完璧主義的である',
    category: 'behavior',
  },
  {
    id: 11,
    text: '瞑想や自己反省をよくする',
    category: 'lifestyle',
  },
  {
    id: 12,
    text: '社交活動を積極的に行う',
    category: 'behavior',
  },
  {
    id: 13,
    text: '自分の感情をコントロールできている',
    category: 'emotion',
  },
  {
    id: 14,
    text: '新しいことに挑戦するのが好きだ',
    category: 'preference',
  },
  {
    id: 15,
    text: '日々の生活に充実感を感じている',
    category: 'emotion',
  },
];

export const PERSONALITY_TYPES = [
  { id: 'luna', name: '月の猫', description: '神秘的で直感的、深い思考を持つ' },
  { id: 'sol', name: '太陽の猫', description: '明るく社交的、エネルギッシュ' },
  { id: 'star', name: '星の猫', description: '独創的で自由奔放、個性的' },
  { id: 'wind', name: '風の猫', description: '柔軟で適応力が高い、変化を好む' },
];

export const DISORDER_TYPES = [
  { id: 'calm', name: '整っている', description: 'バランスの取れた状態' },
  { id: 'slight', name: 'やや乱れている', description: 'ストレスが少しある状態' },
  { id: 'moderate', name: '乱れている', description: 'ストレスが溜まっている状態' },
  { id: 'significant', name: 'かなり乱れている', description: '大きなストレスを感じている状態' },
];
