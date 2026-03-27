import { useQuery } from "@tanstack/react-query";
import type { User } from "../../shared/types/user";

const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!res.ok) {
    throw new Error("Ошибка загрузки");
  }

  return res.json();
};

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};
