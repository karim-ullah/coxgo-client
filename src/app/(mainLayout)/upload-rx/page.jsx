"use client";
import Submitted from "@/components/uploadRXpage/Submitted";
import { useSession } from "@/lib/auth-client";
import { createPrescription } from "@/lib/core/actions/action";
import { uploadImage } from "@/lib/imgUpload/imgbbupload";
import {
  Button,
  FieldError,
  FieldGroup,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
} from "@heroui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiCheckCircle, BiUpload } from "react-icons/bi";
import { FiAlertTriangle } from "react-icons/fi";

const UploadRxPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?.id;
  const userName = user?.name;

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const image = form.get("image");

    const imageUrl = await uploadImage(image);
    const name = form.get("name");
    const phoneNumber = form.get("phoneNumber");
    const deliveryAddress = form.get("deliveryAddress");
    const deliveryArea = form.get("deliveryArea");
    const additionalInfo = form.get("additionalInfo");
    const preferredTime = form.get("preferredTime");
    const payment = form.get("payment");

    const res = await createPrescription({
      userId,
      userName,
      name,
      phoneNumber,
      imageUrl,
      deliveryAddress,
      deliveryArea,
      additionalInfo,
      preferredTime,
      payment,
    });

    console.log(res);

    if (res.success) {
      toast.success("added success");
      setSubmitted(true);
    }
  };
  return (
    <>
      {submitted ? (
        <Submitted setSubmitted = {setSubmitted} />
      ) : (
        <div>
          <div className="bg-accent py-16 px-4 text-center">
            <h1 className="text-4xl font-extrabold text-white mt-3">
              Upload Prescription
            </h1>
            <p className="text-slate-300 mt-3 max-w-md mx-auto">
              Securely upload your doctor's prescription. We verify and deliver.
            </p>
          </div>

          <section className="py-16 bg-background">
            <div className="container md:max-w-3xl">
              <div className="rounded-2xl border border-border p-8 shadow-sm">
                <Form onSubmit={onSubmit} className="space-y-5">
                  <FieldGroup>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <TextField
                      fullWidth
                      className={'col-span-2 md:col-span-1'}
                        isRequired
                        name="name"
                        validate={(value) => {
                          if (value.length < 3) {
                            return "Name must be at least 3 characters";
                          }
                          return null;
                        }}
                      >
                        <Label>Name</Label>
                        <Input placeholder="Enter name" />
                        <FieldError />
                      </TextField>

                      <TextField
                      fullWidth
                      className={'col-span-2 md:col-span-1'}
                        isRequired
                        type="number"
                        name="phoneNumber"
                        validate={(value) => {
                          if (value.length < 11) {
                            return "Phone Number must be at least 11 digit";
                          }
                        }}
                      >
                        <Label className="text-foreground">Phone Number</Label>
                        <Input placeholder="+880 17XX-XXXXXX" />
                        <FieldError />
                      </TextField>
                      <TextField
                        isRequired
                        name="deliveryAddress"
                        className={"col-span-2 w-full"}
                      >
                        <Label className="text-foreground">
                          Delivery Address
                        </Label>
                        <TextArea
                          className={"h-24"}
                          placeholder="House/Flat, Road, Area, Cox's Bazar"
                        />

                        <FieldError />
                      </TextField>

                      <Select
                      fullWidth
                        isRequired
                        name="deliveryArea"
                        className="col-span-2 md:col-span-1 w-full"
                        placeholder="Select one"
                      >
                        <Label>Delivery Area</Label>
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="sadar" textValue="sadar">
                              Cox's Bazar Sadar
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="teknaf" textValue="teknaf">
                              Teknaf
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="ukhiya" textValue="ukhiya">
                              Ukhiya
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="ramu" textValue="ramu">
                              Ramu
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="chakaria" textValue="chakaria">
                              Chakaria
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="shamlapur" textValue="shamlapur">
                              Shamlapur
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>

                      <TextField
                        isRequired
                        name="image"
                        className={"col-span-2 md:col-span-1 w-full"}
                      >
                        <Label className="text-foreground">Prescription Image</Label>
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
                        name="additionalInfo"
                        className={"col-span-2 w-full"}
                      >
                        <Label className="text-foreground">
                          Additional Info  (if nothing write 'NO')
                        </Label>
                        <TextArea placeholder="Any specific brand, quantity or special instructions..." />

                        <FieldError />
                      </TextField>

                      <Select
                      fullWidth
                      className={'col-span-2 md:col-span-1'}
                        isRequired
                        name="preferredTime"
                        placeholder="Select one"
                      >
                        <Label>Preferred Delivery Time</Label>
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="quick" textValue="quick">
                              As soon as possible
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="morning" textValue="morning">
                              Morning (8am–12pm)
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="afternoon" textValue="afternoon">
                              Afternoon (12pm–5pm)
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="evening" textValue="evening">
                              Evening (5pm–9pm)
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="emergency" textValue="emergency">
                              Emergency (2-hour)
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>

                      <Select
                      fullWidth
                      className={'col-span-2 md:col-span-1'}
                        name="payment"
                        isRequired
                        placeholder="Select one"
                      >
                        <Label>Payment Method</Label>
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="cod" textValue="cod">
                              Cash On Delivery
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="bkash" textValue="bkash">
                              Bkash
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="nagad" textValue="nagad">
                              Nagad
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>
                  </FieldGroup>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                    <FiAlertTriangle
                      size={18}
                      className="text-amber-600 shrink-0 mt-0.5"
                    />
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Please ensure your prescription is clear and valid. Our
                      pharmacist will contact you if clarification is needed.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                  >
                    <BiUpload size={18} /> Submit Prescription
                  </Button>
                </Form>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default UploadRxPage;
