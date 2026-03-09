import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, keywords }) => {
  const siteTitle = "FoodFlie";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {/* Add more meta tags as needed, e.g., Open Graph, Twitter cards */}
    </Helmet>
  );
};

export default SEO;
