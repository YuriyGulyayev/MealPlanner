#!/usr/bin/bash

main()
{
   set -e
   shopt -s inherit_errexit
   # clear
   deno run --allow-scripts --no-prompt -- ../Src/Main.ts --beginning-date=2026-01-17 --number-of-days=1462 > Meal-Plans.txt
   pw-play /usr/share/sounds/freedesktop/stereo/dialog-information.oga &
}

main
