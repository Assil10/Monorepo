/**
 * Comprehensive Authentication Flow Test
 *
 * This script tests the entire authentication flow:
 * 1. Sign Up
 * 2. Email Verification
 * 3. Sign In
 * 4. Token Validation
 * 5. Token Refresh
 * 6. Password Reset
 * 7. Logout
 *
 * Additional test scenarios:
 * 8. Re-registration with unverified email
 * 9. Resend verification code
 */

const axios = require("axios");
const readline = require("readline");

// Configuration
const API_URL = "http://localhost:5000/api/auth";
let accessToken, refreshToken;

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper to ask questions
async function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

// Helper to format responses for display
function formatResponse(response) {
  const { status, statusText, data } = response;
  console.log(`Status: ${status} ${statusText}`);
  console.log("Response:", JSON.stringify(data, null, 2));
  console.log("---------------------------------------------------");
}

// Display the main menu and get user choice
async function showMenu() {
  console.log("\n===== AUTH FLOW TEST MENU =====\n");
  console.log("1. Run full authentication flow (all steps)");
  console.log("2. Test registration only");
  console.log("3. Test re-registration with unverified email");
  console.log("4. Test resend verification code");
  console.log("5. Test forgot/reset password flow");
  console.log("6. Exit");

  const choice = await askQuestion("\nEnter your choice (1-6): ");
  return choice.trim();
}

// Main test function
async function testAuthFlow() {
  try {
    const choice = await showMenu();

    switch (choice) {
      case "1":
        await runFullAuthFlow();
        break;
      case "2":
        await testRegistrationOnly();
        break;
      case "3":
        await testReregistration();
        break;
      case "4":
        await testResendVerification();
        break;
      case "5":
        await testPasswordReset();
        break;
      case "6":
        console.log("Exiting test...");
        rl.close();
        return;
      default:
        console.log("Invalid choice. Please try again.");
        await testAuthFlow();
        return;
    }

    // Ask if user wants to run another test
    const runAgain = await askQuestion(
      "\nWould you like to run another test? (y/n): ",
    );
    if (runAgain.toLowerCase() === "y") {
      await testAuthFlow();
    } else {
      rl.close();
    }
  } catch (error) {
    console.error("\n❌ TEST FAILED:", error.message);
    rl.close();
  }
}

// Function to run the full authentication flow
async function runFullAuthFlow() {
  console.log("\n===== FULL AUTH FLOW TEST =====\n");

  // ====================== 1. SIGN UP ======================
  console.log("🔹 STEP 1: Sign Up Test\n");

  // Allow user to input their own email or generate a random one
  let testEmail = await askQuestion(
    "Enter your email for testing (or press Enter to generate a random one): ",
  );

  // Generate a unique email if user didn't input one
  if (!testEmail || testEmail.trim() === "") {
    const uniqueId = Math.floor(Math.random() * 10000);
    testEmail = `test${uniqueId}@example.com`;
  }

  console.log(`Using email: ${testEmail}\n`);

  try {
    const signUpRes = await axios.post(`${API_URL}/sign-up`, {
      name: "Test",
      surname: "User",
      email: testEmail,
      password: "Password123!",
      birthdate: "1990-01-01",
    });

    formatResponse(signUpRes);
  } catch (error) {
    console.error("Sign Up Failed:", error.response?.data || error.message);
    throw new Error("Sign Up failed - cannot continue test");
  }

  // ====================== 2. VERIFY EMAIL ======================
  console.log("🔹 STEP 2: Email Verification Test\n");

  const verificationCode = await askQuestion(
    "Enter the verification code from email: ",
  );

  try {
    const verifyRes = await axios.post(`${API_URL}/verify-email`, {
      email: testEmail,
      code: verificationCode,
    });

    formatResponse(verifyRes);
  } catch (error) {
    console.error(
      "Verification Failed:",
      error.response?.data || error.message,
    );
    throw new Error("Email verification failed - cannot continue test");
  }

  // ====================== 3. SIGN IN ======================
  console.log("🔹 STEP 3: Sign In Test\n");

  try {
    const signInRes = await axios.post(`${API_URL}/sign-in`, {
      email: testEmail,
      password: "Password123!",
    });

    formatResponse(signInRes);

    // Save tokens for subsequent requests
    accessToken = signInRes.data.accessToken;
    refreshToken = signInRes.data.refreshToken;

    if (!accessToken || !refreshToken) {
      throw new Error("Missing tokens in response");
    }
  } catch (error) {
    console.error("Sign In Failed:", error.response?.data || error.message);
    throw new Error("Sign In failed - cannot continue test");
  }

  // ====================== 4. VALIDATE TOKEN ======================
  console.log("🔹 STEP 4: Token Validation Test\n");

  try {
    const validateRes = await axios.get(`${API_URL}/validate-token`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    formatResponse(validateRes);
  } catch (error) {
    console.error(
      "Token Validation Failed:",
      error.response?.data || error.message,
    );
    throw new Error("Token validation failed - cannot continue test");
  }

  // ====================== 5. REFRESH TOKEN ======================
  console.log("🔹 STEP 5: Token Refresh Test\n");

  try {
    const refreshRes = await axios.post(`${API_URL}/refresh-token`, {
      refreshToken,
    });

    formatResponse(refreshRes);

    // Update access token
    const newAccessToken = refreshRes.data.accessToken;
    if (!newAccessToken) {
      throw new Error("Missing access token in refresh response");
    }

    accessToken = newAccessToken;
  } catch (error) {
    console.error(
      "Token Refresh Failed:",
      error.response?.data || error.message,
    );
    throw new Error("Token refresh failed - cannot continue test");
  }

  // ====================== 6. FORGOT PASSWORD ======================
  console.log("🔹 STEP 6: Forgot Password Test\n");

  try {
    const forgotPasswordRes = await axios.post(`${API_URL}/forgot-password`, {
      email: testEmail,
    });

    formatResponse(forgotPasswordRes);
  } catch (error) {
    console.error(
      "Forgot Password Failed:",
      error.response?.data || error.message,
    );
    throw new Error("Forgot password request failed - cannot continue test");
  }

  // ====================== 7. RESET PASSWORD ======================
  console.log("🔹 STEP 7: Reset Password Test\n");

  const resetCode = await askQuestion(
    "Enter the password reset code from email: ",
  );

  try {
    const resetPasswordRes = await axios.post(`${API_URL}/reset-password`, {
      email: testEmail,
      code: resetCode,
      newPassword: "NewPassword123!",
    });

    formatResponse(resetPasswordRes);
  } catch (error) {
    console.error(
      "Reset Password Failed:",
      error.response?.data || error.message,
    );
    throw new Error("Password reset failed - cannot continue test");
  }

  // ====================== 8. SIGN IN WITH NEW PASSWORD ======================
  console.log("🔹 STEP 8: Sign In with New Password Test\n");

  try {
    const newSignInRes = await axios.post(`${API_URL}/sign-in`, {
      email: testEmail,
      password: "NewPassword123!",
    });

    formatResponse(newSignInRes);

    // Update tokens
    accessToken = newSignInRes.data.accessToken;
    refreshToken = newSignInRes.data.refreshToken;
  } catch (error) {
    console.error(
      "Sign In With New Password Failed:",
      error.response?.data || error.message,
    );
    throw new Error("Sign in with new password failed - cannot continue test");
  }

  // ====================== 9. LOGOUT ======================
  console.log("🔹 STEP 9: Logout Test\n");

  try {
    const logoutRes = await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    formatResponse(logoutRes);
  } catch (error) {
    console.error("Logout Failed:", error.response?.data || error.message);
    throw new Error("Logout failed");
  }

  // ====================== 10. VERIFY TOKEN IS INVALID AFTER LOGOUT ======================
  console.log("🔹 STEP 10: Verify Token Invalidation After Logout\n");

  try {
    await axios.get(`${API_URL}/validate-token`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.error("❌ TEST FAILED: Token should be invalid after logout");
  } catch (error) {
    console.log(
      "✅ Expected error - token is invalidated:",
      error.response?.data || error.message,
    );
  }

  console.log("\n===== FULL AUTH FLOW TEST COMPLETED SUCCESSFULLY =====\n");
}

// Function to test registration only
async function testRegistrationOnly() {
  console.log("\n===== REGISTRATION TEST =====\n");

  // Allow user to input their own email
  let testEmail = await askQuestion(
    "Enter your email for testing (or press Enter to generate a random one): ",
  );

  // Generate a unique email if user didn't input one
  if (!testEmail || testEmail.trim() === "") {
    const uniqueId = Math.floor(Math.random() * 10000);
    testEmail = `test${uniqueId}@example.com`;
  }

  console.log(`Using email: ${testEmail}\n`);

  try {
    const signUpRes = await axios.post(`${API_URL}/sign-up`, {
      name: "Test",
      surname: "User",
      email: testEmail,
      password: "Password123!",
      birthdate: "1990-01-01",
    });

    formatResponse(signUpRes);
    console.log("✅ Registration test completed successfully!");

    // Ask if user wants to verify email now
    const verifyNow = await askQuestion(
      "Would you like to verify the email now? (y/n): ",
    );
    if (verifyNow.toLowerCase() === "y") {
      const verificationCode = await askQuestion(
        "Enter the verification code from email: ",
      );

      try {
        const verifyRes = await axios.post(`${API_URL}/verify-email`, {
          email: testEmail,
          code: verificationCode,
        });

        formatResponse(verifyRes);
        console.log("✅ Email verification completed successfully!");
      } catch (error) {
        console.error(
          "Verification Failed:",
          error.response?.data || error.message,
        );
      }
    }
  } catch (error) {
    console.error(
      "Registration Failed:",
      error.response?.data || error.message,
    );
  }
}

// Function to test re-registration with unverified email
async function testReregistration() {
  console.log("\n===== RE-REGISTRATION WITH UNVERIFIED EMAIL TEST =====\n");

  // Allow user to input their own email
  let unverifiedEmail = await askQuestion(
    "Enter your email for unverified registration test (or press Enter to generate a random one): ",
  );

  // Generate a unique email if user didn't input one
  if (!unverifiedEmail || unverifiedEmail.trim() === "") {
    const unverifiedUniqueId = Math.floor(Math.random() * 10000);
    unverifiedEmail = `unverified${unverifiedUniqueId}@example.com`;
  }

  console.log(`Using email for unverified test: ${unverifiedEmail}\n`);

  // First registration
  try {
    console.log("First registration...");
    const firstSignUpRes = await axios.post(`${API_URL}/sign-up`, {
      name: "Unverified",
      surname: "User",
      email: unverifiedEmail,
      password: "Password123!",
      birthdate: "1990-01-01",
    });

    formatResponse(firstSignUpRes);

    // Wait a moment before re-registration
    const waitTime = await askQuestion(
      "Enter wait time in seconds before re-registration (default: 2): ",
    );
    const seconds = parseInt(waitTime) || 2;
    console.log(
      `Waiting ${seconds} seconds before attempting re-registration...`,
    );
    await new Promise((resolve) => setTimeout(resolve, seconds * 1000));

    // Second registration with same email
    console.log("Attempting re-registration with same email...");
    try {
      const secondSignUpRes = await axios.post(`${API_URL}/sign-up`, {
        name: "Unverified",
        surname: "User Again",
        email: unverifiedEmail,
        password: "DifferentPassword123!",
        birthdate: "1990-01-01",
      });

      formatResponse(secondSignUpRes);
      console.log(
        "✅ Re-registration handled correctly - new verification code should be sent",
      );
    } catch (error) {
      console.log("Re-registration response:");
      console.log("Status:", error.response?.status);
      console.log("Response:", error.response?.data);

      // Check if this is the expected response for unverified user with valid verification code
      if (
        error.response?.status === 400 &&
        error.response?.data.message.includes(
          "already registered but not verified",
        )
      ) {
        console.log(
          "✅ Expected behavior - email is already registered but not verified",
        );
      } else {
        console.error(
          "❌ Unexpected error on re-registration:",
          error.response?.data || error.message,
        );
      }
    }
  } catch (error) {
    console.error(
      "First Registration Failed:",
      error.response?.data || error.message,
    );
  }
}

// Function to test resend verification code
async function testResendVerification() {
  console.log("\n===== RESEND VERIFICATION CODE TEST =====\n");

  // Allow user to input their own email
  const email = await askQuestion(
    "Enter the email address to test resend verification: ",
  );

  if (!email || email.trim() === "") {
    console.error("Email is required for this test.");
    return;
  }

  try {
    console.log(`Requesting new verification code for ${email}...`);
    const resendRes = await axios.post(`${API_URL}/resend-verification`, {
      email: email,
    });

    formatResponse(resendRes);
    console.log("✅ Verification code resend request completed!");
  } catch (error) {
    console.log("Resend verification response:");
    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);

    if (
      error.response?.status === 400 &&
      error.response?.data.message.includes("already verified")
    ) {
      console.log("✅ Expected error - email is already verified");
    } else {
      console.error(
        "❌ Unexpected error on resend verification:",
        error.response?.data || error.message,
      );
    }
  }
}

// Function to test password reset flow
async function testPasswordReset() {
  console.log("\n===== PASSWORD RESET TEST =====\n");

  // Allow user to input their own email
  const email = await askQuestion(
    "Enter the email address to test password reset: ",
  );

  if (!email || email.trim() === "") {
    console.error("Email is required for this test.");
    return;
  }

  try {
    console.log(`Requesting password reset for ${email}...`);
    const forgotPasswordRes = await axios.post(`${API_URL}/forgot-password`, {
      email: email,
    });

    formatResponse(forgotPasswordRes);

    const resetCode = await askQuestion(
      "Enter the password reset code from email: ",
    );
    const newPassword =
      (await askQuestion("Enter the new password: ")) || "NewPassword123!";

    try {
      console.log("Resetting password...");
      const resetPasswordRes = await axios.post(`${API_URL}/reset-password`, {
        email: email,
        code: resetCode,
        newPassword: newPassword,
      });

      formatResponse(resetPasswordRes);
      console.log("✅ Password reset completed successfully!");

      // Ask if user wants to test login with new password
      const testLogin = await askQuestion(
        "Would you like to test login with the new password? (y/n): ",
      );
      if (testLogin.toLowerCase() === "y") {
        try {
          console.log("Testing login with new password...");
          const signInRes = await axios.post(`${API_URL}/sign-in`, {
            email: email,
            password: newPassword,
          });

          formatResponse(signInRes);
          console.log("✅ Login with new password successful!");
        } catch (error) {
          console.error("Login Failed:", error.response?.data || error.message);
        }
      }
    } catch (error) {
      console.error(
        "Reset Password Failed:",
        error.response?.data || error.message,
      );
    }
  } catch (error) {
    console.error(
      "Forgot Password Failed:",
      error.response?.data || error.message,
    );
  }
}

// Start the test
testAuthFlow();
