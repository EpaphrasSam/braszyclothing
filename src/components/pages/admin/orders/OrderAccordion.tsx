import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";

interface ProductItemProps {
  product: {
    id: string;
    name: string;
    images: string[];
    price: number;
    color: string;
    size: string;
    quantity: number;
  };
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        {product?.images && (
          <Image
            src={product?.images[0] || ""}
            alt={product?.name || "Product Image"}
            width={80}
            height={80}
            className="w-16 max-lg:hidden h-16 object-cover object-center rounded-sm"
          />
        )}

        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="text-sm text-gray-800 font-semibold">
              {product?.name}
            </div>
          </div>

          <div className="flex gap-1 items-center">
            <p className="text-sm">${product?.price}</p>
            <p className="text-[14px] justify-end flex text-gray-500">
              x {product?.quantity}
            </p>
          </div>
          <div className="mt-1 capitalize text-xs text-gray-600">
            Color: <span className="text-black">{product?.color}</span>
          </div>
          <div className="text-xs text-gray-600">
            Size: <span className="text-black">{product?.size}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderAccordion = ({ data, type }: { data: any; type: string }) => {
  const renderAccordionSummary = () => {
    return (
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${type}-content`}
        id={`panel-${type}-header`}
      >
        <div>
          {type === "Products" ? (
            <ProductItem product={data[0]} />
          ) : (
            `${data.address}`
          )}
        </div>
      </AccordionSummary>
    );
  };

  const renderAccordionDetails = () => {
    return (
      <AccordionDetails>
        {type === "Products" &&
          data.slice(1).map((item: any, index: any) => (
            <div key={index}>
              <ProductItem product={item} />
            </div>
          ))}
        {type !== "Products" && (
          <div>
            <p>
              {data.firstName} {data.lastName}
            </p>
            <p>
              {data.city}, {data.state}
            </p>
            <p>
              {data.country}, {data.code}
            </p>
          </div>
        )}
      </AccordionDetails>
    );
  };

  return (
    <Accordion style={{ border: "none", boxShadow: "none" }}>
      {renderAccordionSummary()}
      {renderAccordionDetails()}
    </Accordion>
  );
};

export default OrderAccordion;
