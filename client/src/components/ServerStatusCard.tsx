import type { ServerStatus } from "../types";
import Footer from "./Footer";
import GridStats from "./GridStats";
import Header from "./Header";
import Services from "./Services";
import WorkersOverview from "./WorkersOverview";

interface ServerStatusCardProps {
  data: ServerStatus;
}

const ServerStatusCard = ({ data }: ServerStatusCardProps) => {
  return (
    <div className="w-full max-w-3xl rounded-2xl ring-1 ring-slate-300 p-5 shadow-sm mt-16 ">
      <Header data={data} />
      <GridStats data={data} />
      <Services data={data} />
      <WorkersOverview data={data} />
      <Footer data={data} />
    </div>
  );
};

export default ServerStatusCard;
