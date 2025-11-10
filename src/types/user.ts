export interface User {
  uid: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: "admin" | "user";
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  confirmPassword: string;
  role?: "admin" | "user";
  phone?: string;
}
