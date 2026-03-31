import type { User } from "../../../shared/types/user";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./UserCard.scss";
import "@fontsource/manrope";

type Props = {
  user: User;
  onArchive?: (id: number) => void;
  onHide?: (id: number) => void;
  onRestore?: (id: number) => void;
  isArchived?: boolean;
};

export const UserCard = ({
  user,
  onArchive,
  onHide,
  onRestore,
  isArchived,
}: Props) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={`user-card ${isArchived ? "user-card--archived" : ""}`}>
      <img className="user-card__avatar" src="/logo.jpg" alt="avatar" />

      <div className="user-card__info">
        <p className="user-card__username">{user.username}</p>
        <p className="user-card__company">{user.company.name}</p>
        <p className="user-card__city">{user.address.city}</p>
      </div>

      <div className="user-card__menu">
        <img
          src="/three-dots.png"
          alt="menu"
          className="user-card__menu-img"
          onClick={toggleMenu}
        />

        {menuOpen && (
          <div className="user-card__dropdown">
            <div
              className="user-card__dropdown-item"
              onClick={() => navigate(`/user/${user.id}`)}
            >
              Редактировать
            </div>

            {!isArchived && onArchive && (
              <div
                className="user-card__dropdown-item"
                onClick={() => onArchive(user.id)}
              >
                Архивировать
              </div>
            )}

            {isArchived && onRestore && (
              <div
                className="user-card__dropdown-item"
                onClick={() => onRestore(user.id)}
              >
                Вернуть
              </div>
            )}

            {onHide && (
              <div
                className="user-card__dropdown-item"
                onClick={() => onHide(user.id)}
              >
                Скрыть
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
