import { useEffect, useState } from "react";
import { EMPTY_PARTICIPANT, Participant } from "../api/types";
import "./ParticipantForm.css";
import { createUpdateParticipant } from "../api/participantApi";

export default function ParticipantForm() {
  const [participantForm, setParticipantForm] =
    useState<Participant>(EMPTY_PARTICIPANT);

  useEffect(() => {
    console.log(participantForm);
  }, [participantForm]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    setParticipantForm((prevParticipant) => ({
      ...prevParticipant,
      [name]: value,
    }));
  }

  function handleSelectionChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.currentTarget;
    setParticipantForm((prevParticipant) => ({
      ...prevParticipant,
      [name]: value,
    }));
  }

  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    const response = await createUpdateParticipant(participantForm);
    if (response) {
      alert("Participant added successfully!");
      window.location.reload();
    }
  }

  return (
    <div id="participant-form-page">
      <h2>Add Participant</h2>
      <form id="participant-form">
        <div>
          <label htmlFor="fullName">Full Name: </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <select
            name="gender"
            id="gender"
            onChange={handleSelectionChange}
            defaultValue={"default"}
          >
            <option value="default">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="birthdate">Birthdate: </label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="club">Club: </label>
          <input
            type="text"
            id="club"
            name="club"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button onClick={handleSubmit}>Add Participant</button>
        </div>
      </form>
    </div>
  );
}
