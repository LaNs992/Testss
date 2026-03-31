import { useParams, useNavigate } from "react-router-dom";
import { useUsersStore } from "../../features/users/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import "../UserEditPage/UserPageEdit.scss";
import "@fontsource/manrope";

const schema = z.object({
  name: z.string().min(2, "Минимум 2 символа").max(64),
  username: z.string().min(2).max(64),
  email: z.string().email("Неверный email"),
  city: z.string().min(2).max(64),
  phone: z.string().min(5),
  company: z.string().min(2).max(64),
});

type FormData = z.infer<typeof schema>;

export const UserEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeUsers, archivedUsers, updateUser } = useUsersStore();

  const user =
    activeUsers.find((u) => u.id === Number(id)) ||
    archivedUsers.find((u) => u.id === Number(id));

  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        username: user.username,
        email: user.email,
        city: user.address.city,
        phone: user.phone,
        company: user.company.name,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: FormData) => {
    if (!id) return;

    updateUser(Number(id), data);
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
      navigate("/");
    }, 2000);
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="edit-page">
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
      <div className="back-cont">
        <div className="arrow">
          <img src="/arrow-left.png" alt="" />
          <div>Назад</div>
        </div>
      </div>
      <div className="edit-page__container">
        <div className="edit-page__sidebar">
          <img className="edit-page__avatar" src="/logo.jpg" alt="avatar" />
          <nav className="edit-page__menu">
            <div className="edit-page__menu-item active">Данные профиля</div>
            <div className="edit-page__menu-item">Рабочее пространство</div>
            <div className="edit-page__menu-item">Приватность</div>
            <div className="edit-page__menu-item">Безопасность</div>
          </nav>
        </div>

        <div className="edit-page__content">
          <h2>Данные профиля</h2>
          <form className="edit-page__form" onSubmit={handleSubmit(onSubmit)}>
            <label>
              Имя
              <input {...register("name")} />
              {errors.name && (
                <p className="edit-page__error">{errors.name.message}</p>
              )}
            </label>

            <label>
              Никнейм
              <input {...register("username")} />
              {errors.username && (
                <p className="edit-page__error">{errors.username.message}</p>
              )}
            </label>

            <label>
              Почта
              <input {...register("email")} />
              {errors.email && (
                <p className="edit-page__error">{errors.email.message}</p>
              )}
            </label>

            <label>
              Город
              <input {...register("city")} />
              {errors.city && (
                <p className="edit-page__error">{errors.city.message}</p>
              )}
            </label>

            <label>
              Телефон
              <input {...register("phone")} />
              {errors.phone && (
                <p className="edit-page__error">{errors.phone.message}</p>
              )}
            </label>

            <label>
              Название компании
              <input {...register("company")} />
              {errors.company && (
                <p className="edit-page__error">{errors.company.message}</p>
              )}
            </label>

            <button type="submit" className="edit-page__save-btn">
              Сохранить
            </button>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="edit-page__modal">
          <div className="edit-page__modal-content">
            <p>Изменения сохранены!</p>
            <button onClick={() => setShowModal(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};
