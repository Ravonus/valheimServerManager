import conf from "../../config.json";
import { wait } from "../modules/wait";

const copydir = require("copy-dir");

export default async function backup() {
  const path = `C:\\${process.env.HOMEPATH}/AppData/LocalLow/IronGate/Valheim/worlds/`;

  await copydir.sync(path, `./backups`, {
    utimes: true,
    mode: true,
    cover: true,
    filter: function (stat: string, filepath: string, filename: string) {
      if (filename.includes(conf.world) || filename === "worlds") return true;
      return false;
    },
  });

  await wait(conf.interval * 60);
  backup();
}

backup();
