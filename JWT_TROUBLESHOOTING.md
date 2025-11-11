# JWT Token Issues - Troubleshooting Guide

## Issue: "JsonWebTokenError: invalid signature"

This error occurs when the JWT token stored in the browser was created with a different `JWT_SECRET` than what's currently configured in the backend.

### Common Causes

1. **JWT_SECRET was changed** - If you changed the JWT_SECRET in the backend `.env` file after users had already logged in
2. **Different environments** - Using tokens from a different environment (e.g., local vs production)
3. **Multiple backend instances** - Running multiple backend servers with different JWT_SECRET values
4. **Cached old tokens** - Browser has old tokens from previous development sessions

### Solution 1: Clear Browser Storage (Recommended for Users)

The easiest fix is to clear the stored token in the browser:

1. Open browser DevTools (F12)
2. Go to Application tab (Chrome) or Storage tab (Firefox)
3. Click on "Local Storage"
4. Find and delete the `token` key
5. Refresh the page and login again

**Or use this JavaScript in browser console:**
```javascript
localStorage.removeItem('token');
location.reload();
```

### Solution 2: Backend Fix (For Developers)

The backend has been updated to provide better error messages:

**File: `Backend/middlewares/authUser.js`**
```javascript
if (error.name === 'JsonWebTokenError') {
  return res.json({ success: false, message: "Invalid token. Please login again." });
}
if (error.name === 'TokenExpiredError') {
  return res.json({ success: false, message: "Token expired. Please login again." });
}
```

**File: `Frontend/src/context/AppContext.jsx`**
```javascript
if (data.message && (data.message.includes("Invalid token") || data.message.includes("Token expired"))) {
  localStorage.removeItem("token");
  setToken(false);
  toast.error("Session expired. Please login again.");
}
```

### Solution 3: Prevent Future Issues

1. **Never commit JWT_SECRET to version control**
   - Keep JWT_SECRET in `.env` file only
   - Add `.env` to `.gitignore`
   - Document the required JWT_SECRET in `.env.example`

2. **Use consistent JWT_SECRET**
   - Make sure all environments use the same JWT_SECRET
   - Or implement token refresh mechanism for production

3. **Add token expiration**
   - Set appropriate token expiration time
   - Implement refresh token mechanism

### For Production Deployment

When deploying to production:

1. Set a strong, unique JWT_SECRET in production environment
2. Never use the same JWT_SECRET as development
3. Rotate JWT_SECRET periodically for security
4. Implement proper session management

### Quick Fix Commands

**Clear localStorage for all users (add to frontend):**
```javascript
// Add version checking
const APP_VERSION = '1.0.0';
const storedVersion = localStorage.getItem('appVersion');

if (storedVersion !== APP_VERSION) {
  localStorage.clear();
  localStorage.setItem('appVersion', APP_VERSION);
  window.location.reload();
}
```

**Reset all sessions (backend):**
```javascript
// Change JWT_SECRET in .env
JWT_SECRET=new_random_secret_key_here_123456789
```
Then restart backend server - all old tokens will be invalidated.

### Testing the Fix

1. Login with new credentials
2. Verify token is stored in localStorage
3. Refresh the page - should stay logged in
4. Close browser and reopen - should stay logged in
5. Change JWT_SECRET in backend - should get "Invalid token" error
6. Login again - should work with new token

### Error Handling Flow

```
User makes authenticated request
    ↓
Backend receives request with token
    ↓
JWT verification with JWT_SECRET
    ↓
├─ Success: Process request
└─ Failure: 
    ├─ JsonWebTokenError → "Invalid token. Please login again."
    ├─ TokenExpiredError → "Token expired. Please login again."
    └─ Other errors → Generic error message
    ↓
Frontend receives error
    ↓
If token invalid/expired:
    ├─ Remove token from localStorage
    ├─ Clear user state
    ├─ Show login prompt
    └─ User can login again
```

### Prevention Checklist

- [ ] JWT_SECRET is in `.env` file
- [ ] `.env` is in `.gitignore`
- [ ] Same JWT_SECRET used across all backend instances
- [ ] Token validation includes clear error messages
- [ ] Frontend handles invalid token errors gracefully
- [ ] Users are prompted to re-login when token is invalid
- [ ] Documentation includes JWT_SECRET setup instructions

## Additional Resources

- JWT.io - Decode and verify JWT tokens: https://jwt.io/
- Express JWT Best Practices: https://expressjs.com/en/advanced/best-practice-security.html
- JWT Security Best Current Practices: https://tools.ietf.org/html/draft-ietf-oauth-jwt-bcp

---

**Note**: This issue has been fixed in the latest commits. Users experiencing this error should clear their browser's localStorage and login again.
