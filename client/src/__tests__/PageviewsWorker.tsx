import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PageviewsWorker from "@components/PageviewsWorker";
import type { ServerStatus, WorkerMetrics } from "../types";
import * as Utils from "../utils";

jest.mock("@components/Badge", () => {
  return {
    __esModule: true,
    default: ({
      tone,
      children,
    }: {
      tone?: "ok" | "bad" | "neutral";
      children: React.ReactNode;
    }) => (
      <div data-testid="badge" data-tone={tone}>
        {children}
      </div>
    ),
  };
});

const mkWorker = (over: Partial<WorkerMetrics> = {}): WorkerMetrics => ({
  wait_time: 200,
  workers: 3,
  waiting: 2,
  idle: 1,
  time_to_return: 1500,
  recently_blocked_keys: [],
  top_keys: [],
  ...over,
});

const makeData = (): ServerStatus => ({
  status: "ok",
  region: "us-east",
  roles: [],
  strict: false,
  server_issue: null,
  version: "1.0.0",
  results: {
    services: { redis: true, database: true },
    stats: {
      servers_count: 1,
      online: 1,
      session: 1,
      server: {
        cpus: 1,
        active_connections: 1,
        wait_time: 0,
        cpu_load: 0.1,
        timers: 0,
        workers: [
          ["requests:pageviews", mkWorker()],
          ["io", mkWorker()],
          ["requests:unsupported-users", mkWorker()],
          ["recording-workers", mkWorker()],
        ],
      },
    },
  },
});

describe("<PageviewsWorker />", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Renders section for requests:pageviews with metrics and badge when worker exists", () => {
    const pg = mkWorker({ wait_time: 200, time_to_return: 1500 });
    jest.spyOn(Utils, "getWorker").mockReturnValue(pg);

    const data = makeData();
    render(<PageviewsWorker data={data} />);

    expect(screen.getByText("requests:pageviews")).toBeInTheDocument();

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveTextContent("200 ms wait");

    expect(screen.getByText("Workers:")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();

    expect(screen.getByText("Idle:")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();

    expect(screen.getByText("Waiting:")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    expect(screen.getByText("Time to return:")).toBeInTheDocument();
    expect(screen.getByText("1.5 s")).toBeInTheDocument();
  });

  test("Shows 'No pageviews metrics' and no badge when worker is missing", () => {
    jest.spyOn(Utils, "getWorker").mockReturnValue(undefined);

    const data = makeData();
    render(<PageviewsWorker data={data} />);

    expect(screen.getByText("No pageviews metrics")).toBeInTheDocument();
    expect(screen.queryByTestId("badge")).not.toBeInTheDocument();
  });
});
