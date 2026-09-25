import { useEffect, useState } from "react";
import api from "../services/api";
function BackendStatus() {
  const [status, setStatus] = useState("checking");
  useEffect(() => {
    api
      .get("health")
      .then(() => setStatus("connected"))
      .catch(() => setStatus("disconnect"));
  }, []);

  const className =
    status == "connected"
      ? "alert alert-success"
      : status == "disconnect" ? "alert alert-success" : "alert alert-warning";

  return (
    <div className={className} role="alert">
      Backend Status : {status}
    </div>
  );
}

export default BackendStatus;
