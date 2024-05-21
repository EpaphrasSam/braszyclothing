import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  MdPhotoCamera,
  MdVisibility,
  MdVisibilityOff,
  MdOutlineShoppingBag,
  MdOutlineLocationOn,
  MdOutlineCreditCard,
  MdContactMail,
  MdPersonOutline,
} from "react-icons/md";
import image from "../../../public/images/img10.png"; // Make sure this path is correct
import { Input, Button, Link } from "@nextui-org/react";

const ProfileDisplay = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Initial logged-in state
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword); // Function to toggle visibility

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      name: "Isaac Rozar",
      emergencyContact: "+233-67554321",
      password: "",
    },
  });

  const [profileImage, setProfileImage] = useState(image.src);
  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files![0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    setIsLoggedIn(true); // Toggle based on actual authentication logic
  };
  const sections = [
    {
      href: "#orders",
      icon: <MdOutlineShoppingBag size={32} className="text-gray-800 " />,
      title: "Your Orders",
      description:
        "Track, return, cancel an order, download invoice or buy again",
    },
    {
      href: "#addresses",
      icon: <MdOutlineLocationOn size={32} className="text-gray-800" />,
      title: "Your Addresses",
      description: "Edit, remove or set default address",
    },
    {
      href: "#payments",
      icon: <MdOutlineCreditCard size={32} className="text-gray-800" />,
      title: "Your Payments",
      description: "View all transactions, manage payment methods and settings",
    },
  ];

  return (
    <div className="p-4">
      {isLoggedIn ? (
        <div className="max-w-sm mx-auto p-4 bg-white ">
          <div className="text-center">
            <MdPersonOutline size={60} className="mx-auto text-gray-800" />
            <h2 className="font-semibold text-lg mt-2">Jane Doe</h2>
            <div className="border-t border-gray-300 my-2"></div>
            <p className="text-gray-600">jane.doe@example.com</p>
            <div className="border-t border-gray-300 my-2"></div>
          </div>
          <div className="space-y-4 mt-10 ">
            {sections.map((section, index) => (
              <a
                key={index}
                href={section.href}
                className="flex items-center p-4 bg-white rounded-lg shadow-lg border border-solid border-gray-200 hover:bg-gray-200"
              >
                <div className="p-2 bg-green-300 rounded-full shadow-md">
                  {section.icon}
                </div>
                <div className="ml-4">
                  <h2 className="font-semibold text-lg">{section.title}</h2>
                  <p className="text-gray-600 text-sm">{section.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto mt-10 p-8 bg-white">
          <div className="p-4  rounded-lg">
            <h2 className="text-xl font-bold text-center mb-4">
              I already have an account
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Input
                  type="email"
                  {...register("email", { required: true })}
                  // className="border p-2 rounded w-full"
                  radius="none"
                  label="Email"
                  labelPlacement="outside"
                />
              </div>
              <div>
                <Input
                  type="password"
                  {...register("password", { required: true })}
                  // className="border p-2 rounded w-full"
                  radius="none"
                  label="Password"
                  labelPlacement="outside"
                />
                <div className="text-right mt-2">
                  <a
                    href="/forgot-password"
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <Button
                type="submit"
                className="bg-black hover:bg-gray-700 text-white font-bold py-3 px-4  w-full"
              >
                Log in
              </Button>
            </form>
          </div>
          <div className="border-t my-8"></div>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">I don't have an account</h2>
            <p className="text-sm mb-4">
              Enjoy added benefits and a richer experience by creating a
              personal account
            </p>
            <a
              href="/signup"
              className="inline-block hover:text-white bg-white border border-black text-black font-bold py-3 px-6 rounded-full hover:bg-gray-600"
            >
              Create account
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDisplay;
