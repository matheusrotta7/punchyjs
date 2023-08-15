sudo kill $(sudo lsof -i:3000 | awk '/node/ {print $2}')
