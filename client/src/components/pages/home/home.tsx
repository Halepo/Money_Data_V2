import "./home.sass";
import Dashboard from "./dashboard";
import Accounts from "../home/account/accounts";

export default function Home(props: any) {
  console.log("Home rendered!");
  return (
    <div className="home-wrapper">
      <Dashboard />
    </div>
  );
}
