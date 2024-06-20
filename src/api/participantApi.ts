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
  const options = makeOptions("DELETE", null);
  return fetch(`${PARTICIPANT_URL}/${id}`, options).then(handleHttpErrors);
}

export {
  getParticipants,
  getParticipant,
  createUpdateParticipant,
  deleteParticipant,
};
