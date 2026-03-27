const path = require("path");
const { spawn } = require("child_process");

const dir = __dirname;
const port = process.env.PORT || 3002;
const nextBin = path.join(dir, "node_modules", "next", "dist", "bin", "next");

process.chdir(dir);

const child = spawn(process.execPath, [nextBin, "dev", "--port", String(port)], {
  cwd: dir,
  stdio: "inherit",
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
});

child.on("exit", (code) => process.exit(code || 0));
process.on("SIGTERM", () => child.kill("SIGTERM"));
process.on("SIGINT", () => child.kill("SIGINT"));
