import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ 
  title, 
  description, 
  keywords,
  image,
  url,
  type = "website",
  schema,
  noindex = false,
  canonical
}) => {
  const siteTitle = "FoodFlie";
  const siteName = "FoodFlie - 13 Minute Food Delivery";
  const defaultDescription = "Order food online from your favorite restaurants. Get lightning-fast delivery in just 13 minutes. Fresh food, hot meals, delivered to your doorstep. Menu prices guaranteed, no hidden charges.";
  const defaultKeywords = "food delivery, online food order, restaurant delivery, fast food delivery, 13 minute delivery, quick food delivery, food delivery near me, menu price food delivery, instant food delivery";
  const defaultImage = "https://foodflie.com/og-image.jpg";
  const siteUrl = "https://foodflie.com";
  
  const fullTitle = title ? `${title} | ${siteTitle}` : siteName;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const metaImage = image || defaultImage;
  const metaUrl = url || canonical || siteUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content="FoodFlie" />
      <link rel="canonical" href={metaUrl} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:site" content="@foodflie" />
      <meta name="twitter:creator" content="@foodflie" />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="IN-TG" />
      <meta name="geo.placename" content="Hyderabad" />
      <meta name="geo.position" content="17.385044;78.486671" />
      <meta name="ICBM" content="17.385044, 78.486671" />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
