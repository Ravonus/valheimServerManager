import conf from "../../../config.json";

export const linuxScript = `#!/bin/bash

cd ${conf.path}

export templdpath=$LD_LIBRARY_PATH
export LD_LIBRARY_PATH=./linux64:$LD_LIBRARY_PATH
export SteamAppId=892970

# Tip: Make a local copy of this script to avoid it being overwritten by steam.
# NOTE: Minimum password length is 5 characters & Password cant be in the server name.
# NOTE: You need to make sure the ports 2456-2458 is being forwarded to your server through your local router & firewall.
/home/steam/steamcmd.sh +login anonymous +force_install_dir /home/steam/Valheim +app_update 896660 +quit

./valheim_server.x86_64 -name "${conf.name || "Server"}" -port ${
  conf.port || 2456
} -world "${conf.world || "Dedicated"}" -password "${
  conf.password || "Frogger"
}" -public 1

export LD_LIBRARY_PATH=$templdpath

echo "Server started"
echo ""
#read -p "Press RETURN to stop server"
#echo 1 > server_exit.drp

#echo "Server exit signal set"
#echo "You can now close this terminal"

while :
do
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
echo "valheim.service: timestamp \$\{TIMESTAMP\}"
sleep 60
done`;
