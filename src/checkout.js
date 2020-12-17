import { stock } from './stock'
import { deals } from './deals'
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

//NOTE this function also works standalone, just supply an array of items and a receipt will print to console

// returns a receipt
function checkout(arr) {
  let cart = {}
  let total = 0.0

  const pricify = num => {
    return Number((Math.round(num * 100) / 100).toFixed(2))
  }

  // calculates the amount of money saved to display on the receipt
  const getDiscount = (item, discountedTotal) => {
    return pricify(discountedTotal - cart[item].count * cart[item].price)
  }

  for (let item of arr) {
    //checks that the item does not already exist in the cart and that the item is a part of stock (otherwise it will just be skipped over)
    if (!cart.hasOwnProperty(item) && stock.hasOwnProperty(item)) {
      let itemDeal = stock[item].deal
      let sub = arr.filter(x => x === item)

      cart[item] = {}
      cart[item].count = sub.length
      cart[item].price = stock[item].price

      if (itemDeal) {
        let newTotal = deals[itemDeal](cart, item)
        cart[item].total = pricify(newTotal)
      } else {
        let newTotal = cart[item].price * cart[item].count
        cart[item].total = pricify(newTotal)
      }
      total = pricify(total + cart[item].total)
    }
  }

  // prints the receipt to console as well as returning it for viewing in a Dialog
  const generateReceipt = () => {
    console.log(`GROCERY CO`)
    console.log(`ITEM *** QUANTITY *** DISCOUNT *** TOTAL`)

    for (let item in cart) {
      let count = cart[item].count
      let total = cart[item].total
      console.log(`${item} --- x${count} --- ${getDiscount(item, total)} --- $${total}`)
    }
    console.log(`TOTAL: $${total}`)

    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{new Date(Date.now()).toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell> ITEM </TableCell>
              <TableCell>AMOUNT</TableCell>
              <TableCell>DISCOUNT</TableCell>
              <TableCell>ITEM TOTAL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(cart).map(item => (
                <TableRow key={item}>
                  <TableCell component='th' scope='row'>
                    {item}
                  </TableCell>
                  <TableCell>{cart[item].count}</TableCell>
                  <TableCell>{getDiscount(item, cart[item].total)}</TableCell>
                  <TableCell>{`$${cart[item].total}`}</TableCell>
                </TableRow>
            ))}
            <TableRow>
              <TableCell>TOTAL: ${total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
  return generateReceipt()
}

export default checkout
