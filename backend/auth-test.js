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
 */

const axios = require('axios');
const readline = require('readline');

// Configuration
const API_URL = 'http://localhost:5000/api/auth';
let accessToken, refreshToken;

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper to ask questions
async function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Helper to format responses for display
function formatResponse(response) {
  const { status, statusText, data } = response;
  console.log(`Status: ${status} ${statusText}`);
  console.log('Response:', JSON.stringify(data, null, 2));
  console.log('---------------------------------------------------');
}

// Main test function
async function testAuthFlow() {
  try {
    console.log('\n===== AUTH FLOW TEST =====\n');

    // ====================== 1. SIGN UP ======================
    console.log('🔹 STEP 1: Sign Up Test\n');
    
    // Generate a unique email to avoid conflicts
    const uniqueId = Math.floor(Math.random() * 10000);
    const testEmail = `test${uniqueId}@example.com`;
    console.log(`Using email: ${testEmail}\n`);
    
    try {
      const signUpRes = await axios.post(`${API_URL}/sign-up`, {
        name: 'Test',
        surname: 'User',
        email: testEmail,
        password: 'Password123!',
        birthdate: '1990-01-01'
      });
      
      formatResponse(signUpRes);
    } catch (error) {
      console.error('Sign Up Failed:', error.response?.data || error.message);
      throw new Error('Sign Up failed - cannot continue test');
    }

    // ====================== 2. VERIFY EMAIL ======================
    console.log('🔹 STEP 2: Email Verification Test\n');
    
    const verificationCode = await askQuestion('Enter the verification code from email: ');
    
    try {
      const verifyRes = await axios.post(`${API_URL}/verify-email`, {
        email: testEmail,
        code: verificationCode
      });
      
      formatResponse(verifyRes);
    } catch (error) {
      console.error('Verification Failed:', error.response?.data || error.message);
      throw new Error('Email verification failed - cannot continue test');
    }

    // ====================== 3. SIGN IN ======================
    console.log('🔹 STEP 3: Sign In Test\n');
    
    try {
      const signInRes = await axios.post(`${API_URL}/sign-in`, {
        email: testEmail,
        password: 'Password123!'
      });
      
      formatResponse(signInRes);
      
      // Save tokens for subsequent requests
      accessToken = signInRes.data.accessToken;
      refreshToken = signInRes.data.refreshToken;
      
      if (!accessToken || !refreshToken) {
        throw new Error('Missing tokens in response');
      }
    } catch (error) {
      console.error('Sign In Failed:', error.response?.data || error.message);
      throw new Error('Sign In failed - cannot continue test');
    }

    // ====================== 4. VALIDATE TOKEN ======================
    console.log('🔹 STEP 4: Token Validation Test\n');
    
    try {
      const validateRes = await axios.get(`${API_URL}/validate-token`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      
      formatResponse(validateRes);
    } catch (error) {
      console.error('Token Validation Failed:', error.response?.data || error.message);
      throw new Error('Token validation failed - cannot continue test');
    }

    // ====================== 5. REFRESH TOKEN ======================
    console.log('🔹 STEP 5: Token Refresh Test\n');
    
    try {
      const refreshRes = await axios.post(`${API_URL}/refresh-token`, {
        refreshToken
      });
      
      formatResponse(refreshRes);
      
      // Update access token
      const newAccessToken = refreshRes.data.accessToken;
      if (!newAccessToken) {
        throw new Error('Missing access token in refresh response');
      }
      
      accessToken = newAccessToken;
    } catch (error) {
      console.error('Token Refresh Failed:', error.response?.data || error.message);
      throw new Error('Token refresh failed - cannot continue test');
    }

    // ====================== 6. FORGOT PASSWORD ======================
    console.log('🔹 STEP 6: Forgot Password Test\n');
    
    try {
      const forgotPasswordRes = await axios.post(`${API_URL}/forgot-password`, {
        email: testEmail
      });
      
      formatResponse(forgotPasswordRes);
    } catch (error) {
      console.error('Forgot Password Failed:', error.response?.data || error.message);
      throw new Error('Forgot password request failed - cannot continue test');
    }

    // ====================== 7. RESET PASSWORD ======================
    console.log('🔹 STEP 7: Reset Password Test\n');
    
    const resetCode = await askQuestion('Enter the password reset code from email: ');
    
    try {
      const resetPasswordRes = await axios.post(`${API_URL}/reset-password`, {
        email: testEmail,
        code: resetCode,
        newPassword: 'NewPassword123!'
      });
      
      formatResponse(resetPasswordRes);
    } catch (error) {
      console.error('Reset Password Failed:', error.response?.data || error.message);
      throw new Error('Password reset failed - cannot continue test');
    }

    // ====================== 8. SIGN IN WITH NEW PASSWORD ======================
    console.log('🔹 STEP 8: Sign In with New Password Test\n');
    
    try {
      const newSignInRes = await axios.post(`${API_URL}/sign-in`, {
        email: testEmail,
        password: 'NewPassword123!'
      });
      
      formatResponse(newSignInRes);
      
      // Update tokens
      accessToken = newSignInRes.data.accessToken;
      refreshToken = newSignInRes.data.refreshToken;
    } catch (error) {
      console.error('Sign In With New Password Failed:', error.response?.data || error.message);
      throw new Error('Sign in with new password failed - cannot continue test');
    }

    // ====================== 9. LOGOUT ======================
    console.log('🔹 STEP 9: Logout Test\n');
    
    try {
      const logoutRes = await axios.post(`${API_URL}/logout`, {}, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      
      formatResponse(logoutRes);
    } catch (error) {
      console.error('Logout Failed:', error.response?.data || error.message);
      throw new Error('Logout failed');
    }

    // ====================== 10. VERIFY TOKEN IS INVALID AFTER LOGOUT ======================
    console.log('🔹 STEP 10: Verify Token Invalidation After Logout\n');
    
    try {
      await axios.get(`${API_URL}/validate-token`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      
      console.error('❌ TEST FAILED: Token should be invalid after logout');
    } catch (error) {
      console.log('✅ Expected error - token is invalidated:', error.response?.data || error.message);
    }

    console.log('\n===== AUTH FLOW TEST COMPLETED SUCCESSFULLY =====\n');
    console.log('All authentication endpoints are working correctly!');
    
  } catch (error) {
    console.error('\n❌ TEST FAILED:', error.message);
    
  } finally {
    rl.close();
  }
}

// Start the test
testAuthFlow(); 