const url = {
  getDiscounts: () => (`./mock/products/discounts.json`),
  getRecommended: (rowIndex, pageSize) => (`./mock/products/recommended.json?rowIndex=${rowIndex}&pageSize=${pageSize}`)
}

export default url