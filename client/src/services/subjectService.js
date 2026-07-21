import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getSubjects = async () => {
  const response = await API.get("/subjects");
  return response.data;
};
export const createSubject = async (subjectData) => {
  const response = await API.post("/subjects", subjectData);
  return response.data;
};

export const updateSubject = async (id, subjectData) => {
  const response = await API.put(`/subjects/${id}`, subjectData);
  return response.data;
};

export const deleteSubject = async (id) => {
  const response = await API.delete(`/subjects/${id}`);
  return response.data;
};