"use client";
import React, { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { FaCreditCard, FaTrash } from "react-icons/fa";
import Image from "next/image";

function Payment() {
  const [isAddingNewCard, setIsAddingNewCard] = useState(false);
  const [cards, setCards] = useState([
    {
      nameOnCard: "Ambretta Martinsson",
      cardNumber: "**** **** **** 2345",
      expirationDate: "10/26",
      cvc: "515",
    },
  ]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [formData, setFormData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
  });

  useEffect(() => {
    if (selectedCardIndex !== null) {
      setFormData(cards[selectedCardIndex]);
    }
  }, [selectedCardIndex]);

  const handleAddNewCardClick = () => {
    setIsAddingNewCard(true);
    setSelectedCardIndex(null); // Clear any selected card when adding a new card
    setFormData({
      nameOnCard: "",
      cardNumber: "",
      expirationDate: "",
      cvc: "",
    });
  };

  const handleCardClick = (index: any) => {
    setSelectedCardIndex(index);
    setIsAddingNewCard(true); // Switch to input view with pre-filled values
  };

  const handleRemoveCard = (index: number) => {
    const updatedCards = cards.filter((_, cardIndex) => cardIndex !== index);
    setCards(updatedCards);
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
    if (selectedCardIndex !== null) {
      // Update existing card
      const updatedCards = [...cards];
      updatedCards[selectedCardIndex] = formData;
      setCards(updatedCards);
    } else {
      // Add new card
      setCards([...cards, formData]);
    }
    setIsAddingNewCard(false);
    setFormData({
      nameOnCard: "",
      cardNumber: "",
      expirationDate: "",
      cvc: "",
    });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
      <div className="flex max-w-5xl w-full bg-white shadow-2xl rounded-lg overflow-hidden">
        {/* Left Panel for Payment Process */}
        <div className="w-2/3 p-8 bg-white">
          {!isAddingNewCard ? (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold">Payment Method</h2>
                <div className="flex space-x-4 my-4">
                  <div className="flex items-center space-x-2 p-2 border border-black rounded-full shadow-sm bg-white">
                    <FaCreditCard size={24} />
                    <span>Credit Card</span>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold">Saved Cards</h2>
                <div className="space-y-4">
                  {cards.map((card, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm cursor-pointer"
                      onClick={() => handleCardClick(index)}
                    >
                      <div className="flex items-center space-x-4">
                        <FaCreditCard size={24} />
                        <div>
                          <p className="text-lg">{card.nameOnCard}</p>
                          <p className="text-sm">{card.cardNumber}</p>
                          <p className="text-sm">{card.expirationDate}</p>
                        </div>
                      </div>
                      <Button
                        className="text-red-500"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click event
                          handleRemoveCard(index);
                        }}
                      >
                        <FaTrash color="black" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  className="mt-4 bg-black text-white"
                  onClick={handleAddNewCardClick}
                >
                  Add new card
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-1">
                <p className="text-lg font-semibold mb-6">Add New Card</p>
                <form
                  className="space-y-4 my-4 mb-6"
                  onSubmit={handleFormSubmit}
                >
                  <div className="mb-6 flex flex-col gap-4">
                    <Input
                      variant="bordered"
                      type="text"
                      name="nameOnCard"
                      fullWidth
                      required
                      labelPlacement="outside"
                      size="lg"
                      label="Name On Card"
                      radius="none"
                      value={formData.nameOnCard}
                      onChange={handleFormChange}
                      placeholder="name"
                    />

                    <Input
                      variant="bordered"
                      type="text"
                      name="cardNumber"
                      fullWidth
                      required
                      labelPlacement="outside"
                      size="lg"
                      label="Card Number"
                      radius="none"
                      value={formData.cardNumber}
                      onChange={handleFormChange}
                      placeholder="card number"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2 mb-4">
                      <Input
                        variant="bordered"
                        type="text"
                        name="expirationDate"
                        width="full"
                        labelPlacement="outside"
                        size="lg"
                        label="Expiration Date"
                        radius="none"
                        placeholder="MM/YY"
                        value={formData.expirationDate}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="w-1/2 mb-4">
                      <Input
                        variant="bordered"
                        type="text"
                        name="cvc"
                        width="full"
                        labelPlacement="outside"
                        size="lg"
                        label="CVC"
                        radius="none"
                        value={formData.cvc}
                        onChange={handleFormChange}
                        placeholder="CVC"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    fullWidth
                    className="bg-black hover:opacity-75 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Confirm Payment
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>

        {/* Right Panel for Product Information */}
        <div className="w-1/3 bg-gray-50 p-8 flex flex-col justify-center items-center">
          <Image
            src="/images/img17.png"
            alt="Nivea Lotion"
            width={500}
            height={500}
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default Payment;
