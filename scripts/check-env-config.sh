#!/bin/bash

# GitHub Secrets & Variables Setup Verification Script
# Run this locally to see what needs to be configured in GitHub

set -e

echo "🔍 GitHub Actions Environment Configuration Checker"
echo "=================================================="
echo ""

# Load .env file
if [ -f .env ]; then
    echo "✅ Found .env file"
    source .env
else
    echo "❌ .env file not found"
    echo "   Create one based on .env.example"
    exit 1
fi

echo ""
echo "📋 Variables to Configure in GitHub"
echo "-----------------------------------"
echo ""

echo "Go to: Settings → Secrets and variables → Actions → Variables"
echo ""

# Check and display required variables
echo "Variable Name: BASE_URL"
echo "Value:         ${BASE_URL:-NOT_SET}"
echo "Required:      ✅ Yes"
echo ""

echo "Variable Name: TIMEOUT"
echo "Value:         ${TIMEOUT:-60000}"
echo "Required:      ✅ Yes"
echo ""

echo "Variable Name: E2E_USER"
echo "Value:         ${E2E_USER:-NOT_SET}"
echo "Required:      ✅ Yes"
echo ""

echo ""
echo "🔐 Secrets to Configure in GitHub"
echo "---------------------------------"
echo ""

echo "Go to: Settings → Secrets and variables → Actions → Secrets"
echo ""

echo "Secret Name:   E2E_PASSWORD"
if [ -n "$E2E_PASS" ]; then
    echo "Value:         ${E2E_PASS:0:2}***${E2E_PASS: -2} (from E2E_PASS in .env)"
else
    echo "Value:         NOT_SET"
fi
echo "Required:      ✅ Yes"
echo ""

echo ""
echo "📝 Summary"
echo "----------"
echo ""

# Count missing configs
MISSING=0

if [ -z "$BASE_URL" ]; then
    echo "❌ BASE_URL not set in .env"
    ((MISSING++))
else
    echo "✅ BASE_URL: $BASE_URL"
fi

if [ -z "$E2E_USER" ]; then
    echo "❌ E2E_USER not set in .env"
    ((MISSING++))
else
    echo "✅ E2E_USER: $E2E_USER"
fi

if [ -z "$E2E_PASS" ]; then
    echo "❌ E2E_PASS not set in .env"
    ((MISSING++))
else
    echo "✅ E2E_PASS: ***"
fi

if [ -z "$TIMEOUT" ]; then
    echo "⚠️  TIMEOUT not set (will default to 60000)"
else
    echo "✅ TIMEOUT: $TIMEOUT"
fi

echo ""
if [ $MISSING -eq 0 ]; then
    echo "✅ All required variables are set in .env"
    echo ""
    echo "📌 Next Steps:"
    echo "1. Copy these values to GitHub Settings"
    echo "2. Commit and push the updated workflow"
    echo "3. Run the workflow to verify"
else
    echo "❌ Missing $MISSING required variable(s)"
    echo ""
    echo "📌 Next Steps:"
    echo "1. Update your .env file with missing values"
    echo "2. Re-run this script to verify"
    echo "3. Copy values to GitHub Settings"
fi

echo ""
echo "📚 For detailed instructions, see:"
echo "   .github/workflows/ENV_SETUP_GUIDE.md"
echo ""
