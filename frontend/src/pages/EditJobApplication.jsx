import { useEffect, useState } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import JobApplicationForm from "../components/JobApplicationForm";
import { getApiErrorMessage } from "../services/authService";
import {
  getJobApplication,
  updateJobApplication
} from "../services/jobApplicationService";

function EditJobApplication() {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    () => {
      async function loadApplication() {
        try {
          const data = await getJobApplication(applicationId);
          setApplication(data);
        } catch (requestError) {
          setError(getApiErrorMessage(reportError));
        } finally {
          setLoading(false);
        }
      }
      loadApplication();
    },
    [applicationId]
  );

  async function handelUpdate(payload) {
    setError("");
    setSubmitting(true);
    try {
      await updateJobApplication(applicationId, payload);
      navigate("/applications", {
        replace: true,
        state: {
          message: "Job application Updated successfully"
        }
      });
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  }
  if (loading) {
    return <div className="container py-5">Loading job applications.....</div>;
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
            initialValues={application}
            onSubmit={handelUpdate}
            submitLabel="Save Change"
            submitting={submitting}
          />
        </div>
      </div>
    </div>
  );
}
export default EditJobApplication;
