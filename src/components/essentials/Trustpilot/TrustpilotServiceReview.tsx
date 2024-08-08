import React, { useEffect } from "react";

const TrustpilotServiceReview = () => {
  useEffect(() => {
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(
        document.getElementById("trustbox-service-review")
      );
    }
  }, []);

  return (
    <div
      id="trustbox-service-review"
      className="trustpilot-widget my-4"
      data-locale="en-US"
      data-template-id="56278e9abfbbba0bdcd568bc"
      data-businessunit-id="66b3917d2281d804ef6f19bd"
      data-style-height="52px"
      data-style-width="100%"
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

export default TrustpilotServiceReview;
