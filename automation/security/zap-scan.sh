#!/bin/bash

mkdir -p security/reports

if [ "$GITHUB_ACTIONS" = "true" ]; then
  TARGET="http://localhost:5173"
  NETWORK="--network host"
else
  TARGET="http://host.docker.internal:5173"
  NETWORK=""
fi

docker run --rm \
  --user root \
  $NETWORK \
  -v "$(pwd)/security/reports:/zap/wrk" \
  ghcr.io/zaproxy/zaproxy:stable \
  zap-baseline.py \
  -t "$TARGET" \
  -r zap-report.html \
  -J zap-report.json
  exit 0