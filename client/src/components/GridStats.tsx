import type { ServerStatus } from "../types";
import { getWorker } from "../utils";
import StatItem from "./StatItem";

interface GridStatsProps {
  data: ServerStatus;
}

const GridStats = ({ data }: GridStatsProps) => {
  const { servers_count, online, session, server } = data.results.stats;

  const io = getWorker(data, "io");

  return (
    <div data-testid="gridStats" className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatItem label="Servers" value={servers_count} />
      <StatItem label="Online Users" value={online.toLocaleString()} />
      <StatItem label="Active Sessions" value={session.toLocaleString()} />
      <StatItem label="CPU Cores" value={server.cpus} />
      <StatItem
        label="Active Conns"
        value={server.active_connections.toLocaleString()}
      />
      <StatItem
        label="CPU Load"
        value={(server.cpu_load * 100).toFixed(0) + "%"}
        hint="avg load"
      />
      <StatItem label="Timers" value={server.timers} />
      <StatItem
        label="Queue Wait"
        value={io ? `${io.wait_time} ms` : "—"}
        hint="io.wait_time"
      />
    </div>
  );
};

export default GridStats;
