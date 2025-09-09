# Firebase Authentication Setup

This project now includes Firebase Authentication with the following features:

## Features Implemented

✅ **Email/Password Authentication**
- User registration with email and password
- User login with email and password
- Password validation and error handling

✅ **Social Authentication**
- Google OAuth sign-in
- GitHub OAuth sign-in
- Automatic profile creation for social logins

✅ **Email Verification**
- Email verification on signup
- Resend verification email functionality
- Email verification status checking

✅ **Password Management**
- Forgot password functionality
- Password reset via email
- Change password with current password verification

✅ **User Profile Management**
- User profile creation and storage in Firestore
- Profile editing (name, phone, company)
- Profile display with avatar support

✅ **Protected Routes**
- Route protection based on authentication status
- Email verification requirement for sensitive routes
- Automatic redirects for unauthenticated users

## Firebase Configuration

The Firebase configuration is already set up in `src/lib/firebase.ts` with your provided credentials:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyD7bo6Aq6clXEEN2fs2-hd3d1rMs0kW2CI",
  authDomain: "ats-resume-278d4.firebaseapp.com",
  projectId: "ats-resume-278d4",
  storageBucket: "ats-resume-278d4.firebasestorage.app",
  messagingSenderId: "896960446754",
  appId: "1:896960446754:web:99acccc56114842e95657b",
  measurementId: "G-2Z0FJ3184Z"
};
```

## Required Firebase Console Setup

To enable all authentication features, you need to configure the following in your Firebase Console:

### 1. Authentication Methods
1. Go to Firebase Console → Authentication → Sign-in method
2. Enable the following providers:
   - **Email/Password**: Enable
   - **Google**: Enable and configure OAuth consent screen
   - **GitHub**: Enable and configure OAuth app

### 2. Google OAuth Setup
1. In Google provider settings, add your domain to authorized domains
2. Configure OAuth consent screen with your app details
3. Add authorized redirect URIs:
   - `http://localhost:5173` (for development)
   - `https://your-domain.com` (for production)

### 3. GitHub OAuth Setup
1. Create a GitHub OAuth App in your GitHub settings
2. Set Authorization callback URL to your domain
3. Copy Client ID and Client Secret to Firebase Console

### 4. Firestore Database
1. Go to Firestore Database and create a database
2. Set up security rules (see below)
3. The app will automatically create user profiles in the `users` collection

### 5. Firestore Security Rules
Add these rules to your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Usage

### Authentication Context
The app uses a React Context (`AuthContext`) that provides authentication state and methods throughout the application:

```typescript
const { 
  currentUser, 
  userProfile, 
  loading,
  signUp, 
  signIn, 
  signInWithGoogle, 
  signInWithGithub,
  signOut,
  resetPassword,
  sendVerificationEmail,
  updateUserProfile,
  changePassword
} = useAuth();
```

### Protected Routes
Use the `ProtectedRoute` component to protect routes that require authentication:

```typescript
<ProtectedRoute requireEmailVerification={true}>
  <YourComponent />
</ProtectedRoute>
```

### User Profile Structure
User profiles are stored in Firestore with the following structure:

```typescript
interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
  provider: string;
}
```

## Pages Added

- `/login` - User login page
- `/signup` - User registration page
- `/forgot-password` - Password reset page
- `/verify-email` - Email verification page
- `/profile` - User profile management
- `/settings` - Account settings and password change

## Navigation Updates

The navbar now shows:
- Sign In/Sign Up buttons for unauthenticated users
- User avatar dropdown with profile and settings links for authenticated users
- Sign out functionality

## Error Handling

All authentication operations include proper error handling with user-friendly toast notifications for:
- Invalid credentials
- Network errors
- Email verification issues
- Password validation errors
- Profile update failures

## Security Features

- Password strength validation
- Email verification requirement
- Secure password change with current password verification
- Protected routes with authentication guards
- User session management
- Automatic logout on token expiration
