import React, { useEffect } from "react";

interface TrustpilotProductReviewProps {
  productId: string;
}

const TrustpilotProductReview: React.FC<TrustpilotProductReviewProps> = ({
  productId,
}) => {
  useEffect(() => {
    // This will create the Trustbox for product reviews
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(
        document.getElementById(`trustbox-product-review-${productId}`)
      );
    }
  }, [productId]);

  return (
    <div
      id={`trustbox-product-review-${productId}`}
      className="trustpilot-widget"
      data-locale="en-US"
      data-template-id="54d39695764ea907c0f34825"
      data-businessunit-id="CbshEyqQHHTu288h"
      data-style-height="350px"
      data-style-width="100%"
      data-theme="light"
      data-sku={productId}
    >
      <a
        href="https://www.trustpilot.com/review/braszyclothing.com"
        target="_blank"
        rel="noopener"
      >
        Trustpilot
      </a>
    </div>
  );
};

export default TrustpilotProductReview;
