const { ethers } = require('ethers')

//Infura Keys
const sepolia = ''

const provider = new ethers.providers.JsonRpcProvider(sepolia)

// You can also use an ENS name for the contract address
//Token address
const TokenAddress = '' //Token address here

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const TokenAbi = [
  // Some details about the token
  'function name() view returns (string)',
  'function symbol() view returns (string)',

  // Get the account balance
  'function balanceOf(address) view returns (uint)',

  // Send some of your tokens to someone else
  'function transfer(address to, uint amount)',

  // An event triggered whenever anyone transfers to someone else
  'event Transfer(address indexed from, address indexed to, uint amount)'
]

// The Contract object

let balance
const Balance = async () => {
  console.log('Block num is  ', await provider.getBlockNumber())

  const mainWallet = ethers.Wallet.fromMnemonic(
    '' //Wrtie Mnemonic phrase here
  )

  wallet = mainWallet.connect(provider)
  const TokenContract = new ethers.Contract(TokenAddress, TokenAbi, wallet)

  //Balance of the ERC20 Token
  balance = await TokenContract.balanceOf('') //Write token address here
  balance = ethers.utils.formatUnits(balance, 18)
  console.log('Balance is =', balance)

  if (balance > 0) {
    try {
      const token = ethers.utils.parseUnits(balance, 18)
      tx = await TokenContract.transfer('', token) //Destination ERC20 compatible address where tokens are to be trnasfered
      console.log('Sent')
    } catch (error) {
      console.log(error)
    }
  }
}

setInterval(async () => {
  const result = await Balance()
  console.log(balance)
}, 10000)
//Time out interval for bot to re run.
