import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button/Button";

export const ErrorPage: FC = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <>
      <p>Error page</p>
      <Button btnFunction={goBack} btnText="Вернуться назад" btnClasses="btn" />
    </>
  );
};
