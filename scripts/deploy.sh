#!/bin/bash

# DataNextGenProfile Deployment Script
# Deploys to Cloudflare Pages

set -e

echo "🚀 DataNextGenProfile Deployment Script"
echo "======================================="

# Check for required environment variable
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo "⚠️  CLOUDFLARE_API_TOKEN not set"
  read -p "Enter Cloudflare API Token: " CLOUDFLARE_API_TOKEN
  export CLOUDFLARE_API_TOKEN
fi

if [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
  echo "⚠️  CLOUDFLARE_ACCOUNT_ID not set"
  read -p "Enter Cloudflare Account ID: " CLOUDFLARE_ACCOUNT_ID
  export CLOUDFLARE_ACCOUNT_ID
fi

PROJECT_NAME="data-next-gen-profile"

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔨 Building project..."
npm run build

echo ""
echo "☁️  Deploying to Cloudflare Pages..."

# Use wrangler to deploy
npx wrangler pages deploy out --project-name="$PROJECT_NAME" --commit-dirty=true

echo ""
echo "✅ Deployment complete!"
echo "   Visit: https://${PROJECT_NAME}.pages.dev"
