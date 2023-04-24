import { Button } from "../styles/buttons.styles";
import { Input, Error } from "../styles/form.styles";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Please enter your e-mail')
      .matches(/^[\w\-.]+@stud.?noroff.no$/, "Must be a student noroff e-mail (ending in @stud.noroff.no)")
      .required('Please enter a valid email address')
      .typeError('Please enter a valid email address'),
      password: yup
      .string()
      .min(8, 'Must contain more than 8 characters')
      .matches(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/, "Must contain at least one uppercase and lowercase letter, as well as a number")
      .required('Please enter your password')
      .typeError('Please enter your password'),
      retypePassword: yup
      .string()
      .required('Please retype your password.')
      .oneOf([yup.ref('password')], 'Your passwords do not match.')
  })
  .required();

function RegisterPage() {
  useEffect(() => {
    document.title = "Holidaze | Register"
 }, []);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    console.log({ data });
    reset();
  };

    return (
    <main className="container d-flex justify-content-center align-items-center h-100">
      <div className="col-10 col-lg-6 col-xl-5 mb-5">
        <div>
          <img src="../../assets/images/profile-icon.png" alt=""/>
          <h1 className="mb-4">
            Register
          </h1>
        </div>
        <form className="d-flex flex-column gap-2" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="d-flex flex-column">
            <label className="fs-5" htmlFor='email'>E-mail</label>
            <Input {...register("email")} />
            <Error>{errors.email?.message}</Error>
          </div>
          <div className="d-flex flex-column">
            <label className="fs-5" htmlFor='password'>Password</label>
            <Input type="password" {...register("password")} />
            <Error>{errors.password?.message}</Error>
          </div>
          <div className="d-flex flex-column">
            <label className="fs-5" htmlFor='retypePassword'>Re-enter Password</label>
            <Input type="password" {...register("retypePassword")} />
            <Error>{errors.retypePassword?.message}</Error>
          </div>
          <div className="d-flex justify-content-center gap-5 mb-3">
            <div>
              <input type="radio" id="customer" name="userType" value="false" />
              <label className="fs-5 ps-2" for="customer">Customer</label>
            </div>
            <div>
              <input type="radio" id="manager" name="userType" value="true" />
              <label className="fs-5 ps-2" for="manager">Venue Manager</label>
            </div>
          </div>
          <Button className="align-self-center" type="submit">Register</Button>
        </form>
      </div>
    </main>);
  }

  export default RegisterPage;