import { useEffect, useState } from "react";
import {
  Discipline,
  EMPTY_PARTICIPANT,
  EMPTY_RESULT,
  Participant,
  Result,
} from "../api/types";
import "./ResultForm.css";
import ParticipantSelectorDialog from "../participants/ParticipantSelectorDialog";
import { getDisciplines } from "../api/disciplineApi";
import { createUpdateResult } from "../api/resultApi";

export default function ResultForm() {
  const [resultForm, setResultForm] = useState<Result>(EMPTY_RESULT);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant>(EMPTY_PARTICIPANT);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchDisciplines = async () => {
      const response = await getDisciplines();
      setDisciplines(response);
    };
    fetchDisciplines();
  }, [setDisciplines]);

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setResultForm({ ...resultForm, [name]: value });
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setResultForm({ ...resultForm, [name]: parseInt(value) });
  }

  function handleParticipantSelect(participant: Participant) {
    setSelectedParticipant(participant);
    setResultForm({ ...resultForm, participantId: participant.id || 0 });
    setIsDialogOpen(false);
  }

  function disciplineOptions() {
    return disciplines.map((discipline) => (
      <option key={discipline.id} value={`${discipline.id}`}>
        {discipline.name}
      </option>
    ));
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const response = await createUpdateResult(resultForm);
    if (response) {
      alert("Result added successfully!");
      window.location.reload();
    }
  }

  useEffect(() => {
    console.log(resultForm);
  }, [resultForm]);

  return (
    <div>
      <h2>Add Result</h2>
      <form id="result-form">
        <div id="participant-selector">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsDialogOpen(true);
            }}
          >
            Select Participant
          </button>
          <h4>Participant: {`${selectedParticipant.fullName}`}</h4>
        </div>
        <select
          name="disciplineId"
          id="discipline"
          defaultValue={"discipline"}
          onChange={handleSelectChange}
        >
          <option value="discipline" disabled>
            Discipline
          </option>
          {disciplineOptions()}
        </select>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="value">Value</label>
          <input
            type="text"
            name="value"
            id="value"
            onChange={handleFormChange}
          />
        </div>
        <button onClick={handleSubmit}>Confirm</button>
      </form>
      <ParticipantSelectorDialog
        open={isDialogOpen}
        onSelect={handleParticipantSelect}
      />
    </div>
  );
}
