/** Shape of `/api/v1/auth` user payload stored in `mk_user` */
export interface SessionUser {
  id?: string;
  username?: string;
  email?: string;
  phone?: string;
  authProvider?: string;
  auth_provider?: string;
}

export type AuthUser = SessionUser | null;
