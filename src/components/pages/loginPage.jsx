// import { Button } from "../styles/buttons.styles";
import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

// const schema = yup
//   .object({
//     fullName: yup
//     .string()
//     .min(3, 'Must contain more than 3 characters')
//     .required('Please fill in this field')
//     .typeError('Please write your full name here'),
//     subject: yup
//     .string()
//     .min(3, 'Must contain more than 3 characters')
//     .required('Please fill in this field')
//     .typeError('Please write your subject here'),
//     email: yup
//       .string()
//       .email('Please enter a valid email address')
//       .required('Please enter a valid email address')
//       .typeError('Please enter a valid email address'),
//     body: yup
//       .string()
//       .min(3, 'Must contain more than 3 characters')
//       .required('Please fill in this field')
//       .typeError('Please write your message here'),
//   })
//   .required();

function LoginPage() {
  useEffect(() => {
    document.title = "Holidaze | Log in"
 }, []);
 
    return (
    <main className="container d-flex justify-content-center p-5">
      <div className="col-8 row">
        <h1 className='contact-heading'>
          Log in
        </h1>
        {/* <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div>
            <label htmlFor='fullName'>Full Name</label>
            <Input {...register("fullName")} />
            <Error>{errors.fullName?.message}</Error>
          </div>
          <div>
            <label htmlFor='subject'>Subject</label>
            <Input {...register("subject")} />
            <Error>{errors.subject?.message}</Error>
          </div>
          <div>
            <label htmlFor='email'>E-mail</label>
            <Input {...register("email")} />
            <Error>{errors.email?.message}</Error>
          </div>
          <div>
            <label htmlFor='body'>Message</label>
            <TextArea {...register("body")} />
            <Error>{errors.body?.message}</Error>
          </div>
          <Button className="contact-button" type="submit">Send</Button>
        </form> */}
      </div>
    </main>);
  }

  export default LoginPage;