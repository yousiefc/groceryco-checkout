export const deals = {
  // each function returns the total of item type
  half: (cart, item) => (cart[item].count * cart[item].price) / 2,

  onefree: (cart, item) => {
    if (cart[item].count > 2) {
      return (
        cart[item].count * cart[item].price -
        ~~(cart[item].count / 3) * cart[item].price
      )
    } else {
      return cart[item].count * cart[item].price
    }
  },
}
