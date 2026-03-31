import partnerApiClient from "../utils/partnerApiClient"

export const getPendingOrders = async() => {
    try {
        const response = await partnerApiClient.get("api/partner/orders/pending");
        return response.data;

    } catch (error) {
        console.error("Failed to fetch pending orders:", error);
        throw error;
    }
}
export const getOrderDetails = async() => {
    try {
        const response = await partnerApiClient.get("api/partner/orders/picked");
        return response.data;

    } catch (error){
        console.error("Failed to fetch order details:", error);
        throw error;
    }
}