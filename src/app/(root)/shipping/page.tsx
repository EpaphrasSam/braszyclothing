import { NextPage } from 'next';
import Head from 'next/head';

const ShippingReturns: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shipping and Returns - Your Brand Name</title>
        <meta name="description" content="View our shipping and return policies." />
      </Head>

      <main className="bg-white min-h-screen p-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-8">Shipping and Returns</h1>

          <section>
            <h2 className="text-xl font-semibold mb-2">Shipping</h2>
            <p>All orders are shipped from our warehouse within 2-3 business days. Shipping times may vary due to unforeseen circumstances. You will receive confirmation emails when your order is shipped and delivered.</p>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Route Package Protection</h2>
            <p>Route is a premium package protection service that helps you handle issues with lost, stolen, or damaged packages. Opting for Route Insurance at checkout allows for a smooth claim process should any issues arise.</p>
            <a href="https://route.com/terms-and-conditions/" target="_blank" rel="noopener noreferrer">Route’s Terms and Conditions</a>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Pre-Orders</h2>
            <p>Pre-order items will ship once they are available. Estimated delivery dates are listed on product pages. Note: Pre-orders are not eligible for cancellation or refunds.</p>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Licensed Collaborations</h2>
            <p>Exclusive collaboration items, such as those from Rhude x Lamborghini, are final sale and cannot be returned or exchanged.</p>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold mb-4">International Orders</h2>
            <p>All international orders are shipped DDU. Customers are responsible for paying import duties at delivery. Returns from international locations may incur a restocking fee.</p>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Returns and Exchanges</h2>
            <p>Domestic orders can be returned for free within 15 days of receipt. Items must be in new, unworn condition. Exchanges are offered within 15 days of the original order date.</p>
          </section>
        </div>
      </main>
    </>
  );
};

export default ShippingReturns;
