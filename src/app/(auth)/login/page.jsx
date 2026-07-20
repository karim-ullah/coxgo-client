"use client";
import { authClient, signIn } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { BsGoogle } from "react-icons/bs";
const LoginPage = () => {
  const onSubmit = async(e) => {
    e.preventDefault();
    const form = new FormData(e.target)
    const formData = Object.fromEntries(form.entries())
    const {email, password} = formData

    const {data, error} = await signIn.email({
        email,
        password,
        callbackURL: '/'
        
    })

    if(data){
        alert('success')
    }else{
        alert(error.message)
    }
  };
  const handleGoogle = async()=>{
    await authClient.signIn.social({
      provider: 'google'
    })
  }
  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Form className="w-full max-w-96 border border-accent shadow-sm rounded-2xl p-6 shadow-sm" onSubmit={onSubmit}>
        <Fieldset>
            <div className="text-center">

          <Fieldset.Legend className="text-2xl font-bold text-foreground">Log In</Fieldset.Legend>
          <Description>Log in your account.</Description>
            </div>
          <FieldGroup>
            <TextField isRequired name="email" type="email">
              <Label className="text-foreground">Email</Label>
              <Input placeholder="karim@example.com" />
              <FieldError />
            </TextField>
            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label className="text-foreground">Password</Label>
              <Input

                placeholder="Enter your password"
              />

              <Description>
                <FieldError />
              </Description>
              <FieldError />
            </TextField>
          </FieldGroup>
          <Fieldset.Actions>
            <Button fullWidth type="submit">
              Login
            </Button>
          </Fieldset.Actions>
        </Fieldset>

        <div className="mt-3 text-center">
          <Button onClick={handleGoogle} className="w-full my-2" variant="tertiary">
        <BsGoogle />
        Sign in with Google
      </Button>
          <span className="text-sm">Not have an account? please <Link className="text-blue-400" href={'/register'}>Register</Link></span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
