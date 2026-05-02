#!/usr/bin/bash

main()
{
   set -e
   shopt -s inherit_errexit
   exec "${HOME}/My-Applications/Myself/Scripts/Deno/Launchers/DenoLint.bash"
}

main
