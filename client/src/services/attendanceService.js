import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getAttendance = async () => {
  const response = await API.get("/attendance");
  return response.data;
};

export const createAttendance = async (attendanceData) => {
  const response = await API.post("/attendance", attendanceData);
  return response.data;
};

export const updateAttendance = async (id, attendanceData) => {
  const response = await API.put(`/attendance/${id}`, attendanceData);
  return response.data;
};

export const deleteAttendance = async (id) => {
  const response = await API.delete(`/attendance/${id}`);
  return response.data;
};

export const saveSubjectAttendance = async (attendanceData) => {
  const response = await API.post(
    "/attendance/subject",
    attendanceData
  );

  return response.data;
};

export const getSubjectAttendanceSummary = async () => {
  const response = await API.get(
    "/attendance/subject-summary"
  );

  return response.data;
};

export const getAttendanceHistory = async (subjectId) => {
  const response = await API.get(
    `/attendance/history/${subjectId}`
  );

  return response.data;
};