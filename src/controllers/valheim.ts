import conf from "../../config.json";
import { windowsScript } from "./windows/script";
import { linuxScript } from "./linux/script";
import { ChildProcess, exec } from "child_process";

let pid: ChildProcess;
let isWin = process.platform === "win32";

export default function startValheim() {
  pid = exec(
    `${isWin ? `cd /D "${conf.path}" && ${windowsScript}` : `${linuxScript}`}`
  );

  if (pid.stdout)
    pid.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

  if (pid.stderr)
    pid.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
    });

  pid.on("error", (error) => {
    console.log(`error: ${error.message}`);
  });

  pid.on("close", (code) => {
    startValheim();
  });
}

export const velheim = () => pid;

startValheim();
