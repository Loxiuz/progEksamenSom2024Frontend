interface Participant {
  id: number | null;
  fullName: string;
  email: string;
  gender: string;
  birthdate: string;
  club: string;
}

interface ParticipantDialogProps {
  participant: Participant;
  ageGroup: string;
  open: boolean;
  onClose: () => void;
}

interface ParticipantSelectorDialogProps {
  open: boolean;
  onSelect: (participant: Participant) => void;
}

const EMPTY_PARTICIPANT: Participant = {
  id: null,
  fullName: "",
  email: "",
  gender: "gender",
  birthdate: "",
  club: "",
};

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

const EMPTY_RESULT: Result = {
  id: null,
  participantId: 0,
  disciplineId: 0,
  date: "",
  value: "",
};

function ageGroup(age: number) {
  if (age >= 6 && age <= 9) {
    return "child";
  } else if (age >= 10 && age <= 13) {
    return "youngster";
  } else if (age >= 14 && age <= 22) {
    return "junior";
  } else if (age >= 23 && age <= 40) {
    return "adult";
  } else if (age >= 41) {
    return "senior";
  } else {
    return "";
  }
}

export { EMPTY_PARTICIPANT, EMPTY_RESULT, ageGroup };

export type {
  Participant,
  Discipline,
  Result,
  ParticipantDialogProps,
  ParticipantSelectorDialogProps,
};
