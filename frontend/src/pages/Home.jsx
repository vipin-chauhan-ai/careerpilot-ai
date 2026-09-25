import BackendStatus from "../components/BackendStatus";
function Home() {
  return (
    <main className="container py-5">
      <div className="p-5 bg-light rounded-3">
        <h1 className="display-5 fw-bold">CareerPilot AI</h1>
        <p className="lead mb-4">
          Track job applications and build your AI-powered career journey.
        </p>
        <BackendStatus />
      </div>
    </main>
  );
}
export default Home;
