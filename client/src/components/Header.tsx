import type { ServerStatus } from "../types";
import Badge from "./Badge";
import Indicator from "./Indicator";

interface HeaderProps {
  data: ServerStatus;
}

const Header = ({ data }: HeaderProps) => {
  const { status, region, version, server_issue } = data;

  return (
    <>
      <div data-testid="header" className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Indicator ok={status === "ok"} title={`Status: ${status}`} />
          <h2 className="text-lg font-semibold">Cluster Status</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone="neutral">v{version}</Badge>
          <Badge tone={status === "ok" ? "ok" : "bad"}>{status}</Badge>
        </div>
      </div>

      <div className="mt-1 text-sm text-black/65">
        Region: <span className="font-medium text-black/80">{region}</span>
      </div>
      {server_issue && (
        <div className="mt-2 rounded-md bg-amber-50 p-2 text-sm text-amber-800 ring-1 ring-amber-200">
          {server_issue}
        </div>
      )}
    </>
  );
};

export default Header