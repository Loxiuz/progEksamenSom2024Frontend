import { API_URL } from "../settings";
import { handleHttpErrors } from "./fetchUtils";
import { Discipline } from "./types";

const DISCIPLINE_URL = API_URL + "/disciplines";

async function getDisciplines(): Promise<Discipline[]> {
  return fetch(DISCIPLINE_URL).then(handleHttpErrors);
}

export { getDisciplines };
