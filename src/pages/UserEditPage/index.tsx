import { useParams } from "react-router-dom";

export const UserEditPage = () => {
  const { id } = useParams();
  return <div>User ID: {id}</div>;
};
