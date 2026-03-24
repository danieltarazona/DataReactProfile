#!/bin/zsh
export PATH="$HOME/.local/share/fnm:$PATH"
eval "$(fnm env)"
pnpm add -D pdf-parse
node read_pdf.cjs
