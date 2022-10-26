import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const ErrorPage: FC = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <>
      <p>Error page</p>
      <button onClick={goBack}>Назад кнопка</button>
    </>
  );
};
