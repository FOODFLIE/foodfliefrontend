import partnerApiClient from "../utils/partnerApiClient";

export const storeToggle = async(is_active) => {
    try {
        const response = await partnerApiClient.put("/api/partner/store/status", {
            is_active
        });
        return response.data;
    } catch(error) {
        console.error("Error toggling store status:", error);
        throw error;
    }
}