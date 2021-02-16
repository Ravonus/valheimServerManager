import conf from "../../config.json";
import { windowsScript } from "./windows/script";
import { linuxScript } from "./linux/script";
import { ChildProcess, exec } from "child_process";

const kill = require("kill-port");

let pid: ChildProcess;
let isWin = process.platform === "win32";
let isRunning: boolean;

export default function startValheim() {
  if (isRunning) return;

  isRunning = true;

  kill(conf.port, "tcp").catch(console.log);

  pid = exec(
    `${isWin ? `cd /D "${conf.path}" && ${windowsScript}` : `${linuxScript}`}`
  );

  if (pid.stdout)
    pid.stdout.on("data", (data) => {
      isRunning = false;
      console.log(`${data}`);
    });

  if (pid.stderr)
    pid.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
    });

  pid.on("error", (error) => {
    console.log(`error: ${error.message}`);
    startValheim();
  });

  pid.on("close", (code) => {
    startValheim();
  });
}

export const velheim = () => pid;

startValheim();
