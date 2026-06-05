import partnerApiClient from "../utils/partnerApiClient";

// Get KOT text data
export const getKOTText = async (orderId) => {
  try {
    const response = await partnerApiClient.get(`api/kot/${orderId}/text`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch KOT text:", error);
    throw error;
  }
};

// Print KOT
export const printKOTSimple = async (orderId) => {
  try {
    console.log(`🖨️ Printing KOT for Order #${orderId}`);

    const kotData = await getKOTText(orderId);

    const iframe = document.createElement("iframe");

    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.style.visibility = "hidden";

    document.body.appendChild(iframe);

    const doc =
      iframe.contentDocument || iframe.contentWindow.document;

    doc.open();

    doc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>KOT #${orderId}</title>

        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            color: #000 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          @page {
            size: 72mm auto;
            margin: 1mm;
          }

          html,
          body {
            width: 72mm;
            background: #fff;
          }

          body {
            padding: 2mm;
            font-family: "Courier New", monospace;
            font-size: 12px;
            font-weight: bold;
            line-height: 1.2;
          }

          .kot-content {
            white-space: pre-wrap;
            font-family: "Courier New", monospace;
            font-size: 12px;
            font-weight: bold;
            line-height: 1.2;
            color: #000;
            margin: 0;
          }

          @media print {
            html,
            body {
              width: 72mm;
            }

            body {
              font-family: "Courier New", monospace;
              font-size: 12px;
              font-weight: bold;
              line-height: 1.2;
            }

            .kot-content {
              font-size: 12px;
              font-weight: bold;
              line-height: 1.2;
            }
          }
        </style>
      </head>

      <body>
        <pre class="kot-content">${kotData}</pre>
      </body>
      </html>
    `);

    doc.close();

    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 3000);
    }, 500);

    return {
      success: true,
      message: `KOT #${orderId} sent to printer`,
    };
  } catch (error) {
    console.error("Print failed:", error);

    throw new Error(
      `Failed to print KOT #${orderId}: ${error.message}`
    );
  }
};