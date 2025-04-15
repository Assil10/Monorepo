# Comprehensive Backend CI/CD Checklist (GitHub -> GAR -> Cloud Run)

This checklist covers all aspects of setting up and verifying the CI/CD pipeline for the backend service.

**Goal:** Automatically build the backend Docker image, push it to Google Artifact Registry (GAR), and deploy it to Google Cloud Run upon pushes to the `main` branch affecting the `backend` directory.

**Current Authentication Method:** Service Account Key (`GCP_SA_KEY` GitHub Secret).

---

## I. Local Environment & Code (`backend/` directory)

- [ ] **`Dockerfile` (`backend/Dockerfile`):**
  - [ ] Exists and uses multi-stage builds (dependencies, build, production).
  - [ ] Uses a specific Node.js base image (e.g., `node:18-alpine`).
  - [ ] Correctly installs dependencies (`npm install --legacy-peer-deps --ignore-scripts`).
  - [ ] Correctly copies necessary source code (`src`, `config`, etc.) and `package*.json` between stages.
  - [ ] `EXPOSE`s the correct port the application listens on (Verified: `5000`).
  - [ ] Uses a non-root user in the final `production` stage.
  - [ ] Installs necessary runtime utilities if needed (e.g., `wget` for healthcheck).
- [ ] **`package.json` (`backend/package.json`):**
  - [ ] Contains all required dependencies.
  - [ ] Has a `start` script used by the Dockerfile `CMD` (Verified: `node src/server.js`).
  - [ ] (Optional but Recommended) Includes an `engines` field specifying the Node.js version (e.g., `"node": "^18.0.0"`).
- [ ] **Database Configuration (`backend/src/config/db.config.js`):**
  - [ ] Reads all connection parameters (user, password, db name, host/port, instance connection name) from environment variables (`process.env`).
  - [ ] Includes logic to use `dialectOptions.socketPath` (e.g., `/cloudsql/INSTANCE_CONNECTION_NAME`) when `process.env.INSTANCE_CONNECTION_NAME` is set (for Cloud Run).
  - [ ] Falls back to using host/port when `INSTANCE_CONNECTION_NAME` is _not_ set (for local Docker Compose).
- [ ] **Local Docker Build:**
  - [ ] Run `docker build -t test-build -f backend/Dockerfile .` from the `Monorepo` root. Does it complete successfully?
- [ ] **Local Docker Compose Run (Optional but Recommended):**
  - [ ] Does `docker-compose up backend` (or `docker-compose --profile backend up`) successfully start the backend service and connect to the local MySQL container?

---

## II. Source Control & GitHub Setup (`Monorepo` root)

- [ ] **`.gitignore`:**
  - [ ] Exists in the root directory.
  - [ ] Ignores `node_modules` directories (root and workspaces).
  - [ ] Ignores sensitive files (e.g., `.env` files, downloaded service account keys `*.json`).
- [ ] **`.dockerignore`:**
  - [ ] Exists in the root directory.
  - [ ] Correctly configured to _only_ include the `backend/` directory for the backend Docker build context (e.g., `*` then `!/backend`).
- [ ] **GitHub Repository (`ahmedjaziri31/Monorepo`):**
  - [ ] Local Git remote `origin` points to the correct URL (`https://github.com/ahmedjaziri31/Monorepo.git`). (Verify with `git remote -v`).
- [ ] **GitHub Secret (`GCP_SA_KEY`):**
  - [ ] Go to Repository **Settings > Secrets and variables > Actions**.
  - [ ] Does the secret `GCP_SA_KEY` exist?
  - [ ] **Verification:** Does the value _exactly_ match the content of the JSON key file downloaded for the `github-actions-deployer@...` service account? (Consider regenerating the key and updating the secret if unsure).

---

## III. Google Cloud Platform (GCP) Configuration (`cellular-way-454315-f2` project)

- [ ] **APIs Enabled:** (Verify in **APIs & Services > Enabled APIs & services**)
  - [ ] `Artifact Registry API`
  - [ ] `Cloud Run Admin API`
  - [ ] `Cloud SQL Admin API`
  - [ ] `Secret Manager API`
  - [ ] `IAM Service Account Credentials API`
  - [ ] `Security Token Service API` (Needed for token exchange, even with SA keys sometimes)
  - [ ] `Identity and Access Management (IAM) API`
- [ ] **Service Account (Deployer - `github-actions-deployer@...`):** (Verify in **IAM & Admin > IAM**)
  - [ ] Exists.
  - [ ] Has **`Artifact Registry Writer`** role assigned _directly_.
  - [ ] Has **`Cloud Run Admin`** role assigned _directly_.
  - [ ] Has **`Service Account User`** role assigned _directly_ (allows it to act as itself and potentially other SAs if needed).
  - [ ] Has **`Secret Manager Secret Accessor`** role assigned _directly_ (needed if workflow needs to read secrets, less common but good practice).
  - [ ] JSON key file was downloaded and its content is stored _correctly_ in the `GCP_SA_KEY` GitHub secret.
- [ ] **Service Account (Cloud Run Runtime - `...-compute@...`):** (Verify in **IAM & Admin > IAM**)
  - [ ] Exists (Compute Engine default service account).
  * [ ] Has **`Artifact Registry Reader`** role assigned _directly_.
  * [ ] Has **`Secret Manager Secret Accessor`** role assigned _directly_.
  * [ ] Has **`Cloud SQL Client`** role assigned _directly_ (needed to connect via proxy).
- [ ] **Artifact Registry Repository (`korpor-backend-images`):** (Verify in **Artifact Registry**)
  - [ ] Exists.
  - [ ] Format is `Docker`.
  - [ ] Location is `Region: us-central1`.
- [ ] **Cloud SQL Instance (`korpor-db`):** (Verify in **SQL**)
  - [ ] Exists and is Runnable.
  - [ ] Region is `us-central1`.
  - [ ] Database `korpor_dev` exists within the instance.
  - [ ] User `korpor_app_user` exists within the instance.
  - [ ] **Instance Connection Name** is noted (`cellular-way-454315-f2:us-central1:korpor-db`).
- [ ] **Secret Manager Secrets:** (Verify in **Security > Secret Manager**)
  - [ ] Secret `korpor-db-user` exists and holds the correct username (`korpor_app_user`).
  - [ ] Secret `korpor-db-password` exists and holds the correct password for `korpor_app_user`.
  - [ ] Secret `korpor-db-name` exists and holds the correct database name (`korpor_dev`).
  - [ ] Secret `korpor-db-instance-connection-name` exists and holds the correct Instance Connection Name (`cellular-way-454315-f2:us-central1:korpor-db`).
- [ ] **Cloud Run Service (`korpor`):** (Verify in **Cloud Run**)
  - [ ] Exists in region `us-central1`.
  - [ ] **Networking:** "Container port" is set to `5000`.
  - [ ] **Security:** "Authentication" is set as intended (e.g., "Allow unauthenticated invocations").
  - [ ] **Connections:** Cloud SQL connection to `korpor-db` is added and active.
  - [ ] **Variables & Secrets:**
    - [ ] Environment variable `DB_USER` references secret `korpor-db-user` (latest version).
    - [ ] Environment variable `DB_PASSWORD` references secret `korpor-db-password` (latest version).
    - [ ] Environment variable `DB_NAME` references secret `korpor-db-name` (latest version).
    - [ ] Environment variable `INSTANCE_CONNECTION_NAME` references secret `korpor-db-instance-connection-name` (latest version).

---

## IV. GitHub Actions Workflow (`.github/workflows/backend-gcp-deploy.yml`)

- [ ] **File Path & Name:** Correctly located.
- [ ] **Trigger (`on:`):** Correctly configured for `push` to `main` with `paths: backend/**`.
- [ ] **Environment Variables (`env:`):**
  - [ ] `GCP_PROJECT_ID`, `GCP_REGION`, `CLOUD_RUN_SERVICE_NAME`, `GAR_REPOSITORY`, `IMAGE_NAME` are correct.
  - [ ] `GAR_IMAGE_PATH` is correctly constructed (`us-central1-docker.pkg.dev/...`).
- [ ] **Job `build-and-push-gar`:**
  - [ ] `working-directory: ./backend` is set correctly.
  - [ ] `permissions:` includes `id-token: write` (needed for auth action).
  - [ ] `Install dependencies` step uses `npm install --legacy-peer-deps --ignore-scripts`.
  - [ ] `Authenticate to Google Cloud` step uses `google-github-actions/auth@v2` with `credentials_json: '${{ secrets.GCP_SA_KEY }}'`.
  - [ ] `Build and push...` step uses `docker/build-push-action@v5`.
    - [ ] `context: .`
    - [ ] `file: ./backend/Dockerfile`
    - [ ] `push: true`
    - [ ] `tags: ${{ env.GAR_IMAGE_PATH }}:${{ github.sha }}`
    - [ ] Caching (`cache-from`, `cache-to`) is configured (optional but good).
- [ ] **Job `deploy-to-cloud-run`:**
  - [ ] `needs: build-and-push-gar` is correct.
  - [ ] `permissions:` includes `id-token: write`.
  - [ ] `Authenticate to Google Cloud...` step uses the same method as the build job (`credentials_json: '${{ secrets.GCP_SA_KEY }}'`).
  - [ ] `Deploy to Cloud Run` step uses `google-github-actions/deploy-cloudrun@v2`.
    - [ ] `service: ${{ env.CLOUD_RUN_SERVICE_NAME }}`
    - [ ] `region: ${{ env.GCP_REGION }}`
    - [ ] `image: ${{ env.GAR_IMAGE_PATH }}:${{ github.sha }}`
  - [ ] `Test Deployed Service Health Endpoint` step uses `curl --fail ... ${{ steps.deploy.outputs.url }}/health`.

---

## V. Final Testing & Verification

- [ ] **Trigger Workflow:** Commit and push all verified changes (including this checklist) to the `main` branch.
  ```bash
  git add .
  git commit -m "chore: Final CI/CD setup verification"
  git push origin main
  ```
- [ ] **Monitor Workflow Run:** (GitHub Actions Tab)
  - [ ] Does the `build-and-push-gar` job succeed? (Pay attention to the push step - no more 403 errors?)
  - [ ] Does the `deploy-to-cloud-run` job succeed?
  - [ ] Does the `Test Deployed Service Health Endpoint` step succeed?
- [ ] **Verify Cloud Run Revision:** (GCP Console: Cloud Run > korpor > Revisions)
  - [ ] Is a new revision deployed with the correct image tag (from GAR, matching commit SHA)?
  - [ ] Does the new revision show 100% traffic?
- [ ] **Verify Service Access & Health:** (Use Service URL from Cloud Run)
  - [ ] Can you access the `/health` endpoint successfully?
- [ ] **Verify Database Connectivity:** (GCP Console: Cloud Run > korpor > Logs)
  - [ ] Does the log message `Database connection established successfully.` appear shortly after the revision starts?
  - [ ] Are there _any_ database connection errors in the logs?
- [ ] **Verify API Functionality:** (Postman/curl)
  - [ ] Test login/authentication endpoints.
  - [ ] Test endpoints that read data from the database.
  * [ ] Test endpoints that write data to the database.
  * [ ] Confirm data persistence by reading back written data or checking the database directly.

---
