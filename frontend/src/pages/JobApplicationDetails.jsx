import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getJobApplication } from "../services/jobApplicationService";
import { getApiErrorMessage } from "../services/authService";

const STATUS_CLASSES = {
  saved: "text-bg-secondary",
  applied: "text-bg-primary",
  interview: "text-bg-warning",
  offer: "text-bg-success",
  rejected: "text-bg-danger"
};

function JobApplicationDetails() {
  const { applicationId  } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(
    () => {
      async function loadApplication() {
        try {
          const data = await getJobApplication(applicationId);
                setApplication(data);
        } catch (requestError) {
          setError(getApiErrorMessage(requestError));
        } finally {
          setLoading(false);
        }
      }
      loadApplication();
    },
    [applicationId]
  );

if (loading) {
  return (
    <div className="container py-5">
      Loading Application details ...
    </div>
  );
}
  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          {error}
        </div>
        <Link className="btn btn-outline-secondary" to="/applications">
          Back to applications
        </Link>
      </div>
    );
  }
  if (!application) {
    return null;
  }
 return (
 <div className="container py-5">
 <div
    className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4"
    >
    <div>
        <h1 className="h3 mb-1">
        {application.company_name}
        </h1>
        <p className="text-body-secondary mb-0">
        {application.job_title}
        </p>
    </div>
        <div className="d-flex gap-2">
        <Link
        className="btn btn-outline-secondary"
        to="/applications"
        >
        Back
        </Link>
        <Link
        className="btn btn-primary"
        to={
        `/applications/${application.id}/edit`
        }
        >
        Edit
        </Link>
        </div>
 </div>
 <div className="card shadow-sm">
 <div className="card-body p-4">
 <div className="row g-4">
 <div className="col-md-6">
 <div className="text-body-secondary">
 Status
 </div>
 <span
 className={`badge ${
 STATUS_CLASSES[
 application.status
 ] ?? "text-bg-secondary"
 }`}
 >
 {application.status}
 </span>
 </div>
 <div className="col-md-6">
 <div className="text-body-secondary">
 Applied Date
 </div>
 <div>
 {application.applied_date ?? "-"}
 </div>
 </div>
 <div className="col-md-6">
 <div className="text-body-secondary">
 Location
 </div>
 <div>{application.location ?? "-"}</div>
 </div> 
 <div className="col-md-6">
 <div className="text-body-secondary">
 Employment Type
 </div>
 <div>
 {application.employment_type ?? "-"}
 </div>
 </div>
 <div className="col-12">
 <div className="text-body-secondary">
 Job URL
 </div>
 {application.job_url ? (
 <a
 href={application.job_url}
 target="_blank"
 rel="noreferrer"
 >
 Open job posting
 </a>
 ) : (
 <div>-</div>
 )}
 </div>
 <div className="col-12">
 <div className="text-body-secondary">
 Notes
 </div>
 <div>{application.notes ?? "-"}</div>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}

export default JobApplicationDetails