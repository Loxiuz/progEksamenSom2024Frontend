import { API_URL } from "../settings";
import { handleHttpErrors, makeOptions } from "./fetchUtils";
import { Result } from "./types";

const RESULT_URL = API_URL + "/results";

async function getResults(): Promise<Result[]> {
  return fetch(RESULT_URL).then(handleHttpErrors);
}

async function getResult(id: number): Promise<Result> {
  return fetch(`${RESULT_URL}/${id}`).then(handleHttpErrors);
}

async function createUpdateResult(newResult: Result): Promise<Result> {
  const method = newResult.id ? "PUT" : "POST";
  const options = makeOptions(method, newResult);
  const URL = newResult.id ? `${RESULT_URL}/${newResult.id}` : RESULT_URL;
  return fetch(URL, options).then(handleHttpErrors);
}

async function deleteResult(id: number): Promise<void> {
  return fetch(`${RESULT_URL}/${id}`, {
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

export { getResults, getResult, createUpdateResult, deleteResult };
