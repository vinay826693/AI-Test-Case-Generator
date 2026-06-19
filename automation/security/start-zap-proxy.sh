#!/bin/bash

docker rm -f zap-proxy 2>/dev/null || true

docker run -d \
  --name zap-proxy \
  -u root \
  -p 8090:8090 \
  ghcr.io/zaproxy/zaproxy:stable \
  zap.sh -daemon \
  -host 0.0.0.0 \
  -port 8090 \
  -config api.disablekey=true

echo "ZAP Proxy Started"