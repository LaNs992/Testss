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
      <div className="header">
        <div className="header-container">
          <div className="logo">
            <img className="logo-img" src="/logo-sign.png" alt="" />
            <img className="logo-text" src="/namecorp.png" alt="" />
          </div>
          <div className="header-right">
            <div className="favorite">
              <img className="fav-icon" src="/Favorite.png" alt="" />
              <img src="/Group.png" alt="" />
            </div>
            <div className="profile">
              <img className="prof-icon" src="/Foto.png" alt="" />
              <div>Ivan1234</div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="main-text">Активные</h1>
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
      <h1 className="main-text">Архив</h1>
      <div className="usersgrid">
        <div className="users-grid">
          {archivedUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onRestore={restoreUser}
              isArchived={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
