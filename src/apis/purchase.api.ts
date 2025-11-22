import type { Purchase, PurchaseListStatus } from "src/types/purchase.type";
import type { SuccessResponse } from "src/types/utils.type";
import http from "src/utils/http";

const purchaseApi = {
  addToCart: (productId: string, buyCount: number) => {
    return http.post<SuccessResponse<Purchase>>(`/purchases/add-to-cart`, { product_id: productId, buy_count: buyCount });
  },
  getPurchases: (params: { status: PurchaseListStatus }) => {
    return http.get<SuccessResponse<Purchase[]>>(`/purchases`, { params });
  }
};

export default purchaseApi;