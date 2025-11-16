import { type Category } from "src/types/category.type"
import type { SuccessResponse } from "src/types/utils.type"
import http from "src/utils/http"

const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>("categories")
  }
}

export default categoryApi