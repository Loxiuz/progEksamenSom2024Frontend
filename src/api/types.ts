interface Participant {
  id: number | null;
  fullName: string;
  email: string;
  gender: string;
  birthdate: string;
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

const EMPTY_PARTICIPANT: Participant = {
  id: null,
  fullName: "",
  email: "",
  gender: "",
  birthdate: "",
  club: "",
};

export { EMPTY_PARTICIPANT };

export type { Participant, Discipline, Result };
