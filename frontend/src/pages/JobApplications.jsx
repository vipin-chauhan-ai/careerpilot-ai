import { useEffect, useState } from "react";
import { Form, Link, useLocation } from "react-router-dom";

import {
  deleteJobApplication,
  getJobApplications
} from "../services/jobApplicationService";
import { getApiErrorMessage } from "../services/authService";

const STATUS_CLASSES = {
  saved: "text-bg-secondary",
  applied: "text-bg-primary",
  interview: "text-bg-warning",
  offer: "text-bg-success",
  rejected: "text-bg-danger"
};

function JobApplications() {
  const location = useLocation();
  const [applications, setApplications] = useState([]);
  const [loading, setLoding] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await getJobApplications();
        setApplications(data);
      } catch (requestError) {
        seError(getApiErrorMessage(requestError));
      } finally {
        setLoding(false);
      }
    }
    loadApplications();
  }, []);

 async function handelDelete(applicationId) {
  const confirmed = window.confirm("Delete this job application?");

  if (!confirmed) {
    return;
  }

  setError("");
  setDeletingId(applicationId);

  try {
    await deleteJobApplication(applicationId);

    setApplications((current) =>
      current.filter(
        (application) => application.id !== applicationId
      )
    );
  } catch (requestError) {
    setError(getApiErrorMessage(requestError));
  } finally {
    setDeletingId(null);
  }
}
  if(loading){
    return (
        <div className="container py-5"> Loading Job applications</div>
    )
  }
  return (
    <div className="container py-5">
 <div
 className="d-flex justify-content-between align-items-center mb-4"
 >
 <div>
 <h1 className="h3 mb-1">Job Applications</h1>
 <p className="text-body-secondary mb-0">
 Track every opportunity in one place.
 </p>
 </div>
 <Link
 className="btn btn-primary"
 to="/applications/new"
 >
 Add Application
 </Link>
 </div>
    {location.state ?.message && (
        <div className="alert alert-success">{location.state.message}</div>
    )}

    {error && (
        <div className="alert alert-danger">{error}</div>
    )}

    {applications.length ===0 ? (
        
<div className="card shadow-sm">
 <div className="card-body p-5 text-center">
 <h2 className="h5">No applications yet</h2>
 <p className="text-body-secondary">
 Add your first application to start tracking.
 </p>
 <Link
 className="btn btn-primary"
 to="/applications/new"
 >
 Add First Application
 </Link>
 </div>
 </div>
    ) : (
        <div className="card shadow-sm">
 <div className="table-responsive">
 <table className="table table-hover align-middle mb-0">
 <thead className="table-light">
 <tr>
 <th>Company</th>
 <th>Role</th>
 <th>Status</th>
 <th>Applied Date</th>
 <th className="text-end">Actions</th>
 </tr>
 </thead>
    <tbody>
        {applications.map((application)=>(
            <tr key={application.id}>
                <td>{application.company_name}</td>
                <td>{application.job_title}</td>
                
                  <td>
                    <span
                      className={`badge ${
                        STATUS_CLASSES[application.status] ?? "text-bg-secondary"
                      }`}
                    >
                      {application.status}
                    </span>
                  </td>
                <td>{application.applied_date ?? "-" }</td>
                <td className="text-end">
                 <Link
  className="btn btn-sm btn-outline-primary me-2"
  to={`/applications/${application.id}/edit`}
>
  Edit
</Link>
                 <button className="btn btn-sm btn-outline-danger" type="button"
                 disabled={
                deletingId=== application.id 
                } 
                onClick={()=>
                  handelDelete(application.id)
                }>
                  {deletingId == application.id ? "Deleting ... " : "Delete" }
                  </button> 
                 </td>

            </tr>
        )
    )
    }
    </tbody>   
    </table> 
    </div>
    </div>
    )}
    </div>
  );
}

export default JobApplications;