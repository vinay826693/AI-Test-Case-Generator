# QA Setup & Execution Guide

## Step 1: Clone Repository

```bash
git clone <repository-url>
cd AI_TEST_CASE_GENERATOR
```

---

## Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

---

## Step 3: Start Backend Application

```bash
npm start
```

Backend URL:

```text
http://localhost:5000
```

---

## Step 4: Install Frontend Dependencies

Open a new terminal.

```bash
cd frontend
npm install
```

---

## Step 5: Start Frontend Application

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## Step 6: Install Automation Dependencies

Open a new terminal.

```bash
cd automation
npm install
```

---

## Step 7: Install Playwright Browsers

```bash
npx playwright install
```

---

## Step 8: Run All Tests

```bash
npx playwright test
```

---

## Step 9: Run Tests in Headed Mode

```bash
npx playwright test --headed
```

---

## Step 10: Run a Specific Test File

```bash
npx playwright test tests/dashboard.spec.ts
```

---

## Step 11: Run API Tests

```bash
npx playwright test tests/api
```

---

## Step 12: Run Tests in UI Mode

```bash
npx playwright test --ui
```

---

## Step 13: Run Tests on a Specific Browser

```bash
npx playwright test --project=chromium
```

---

## Step 14: View HTML Report

```bash
npx playwright show-report
```

---

## Step 15: Execution Flow

### Terminal 1

```bash
cd backend
npm start
```

### Terminal 2

```bash
cd frontend
npm run dev
```

### Terminal 3

```bash
cd automation
npx playwright test
```

---

## Optional: Run Application Using Docker

### Build Containers

```bash
docker compose build
```

### Start Containers

```bash
docker compose up -d
```

### Stop Containers

```bash
docker compose down
```

### Run Automation Against Dockerized Application

```bash
cd automation
npx playwright test
```
