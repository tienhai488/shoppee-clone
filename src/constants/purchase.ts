// -1: Sản phẩm đang trong giỏ hàng
// 0: Tất cả sản phâm
// 1: Sản phẩm đang đợi xác nhận từ chủ shop
// 2: Sản phẩm đang được lấy hàng
// 3: Sản phẩm đang vận chuyển
// 4: San phẩm đã được giao
// 5: Sản phẩm đã bị hủy

export const PURCHASE_STATUS = {
  IN_CART: -1,
  ALL: 0,
  WAITING_FOR_CONFIRMATION: 1,
  WAITING_FOR_PICKUP: 2,
  WAITING_FOR_SHIPPING: 3,
  DELIVERED: 4,
  CANCELED: 5
} as const