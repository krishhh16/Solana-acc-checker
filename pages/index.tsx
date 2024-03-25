import type { NextPage } from 'next'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as Web3 from '@solana/web3.js'

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [isExecutable, setExecutable] = useState(false)
  const addressSubmittedHandler = (address:  string) => {
    try {
      setAddress(address)
      const key = new Web3.PublicKey(address)
      const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
      connection.getAccountInfo(key).then(something => {
        console.log(something)
        setExecutable(something?.executable)
      })
      
      connection.getBalance(key).then(balance => {
        setBalance(balance / Web3.LAMPORTS_PER_SOL)
      })
    } catch (error) {
      setAddress('')
      setBalance(0)
      alert(error)
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          Start Your Solana Journey
        </p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        {balance ?
         <p>
          Is it executable? {isExecutable ? "Yep" : "Nope"}
        </p> : 
        <p></p> }
      </header>
    </div>
  )
}

export default Home
