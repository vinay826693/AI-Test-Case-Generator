#!/bin/bash

mkdir -p security/reports

docker run --rm \
  -v "$(pwd)/security/reports:/zap/wrk" \
  ghcr.io/zaproxy/zaproxy:stable \
  zap-baseline.py \
  -t http://host.docker.internal:5173 \
  -r zap-report.html \
  -J zap-report.json