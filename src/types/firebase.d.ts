declare module '../../Firebase/firebase' {
  import { Auth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
  
  export const auth: Auth;
  export const googleProvider: GoogleAuthProvider;
  export const githubProvider: GithubAuthProvider;
  
  const app: any;
  export default app;
}