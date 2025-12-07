import { STAGES, type StageKey, type Attachment } from '../../features/admin-panel/types'

export type DepartmentLetter = {
  id: string;
  author: 'BBF' | 'DEPARTMENT';
  date: string; // ISO yyyy-mm-dd
  content: string;
  tags?: string[];
  stage: StageKey;
  deadline?: string;
  attachments?: Attachment[];
};

export const departmentLettersMock: DepartmentLetter[] = [
  {
    id: 'l-1',
    author: 'BBF',
    date: '2025-06-10',
    content:
      'Prosimy o uzupełnienie brakujących informacji dotyczących wydatków na rok 2026 w obszarze cyberbezpieczeństwa.',
    tags: ['Budżet', 'Pilne'],
    stage: 'CZERWIEC',
    deadline: '2025-06-20',
    attachments: [
      { name: 'Latest Budget Sheet', url: 'https://docs.google.com/spreadsheets/d/example1', type: 'budget_sheet' }
    ]
  },
  {
    id: 'l-2',
    author: 'DEPARTMENT',
    date: '2025-06-15',
    content:
      'Przekazujemy wstępne uzupełnienia wraz z tabelą pomocniczą. Szczegóły w załączniku.',
    stage: 'CZERWIEC',
  },
    // BBF: deadline only
    {
      id: 'l-6',
      author: 'BBF',
      date: '2025-06-22',
      content: 'Przypomnienie terminu na uzupełnienia dla etapu CZERWIEC.',
      stage: 'CZERWIEC',
      deadline: '2025-06-25',
    },
    // BBF: attachments only
    {
      id: 'l-7',
      author: 'BBF',
      date: '2025-08-01',
      content: 'Przekazujemy zaktualizowane limity finansowe z MF.',
      stage: 'LIPIEC_SIERPIEN',
      attachments: [
        { name: 'Limity MF - Sierpień 2025', url: 'https://docs.google.com/spreadsheets/d/limits-aug-2025', type: 'limit_sheet' }
      ]
    },
    // BBF: both deadline and attachments
    {
      id: 'l-8',
      author: 'BBF',
      date: '2025-11-05',
      content: 'Prosimy o korektę planu wydatków zgodnie z wytycznymi.',
      stage: 'WRZESIEN_LISTOPAD',
      deadline: '2025-11-20',
      attachments: [
        { name: 'Wytyczne korekty budżetu', url: 'https://example.com/wytyczne-korekta', type: 'document' }
      ]
    },
    // BBF: none (no deadline, no attachments)
    {
      id: 'l-9',
      author: 'BBF',
      date: '2025-12-10',
      content: 'Potwierdzenie otrzymania arkusza. Brak uwag na tym etapie.',
      stage: 'GRUDZIEN',
    },
    // DEPARTMENT: attachments only
    {
      id: 'l-10',
      author: 'DEPARTMENT',
      date: '2025-07-05',
      content: 'Skorygowany budżet zgodny z przekazanymi limitami.',
      stage: 'LIPIEC_SIERPIEN',
      attachments: [
        { name: 'Latest Budget Sheet', url: 'https://docs.google.com/spreadsheets/d/updated-budget-july', type: 'budget_sheet' }
      ]
    },
    // DEPARTMENT: none
    {
      id: 'l-11',
      author: 'DEPARTMENT',
      date: '2025-12-22',
      content: 'Wyjaśnienie zmian w rozdziale 75095.',
      stage: 'GRUDZIEN',
    },
    // DEPARTMENT: multiple attachments
    {
      id: 'l-12',
      author: 'DEPARTMENT',
      date: '2026-02-10',
      content: 'Plan WI uzupełniony o źródła finansowania oraz szczegóły zadań.',
      stage: 'STYCZEN_LUTY',
      attachments: [
        { name: 'Plan WI (zaktualizowany)', url: 'https://example.com/plan-wi-2026', type: 'document' },
        { name: 'Dodatkowe materiały', url: 'https://example.com/misc', type: 'other' }
      ]
    },
  {
    id: 'l-3',
    author: 'BBF',
    date: '2025-07-20',
    content:
      'Prosimy o wyjaśnienie wzrostu planu wydatków w paragrafie 4300 wraz z uzasadnieniem.',
    tags: ['Wyjaśnienie'],
    stage: 'LIPIEC_SIERPIEN',
    deadline: '2025-08-10',
    attachments: [
      { name: 'Nowe limity MF - Lipiec 2025', url: 'https://docs.google.com/spreadsheets/d/limits1', type: 'limit_sheet' }
    ]
  },
  {
    id: 'l-4',
    author: 'DEPARTMENT',
    date: '2025-08-05',
    content:
      'Uzasadnienie wzrostu wydatków: rozszerzenie zakresu usług serwisowych oraz indeksacja cen.',
    stage: 'LIPIEC_SIERPIEN',
  },
  {
    id: 'l-5',
    author: 'BBF',
    date: '2025-09-15',
    content:
      'W Planie WI brakuje oznaczenia źródła finansowania dla wybranych zadań. Prosimy o uzupełnienie.',
    tags: ['Plan WI', 'Dane'],
    stage: 'WRZESIEN_LISTOPAD',
    attachments: [
      { name: 'Instrukcja uzupełnienia WI', url: 'https://example.com/doc-wi', type: 'document' }
    ]
  },
];

export const letterStages = Object.keys(STAGES) as StageKey[]
export type LetterStage = StageKey
