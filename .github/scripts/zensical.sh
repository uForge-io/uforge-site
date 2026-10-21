#!/usr/bin/env bash
# Thin wrapper around `zensical` so the per-language configs can live in config/.
#
# Zensical treats the config file's folder as the project root and requires
# docs_dir/site_dir inside it, so a config in config/ cannot be used directly.
# This wrapper copies config/zensical.<lang>.toml to the project root, runs
# zensical, and removes the copy again (also on error or Ctrl-C).
#
# Usage (run from the repo root, or set ZENSICAL_ROOT):
#   bash tools/zensical.sh <build|serve> <lang> [zensical options...]
# Examples:
#   bash tools/zensical.sh build en --clean --strict
#   bash tools/zensical.sh serve zh --dev-addr localhost:9000
# Env: ZENSICAL_ROOT = project root (default: current directory)
#      ZENSICAL     = zensical command (default: zensical; e.g. "python3 -m zensical")
set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "usage: $0 <build|serve> <lang> [zensical options...]" >&2
  exit 2
fi
cmd="$1"; lang="$2"; shift 2

root="${ZENSICAL_ROOT:-$PWD}"
src="$root/config/zensical.$lang.toml"
dst="$root/zensical.$lang.toml"

[ -f "$src" ] || { echo "zensical.sh: missing $src" >&2; exit 1; }
[ ! -e "$dst" ] || { echo "zensical.sh: $dst already exists (another build running, or a stale copy -- delete it)" >&2; exit 1; }

cp "$src" "$dst"
trap 'rm -f "$dst"' EXIT INT TERM

cd "$root"
read -r -a zcmd <<< "${ZENSICAL:-zensical}"
"${zcmd[@]}" "$cmd" --config-file "zensical.$lang.toml" "$@"
