#!/bin/bash
export PATH="$HOME/.local/share/fnm:$PATH"
eval "$(fnm env)"
npx vite build --mode client > build_log.txt 2>&1
echo "EXIT_CODE=$?" >> build_log.txt
