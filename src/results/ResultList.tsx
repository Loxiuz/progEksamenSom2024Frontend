import { useEffect, useState } from "react";
import { Discipline, Participant, Result } from "../api/types";
import { deleteResult, getResults } from "../api/resultApi";
import { getParticipants } from "../api/participantApi";
import { getDisciplines } from "../api/disciplineApi";
import "./ResultList.css";
import { useNavigate } from "react-router-dom";

export default function ResultList() {
  const [results, setResults] = useState<Result[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      const resultResponse = await getResults();
      const disciplineResponse = await getDisciplines();
      const participantResponse = await getParticipants();
      setResults(resultResponse);
      setDisciplines(disciplineResponse);
      setParticipants(participantResponse);
    };
    fetchResults();
  }, []);

  function renderResultRow(result: Result) {
    const participant = participants.find(
      (participant) => participant.id === result.participantId
    );
    const discipline = disciplines.find(
      (discipline) => discipline.id === result.disciplineId
    );

    async function handleDelete(id: number) {
      if (id > 0) {
        await deleteResult(id);
        alert("Result deleted");
        window.location.reload();
      }
    }

    return (
      <tr key={result.id}>
        <td>{participant?.fullName}</td>
        <td>{discipline?.name}</td>
        <td>{result.date}</td>
        <td>{result.value}</td>
        <td>{discipline?.resultType}</td>
        <td className="edit-delete-btns">
          <button
            onClick={() => {
              nav(`/results/form`, { state: { r: result } });
            }}
          >
            Edit
          </button>
        </td>
        <td className="edit-delete-btns">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDelete(result.id || 0);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }

  return (
    <div>
      <h2>Results</h2>
      <button
        onClick={() => {
          nav("/results/form");
        }}
      >
        Add Result
      </button>
      <br />
      <br />
      <table id="result-table">
        <thead>
          <tr>
            <th>Participant</th>
            <th>Discipline</th>
            <th>Date</th>
            <th>Value</th>
            <th>Value Type</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{results.map(renderResultRow)}</tbody>
      </table>
    </div>
  );
}
