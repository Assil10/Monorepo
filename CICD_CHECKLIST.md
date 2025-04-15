# CI/CD Backend Deployment Checklist (GitHub Actions -> GHCR -> Google Cloud Run)

## I. Local Backend & Docker Setup (`backend/` directory)

- [x] **Dockerfile:** Does `backend/Dockerfile` exist and correctly define how to build your backend image?
- [x] **Dockerfile Build:** Can you successfully build the image locally? (Run `docker build -t test-backend -f backend/Dockerfile .` from the `Monorepo` root directory).
- [x] **Container Port:** Does your backend application (`backend/src/server.js`) listen on a specific port (e.g., 8080)? Is this port `EXPOSE`d in the `backend/Dockerfile`? (Verified: 5000)
- [x] **`package.json`:** Does `backend/package.json` exist and list all necessary dependencies? Does it have a `start` script (or similar) used in the Dockerfile's `CMD` or `ENTRYPOINT`?
- [x] **Node.js Version:** Do you know the required Node.js version for your backend? (Is it specified in `backend/package.json` -> `engines`?) (Verified: Using Node 18 consistently)

## II. Google Cloud Platform (GCP) Configuration

- [x] **Project:** Is the Project ID `cellular-way-454315-f2` correct?
- [x] **APIs Enabled:** Are `Cloud Run Admin API`, `IAM Service Account Credentials API`, `Cloud SQL Admin API`, and `Secret Manager API` enabled in your GCP project? (Cloud SQL Admin API enabled, assuming others OK)
- [x] **Cloud Run Service:**
  - [x] Is the service named `korpor` created?
  - [x] Is it in the correct region (`us-central1`)?
  - [x] Is the "Container port" setting in Cloud Run configured to match the port your application listens on (from step I)? (Assumed verified: 5000)
  - [ ] Is the "Authentication" setting configured as intended (e.g., "Allow unauthenticated")? (Needs verification in Cloud Run console)
- [x] **Cloud SQL (MySQL):**
  - [x] Is the Cloud SQL instance created (e.g., `korpor-db`)?
  - [x] Is it in the same region (`us-central1`) as Cloud Run?
  - [x] Is the database itself created within the instance (e.g., `korpor_dev`)?
  - [x] Is a dedicated database user created (e.g., `korpor_app_user`)?
  - [x] Have you securely stored the database user, password, database name, and **Instance Connection Name**?
- [x] **Secret Manager:**
  - [x] Are database credentials (user, password, db name, instance connection name) stored as secrets in Google Secret Manager?
- [x] **Cloud Run <-> Cloud SQL Connection:**
  - [x] Is the Cloud SQL instance linked under the "Connections" tab of your `korpor` Cloud Run service?
  - [x] Are the secrets from Secret Manager referenced correctly as environment variables in the `korpor` Cloud Run service ("Variables & Secrets" tab)?
- [x] **Service Account (Deployer):**
  - [x] Does the service account `github-actions-deployer@cellular-way-454315-f2.iam.gserviceaccount.com` exist?
  - [x] Does it have the `Cloud Run Admin` and `Service Account User` roles? (Add `Secret Manager Secret Accessor` if you referenced secrets in Cloud Run).
  - [x] Was the JSON key for this service account generated and downloaded?
- [x] **Service Account (Runtime):**
  - [x] Does the Cloud Run runtime service account (`...-compute@developer.gserviceaccount.com`) have the `Secret Manager Secret Accessor` role? (Granted)

## III. GitHub Configuration (`ahmedjaziri31/Monorepo`)

- [x] **Repository Owner:** Is the owner confirmed as `ahmedjaziri31`?
- [x] **GitHub Secret:**
  - [x] Does the secret named `GCP_SA_KEY` exist in the repository's Actions secrets (`Settings` > `Secrets and variables` > `Actions`)?
  - [x] Does its value contain the _full and exact_ content of the downloaded JSON service account key file?

## IV. GitHub Actions Workflow File (`.github/workflows/backend-gcp-deploy.yml`)

- [x] **File Existence:** Does the file exist at the correct path in your repository?
- [x] **Trigger:** Are the `on.push.branches` (`main`) and `on.push.paths` (`backend/**`) configured correctly?
- [x] **Environment Variables (`env:`):**
  - [x] Is `GCP_PROJECT_ID` correct (`cellular-way-454315-f2`)?
  - [x] Is `GCP_REGION` correct (`us-central1`)?
  - [x] Is `CLOUD_RUN_SERVICE_NAME` correct (`korpor`)?
  - [x] Is `GHCR_IMAGE_NAME` correct (`ghcr.io/ahmedjaziri31/Monorepo/backend-service`)?
- [x] **Build Job (`build-and-push-ghcr`):**
  - [x] Is `defaults.run.working-directory` set to `./backend`?
  - [x] Is `permissions.packages` set to `write`?
  - [x] Does the `setup-node` step use the correct `node-version` for your backend?
  - [x] Are the `docker/build-push-action` `context` (`.`) and `dockerfile` (`./backend/Dockerfile`) paths correct?
  - [x] Does the `tags` parameter use `${{ github.sha }}`?
- [x] **Deploy Job (`deploy-to-cloud-run`):**
  - [x] Does it have `needs: build-and-push-ghcr`?
  - [x] Does it have `permissions.id-token: write`?
  - [x] Does the `google-github-actions/auth` step use `credentials_json: '${{ secrets.GCP_SA_KEY }}'`?
  - [x] Does the `google-github-actions/deploy-cloudrun` step use the correct `service`, `region`, and `image` (`${{ env.GHCR_IMAGE_NAME }}:${{ github.sha }}`)?

## V. Backend Code Database Connection

- [x] **Environment Variables:** Does your backend code (`backend/src/config/db.js` or similar) read the database connection details (user, password, db name, instance connection name/socket path) from environment variables (e.g., `process.env.DB_USER`)?
- [x] **Cloud SQL Proxy:** Does the code use the correct socket path for the Cloud SQL Auth Proxy when running in Cloud Run (e.g., `/cloudsql/cellular-way-454315-f2:us-central1:korpor-db`)?

## VI. Testing the Pipeline

- [x] **Commit & Push:** Have you committed the `.github/workflows/backend-gcp-deploy.yml` file and pushed it to the `main` branch?
- [x] **Workflow Run:** Did the GitHub Actions workflow trigger and run successfully? (Check the "Actions" tab in your GitHub repo). (Ran successfully after permission fix)
- [ ] **Cloud Run Revision:** Does your `korpor` service in Cloud Run show a new revision deployed with the image tag matching the latest commit SHA? (Needs verification)
- [ ] **Service Access:** Can you access the URL provided by Cloud Run for your `korpor` service? (Needs verification)
- [ ] **Database Connectivity:** Does the deployed application successfully connect to the Cloud SQL database? (Check the logs for your `korpor` service in the Google Cloud Console for any connection errors). (Needs verification)
- [ ] **Functionality:** Do the API endpoints of your deployed backend service work as expected, especially those interacting with the database? (Needs verification)
