import { useEffect, useState } from "react";
import { Participant, ParticipantSelectorDialogProps } from "../api/types";
import { getParticipants } from "../api/participantApi";

export default function ParticipantSelectorDialog(
  props: ParticipantSelectorDialogProps
) {
  const { open, onSelect } = props;
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const response = await getParticipants();
      setParticipants(response);
    };
    fetchParticipants();
  }, [setParticipants]);

  return (
    <div>
      {open && (
        <dialog open>
          <h2>Select Participant</h2>
          <ul>
            {participants.map((participant) => (
              <li key={participant.id}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onSelect(participant);
                  }}
                >
                  {participant.fullName}
                </button>
              </li>
            ))}
          </ul>
        </dialog>
      )}
    </div>
  );
}
