import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EMPTY_FORM = {
  company_name: "",
  job_title: "",
  job_url: "",
  location: "",
  employment_type: "",
  status: "saved",
  applied_date: "",
  notes: ""
};

function JobApplicationForm({
  initialValues = EMPTY_FORM,
  onSubmit,
  submitLabel,
  submitting,
}) {
  const [from, setForm] = useState({ ...EMPTY_FORM });

  useEffect(() => {
    setForm({
      company_name: initialValues.company_name ?? "",
      job_title: initialValues.job_title ?? "",
      job_url: initialValues.job_url ?? "",
      location: initialValues.location ?? "",
      employment_type: initialValues.employment_type ?? "",
      status: initialValues.status ?? "saved",
      applied_date: initialValues.applied_date ?? "",
      notes: initialValues.notes ?? "",
    });
  }, [initialValues]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handelSubmit(event) {
    event.preventDefault();

    const payload = {
      company_name: from.company_name.trim(),
      job_title: from.job_title.trim(),
      job_url: from.job_url.trim() || null,
      location: from.location.trim() || null,
      employment_type: from.employment_type.trim() || null,
      status: from.status,
      applied_date: from.applied_date.trim() || null,
      notes: from.notes.trim() || null,
    };

    await onSubmit(payload);
  }

  return (
    <form onSubmit={handelSubmit}>
      <div className="row g-3">

        <div className="col-md-6">
          <label
            className="form-label"
            htmlFor="company_name"
          >
            Company Name
          </label>

          <input
            className="form-control"
            id="company_name"
            name="company_name"
            value={from.company_name}
            onChange={handleChange}
            minLength={2}
            maxLength={200}
            required
          />
        </div>

        <div className="col-md-6">
          <label
            className="form-label"
            htmlFor="job_title"
          >
            Job Title
          </label>

          <input
            className="form-control"
            id="job_title"
            name="job_title"
            value={from.job_title}
            onChange={handleChange}
            minLength={2}
            maxLength={200}
            required
          />
        </div>

        <div className="col-md-6">
          <label
            className="form-label"
            htmlFor="location"
          >
            Location
          </label>

          <input
            className="form-control"
            id="location"
            name="location"
            value={from.location}
            onChange={handleChange}
            maxLength={200}
          />
        </div>

        <div className="col-md-6">
          <label
            className="form-label"
            htmlFor="employment_type"
          >
            Employment Type
          </label>

          <select
            className="form-select"
            id="employment_type"
            name="employment_type"
            value={from.employment_type}
            onChange={handleChange}
          >
            <option value="">Select type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="col-md-6">
          <label
            className="form-label"
            htmlFor="status"
          >
            Status
          </label>

          <select
  className="form-select"
  id="status"
  name="status"
  value={from.status}
  onChange={handleChange}
>
  <option value="saved">Saved</option>
  <option value="applied">Applied</option>
  <option value="interview">Interview</option>
  <option value="offer">Offer</option>
  <option value="rejected">Rejected</option>
</select>
        </div>

        <div className="col-md-6">
          <label
            className="form-label"
            htmlFor="applied_date"
          >
            Applied Date
          </label>

          <input
            className="form-control"
            id="applied_date"
            name="applied_date"
            type="date"
            value={from.applied_date}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label
            className="form-label"
            htmlFor="job_url"
          >
            Job URL
          </label>

          <input
            className="form-control"
            id="job_url"
            name="job_url"
            type="url"
            value={from.job_url}
            onChange={handleChange}
            maxLength={500}
            placeholder="https://example.com/job"
          />
        </div>

        <div className="col-12">
          <label
            className="form-label"
            htmlFor="notes"
          >
            Notes
          </label>

          <textarea
            className="form-control"
            id="notes"
            name="notes"
            value={from.notes}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="col-12 d-flex gap-2">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Saving..." : submitLabel}
          </button>

          <Link
            className="btn btn-outline-secondary"
            to="/applications"
          >
            Cancel
          </Link>
        </div>

      </div>
    </form>
  );
}

export default JobApplicationForm;