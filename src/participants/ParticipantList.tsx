import { useEffect, useState } from "react";
import { Participant } from "../api/types";
import { getParticipants } from "../api/participantApi";
import "./ParticipantList.css";
import { useNavigate } from "react-router-dom";

export default function ParticipantList() {
  const [participants, setParticipants] = useState<Participant[]>([]);
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
    }
  }

  function renderParticipantRow(participant: Participant, age: string) {
    return (
      <tr key={participant.id}>
        <td>{participant.id}</td>
        <td className="td-par-string">{participant.fullName}</td>
        <td className="td-par-string">{participant.email}</td>
        <td className="td-par-string">{participant.gender}</td>
        <td className="td-par-string">{participant.birthdate}</td>
        <td className="td-par-string">{ageGroup(Number(age))}</td>
        <td className="td-par-string">{participant.club}</td>
        <td>
          <button>. . .</button>
        </td>
      </tr>
    );
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
      <br />
      <br />
      <table id="participant-table">
        <thead>
          <tr>
            <th>Participant ID</th>
            <th>Full Name </th>
            <th>Email</th>
            <th>Gender</th>
            <th>Birthdate</th>
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
    </div>
  );
}
