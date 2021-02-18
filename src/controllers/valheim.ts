import findProcess from "find-process";
import conf from "../../config.json";
import { windowsScript } from "./windows/script";
import { linuxScript } from "./linux/script";
import { ChildProcess, exec } from "child_process";
import { watch } from "./pidusage";

const kill = require("kill-port");

let pid: ChildProcess;
let isWin = process.platform === "win32";
let isRunning: boolean;

const findPID = async (port: string) => await findProcess("name", port);

export default async function startValheim() {
  if (isRunning) return;

  isRunning = true;

  kill(conf.port, "tcp").catch(console.log);

  pid = exec(
    `${isWin ? `cd /D "${conf.path}" && ${windowsScript}` : `${linuxScript}`}`
  );

  const valheimPid = await findPID("valheim_server");

  watch(valheimPid[1].pid, 1000);

  if (pid.stdout)
    pid.stdout.on("data", async (data) => {
      isRunning = false;
      console.log(`${data}`, conf.port);
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
