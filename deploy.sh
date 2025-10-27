#!/bin/bash
npm run build -- --mode production &&
ssh root@68.183.228.59 "rm -rf /var/www/sc_thabarwa_center/build" &&
scp -r ./build root@68.183.228.59:/var/www/sc_thabarwa_center