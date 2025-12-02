import { Link } from "react-router";

function Home() {
  return (
    <div>
      <Link to={"/dashboard"}>Got to Dashboard</Link>
    </div>
  );
}

export default Home;
