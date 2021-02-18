import pidusage from "pidusage";
import promisify from "util.promisify";
import { wait } from "../modules/wait";

const usage = promisify(pidusage);

export const monitor = async (pid: string[]) => await usage(pid);
export const watch = async (
  pid: string[] | string | number,
  interval: number
) => {
  if (typeof pid === "string" || typeof pid === "number")
    pid = [pid.toString()];

  await wait(interval);

  const info = await monitor(pid);

  console.log(info);

  watch(pid, interval);
};
