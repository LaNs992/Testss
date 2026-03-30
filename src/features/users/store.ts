import { create } from "zustand";
import type { User } from "../../shared/types/user";

type UsersState = {
  activeUsers: User[];
  archivedUsers: User[];
  setUsers: (users: User[]) => void;
  archiveUser: (id: number) => void;
  hideUser: (id: number) => void;
  restoreUser: (id: number) => void;

  updateUser: (
    id: number,
    data: {
      name: string;
      username: string;
      email: string;
      city: string;
      phone: string;
      company: string;
    },
  ) => void;
};

export const useUsersStore = create<UsersState>((set) => ({
  activeUsers: [],
  archivedUsers: [],
  setUsers: (users) => set({ activeUsers: users }),
  archiveUser: (id) =>
    set((state) => {
      const user = state.activeUsers.find((u) => u.id === id);
      if (!user) return {};
      return {
        activeUsers: state.activeUsers.filter((u) => u.id !== id),
        archivedUsers: [...state.archivedUsers, user],
      };
    }),
  hideUser: (id) =>
    set((state) => ({
      activeUsers: state.activeUsers.filter((u) => u.id !== id),
    })),
  restoreUser: (id) =>
    set((state) => {
      const user = state.archivedUsers.find((u) => u.id === id);
      if (!user) return {};
      return {
        archivedUsers: state.archivedUsers.filter((u) => u.id !== id),
        activeUsers: [...state.activeUsers, user],
      };
    }),
  updateUser: (id, data) =>
    set((state) => {
      const update = (users: User[]) =>
        users.map((u) =>
          u.id === id
            ? {
                ...u,
                name: data.name,
                username: data.username,
                email: data.email,
                phone: data.phone,
                address: {
                  ...u.address,
                  city: data.city,
                },
                company: {
                  ...u.company,
                  name: data.company,
                },
              }
            : u,
        );

      return {
        activeUsers: update(state.activeUsers),
        archivedUsers: update(state.archivedUsers),
      };
    }),
}));
