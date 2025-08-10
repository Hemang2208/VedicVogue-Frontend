# Token Management System - Simple TypeScript Implementation

This document explains how to use the new token management system implemented with simple TypeScript functions (no OOP/classes).

## 📁 Files Created/Updated

### Frontend Files:
- `src/utils/tokenManager.ts` - Core token management functions
- `src/contexts/AuthContext.tsx` - Optional auth context provider
- `src/components/guards/UserAuthGuard.tsx` - Updated with new token functions
- `src/components/guards/CaptainAuthGaurd.tsx` - Updated with new token functions
- `src/app/(public)/sign-in/page.tsx` - Updated to use token manager

### Backend Files:
- `src/controllers/Auth/user.controller.ts` - Added token validation & refresh endpoints
- `src/routes/Auth/user.route.ts` - Added new routes for token management

## 🔧 How to Use

### 1. Basic Token Operations

```typescript
import { 
  setTokens, 
  getAccessToken, 
  getRefreshToken, 
  clearTokens, 
  hasTokens,
  refreshAccessToken,
  logoutUser 
} from '@/utils/tokenManager';

// Store tokens after login
setTokens({
  accessToken: 'your-access-token',
  refreshToken: 'your-refresh-token',
  user: userObject
}, true); // true = remember me (localStorage), false = session only

// Get tokens
const accessToken = getAccessToken();
const refreshToken = getRefreshToken();

// Check if user has tokens
if (hasTokens()) {
  console.log('User has tokens');
}

// Refresh expired access token
const newToken = await refreshAccessToken();

// Logout user
await logoutUser(true); // true = inform backend
```

### 2. Updated Sign-in Process

```typescript
// In your sign-in component
import { setTokens } from '@/utils/tokenManager';

const handleLogin = async () => {
  // ... your login logic
  
  // After successful login response
  const { user, tokens } = responseData;
  
  // Store tokens using the manager
  setTokens({ 
    accessToken: tokens.accessToken, 
    refreshToken: tokens.refreshToken, 
    user: user 
  }, rememberMe);
  
  // Redirect user
  router.push('/user/profile');
};
```

### 3. Using Auth Guards

The auth guards have been updated to use the new token system:

```typescript
// UserAuthGuard automatically handles:
// - Token validation
// - Token refresh if expired  
// - Redirect to login if invalid
// - Loading states

// Wrap your protected routes:
export default function ProtectedPage() {
  return (
    <UserAuthGuard>
      <YourProtectedContent />
    </UserAuthGuard>
  );
}
```

### 4. Optional: Using Auth Context

```typescript
// Wrap your app with AuthProvider
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}

// Use in components
import { useAuth } from '@/contexts/AuthContext';

export default function SomeComponent() {
  const { isAuthenticated, user, logout } = useAuth();
  
  const handleLogout = async () => {
    await logout(true); // Inform backend
    router.push('/sign-in');
  };
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome {user?.account?.firstName}!</p>
      ) : (
        <p>Please log in</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
```

## 🔒 Security Features

### 1. Consistent Token Keys
- Access Token: `vv_access_token`
- Refresh Token: `vv_refresh_token`
- User Data: `vv_user`

### 2. Token Validation & Refresh
- Backend endpoint: `GET /api/users/validate-token`
- Refresh endpoint: `POST /api/users/refresh-token`
- Automatic token refresh in auth guards

### 3. Storage Options
- **Remember Me = true**: localStorage (persistent)
- **Remember Me = false**: sessionStorage (session only)

### 4. Secure Logout
- Clears all tokens from storage
- Optionally informs backend to remove refresh token
- Prevents token reuse after logout

## 🚀 Backend API Endpoints

### Token Validation
```bash
GET /api/users/validate-token
Headers: Authorization: Bearer <access-token>
Response: { success: true, valid: true, userId: "...", role: "..." }
```

### Token Refresh  
```bash
POST /api/users/refresh-token
Body: { data: "encrypted-refresh-token-data" }
Response: { success: true, data: "encrypted-new-access-token" }
```

## 🛡️ Error Handling

All functions include proper error handling:

```typescript
// Functions return null/false on error instead of throwing
const token = getAccessToken(); // null if error
const hasTokens = hasTokens(); // false if error
const newToken = await refreshAccessToken(); // null if failed
```

## 🔄 Migration from Old System

### Before (Old system):
```typescript
// Inconsistent keys
localStorage.getItem("accessToken"); // ❌
localStorage.getItem("vv_access_token"); // ❌ Mixed usage

// Manual token management
if (rememberMe) {
  localStorage.setItem("vv_access_token", token);
} else {
  sessionStorage.setItem("vv_access_token", token);
}
```

### After (New system):
```typescript
// Consistent API
const token = getAccessToken(); // ✅
setTokens(tokenData, rememberMe); // ✅
```

## 📝 Next Steps

1. **Test the implementation** - Run the frontend and backend
2. **Update other auth guards** if any
3. **Add token refresh middleware** for API calls (optional)
4. **Implement proper error boundaries** for auth failures
5. **Add token expiry warnings** to notify users

## 🚨 Important Notes

- The system maintains backward compatibility with your existing encryption
- All token operations are wrapped with try-catch for error safety  
- The backend follows your existing pattern of encrypted request/response data
- No classes used - all simple TypeScript functions as requested
- Token keys are now consistent across the application

This implementation provides a robust, secure, and easy-to-use token management system without using OOP concepts!
