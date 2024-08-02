import React from "react";
import ReactPDF from "@react-pdf/renderer";
import InvoicePDF from "./invoicePDF";
import { InvoiceProps } from "@/types/InvoiceTypes";

export async function generateInvoicePDF(invoiceProps: InvoiceProps) {
  const pdfStream = await ReactPDF.renderToStream(
    <InvoicePDF {...invoiceProps} />
  );

  const chunks = [];
  for await (const chunk of pdfStream) {
    if (typeof chunk === "string") {
      const uint8ArrayChunk = new TextEncoder().encode(chunk);
      chunks.push(uint8ArrayChunk);
    } else {
      chunks.push(chunk);
    }
  }
  // @ts-ignore
  const arrayBuffer = new Uint8Array(Buffer.concat(chunks));

  return arrayBuffer;
}
