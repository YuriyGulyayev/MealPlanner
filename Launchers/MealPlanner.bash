#!/usr/bin/bash

main()
{
   set -e
   # clear
   deno run --cached-only --no-prompt -- ../Src/Main.ts '--beginning-date=2026-01-17' '--number-of-days=1462' > Meal-Plans.txt
}

main
