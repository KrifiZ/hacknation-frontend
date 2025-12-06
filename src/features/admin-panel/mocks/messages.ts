import type { Message } from "../types";

export const mockMessages: Record<string, Message[]> = {
  "1": [
    { 
      id: "m1", 
      from: "komorka", 
      content: "Przesyłamy wniosek o dofinansowanie na rok 2025. W załączniku aktualny arkusz budżetowy z uzasadnieniami wszystkich pozycji.", 
      timestamp: "2024-06-10 09:30", 
      stage: "CZERWIEC",
      attachments: [{ name: "Latest Budget Sheet", url: "https://docs.google.com/spreadsheets/d/example1", type: "budget_sheet" }]
    },
    { 
      id: "m2", 
      from: "bbf", 
      content: "Proszę o rozszerzenie uzasadnienia pozycji nr 5 oraz 12. Brakuje szczegółowego opisu przeznaczenia środków.", 
      timestamp: "2024-06-12 14:20", 
      stage: "CZERWIEC",
      deadline: "2024-06-20"
    },
    { 
      id: "m3", 
      from: "komorka", 
      content: "Poprawiony arkusz z rozszerzonymi uzasadnieniami pozycji 5 i 12.", 
      timestamp: "2024-06-15 10:00", 
      stage: "CZERWIEC",
      attachments: [{ name: "Latest Budget Sheet", url: "https://docs.google.com/spreadsheets/d/example1v2", type: "budget_sheet" }]
    },
    { 
      id: "m4", 
      from: "bbf", 
      content: "Nowe limity finansowe z MF. Proszę o dostosowanie budżetu.", 
      timestamp: "2024-07-20 11:00", 
      stage: "LIPIEC_SIERPIEN",
      deadline: "2024-08-10",
      isLimitSheet: true,
      attachments: [{ name: "Nowe limity MF - Lipiec 2024", url: "https://docs.google.com/spreadsheets/d/limits1", type: "limit_sheet" }]
    },
    { 
      id: "m5", 
      from: "komorka", 
      content: "Przesyłamy skorygowany budżet zgodny z limitami. Załączamy również pismo z prośbą o dodatkowe środki na szkolenia.", 
      timestamp: "2024-08-05 09:15", 
      stage: "LIPIEC_SIERPIEN",
      attachments: [
        { name: "Latest Budget Sheet", url: "https://docs.google.com/spreadsheets/d/example1v3", type: "budget_sheet" },
        { name: "Pismo - wniosek o dodatkowe środki", url: "https://example.com/doc1", type: "document" }
      ]
    },
    { 
      id: "m6", 
      from: "bbf", 
      content: "Kolejna aktualizacja limitów z MF. Proszę o ponowną weryfikację i dostosowanie budżetu.", 
      timestamp: "2024-09-15 10:30", 
      stage: "WRZESIEN_LISTOPAD",
      deadline: "2024-09-30",
      isLimitSheet: true,
      attachments: [{ name: "Nowe limity MF - Wrzesień 2024", url: "https://docs.google.com/spreadsheets/d/limits2", type: "limit_sheet" }]
    },
    { 
      id: "m7", 
      from: "komorka", 
      content: "Zaktualizowany budżet zgodny z nowymi limitami. Podtrzymujemy prośbę o dodatkowe środki.", 
      timestamp: "2024-09-20 14:00", 
      stage: "WRZESIEN_LISTOPAD",
      attachments: [{ name: "Latest Budget Sheet", url: "https://docs.google.com/spreadsheets/d/example1v4", type: "budget_sheet" }]
    },
  ],
  "2": [
    { 
      id: "m9", 
      from: "komorka", 
      content: "Wniosek o dofinansowanie - priorytet: modernizacja infrastruktury IT.", 
      timestamp: "2024-06-08 10:00", 
      stage: "CZERWIEC",
      attachments: [{ name: "Latest Budget Sheet", url: "https://docs.google.com/spreadsheets/d/example2", type: "budget_sheet" }]
    },
    { 
      id: "m10", 
      from: "bbf", 
      content: "Proszę o doprecyzowanie uzasadnień w sekcji 'Sprzęt komputerowy' - zbyt ogólne kategorie.", 
      timestamp: "2024-06-14 15:30", 
      stage: "CZERWIEC",
      deadline: "2024-06-25"
    },
    { 
      id: "m11", 
      from: "komorka", 
      content: "Poprawki naniesione. Rozbiliśmy uzasadnienia na poszczególne jednostki sprzętowe.", 
      timestamp: "2024-06-18 11:45", 
      stage: "CZERWIEC",
      attachments: [{ name: "Latest Budget Sheet", url: "https://docs.google.com/spreadsheets/d/example2v2", type: "budget_sheet" }]
    },
    { 
      id: "m12", 
      from: "bbf", 
      content: "Nowe limity MF - przekroczenie o 120 000 PLN. Konieczna redukcja w formułkach finansowych.", 
      timestamp: "2024-07-25 09:00", 
      stage: "LIPIEC_SIERPIEN",
      deadline: "2024-08-15",
      isLimitSheet: true,
      attachments: [{ name: "Nowe limity MF - Lipiec 2024", url: "https://docs.google.com/spreadsheets/d/limits1", type: "limit_sheet" }]
    },
    { 
      id: "m13", 
      from: "komorka", 
      content: "Dostosowany budżet z redukcją. Pismo z prośbą o wyjątek dla projektu modernizacji serwerowni.", 
      timestamp: "2024-08-10 16:00", 
      stage: "LIPIEC_SIERPIEN",
      attachments: [
        { name: "Latest Budget Sheet", url: "https://docs.google.com/spreadsheets/d/example2v3", type: "budget_sheet" },
        { name: "Pismo - wniosek o wyjątek", url: "https://example.com/doc2", type: "document" }
      ]
    },
    { 
      id: "m14", 
      from: "bbf", 
      content: "Przedłużamy termin na korektę do 2024-09-05 ze względu na złożoność projektu.", 
      timestamp: "2024-08-20 10:00", 
      stage: "LIPIEC_SIERPIEN",
      deadline: "2024-09-05",
      isDeadlineExtension: true
    },
    { 
      id: "m15", 
      from: "komorka", 
      content: "Dziękujemy za przedłużenie. Przesyłamy finalną korektę budżetu.", 
      timestamp: "2024-09-03 13:30", 
      stage: "LIPIEC_SIERPIEN",
      attachments: [{ name: "Latest Budget Sheet", url: "https://docs.google.com/spreadsheets/d/example2v4", type: "budget_sheet" }]
    },
  ],
  "3": [
    { 
      id: "m19", 
      from: "komorka", 
      content: "Przesyłamy wstępny arkusz budżetowy z uzasadnieniami.", 
      timestamp: "2024-06-05 08:00", 
      stage: "CZERWIEC",
      attachments: [{ name: "Latest Budget Sheet", url: "https://docs.google.com/spreadsheets/d/example3", type: "budget_sheet" }]
    },
  ],
  "4": [
    { 
      id: "m21", 
      from: "komorka", 
      content: "Przesyłamy wniosek budżetowy. Prosimy o przedłużenie terminu ze względu na problemy kadrowe.", 
      timestamp: "2024-06-12 11:00", 
      stage: "CZERWIEC",
      attachments: [{ name: "Latest Budget Sheet", url: "https://docs.google.com/spreadsheets/d/example4", type: "budget_sheet" }]
    },
    { 
      id: "m22", 
      from: "bbf", 
      content: "Przedłużenie przyznane do 2024-07-05. Po tym terminie korekty nie będą przyjęte.", 
      timestamp: "2024-06-12 15:30", 
      stage: "CZERWIEC",
      deadline: "2024-07-05",
      isDeadlineExtension: true
    },
    { 
      id: "m23", 
      from: "komorka", 
      content: "Dziękujemy. Przesyłamy uzupełniony arkusz z pełnymi uzasadnieniami.", 
      timestamp: "2024-06-20 09:00", 
      stage: "CZERWIEC",
      attachments: [{ name: "Latest Budget Sheet", url: "https://docs.google.com/spreadsheets/d/example4v2", type: "budget_sheet" }]
    },
    { 
      id: "m24", 
      from: "bbf", 
      content: "Przyjęto. Uzasadnienia kompletne, brak uwag.", 
      timestamp: "2024-06-22 14:00", 
      stage: "CZERWIEC"
    },
    { 
      id: "m25", 
      from: "komorka", 
      content: "Potwierdzamy otrzymanie akceptacji.", 
      timestamp: "2024-06-23 10:00", 
      stage: "CZERWIEC"
    },
  ],
  "5": [
    { 
      id: "m29", 
      from: "komorka", 
      content: "Przesyłamy kompletny arkusz. Główne wydatki: szkolenia personelu i narzędzia.", 
      timestamp: "2024-06-09 10:30", 
      stage: "CZERWIEC",
      attachments: [{ name: "Latest Budget Sheet", url: "https://docs.google.com/spreadsheets/d/example5", type: "budget_sheet" }]
    },
    { 
      id: "m30", 
      from: "bbf", 
      content: "Proszę o uzasadnienie wysokich kosztów szkoleń zewnętrznych.", 
      timestamp: "2024-06-13 14:00", 
      stage: "CZERWIEC",
      deadline: "2024-06-22"
    },
    { 
      id: "m31", 
      from: "komorka", 
      content: "Uzasadnienie: szkolenia certyfikowane wymagane przez nowe regulacje. Szczegóły w załączniku.", 
      timestamp: "2024-06-16 09:30", 
      stage: "CZERWIEC",
      attachments: [
        { name: "Latest Budget Sheet", url: "https://docs.google.com/spreadsheets/d/example5v2", type: "budget_sheet" },
        { name: "Uzasadnienie szkoleń", url: "https://example.com/doc5", type: "document" }
      ]
    },
  ],
  "6": [
    { 
      id: "m33", 
      from: "komorka", 
      content: "Arkusz z prośbą o dofinansowanie - focus na rozwój produktu.", 
      timestamp: "2024-06-11 08:45", 
      stage: "CZERWIEC",
      attachments: [{ name: "Latest Budget Sheet", url: "https://docs.google.com/spreadsheets/d/example6", type: "budget_sheet" }]
    },
    { 
      id: "m34", 
      from: "bbf", 
      content: "Pozycje 3, 7, 12 wymagają lepszego uzasadnienia. Zbyt ogólne opisy.", 
      timestamp: "2024-06-15 13:20", 
      stage: "CZERWIEC",
      deadline: "2024-06-25"
    },
    { 
      id: "m35", 
      from: "komorka", 
      content: "Poprawiony arkusz z rozbudowanymi uzasadnieniami.", 
      timestamp: "2024-06-19 10:15", 
      stage: "CZERWIEC",
      attachments: [{ name: "Latest Budget Sheet", url: "https://docs.google.com/spreadsheets/d/example6v2", type: "budget_sheet" }]
    },
  ],
};
