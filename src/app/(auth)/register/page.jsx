"use client";
import { signUp } from "@/lib/auth-client";
import { uploadImage } from "@/lib/imgUpload/imgbbupload";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  Spinner,
  TextArea,
  TextField,
} from "@heroui/react";
import React, { useState } from "react";
import { FiUser } from "react-icons/fi";

const RegisterPage = () => {
  const [matched, setMatched] = useState();
    const [isLoading, setIsLoading] = useState(false)
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const form = new FormData(e.target);

    const image = form.get('image')
    
    const formData = Object.fromEntries(form.entries());

    const { name, phoneNumber, email,confirmPassword } = formData;
    
    const imageUrl = await uploadImage(image)

    const { data, error } = await signUp.email({
      name,
      email,
      phone: phoneNumber,
      password: confirmPassword,
      image: imageUrl,
      callbackURL: "/",
    });

    if(data){
        alert('success')
        setIsLoading(false)
    }else{
        alert(error.message)
        setIsLoading(false)
    }

  };
  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Form
        className="w-full max-w-96 border border-accent shadow-sm rounded-2xl p-6"
        onSubmit={onSubmit}
      >
        <Fieldset>
          <Fieldset.Legend className="text-2xl font-bold text-foreground">
            Create Account
          </Fieldset.Legend>
          <Description>
            Join 12,000+ customers getting medicines delivered.
          </Description>
          <FieldGroup>
            <TextField
              isRequired
              name="name"
              validate={(value) => {
                if (value.length < 4) {
                  return "Name must be at least 4 characters";
                }
                return null;
              }}
            >
              <Label className="text-foreground">Full Name</Label>
              <Input placeholder="Enter your name" />
              <FieldError />
            </TextField>
            <TextField
              isRequired
              type="number"
              name="phoneNumber"
              validate={(value) => {
                if (value.length < 11) {
                  return "Phone Number must be at least 11 digit";
                }
                return null;
              }}
            >
              <Label className="text-foreground">Phone Number</Label>
              <Input placeholder="+880 17XX-XXXXXX" />
              <FieldError />
            </TextField>

            <TextField name="email" type="email">
              <Label className="text-foreground">Email (Optional)</Label>
              <Input placeholder="karim@example.com" />
              <FieldError />
            </TextField>

            <TextField isRequired name="image">
              <Label className="text-foreground">Profile Image</Label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                required
                className="
                w-full
                file:bg-accent/10
                file:text-foreground
                file:border-0
                file:px-3
                file:py-0.5
                file:rounded-lg
                file:cursor-pointer
                file:hover:bg-accent/30
                 "
              />
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
                onChange={(e) => setMatched(e.target.value)}
                placeholder="Enter your password"
              />

              <Description>
                <FieldError />
              </Description>
              <FieldError />
            </TextField>
            <TextField
              isRequired
              minLength={8}
              name="confirmPassword"
              type="password"
              validate={(value) => {
                if (value !== matched) {
                  return "Password does not match";
                }

                // return null;
              }}
            >
              <Label className="text-foreground">Confirm Password</Label>
              <Input placeholder="Repeat your password" />

              <FieldError />
            </TextField>
          </FieldGroup>
          <Fieldset.Actions>
            <Button fullWidth type="submit">
              <>
          {isLoading ? <Spinner color="current" size="sm" /> : <FiUser />}
          {isLoading? 'Creating..' : 'Create Account'}
          
        </>
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    </div>
  );
};

export default RegisterPage;
