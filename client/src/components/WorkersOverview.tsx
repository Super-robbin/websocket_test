import type { ServerStatus } from "../types";
import { getWorker, msOrSeconds } from "../utils";
import Badge from "./Badge"
import PageviewsWorker from "./PageviewsWorker"

interface WorkersOverviewProps {
    data: ServerStatus
}

const WorkersOverview = ({data}: WorkersOverviewProps) => {

    const io = getWorker(data, "io");
    return (
        <div className="mt-6">
        <div className="mb-2 text-xs uppercase tracking-wide text-black/60">
          Workers
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 p-3">
            <div className="mb-1 flex items-center justify-between">
              <div className="font-medium">io</div>
              {io && (
                <Badge tone={io.wait_time > 250 ? "bad" : "ok"}>
                  {io.wait_time} ms wait
                </Badge>
              )}
            </div>
            {io ? (
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  Workers: <span className="font-semibold">{io.workers}</span>
                </div>
                <div>
                  Idle: <span className="font-semibold">{io.idle}</span>
                </div>
                <div>
                  Time to return:{" "}
                  <span className="font-semibold">
                    {msOrSeconds(io.time_to_return)}
                  </span>
                </div>
                <div>
                  Waiting: <span className="font-semibold">{io.waiting}</span>
                </div>
              </div>
            ) : (
              <div className="text-sm text-black/60">No io metrics</div>
            )}
            {io?.top_keys?.length ? (
              <div className="mt-2">
                <div className="text-xs text-black/60">Top keys</div>
                <ul className="mt-1 space-y-1 text-sm">
                  {io.top_keys.slice(0, 5).map(([key, ratio]) => (
                    <li key={key} className="flex items-center justify-between">
                      <span className="truncate pr-2 text-black/70">
                        {key}
                      </span>
                      <span className="font-medium tabular-nums">
                        {(ratio * 100).toFixed(1)}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <PageviewsWorker data={data} />
        </div>
      </div>
    )
}

export default WorkersOverview