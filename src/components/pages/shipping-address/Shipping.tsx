"use client";
import React, { useState } from "react";
import { Button, Input, Radio, RadioGroup } from "@nextui-org/react";

function Shipping() {
  const [addresses, setAddresses] = useState([
    {
      firstName: "Courtney",
      lastName: "Henry",
      streetAddress: "3891 Ranchview",
      aptNumber: "",
      state: "California",
      zipCode: "62639",
    },
    {
      firstName: "Jenny",
      lastName: "Wilson",
      streetAddress: "4140 Parker Rd. Allentown",
      aptNumber: "",
      state: "New Mexico",
      zipCode: "31134",
    },
  ]);

  const [selectedAddressIndex, setSelectedAddressIndex] = useState<
    number | null
  >(null);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    aptNumber: "",
    state: "",
    zipCode: "",
  });

  const handleAddNewAddressClick = () => {
    setIsAddingNewAddress(true);
    setSelectedAddressIndex(null);
    setFormData({
      firstName: "",
      lastName: "",
      streetAddress: "",
      aptNumber: "",
      state: "",
      zipCode: "",
    });
  };

  const handleAddressClick = (index: number) => {
    setSelectedAddressIndex(index);
    setFormData(addresses[index]);
    setIsAddingNewAddress(false);
  };

  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (selectedAddressIndex !== null) {
      const updatedAddresses = [...addresses];
      updatedAddresses[selectedAddressIndex] = formData;
      setAddresses(updatedAddresses);
    } else {
      setAddresses([...addresses, formData]);
    }
    setIsAddingNewAddress(false);
    setFormData({
      firstName: "",
      lastName: "",
      streetAddress: "",
      aptNumber: "",
      state: "",
      zipCode: "",
    });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
      <div className="max-w-2xl w-full bg-white shadow-3xl rounded-lg p-8">
        <h2 className="text-lg font-semibold mb-6">Shipping Address</h2>
        <div className="space-y-4 mb-6">
          {addresses.map((address, index) => (
            <div
              key={index}
              className={`p-4 border flex items-center space-x-4 rounded-lg cursor-pointer `}
              onClick={() => handleAddressClick(index)}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                  selectedAddressIndex === index
                    ? " bg-green-500"
                    : "border-gray-300"
                }`}
              ></div>
              <div className="flex items-center space-x-4  ">
                <p className="text-md font-bold">{`${address.firstName} ${address.lastName}`}</p>
                <p className="text-sm text-gray-600">{`${address.streetAddress}${address.aptNumber ? `, Apt ${address.aptNumber}` : ""}`}</p>
                <p className="text-sm text-gray-600">{`${address.state}, ${address.zipCode}`}</p>
              </div>
            </div>
          ))}
          <Button
            className="mt-4 bg-black text-white"
            onClick={handleAddNewAddressClick}
          >
            Add new address
          </Button>
        </div>

        {isAddingNewAddress || selectedAddressIndex !== null ? (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">
              {selectedAddressIndex !== null
                ? "Edit Address"
                : "Add New Address"}
            </h3>
            <form className="flex flex-col gap-4 " onSubmit={handleFormSubmit}>
              <div className="flex space-x-4">
                <Input
                  variant="bordered"
                  type="text"
                  name="firstName"
                  fullWidth
                  required
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleFormChange}
                  placeholder="First Name"
                  labelPlacement="outside"
                />
                <Input
                  variant="bordered"
                  type="text"
                  name="lastName"
                  fullWidth
                  required
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleFormChange}
                  placeholder="Last Name"
                  labelPlacement="outside"
                />
              </div>
              <Input
                variant="bordered"
                type="text"
                name="streetAddress"
                fullWidth
                required
                label="Street Address"
                value={formData.streetAddress}
                onChange={handleFormChange}
                placeholder="Street Address"
                labelPlacement="outside"
              />
              <div className="flex space-x-4">
                <Input
                  variant="bordered"
                  type="text"
                  name="aptNumber"
                  fullWidth
                  label="Country"
                  value={formData.aptNumber}
                  onChange={handleFormChange}
                  placeholder="Country"
                  labelPlacement="outside"
                />
                <Input
                  variant="bordered"
                  type="text"
                  name="state"
                  fullWidth
                  required
                  label="State"
                  value={formData.state}
                  onChange={handleFormChange}
                  placeholder="State"
                  labelPlacement="outside"
                />
                <Input
                  variant="bordered"
                  type="text"
                  name="zipCode"
                  fullWidth
                  required
                  label="City"
                  value={formData.zipCode}
                  onChange={handleFormChange}
                  placeholder="City"
                  labelPlacement="outside"
                />
                <Input
                  variant="bordered"
                  type="text"
                  name="zipCode"
                  fullWidth
                  required
                  label="Postal Code"
                  value={formData.zipCode}
                  onChange={handleFormChange}
                  placeholder="Postal Code"
                  labelPlacement="outside"
                />
              </div>
              <Button
                type="submit"
                fullWidth
                className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Address
              </Button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Shipping;
