# Backend CI/CD Completion Checklist

This checklist focuses on verifying the final steps and troubleshooting the CI/CD pipeline setup for the backend service deployment to Google Cloud Run via Artifact Registry.

**Current Status:** The pipeline is configured to use Google Artifact Registry and Service Account Key authentication. The last known issue was a `403 Forbidden` error when pushing the Docker image to Artifact Registry.

## I. Verify GCP Permissions & Configuration

- [ ] **Artifact Registry Repository:**
  - [x] Does the repository `korpor-backend-images` exist in Artifact Registry?
  - [x] Is it a `Docker` format repository?
  - [x] Is it located in the correct region (`us-central1`)?
- [ ] **IAM Permissions (Deployer SA):**
  - [x] Go to **IAM & Admin > IAM**.
  - [x] Filter for principal: `github-actions-deployer@cellular-way-454315-f2.iam.gserviceaccount.com`.
  - [x] Does this service account **explicitly** have the **`Artifact Registry Writer`** role assigned?
- [ ] **IAM Permissions (Cloud Run Runtime SA):**
  - [x] Go to **IAM & Admin > IAM**.
  - [x] Filter for principal: `428247656603-compute@developer.gserviceaccount.com` (Compute Engine default SA).
  - [x] Does this service account **explicitly** have the **`Artifact Registry Reader`** role assigned?
- [ ] **APIs Enabled:**
  - [x] Go to **APIs & Services > Library**.
  - [x] Confirm `Artifact Registry API` is enabled.
  - [x] Confirm `Cloud Run Admin API` is enabled.
  - [x] Confirm `Cloud SQL Admin API` is enabled.
  - [x] Confirm `Secret Manager API` is enabled.
  - [x] Confirm `IAM Service Account Credentials API` is enabled.

## II. Verify Workflow Configuration

- [ ] **File:** `.github/workflows/backend-gcp-deploy.yml`
- [ ] **Authentication:** Is the `Authenticate to Google Cloud via SA Key` step uncommented and configured to use `secrets.GCP_SA_KEY`?
- [ ] **Image Path:** Is the `GAR_IMAGE_PATH` environment variable correctly defined as `us-central1-docker.pkg.dev/cellular-way-454315-f2/korpor-backend-images/backend-service`?
- [ ] **Build Step:** Does the `Build and push Docker image to Artifact Registry` step use `${{ env.GAR_IMAGE_PATH }}:${{ github.sha }}` for the `tags` input?
- [ ] **Deploy Step:** Does the `Deploy to Cloud Run` step use `${{ env.GAR_IMAGE_PATH }}:${{ github.sha }}` for the `image` input?

## III. Execute and Test Pipeline

- [ ] **Trigger Workflow:** Commit and push the latest changes (including this checklist and any workflow modifications) to the `main` branch.
  ```bash
  git add .
  git commit -m "chore: Add CI/CD completion checklist and final checks"
  git push origin main
  ```
- [ ] **Monitor Workflow Run:** Go to the **Actions** tab on GitHub.
  - [ ] Did the `build-and-push-gar` job complete successfully (including the push to Artifact Registry)?
  - [ ] Did the `deploy-to-cloud-run` job complete successfully?
  - [ ] Did the `Test Deployed Service Health Endpoint` step complete successfully?
- [ ] **Verify Cloud Run Revision:**
  - [ ] Go to **Cloud Run > korpor > Revisions** in GCP.
  - [ ] Is a new revision deployed with the correct image tag (matching the commit SHA)?
  - [ ] Does the new revision show 100% traffic?
- [ ] **Verify Service Access & Health:**
  - [ ] Get the service URL from Cloud Run.
  - [ ] Access the `/health` endpoint (e.g., `YOUR_URL/health`). Does it return `{"status":"OK", ...}`?
- [ ] **Verify Database Connectivity:**
  - [ ] Go to **Cloud Run > korpor > Logs** in GCP.
  - [ ] Look for the message `Database connection established successfully.`.
  - [ ] Check for any database connection errors.
- [ ] **Verify API Functionality:**
  - [ ] Use Postman/curl to test key API endpoints (login, register, data fetch/update).
  - [ ] Confirm expected responses and data persistence in the Cloud SQL database.
