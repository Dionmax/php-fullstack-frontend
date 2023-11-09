import MultipleWinnersList from "./MultipleWinners/MultipleWinners";
import TopStudios from "./TopStudios/TopStudios";
import MinxMaxProducers from "./MinMaxProducers/MinMaxProducers";
import MoviesByYear from "./MoviesByYear/MoviesByYear";

import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="mainContainer" data-testid="dashboard">
      <div className="row">
        <MultipleWinnersList />
      </div>
      <div className="row">
        <TopStudios />
      </div>
      <div className="row">
        <MinxMaxProducers />
      </div>
      <div className="row">
        <MoviesByYear />
      </div>
    </div>
  );
};

export default Dashboard;
