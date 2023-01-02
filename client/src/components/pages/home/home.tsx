import "./home.sass";

import Accounts from "../home/account/accounts";

export default function Home(props: any) {
  console.log("Home rendered!");
  return (
    <div className="home-wrapper">
      <Accounts />
    </div>
  );
}
