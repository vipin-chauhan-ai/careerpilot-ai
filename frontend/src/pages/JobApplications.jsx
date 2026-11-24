import { useEffect, useState } from "react";
import { Form, Link, useLocation } from "react-router-dom";

import {
  deleteJobApplication,
  getJobApplications
} from "../services/jobApplicationService";
import { getApiErrorMessage } from "../services/authService";

const PAGE_LIMIT = 5;

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


  const[searchInput,setSearchInput] = useState("");
  const [search,SetSearch] = useState("");
  const[statusFilter, setStatusFilter] = useState("");
  const[page,setPage] = useState(1);
  const[pagination,setPagination] = useState({
    total:0,
    page:1,
    limit:PAGE_LIMIT,
    total_pages :0
  })

  const [loading, setLoding] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [refreshKey,setRefreshKey] = useState(0);
  useEffect(() => {
    let ignore = false;
    async function loadApplications() {
      setLoding(true);
      setError("");
      try {
        console.log("API Filters:", search, statusFilter, page);
        const data = await getJobApplications({
          search : search || undefined,
          status : statusFilter || undefined,
          page ,
          limit :PAGE_LIMIT
        }
        );

        if(!ignore){
          setApplications(data.items);
          setPagination({
            total:data.total,
            page:data.page,
            limit:data.limit,
            total_pages:data.total_pages
          })
        }

        
      } catch (requestError) {
         if(!ignore){
        setError(getApiErrorMessage(requestError));
         }
      } finally {
         if(!ignore){
        setLoding(false);
         }
      }
    }
    loadApplications();
    return()=>{
      ignore = true
    }
  }, [search,statusFilter,page,refreshKey]);

 async function handelDelete(applicationId) {
  const confirmed = window.confirm("Delete this job application?");

  if (!confirmed) {
    return;
  }

  setError("");
  setDeletingId(applicationId);

  try {
    await deleteJobApplication(applicationId);

    if(applications.length ===1 && page > 1 ){
      setPage((current)=>current-1);
    }else{
      setRefreshKey((current)=>current +1 )
    }

  } catch (requestError) {
    setError(getApiErrorMessage(requestError));
  } finally {
    setDeletingId(null);
  }
}
  const hasFilters = Boolean(search || statusFilter);

  function handelSearch(event){
    event.preventDefault();
      
    setPage(1);
    SetSearch(searchInput.trim());
  }

  function handelStatusChange(event){
    setPage(1);
    setStatusFilter(event.target.value);

  }

  function handleClearFilters(){
    setSearchInput("");
    SetSearch("");
    setStatusFilter("");
    setPage(1);
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

    <form className="card card-body shadow-sm mb-4" onSubmit={handelSearch}>
        <div className="row g-3 align-items-end">
          <div className="col-md-5">
            <label className="form-label" htmlFor="application-search">
              Search
            </label>
            <input
              className="form-control"
              id="application-search"
              type="search"
              value={searchInput}
              onChange={(event)=>setSearchInput(event.target.value)}
              placeholder="Company or job title"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="status-filter">
              Status
            </label>
            <select
              className="form-select"
              id="status-filter"
              value={statusFilter}
              onChange={handelStatusChange}
            >
              <option value="">All statuses</option>
              <option value="saved">Saved</option>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="col-md-4">
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                Search
              </button>
              <button
                className="btn btn-outline-secondary"
                type="button"
                 onClick={handleClearFilters}
                disabled={!searchInput && !hasFilters}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </form>
    {!loading && (
      <p className="text-body-secondary">
        {pagination.total} application(s) found
      </p>
    )}
    
    {loading ? (
    <div className="card shadow-sm"> 
    <div className="card-body p-5 text-center">
      Loading Job applications
    </div>
    </div>
    ):
    applications.length ===0 ? (
        
<div className="card shadow-sm">
 <div className="card-body p-5 text-center">
    <h2 className="h5">
      {hasFilters ? "No matching applicaitons" : " No Applciation Yet"}
    </h2>
 <p className="text-body-secondary mb-0">
        {hasFilters ? "try diffrent search or status." : "Add your first application"}
 </p>
  
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
                    className="btn btn-sm btn-outline-secondary me-2"
                    to={`/applications/${application.id}`}
                  >
                    View
                  </Link>
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

    {!loading && pagination.total_pages > 1 && (
      <nav
      className="d-flex justify-content-center align-items-center gap-3 mt-4">
        <button className="btn btn-outline-primary" type="button" disabled={page ===1} 
        onClick={()=>setPage((current)=>current-1)} >privious</button>
        <span>Page {pagination.page } OF {pagination.total_pages}</span>

        <button className="btn btn-outline-primary" type="button" disabled={page >= pagination.total_pages}
          onClick={() => setPage((current) => current + 1)}
        >
          Next
        </button>
      </nav>
    )}
    </div>
  );
}

export default JobApplications;