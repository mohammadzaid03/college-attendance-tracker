import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getStudents = async () => {
  const response = await API.get("/students");
  return response.data;
};

export const createStudent = async (studentData) => {
  const response = await API.post("/students", studentData);
  return response.data;
};

export const updateStudent = async (id, studentData) => {
  const response = await API.put(`/students/update/${id}`, studentData);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await API.delete(`/students/${id}`);
  return response.data;
};