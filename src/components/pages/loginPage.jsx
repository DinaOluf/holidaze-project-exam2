import { Button } from "../styles/buttons.styles";
import { Input, Error } from "../styles/form.styles";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    password: yup
      .string()
      .min(8, 'Must contain more than 8 characters')
      .matches(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/, "Must contain at least one uppercase and lowercase letter, as well as a number")
      .required('Please enter your password')
      .typeError('Please enter your password'),
    email: yup
      .string()
      .email('Please enter your e-mail')
      .matches(/^[\w\-.]+@stud.?noroff.no$/, "Must be a student noroff e-mail (ending in @stud.noroff.no)")
      .required('Please enter a valid email address')
      .typeError('Please enter a valid email address')
  })
  .required();

function LoginPage() {
  useEffect(() => {
    document.title = "Holidaze | Log in"
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
        <h1 className="mb-4">
          Log in
        </h1>
        <form className="d-flex flex-column gap-4" onSubmit={handleSubmit(onSubmitHandler)}>
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
          <Button className="align-self-center" type="submit">Log in</Button>
        </form>
      </div>
    </main>);
  }

  export default LoginPage;