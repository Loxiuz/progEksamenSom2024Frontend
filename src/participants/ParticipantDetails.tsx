import { useNavigate } from "react-router-dom";
import { ParticipantDialogProps } from "../api/types";
import "./ParticipantDetails.css";
import { deleteParticipant } from "../api/participantApi";

export default function ParticipantDetails(props: ParticipantDialogProps) {
  const { participant, open, onClose, ageGroup } = props;
  const nav = useNavigate();

  function handleEdit() {
    nav("/participants/form", { state: { id: participant.id } });
  }

  async function handleDelete() {
    if (participant.id) {
      await deleteParticipant(participant.id);
      alert("Participant deleted successfully!");
      window.location.reload();
    }
  }

  return (
    <>
      {open && (
        <dialog open id="participant-details-dialog">
          <div id="participant-details-dialog-content">
            <h2>Participant Details</h2>
            <p>Full Name: {participant.fullName}</p>
            <p>Email: {participant.email}</p>
            <p>Gender: {participant.gender}</p>
            <p>Birthdate: {participant.birthdate}</p>
            <p>Age Group: {ageGroup}</p>
            <p>Club: {participant.club}</p>
            <div id="participantDialogBtns">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
