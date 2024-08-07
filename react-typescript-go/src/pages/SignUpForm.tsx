import { Form } from "react-router-dom";
import Input3 from "../components/Input3";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext/useAuth";

type UserSignup = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function SignUpForm() {
  const { jwtToken } = useAuth();
  const {
    register,
    formState: { errors }, // Correctly destructuring errors from formState
    handleSubmit,
    reset
  } = useForm<UserSignup>();

  async function onSubmit({
    firstName,
    lastName,
    email,
    password
  }: UserSignup) {
    const header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + jwtToken);

    const requestOptions = {
      method: "POST",
      headers: header,
      credential: "include" as RequestCredentials,
      body: JSON.stringify({
        full_name: firstName,
        last_name: lastName,
        password: password,
        email: email
      })
    };

    const res = await fetch("http://localhost:8080/register", requestOptions);

    const data = await res.json();

    if (data.errors) {
      console.log(data.errors);
    }

    reset();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input3
        id="firstName"
        placeholder="enter Firstname..."
        labelName="First Name"
        errorMsg={errors.firstName?.message as string}
        type="text"
        {...register("firstName", {
          required: "This field is required"
        })}
      />
      <Input3
        id="lastName"
        placeholder="enter Lastname..."
        labelName="Last Name"
        errorMsg={errors.lastName?.message as string}
        type="text"
        {...register("lastName", {
          required: "This field is required"
        })}
      />
      <Input3
        id="email"
        placeholder="enter email..."
        labelName="Email"
        errorMsg={errors.email?.message as string}
        type="email"
        {...register("email", {
          required: "This field is required"
        })}
      />
      <Input3
        id="password"
        placeholder="enter password..."
        labelName="Password"
        type="password"
        errorMsg={errors.password?.message as string}
        {...register("password", {
          required: "This field is required",
          minLength: {
            value: 8,
            message: "Password needs at least 8 characters"
          }
        })}
      />
      <button type="submit">REGISTER</button>
    </Form>
  );
}
