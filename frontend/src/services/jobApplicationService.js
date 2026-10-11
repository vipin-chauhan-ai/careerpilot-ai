import api from "./api";

export async function getJobApplications() {
  const response = await api.get("api/v1/job-applications");
  return response.data;
}
export async function getJobApplication(applicationId) {
  const response = await api.get(`api/v1/job-applications/${applicationId}`);
  return response.data;
}
export async function createJobApplication(payload) {
  const response = await api.post(`api/v1/job-applications`, payload);
  return response.data;
}
export async function updateJobApplication(applicationId, payload) {
  const response = await api.patch(
    `api/v1/job-applications/${applicationId}`,
    payload
  );
  return response.data;
}
export async function deleteJobApplication(applicationId) {
  const response = await api.delete(`api/v1/job-applications/${applicationId}`);
  return response.data;
}
