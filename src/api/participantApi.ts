import { API_URL } from "../settings";
import { handleHttpErrors, makeOptions } from "./fetchUtils";
import { Participant } from "./types";

const PARTICIPANT_URL = API_URL + "/participants";

async function getParticipants(): Promise<Participant[]> {
  return fetch(PARTICIPANT_URL).then(handleHttpErrors);
}

async function getParticipant(id: number): Promise<Participant> {
  return fetch(`${PARTICIPANT_URL}/${id}`).then(handleHttpErrors);
}

async function createUpdateParticipant(
  newParticipant: Participant
): Promise<Participant> {
  const method = newParticipant.id ? "PUT" : "POST";
  const options = makeOptions(method, newParticipant);
  const URL = newParticipant.id
    ? `${PARTICIPANT_URL}/${newParticipant.id}`
    : PARTICIPANT_URL;
  return fetch(URL, options).then(handleHttpErrors);
}

async function deleteParticipant(id: number): Promise<void> {
  return fetch(`${PARTICIPANT_URL}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

export {
  getParticipants,
  getParticipant,
  createUpdateParticipant,
  deleteParticipant,
};
