import { useEffect, useState } from "react";
import { Participant, ageGroup } from "../api/types";
import { getParticipants } from "../api/participantApi";
import "./ParticipantList.css";
import { useNavigate } from "react-router-dom";
import ParticipantDetails from "./ParticipantDetails";

export default function ParticipantList() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [chosenParticipant, setChosenParticipant] =
    useState<Participant | null>(null);
  const [chosenParticipantAgeGroup, setChosenParticipantAgeGroup] =
    useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [ages, setAges] = useState<string[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchParticipants = async () => {
      const response = await getParticipants();
      setParticipants(response);
    };
    fetchParticipants();
  }, [setParticipants]);

  useEffect(() => {
    const ages = participants.map((participant) => {
      const birthdate = new Date(participant.birthdate);
      const age = new Date().getFullYear() - birthdate.getFullYear();
      return age.toString();
    });
    setAges(ages);
  }, [participants, setAges]);

  function renderParticipantRow(participant: Participant, age: string) {
    return (
      <tr key={participant.id}>
        <td>{participant.id}</td>
        <td className="td-par-string">{participant.fullName}</td>
        <td className="td-par-string">{participant.gender}</td>
        <td className="td-par-string">{ageGroup(Number(age))}</td>
        <td className="td-par-string">{participant.club}</td>
        <td>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDetailsClick(participant, ageGroup(Number(age)));
            }}
          >
            . . .
          </button>
        </td>
      </tr>
    );
  }

  function handleDetailsClick(participant: Participant, ageGroup: string) {
    setChosenParticipantAgeGroup(ageGroup);
    setChosenParticipant(participant);
    setDialogOpen(true);
  }

  function dialogClose() {
    setDialogOpen(false);
  }

  return (
    <div>
      <h2>Participants</h2>
      <button
        onClick={() => {
          nav("/participant/form");
        }}
      >
        Add Participant
      </button>
      <button
        onClick={() => {
          nav("/results");
        }}
      >
        All Results
      </button>
      <br />
      <br />
      <table id="participant-table">
        <thead>
          <tr>
            <th>Participant ID</th>
            <th>Full Name </th>
            <th>Gender</th>
            <th>Age Group</th>
            <th>Club</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p, i) => {
            return renderParticipantRow(p, ages[i]);
          })}
        </tbody>
      </table>
      {chosenParticipant && (
        <ParticipantDetails
          participant={chosenParticipant}
          open={dialogOpen}
          onClose={dialogClose}
          ageGroup={chosenParticipantAgeGroup}
        />
      )}
    </div>
  );
}
