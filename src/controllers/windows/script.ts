import conf from "../../../config.json";

export const windowsScript = `set SteamAppId=892970 &&  echo "Starting server PRESS CTRL-C to exit" && valheim_server -nographics -batchmode -name "${
  conf.name || "Server"
}" -port ${conf.port || 2456} -world "${
  conf.world || "Dedicated"
}" -password "${conf.password || "secret"}"
`;
