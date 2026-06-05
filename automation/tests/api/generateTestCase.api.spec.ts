import { test, expect } from "@playwright/test";

test("@api Generate Test Cases API - Valid Request", async ({ request }) => {
  const response = await request.post(
    "http://localhost:5000/api/testcases/generate",
    {
      data: {
        requirement: "Login page with email and password",
      },
    },
  );
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.success).toBe(true);
  expect(body.data).toBeTruthy();
});

test("@api Generate Test Cases API - Empty Requirement", async ({
  request,
}) => {
  const response = await request.post(
    "http://localhost:5000/api/testcases/generate",
    {
      data: {
        requirement: "",
      },
    },
  );
  expect(response.status()).toBe(400);
});

test("@api Generate Test Cases API - Missing Requirement", async ({
  request,
}) => {
  const response = await request.post(
    "http://localhost:5000/api/testcases/generate",
    {
      data: {},
    },
  );
  expect(response.status()).toBe(400);
});

test("@api Generate Test Cases API - Blank Spaces", async ({ request }) => {
  const response = await request.post(
    "http://localhost:5000/api/testcases/generate",
    {
      data: {
        requirement: "     ",
      },
    },
  );
  expect(response.status()).toBe(400);
});
