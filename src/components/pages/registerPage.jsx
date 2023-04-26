import { Button } from "../styles/buttons.styles";
import { Input, Error, Radio } from "../styles/form.styles";
import React, { useEffect} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import profileImage from "../../assets/images/profile-icon.png";
import { RegisterProfileIcon } from "../styles/icons.styles";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    name: yup
      .string()
      .min(1, 'Please enter your name'),
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
      .required('Please retype your password')
      .oneOf([yup.ref('password')], 'Your passwords do not match'),
    venueManager: yup
      .string()
      .required("Choose what type of user you are")
  })
  .required();

function RegisterPage() {
  const navigate = useNavigate();
  const url = "https://api.noroff.dev/api/v1/holidaze/auth/register";

  useEffect(() => {
    document.title = "Holidaze | Register"
 }, []);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    let newData = {};

    if(data.venueManager === "manager"){
      newData = {
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: null,
        venueManager: true
      };
    } if (data.venueManager === "customer") {
      newData = {
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: null,
        venueManager: false
      };
    }
    const postData = async (data) => {
      const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      };

      try {
        console.log(data); //remove
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json); //remove
        if ( json.id ) {
          navigate("/login");
        } else {
          console.log("Some error occured");
        }

      } catch (error) {
        console.log(error);
      }

      reset();
    };

  postData(newData);
}
   

    return (
    <main className="container d-flex justify-content-center align-items-center h-100 my-5">
      <div className="col-10 col-lg-6 col-xl-5 mb-5">
        <div className="d-flex align-items-center mb-2">
          <RegisterProfileIcon src={profileImage} alt="Profile icon"/>
          <h1 className="mb-0 mt-2 ms-2">
            Register
          </h1>
        </div>
        <form className="d-flex flex-column gap-2" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="d-flex flex-column">
            <label className="fs-5" htmlFor='name'>Name</label>
            <Input id="name" {...register("name")} />
            <Error>{errors.name?.message}</Error>
          </div>
          <div className="d-flex flex-column">
            <label className="fs-5" htmlFor='email'>E-mail</label>
            <Input id="email" {...register("email")} />
            <Error>{errors.email?.message}</Error>
          </div>
          <div className="d-flex flex-column">
            <label className="fs-5" htmlFor='password'>Password</label>
            <Input type="password" id="password" {...register("password")} />
            <Error>{errors.password?.message}</Error>
          </div>
          <div className="d-flex flex-column">
            <label className="fs-5" htmlFor='retypePassword'>Re-enter Password</label>
            <Input type="password" id="retypePassword" {...register("retypePassword")} />
            <Error>{errors.retypePassword?.message}</Error>
          </div>
          <fieldset className="d-flex flex-wrap justify-content-center mb-3">
            <legend className="fs-5">Type of user:</legend>
            <div className="me-4">
              <Radio type="radio" id="customer" name="userType" value="customer" {...register("venueManager")} />
              <label className="fs-5 ps-2" htmlFor="customer">Customer</label>
            </div>
            <div>
              <Radio type="radio" id="manager" name="userType" value="manager" {...register("venueManager")} />
              <label className="fs-5 ps-2" htmlFor="manager">Venue Manager</label>
            </div>
            <Error className="w-100 text-center">{errors.venueManager?.message}</Error>
          </fieldset>
          <Button className="align-self-center" type="submit">Register</Button>
        </form>
      </div>
    </main>);
  }

  export default RegisterPage;