import './App.css'
import { useState } from 'react'
import { stock } from './stock'
import checkout from './checkout'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'

function App() {
  //state of all selected items
  const [list, setList] = useState([])
  const [open, setOpen] = useState(false)
  const [receipt, setReceipt] = useState('')

  // removes the clicked item from list
  const removeItem = item => {
    let tmp = list
    let index = tmp.indexOf(item)
    if (index > -1) {
      tmp.splice(index, 1)
      setList([...tmp])
    }
  }

  const finalCheckout = () => {
    setReceipt(checkout(list))
    setOpen(true)
  }

  // maps all items from stock.js to an item card
  let stockItems = Object.keys(stock).map(key => (
    <ItemCard key={key}>
      <ItemPaper>
        <Title variant='h5'>{key.toUpperCase()}</Title>
        <Price variant='h6'>${stock[key].price}</Price>
        <Deal variant='body2'>{stock[key].dealDesc}</Deal>

        <AddButton onClick={() => setList([...list, key])}>
          <AddIcon />
        </AddButton>
        <RemoveButton onClick={() => removeItem(key)}>
          <RemoveIcon />
        </RemoveButton>
      </ItemPaper>
    </ItemCard>
  ))

  // maps all items in list to the checkout list
  let checkoutItems = list.map((key, index) => (
    <ListItem key={index}>{`${key.toUpperCase()} $${
      stock[key].price
    }`}</ListItem>
  ))

  return (
    <Grid container justify='center'>
      <Banner>
          <Welcome variant='h2'>Welcome To GroceryCo!</Welcome>
      </Banner>

      <ItemsContainer container item sm={10} justify='center'>
        {stockItems}
      </ItemsContainer>

      <Grid container item xs={12} sm={10} md={4}>
        <ReceiptPaper>
          <Title variant='h5'>Selected Items</Title>
          <ReceiptList>{checkoutItems}</ReceiptList>
          <Button variant='contained' color='inherit' onClick={finalCheckout}>
            Checkout!
          </Button>
        </ReceiptPaper>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Your Receipt</DialogTitle>
        <DialogContent>{receipt}</DialogContent>
      </Dialog>
    </Grid>
  )
}

const Welcome = styled(Typography)`
  background-color: rgba(50,50,50,0.7)
`

const ItemCard = styled.div`
  height: 100px;
  width: 300px;
  margin: 20px;
`

const ItemPaper = styled(Paper)`
  height: 90%;
  padding: 15px;
  position: relative;
  background-color: #f6f6f6;
`

const Title = styled(Typography)`
  left: 20px;
  top: 15px;
  position: absolute;
`

const Price = styled(Typography)`
  right: 20px;
  top: 15px;
  position: absolute;
  color: green;
`

const Deal = styled(Typography)`
  color: red;
  position: absolute;
  left: 20px;
  bottom: 40%;
`

const AddButton = styled(IconButton)`
  right: 50%;
  bottom: 0px;
  position: absolute;
`
const RemoveButton = styled(IconButton)`
  left: 50%;
  bottom: 0px;
  position: absolute;
`

const Banner = styled.div`
  background-image: url("grocery.jpg");
  background-position: center;
  width: 100%;
  height: 150px;
  margin-bottom: 50px;
  padding-top: 60px;
  text-align: center;
`

const ItemsContainer = styled(Grid)`
  margin: 50px auto 80px auto;
`

const ReceiptPaper = styled(Paper)`
  min-height: 100px;
  width: 100%;
  background-color: #f6f6f6;
  position: relative;
  margin-bottom: 40px;
  padding-bottom: 20px;
  text-align: center;
`

const ReceiptList = styled(List)`
  margin: 40px auto 20px 20px;
`

export default App
