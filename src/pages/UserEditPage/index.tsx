import { useParams, useNavigate } from "react-router-dom";
import { useUsersStore } from "../../features/users/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";

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
    <div>
      <h1>Редактирование</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Name" />
        {errors.name && <p>{errors.name.message}</p>}

        <input {...register("username")} placeholder="Username" />
        {errors.username && <p>{errors.username.message}</p>}

        <input {...register("email")} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}

        <input {...register("city")} placeholder="City" />
        {errors.city && <p>{errors.city.message}</p>}

        <input {...register("phone")} placeholder="Phone" />
        {errors.phone && <p>{errors.phone.message}</p>}

        <input {...register("company")} placeholder="Company" />
        {errors.company && <p>{errors.company.message}</p>}

        <button type="submit">Сохранить</button>
      </form>

      {showModal && (
        <div>
          <div>
            <p>Сохранено!</p>
            <button onClick={() => setShowModal(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};
