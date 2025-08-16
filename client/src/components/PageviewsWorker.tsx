import type { ServerStatus } from "../types";
import { getWorker, msOrSeconds } from "../utils";
import Badge from "./Badge";

interface PageviewsWorkerProps {
  data: ServerStatus;
}

const PageviewsWorker = ({ data }: PageviewsWorkerProps) => {
  const pg = getWorker(data, "requests:pageviews");

  return (
    <div className="rounded-xl border border-slate-200 p-3">
      <div className="mb-1 flex items-center justify-between">
        <div className="font-medium">requests:pageviews</div>
        {pg && (
          <Badge tone={pg.wait_time > 250 ? "bad" : "ok"}>
            {pg.wait_time} ms wait
          </Badge>
        )}
      </div>
      {pg ? (
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            Workers: <span className="font-semibold">{pg.workers}</span>
          </div>
          <div>
            Idle: <span className="font-semibold">{pg.idle}</span>
          </div>
          <div>
            Time to return:{" "}
            <span className="font-semibold">
              {msOrSeconds(pg.time_to_return)}
            </span>
          </div>
          <div>
            Waiting: <span className="font-semibold">{pg.waiting}</span>
          </div>
        </div>
      ) : (
        <div className="text-sm text-black/60">No pageviews metrics</div>
      )}
    </div>
  );
};

export default PageviewsWorker;
