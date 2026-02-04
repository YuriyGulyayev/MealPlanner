#!/usr/bin/bash

main()
{
   set -e
   # clear
   deno run --cached-only --no-prompt -- ../Src/Main.ts '--beginning-date=2026-02-01' '--number-of-days=1462' > Meal-Plans.txt
}

main
