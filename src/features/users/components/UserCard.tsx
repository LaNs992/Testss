import type { User } from "../../../shared/types/user";

type Props = {
  user: User;
};

export const UserCard = ({ user }: Props) => {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <img src="https://i.pravatar.cc/150?img=1" alt="avatar" width={50} />

      <p>
        <b>{user.username}</b>
      </p>
      <p>{user.address.city}</p>
      <p>{user.company.name}</p>

      <button>Редактировать</button>
      <button>Архивировать</button>
      <button>Скрыть</button>
    </div>
  );
};
