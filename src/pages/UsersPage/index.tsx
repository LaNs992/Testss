import { useUsers } from "../../features/users/api";
import { UserCard } from "../../features/users/components/UserCard";
import { useUsersStore } from "../../features/users/store";
import { useEffect } from "react";
import "./UserPage.scss";

export const UsersPage = () => {
  const { data, isLoading, error } = useUsers();
  const {
    activeUsers,
    archivedUsers,
    setUsers,
    archiveUser,
    hideUser,
    restoreUser,
  } = useUsersStore();

  useEffect(() => {
    if (data && activeUsers.length === 0) {
      setUsers(data.slice(0, 6));
    }
  }, [data, activeUsers.length, setUsers]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Ошибка загрузки</div>;

  return (
    <div className="main-body">
      <h1>Активные</h1>
      <div className="usersgrid">
        <div className="users-grid">
          {activeUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onArchive={archiveUser}
              onHide={hideUser}
            />
          ))}
        </div>
      </div>
      <h1>Архив</h1>
      <div className="usersgrid">
        <div className="users-grid">
          {archivedUsers.map((user) => (
            <div key={user.id}>
              <UserCard user={user} onArchive={() => {}} onHide={() => {}} />
              <button onClick={() => restoreUser(user.id)}>Вернуть</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
