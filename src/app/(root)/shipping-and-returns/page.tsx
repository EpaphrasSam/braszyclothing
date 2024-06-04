const ShippingReturns = () => {
  return (
    <>
      <main className="bg-white min-h-screen p-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-8">
            Shipping and Returns
          </h1>

          <section>
            <h2 className="text-xl font-semibold mb-2">Shipping Policy</h2>
            <p>
              Email info at braszyclothing@gmail.com with your order number,
              with any order questions.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Return Policy</h2>
            <p>No refunds unless we messed up the item or size.</p>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold mb-2">
              Shipping & Fulfillment
            </h2>
            <p>
              Most orders are processed in 3-5 days with an additional 3-9 days
              shipping depending on your location. We ship orders through third
              party carriers such as Canada Post & UPS. To ensure your package
              arrives in the advertised time, please make sure your address is
              entered correctly and includes all required and relevant
              information. Correct street numbers, abbreviations, buildings, and
              apartment numbers are critical for ensuring timely deliveries.
              BRASZY CLOTHING and its subsidiaries are not responsible for lost,
              stolen, incorrect address, or misplaced packages. Once a package
              has left our HQ, and in the hands of the carrier we have no
              control over the package. Please reach out to the applicable
              carrier listed in your email/text confirmation for further
              assistance.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Payment Processing</h2>
            <p>
              Once we receive your order please allow 48 hours for payment
              processing (excluding Saturdays, Sundays, and National Holidays).
              All orders are subject to processing time unless otherwise stated
              in the product description. Since some items are made to order in
              our HQ we have to ensure all payments are successful prior to
              fulfillment. Payment processing time is separate from the time it
              takes for a shipment to reach its destination, once it has been
              fulfilled. After processing is completed, you will receive a
              tracking number immediately. Please note, your tracking number
              will update once CANADA POST & UPS etc., has received the package
              and it is successfully processed through their system.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default ShippingReturns;
