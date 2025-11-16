import type { Product, ProductList, ProductListConfig } from "src/types/product.type"
import type { SuccessResponse } from "src/types/utils.type"
import http from "src/utils/http"

const productApi = {
  getProducts(config: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>("products", { params: config })
  },
  getProduct(productId: string) {
    return http.get<SuccessResponse<Product>>(`products/${productId}`)
  }
}

export default productApi