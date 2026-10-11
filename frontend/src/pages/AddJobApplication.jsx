import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobApplicationForm from "../components/JobApplicationForm";
import { getApiErrorMessage } from "../services/authService";
import { createJobApplication } from "../services/jobApplicationService";

function AddJobApplication() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submiting, setSubmiting] = useState(false);

  async function handelCreate(payload) {
    setError("");
    setSubmiting(true);
    try {
      await createJobApplication(payload);
      navigate("application", {
        replace: true,
        state: {
          message: "Job application added successfully"
        }
      });
    } catch (requsetError) {
      setError(getApiErrorMessage(requsetError));
    } finally {
      setSubmiting(false);
    }
  }
  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <h1 className="h3 mb-4">Add Job Application</h1>

          {error &&
            <div className="alert alert-danger">
              {error}
            </div>}
          <JobApplicationForm
            onSubmit={handelCreate}
            submitLabel="Add Application"
            submitting={submiting}
          />
        </div>
      </div>
    </div>
  );
}

export default AddJobApplication;
