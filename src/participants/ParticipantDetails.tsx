import { ParticipantDialogProps } from "../api/types";
import "./ParticipantDetails.css";

export default function ParticipantDetails(props: ParticipantDialogProps) {
  const { participant, open, onClose, ageGroup } = props;

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
              <button>Edit</button>
              <button>Delete</button>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
