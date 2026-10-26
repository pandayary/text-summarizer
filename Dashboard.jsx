import SummaryCard from "../components/SummaryCard";
import Statistics from "../components/Statistics";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Summary Dashboard</h1>
      <SummaryCard summary="Your generated summaries will appear here." />
      <Statistics />
    </div>
  );
}

export default Dashboard;