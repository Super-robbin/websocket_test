import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WorkersOverview from "@components/WorkersOverview";
import type { ServerStatus, WorkerMetrics } from "../types";
import * as Utils from "../utils";

jest.mock("@components/Badge", () => {
  return {
    __esModule: true,
    default: ({ tone, children }: { tone?: "ok" | "bad" | "neutral"; children: React.ReactNode }) => (
      <div data-testid="badge" data-tone={tone}>
        {children}
      </div>
    ),
  };
});

jest.mock("@components/PageviewsWorker", () => {
  return {
    __esModule: true,
    default: ({ }: { data: ServerStatus }) => <div data-testid="pageviews-worker" />,
  };
});

const mkWorker = (over: Partial<WorkerMetrics> = {}): WorkerMetrics => ({
  wait_time: 200,
  workers: 3,
  waiting: 2,
  idle: 1,
  time_to_return: 1500, // 1.5 s
  recently_blocked_keys: [],
  top_keys: [["key:a", 0.1], ["key:b", 0.05]],
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

describe("<WorkersOverview />", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Renders io section with metrics and badge when getWorker returns data", () => {
    const io = mkWorker({ wait_time: 200, time_to_return: 1500, top_keys: [["key:a", 0.1], ["key:b", 0.05]] });
    jest.spyOn(Utils, "getWorker").mockReturnValue(io);

    const data = makeData();
    render(<WorkersOverview data={data} />);

    expect(screen.getByText("Workers")).toBeInTheDocument();

    expect(screen.getByText("io")).toBeInTheDocument();

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveTextContent("200 ms wait");
    expect(badge).toHaveAttribute("data-tone", "ok");

    expect(screen.getByText("Workers:")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();

    expect(screen.getByText("Idle:")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();

    expect(screen.getByText("Waiting:")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    expect(screen.getByText("Time to return:")).toBeInTheDocument();
    expect(screen.getByText("1.5 s")).toBeInTheDocument();

    expect(screen.getByText("Top keys")).toBeInTheDocument();
    expect(screen.getByText("key:a")).toBeInTheDocument();
    expect(screen.getByText("10.0%")).toBeInTheDocument();
    expect(screen.getByText("key:b")).toBeInTheDocument();
    expect(screen.getByText("5.0%")).toBeInTheDocument();

    expect(screen.getByTestId("pageviews-worker")).toBeInTheDocument();
  });

  test("Shows 'No io metrics' and no badge when getWorker returns undefined", () => {
    jest.spyOn(Utils, "getWorker").mockReturnValue(undefined);

    const data = makeData();
    render(<WorkersOverview data={data} />);

    expect(screen.getByText("No io metrics")).toBeInTheDocument();
    expect(screen.queryByTestId("badge")).not.toBeInTheDocument();
    expect(screen.queryByText("Top keys")).not.toBeInTheDocument();
  });

  test("Uses 'bad' tone for badge when wait_time > 250", () => {
    const io = mkWorker({ wait_time: 300 });
    jest.spyOn(Utils, "getWorker").mockReturnValue(io);

    const data = makeData();
    render(<WorkersOverview data={data} />);

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveTextContent("300 ms wait");
  });

  test("Limits Top keys list to at most five items", () => {
    const top_keys: [string, number][] = [
      ["k1", 0.01],
      ["k2", 0.02],
      ["k3", 0.03],
      ["k4", 0.04],
      ["k5", 0.05],
      ["k6", 0.06],
    ];
    const io = mkWorker({ top_keys });
    jest.spyOn(Utils, "getWorker").mockReturnValue(io);

    const data = makeData();
    render(<WorkersOverview data={data} />);

    ["k1", "k2", "k3", "k4", "k5"].forEach((k) => {
      expect(screen.getByText(k)).toBeInTheDocument();
    });
    expect(screen.queryByText("k6")).not.toBeInTheDocument();
  });
});
