"use client";

import React, { useState } from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import { CiShoppingCart } from "react-icons/ci";
import OrderSummary from "./OrderSummary";

const OrderAccordion = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };
  return (
    <div className="my-2">
      <Accordion variant="light" isCompact className="lg:hidden">
        <AccordionItem
          key={1}
          startContent={<CiShoppingCart size={28} />}
          title={isAccordionOpen ? "Hide Cart Summary" : "Show Cart Summary"}
          onClick={toggleAccordion}
        >
          <OrderSummary />
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default OrderAccordion;
