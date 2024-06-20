interface Template {
  id: number | null;
  name: string;
  description: string;
}

interface Participant {
  id: number | null;
  fullName: string;
  email: string;
  gender: string;
  birthDate: string;
  club: string;
}

interface Discipline {
  id: number | null;
  name: string;
  resultType: string;
}

interface Result {
  id: number | null;
  participantId: number;
  disciplineId: number;
  date: string;
  value: string;
}

export type { Template, Participant, Discipline, Result };
