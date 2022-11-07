import { FC } from "react";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import * as yup from "yup";
import { PatternFormat } from "react-number-format";

import "./MakePurchaseModal.scss";
import { Button } from "../../Button/Button";
import { useAppDispatch } from "../../../hooks/storeHooks";
import { closeModals } from "../../../store/modal/modalSlice";
import { removeAllGoodsFromCart } from "../../../store/cart/cartSlice";

interface IMakePurchaseModalProps {
  closeModal: () => void;
}

interface Values {
  firstName: string;
  lastName: string;
  address: string;
  age: string;
  phone: string;
}

export const MakePurchaseModal: FC<IMakePurchaseModalProps> = ({}) => {
  const dispatch = useAppDispatch();

  const initialValues = {
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
    address: "",
  };

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required("Поле имя обязательно")
      .min(2, "Имя должно состоять минимум из двух символов"),
    lastName: yup.string().required("Поле фамилия обязательно"),
    age: yup.number().min(12, "Слишком молоды"),
    phone: yup.string().min(12, "Введите номер телефона"),
    address: yup
      .string()
      .required("Поле адрес обязательно")
      .min(5, "Введите корректный адрес"),
  });

  return (
    <div className="client-form">
      <h2>Заполните ваши данные.</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setSubmitting(false);

          setTimeout(() => {
            const clientList = JSON.parse(localStorage.getItem("cart") || "[]");
            localStorage.setItem("cart", "[]");
            const clientOrder = {
              client: {
                ...values,
              },
              clientList,
            };
            console.log(clientOrder);

            dispatch(removeAllGoodsFromCart());
            dispatch(closeModals());
          }, 1000);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <label>
              Имя:
              <Field type="text" name="firstName" />
              <ErrorMessage name="firstName">
                {(msg) => <div className="error-message">{msg}</div>}
              </ErrorMessage>
            </label>
            <label>
              Фамилия:
              <Field type="text" name="lastName" />
              <ErrorMessage name="lastName">
                {(msg) => <div className="error-message">{msg}</div>}
              </ErrorMessage>
            </label>
            <label>
              Возраст:
              <Field type="number" name="age" />
              <ErrorMessage name="age">
                {(msg) => <div className="error-message">{msg}</div>}
              </ErrorMessage>
            </label>
            <label>
              Телефон:
              <PatternFormat
                value="38 0"
                format="## (###) ### ## ##"
                mask="_"
                onValueChange={(val) => setFieldValue("phone", val.floatValue)}
              />
              <ErrorMessage name="phone">
                {(msg) => <div className="error-message">{msg}</div>}
              </ErrorMessage>
            </label>
            <label>
              Адрес:
              <Field type="text" name="address" />
              <ErrorMessage name="address">
                {(msg) => <div className="error-message">{msg}</div>}
              </ErrorMessage>
            </label>
            <Button
              btnClasses="btn submit"
              btnText="Оформить заказ"
              type="submit"
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
