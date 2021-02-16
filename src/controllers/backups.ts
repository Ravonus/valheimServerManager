import conf from "../../config.json";
import { wait } from "../modules/wait";

const copydir = require("copy-dir");

function getUserHome() {
  return process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
}

export default async function backup() {
  const path = `${getUserHome()}/AppData/LocalLow/IronGate/Valheim/worlds/`;

  await copydir.sync(path, `./backups`, {
    utimes: true,
    mode: true,
    cover: true,
    filter: function (stat: string, filepath: string, filename: string) {
      if (filename.includes(conf.world) || filename === "worlds") return true;
      return false;
    },
  });

  await wait(conf.interval * 60000);
  backup();
}

backup();
