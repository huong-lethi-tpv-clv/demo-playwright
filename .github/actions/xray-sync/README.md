# Xray Sync Composite Action

> Reusable GitHub Action for syncing JUnit test results to Xray Cloud with automatic retry logic and error handling

---

## Overview

This composite action handles authentication and upload of JUnit test results to Xray Cloud:

✅ **Automatic retries** - Up to 3 attempts with exponential backoff
✅ **Error handling** - Validates inputs, responses, and outputs
✅ **Detailed logging** - Progress tracking with status indicators
✅ **Reusable** - Works across multiple workflows and repositories

---

## Usage

### Basic Example

```yaml
- name: Sync to Xray Cloud
  uses: ./.github/actions/xray-sync
  with:
    xray-base-url: ${{ vars.XRAY_BASE_URL }}
    xray-client-id: ${{ secrets.XRAY_CLIENT_ID }}
    xray-client-secret: ${{ secrets.XRAY_CLIENT_SECRET }}
    project-key: ${{ vars.PROJECT_KEY }}
    report-path: './reports/junit-report.xml'
```

### With Test Plan and Custom Retries

```yaml
- name: Sync to Xray Cloud
  id: xray
  uses: ./.github/actions/xray-sync
  with:
    xray-base-url: 'https://xray.cloud.getxray.app'
    xray-client-id: ${{ secrets.XRAY_CLIENT_ID }}
    xray-client-secret: ${{ secrets.XRAY_CLIENT_SECRET }}
    project-key: 'COM'
    test-plan-key: 'COM-1234'  # Optional
    report-path: './reports/junit-report.xml'
    max-retries: 3
    retry-delay: 5

- name: Display results
  run: |
    echo "Execution Key: ${{ steps.xray.outputs.test-execution-key }}"
    echo "Upload Status: ${{ steps.xray.outputs.upload-status }}"
```

---

## Inputs

| Input | Required | Default | Description |
|-------|----------|---------|-------------|
| `xray-base-url` | ✅ Yes | `https://xray.cloud.getxray.app` | Xray Cloud base URL |
| `xray-client-id` | ✅ Yes | - | Xray API client ID (use GitHub secret) |
| `xray-client-secret` | ✅ Yes | - | Xray API client secret (use GitHub secret) |
| `project-key` | ✅ Yes | - | Jira project key (e.g., `COM`) |
| `test-plan-key` | ❌ No | `''` | Xray test plan key (e.g., `COM-1234`) |
| `report-path` | ✅ Yes | `./reports/junit-report.xml` | Path to JUnit XML report |
| `max-retries` | ❌ No | `3` | Maximum retry attempts |
| `retry-delay` | ❌ No | `5` | Initial delay between retries (seconds) |

---

## Outputs

| Output | Description | Example |
|--------|-------------|---------|
| `test-execution-key` | Test execution key in Xray | `COM-5678` |
| `test-execution-id` | Test execution issue ID | `12345` |
| `upload-status` | Upload result | `success` or `failed` |
| `auth-status` | Authentication result | `success` or `failed` |

---

## Retry Logic

The action uses **exponential backoff** for resilience:

**Authentication:**
- 3 attempts with fixed delay
- Retries on network errors, HTTP 4xx/5xx, invalid tokens

**Upload:**
- 3 attempts with exponential backoff
- Delay pattern: Immediate → 5s → 10s → 15s

---

## Validation

The action validates:

1. **Inputs**
   - Report file exists and is not empty
   - Required credentials provided
   - Project key specified

2. **Authentication**
   - HTTP 200 response
   - Valid JWT token format
   - Token length > 50 characters

3. **Upload**
   - HTTP 2xx response
   - Valid response body
   - Execution key extracted

---

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `Report not found` | Incorrect path | Check `report-path` input matches artifact location |
| `Authentication failed` | Invalid credentials | Verify `XRAY_CLIENT_ID` and `XRAY_CLIENT_SECRET` secrets |
| `HTTP 400` | Invalid JUnit XML | Validate XML structure with JUnit schema |
| `HTTP 403` | Insufficient permissions | Check Xray API key permissions in Jira |
| `HTTP 404` | Invalid keys | Verify `project-key` and `test-plan-key` exist |

### Debug Logging

Each step provides detailed logging:
- 🔍 Validation results
- 🔄 Retry attempt numbers
- 📡 HTTP status codes
- 📋 Response bodies
- ✅/❌ Success/failure status

---

## Troubleshooting

### Action fails with "Report not found"

**Check:**
1. Previous job uploaded the artifact correctly
2. Artifact name matches download step
3. Report path is correct relative to workspace

**Solution:**
```yaml
- name: Download test results
  uses: actions/download-artifact@v4
  with:
    name: test-results
    path: ./reports

- name: Verify report exists
  run: ls -la ./reports/junit-report.xml

- name: Sync to Xray
  uses: ./.github/actions/xray-sync
  with:
    report-path: './reports/junit-report.xml'
    # ... other inputs
```

### Authentication fails repeatedly

**Check:**
1. Secrets have no trailing spaces
2. Xray API key is still valid (not expired)
3. Correct Xray Cloud URL (not Xray Server/Data Center)

**Solution:**
```bash
# Test credentials manually
curl -X POST https://xray.cloud.getxray.app/api/v2/authenticate \
  -H "Content-Type: application/json" \
  -d '{"client_id":"YOUR_ID","client_secret":"YOUR_SECRET"}'
```

### Upload succeeds but execution key shows "N/A"

**Cause:** Xray API response format changed

**Solution:**
1. Check workflow artifacts for `xray_response.json`
2. Compare actual response structure with expected format
3. Update action's JSON parsing if needed

### Rate limiting errors (HTTP 429)

**Solution:**
```yaml
- name: Sync to Xray
  uses: ./.github/actions/xray-sync
  with:
    max-retries: 5        # Increase retries
    retry-delay: 10       # Increase delay
    # ... other inputs
```

---

## Security Best Practices

### ✅ DO:
- Store credentials in GitHub Secrets
- Use repository/organization level secrets for sensitive values
- Review artifact retention policies (may contain test data)
- Restrict secret access to necessary workflows only

### ❌ DON'T:
- Hardcode credentials in workflow files
- Log client ID or secret values
- Commit Xray API keys to repository
- Use personal API keys for team workflows

**Example:**
```yaml
# ✅ Correct - Using secrets
xray-client-id: ${{ secrets.XRAY_CLIENT_ID }}
xray-client-secret: ${{ secrets.XRAY_CLIENT_SECRET }}

# ❌ Wrong - Hardcoded credentials
xray-client-id: 'A1B2C3D4E5F6...'  # NEVER DO THIS
```