import type { Purchase, PurchaseListStatus } from "src/types/purchase.type";
import type { SuccessResponse } from "src/types/utils.type";
import http from "src/utils/http";

const purchaseApi = {
  addToCart: (productId: string, buyCount: number) => {
    return http.post<SuccessResponse<Purchase>>(`/purchases/add-to-cart`, { product_id: productId, buy_count: buyCount });
  },
  getPurchases: (params: { status: PurchaseListStatus }) => {
    return http.get<SuccessResponse<Purchase[]>>(`/purchases`, { params });
  },
  buyPurchases: (body: { product_id: string; buy_count: number }[]) => {
    return http.post<SuccessResponse<Purchase>>(`/purchases/buy-products`, body);
  },
  updatePurchase: (body: { product_id: string; buy_count: number }) => {
    return http.put<SuccessResponse<Purchase>>(`/purchases/update-purchase`, body);
  },
  // delete purchase by ids
  deletePurchases: (body: string[]) => {
    return http.delete<SuccessResponse<{ deleted_count: number }>>(`/purchases`, { data: body });
  }
};

export default purchaseApi;