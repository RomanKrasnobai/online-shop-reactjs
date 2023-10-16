export interface User {
  accessToken: string;
  auth: any;
  displayName: any;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: {createdAt: string, lastLoginAt: string, lastSignInTime: string, creationTime: string};
  phoneNumber: any;
  photoURL: any;
  proactiveRefresh: {user: any, isRunning: boolean, timerId: any, errorBackoff: number};
  providerData: any[];
  providerId: string;
  reloadListener: any;
  reloadUserInfo: any;
  stsTokenManager: any;
  tenantId: any;
  uid: string;
  refreshToken: string;
}
