import React from 'react';
import { Input, RadioGroup } from '@mantine/core';
import { UseFormRegister, UseFormWatch, FieldErrors } from 'react-hook-form';

interface ShippingAddressComponentProps {
  isLoggedIn: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
}

const ShippingAddressComponent: React.FC<ShippingAddressComponentProps> = ({
  isLoggedIn,
  register,
  errors,
  watch,
}) => {
  const [addresses, setAddresses] = React.useState([
    {
      firstName: 'John',
      lastName: 'Doe',
      streetAddress: '123 Main St',
      aptNumber: '',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
  ]);
  const [selectedAddressIndex, setSelectedAddressIndex] = React.useState(0);
  const [isAddingNewAddress, setIsAddingNewAddress] = React.useState(false);

  const handleAddressClick = (index: number) => {
    setSelectedAddressIndex(index);
    setIsAddingNewAddress(false);
  };

  const handleAddNewAddressClick = () => {
    setIsAddingNewAddress(true);
    setSelectedAddressIndex(null);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div>
      <RadioGroup value={selectedAddressIndex !== null ? selectedAddressIndex : 'createNew'}>
        {addresses.map((address, index) => (
          <RadioGroup.Item
            key={index}
            value={index}
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
          </RadioGroup.Item>
        ))}
        {isLoggedIn && (
          <RadioGroup.Item
            value="createNew"
            className="mt-4 bg-black text-white"
            onClick={handleAddNewAddressClick}
          >
            Add new address
          </RadioGroup.Item>
        )}
      </RadioGroup>

      {(isAddingNewAddress || selectedAddressIndex !== null) && (
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
                radius="sm"
                label="First Name"
                size="lg"
                labelPlacement="outside"
                value={watch("firstName")}
                placeholder="Enter your first name"
                className="text-black text-lg py-3"
                errorMessage={errors.firstName?.message as string}
                isInvalid={!!errors.firstName}
                {...register("firstName")}
              />
              <Input
                variant="bordered"
                radius="sm"
                label="Last Name"
                value={watch("lastName")}
                size="lg"
                labelPlacement="outside"
                placeholder="Enter your last name"
                className="text-black text-lg py-3"
                errorMessage={errors.lastName?.message as string}
                isInvalid={!!errors.lastName}
                {...register("lastName")}
              />
            </div>
            {/* Add remaining form fields */}
            <button type="submit" className="bg-black text-white px-4 py-2 rounded">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ShippingAddressComponent;
