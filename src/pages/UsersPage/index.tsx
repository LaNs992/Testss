import { useUsers } from "../../features/users/api";
import { UserCard } from "../../features/users/components/UserCard";
import type { User } from "../../shared/types/user";

export const UsersPage = () => {
  const { data, isLoading, error } = useUsers();

  // 1. загрузка
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 2. ошибка
  if (error) {
    return <div>Ошибка загрузки</div>;
  }

  // 3. данные
  return (
    <div>
      <h1>Users</h1>

      {data?.slice(0, 6).map((user: User) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};
