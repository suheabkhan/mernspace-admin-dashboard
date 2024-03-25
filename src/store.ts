import { create } from "zustand";
import { devtools } from "zustand/middleware";
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

// when loggedout, user is null, when loggedin user has User value
interface AuthState {
  user: null | User;
  setUser: (user: User) => void;
  logout: () => void;
}

// Store setup
//default value as null,
//when set user method is called, then set the user
//when logout method is called, set user to null
export const useAuthStore = create<AuthState>(
  //set is a setter method
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
  }))
);
