import { getWorker, msOrSeconds } from "../utils";
import type { ServerStatus, WorkerMetrics } from "../types";

const mkWorker = (over: Partial<WorkerMetrics> = {}): WorkerMetrics => ({
  wait_time: 0,
  workers: 0,
  waiting: 0,
  idle: 0,
  time_to_return: 0,
  recently_blocked_keys: [],
  top_keys: [],
  ...over,
});

const workers = [
  ["requests:pageviews", mkWorker({ wait_time: 100 })],
  ["io", mkWorker({ wait_time: 42 })],
  ["requests:unsupported-users", mkWorker({ wait_time: 200 })],
  ["recording-workers", mkWorker({ wait_time: 300 })],
] as const satisfies ServerStatus["results"]["stats"]["server"]["workers"];

const makeStatus = (): ServerStatus => ({
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
        workers,
      },
    },
  },
});

describe("getWorker", () => {
  test("Finds a worker by its name", () => {
    const status = makeStatus();
    expect(getWorker(status, "io")).toEqual(
      expect.objectContaining({ wait_time: 42 })
    );
    expect(getWorker(status, "requests:pageviews")).toEqual(
      expect.objectContaining({ wait_time: 100 })
    );
  });

  test("Returns undefined for missing worker", () => {
    const status = makeStatus();
    expect(getWorker(status, "not-here" as unknown as "io")).toBeUndefined();
  });
});

describe("msOrSeconds", () => {
  test("Formats values under 1000ms as ms", () => {
    expect(msOrSeconds(0)).toBe("0 ms");
    expect(msOrSeconds(999)).toBe("999 ms");
  });

  test("Formats values between 1s and <60s", () => {
    expect(msOrSeconds(1000)).toBe("1.0 s");
    expect(msOrSeconds(1500)).toBe("1.5 s");
    expect(msOrSeconds(59000)).toBe("59.0 s");
  });

  test("Formats values 60s and above as minutes + seconds", () => {
    expect(msOrSeconds(60000)).toBe("1m 0s");
    expect(msOrSeconds(61000)).toBe("1m 1s");
    expect(msOrSeconds(125000)).toBe("2m 5s");
  });
});
