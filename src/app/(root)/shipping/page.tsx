const ShippingReturns = () => {
    return (
      <>
        <main className="bg-white min-h-screen p-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-8">Shipping and Returns</h1>
  
            <section>
              <h2 className="text-xl font-semibold mb-2">Domestic Shipping with USPS</h2>
              <p>For domestic orders, we utilize USPS, offering various options from standard to expedited services. Standard shipping typically takes 3-5 business days, while Priority services are faster, taking about 1-3 business days depending on your location.</p>
            </section>
  
            <section className="mt-6">
              <h2 className="text-xl font-semibold mb-2">International and Express Shipping with DHL</h2>
              <p>DHL is our preferred carrier for international shipments and expedited domestic orders. Delivery times for international orders vary by destination but typically range from 3-7 business days. DHL Express offers reliable and swift shipping for urgent orders both domestically and internationally.</p>
            </section>
  
            <section className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Tracking Your Order</h2>
              <p>Once your order is shipped, you will receive an email with tracking information. Use this information to check the status of your shipment via the USPS or DHL website, depending on the selected carrier.</p>
            </section>
  
            <section className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Route Package Protection</h2>
              <p>Add Route Package Protection to your order at checkout to safeguard against loss, theft, or damage. This service facilitates an easy claim process, ensuring peace of mind throughout the delivery of your order.</p>
              <a href="https://route.com/terms-and-conditions/" target="_blank" rel="noopener noreferrer">Learn more about Route’s Terms and Conditions</a>
            </section>
  
            <section className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Returns and Exchanges</h2>
              <p>Items can be returned or exchanged within 15 days of delivery. Please ensure all returned merchandise is in its original condition. Note: Items marked as final sale are not eligible for returns or exchanges.</p>
            </section>
          </div>
        </main>
      </>
    );
  };
  
  export default ShippingReturns;
  