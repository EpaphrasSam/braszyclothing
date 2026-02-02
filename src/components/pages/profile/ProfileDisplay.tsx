import { logoutAction } from "@/services/authServices";
import { Badge, Button, Divider } from "@heroui/react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  MdOutlineShoppingBag,
  MdOutlineLocationOn,
  MdOutlineCreditCard,
  MdPersonOutline,
  MdLogout,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const sections = [
  {
    href: "/my-orders",
    icon: <MdOutlineShoppingBag size={32} className="text-gray-800" />,
    title: "Your Orders",
    description:
      "Track, return, cancel an order, download invoice or buy again",
  },
  {
    href: "/shipping-address",
    icon: <MdOutlineLocationOn size={32} className="text-gray-800" />,
    title: "Your Addresses",
    description: "Edit and add address",
  },
  // {
  //   href: "#payments",
  //   icon: <MdOutlineCreditCard size={32} className="text-gray-800" />,
  //   title: "Your Payments",
  //   description: "View all transactions, manage payment methods and settings",
  // },
];

interface ProfileDisplayProps {
  onClose: any;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    admin?: Boolean;
  };
}

const ProfileDisplay = ({ onClose, user }: ProfileDisplayProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const logOut = async () => {
    try {
      setIsLoading(true);
      const response = await logoutAction();
      if (response?.error) throw new Error(response.error);
      onClose();
      toast.success("Logout successful");
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="text-center">
        <div className="flex justify-center items-center">
          <Badge
            className="bg-white"
            content={
              <Link href="/edit-profile">
                <FiEdit
                  size={20}
                  className=" cursor-pointer  transition ease-in-out duration-300 hover:opacity-50"
                  title="Edit Profile"
                />
              </Link>
            }
            placement="bottom-right"
          >
            <MdPersonOutline size={60} className="mx-auto text-gray-800" />
          </Badge>
        </div>
        <h2 className="font-semibold text-lg mt-2">{user.name}</h2>
        <Divider className="my-2" />
        <p className="text-gray-600">{user.email}</p>
        <Divider className="my-2" />
      </div>
      <div className="flex flex-col gap-4 mt-4 overflow-y-auto flex-grow scrollbar-thin">
        {sections.map((section, index) => (
          <Link
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
          </Link>
        ))}
      </div>
      <Divider className="my-4" />
      <a
        href="https://braszyclothing.promotekit.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 text-sm hover:underline underline-offset-2"
      >
        Earn $10 per sale with our affiliate program.
      </a>
      <Divider className="my-4" />
      <div className="mt-auto flex flex-col gap-3">
        {user.admin && (
          <Link href="/admin/dashboard">
            <Button
              size="lg"
              fullWidth
              radius="none"
              color="primary"
              className="rounded"
              startContent={<MdOutlineAdminPanelSettings size={20} />}
            >
              Admin
            </Button>
          </Link>
        )}
        <Button
          size="lg"
          fullWidth
          radius="none"
          isLoading={isLoading}
          startContent={<MdLogout size={16} />}
          className="bg-red-800 text-white font-bold rounded hover:bg-red-700"
          onClick={logOut}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfileDisplay;
