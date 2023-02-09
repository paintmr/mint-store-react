const url = {
  getDiscounts: () => (`/mock/products/discounts.json`),
  getRecommended: (rowIndex, pageSize) => (`/mock/products/recommended.json?rowIndex=${rowIndex}&pageSize=${pageSize}`),
  getProductDetails: (id) => (`/mock/product_details/${id}.json`),
  getShop: (id) => (`/mock/shops/${id}.json`),

}

export default url