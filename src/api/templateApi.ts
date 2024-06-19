import { API_URL } from "../settings";
import { handleHttpErrors, makeOptions } from "./fetchUtils";
import { Template } from "./types";

const TEMPLATE_URL = API_URL + "/templates";

async function getTemplates(): Promise<Template[]> {
  return fetch(TEMPLATE_URL).then(handleHttpErrors);
}

async function getTemplate(id: number): Promise<Template> {
  return fetch(`${TEMPLATE_URL}/${id}`).then(handleHttpErrors);
}

async function createUpdateTemplate(newTemplate: Template): Promise<Template> {
  const method = newTemplate.id ? "PUT" : "POST";
  const options = makeOptions(method, newTemplate);
  const URL = newTemplate.id
    ? `${TEMPLATE_URL}/${newTemplate.id}`
    : TEMPLATE_URL;
  return fetch(URL, options).then(handleHttpErrors);
}

async function deleteTemplate(id: number): Promise<void> {
  const options = makeOptions("DELETE", null);
  return fetch(`${TEMPLATE_URL}/${id}`, options).then(handleHttpErrors);
}

export { getTemplates, getTemplate, createUpdateTemplate, deleteTemplate };
