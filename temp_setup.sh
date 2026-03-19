#!/bin/zsh
export PATH="$HOME/.local/share/fnm:$PATH"
eval "$(fnm env)"
fnm install 22
fnm default 22
corepack enable pnpm
npm install -g pnpm
