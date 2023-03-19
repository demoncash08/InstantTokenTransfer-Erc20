const { ethers } = require('ethers')

//Infura Keys
const sepolia = ''

const provider = new ethers.providers.JsonRpcProvider(sepolia)

// You can also use an ENS name for the contract address
//Token address
const TokenAddress = '0x6d1e1cf90cb3d89F9839531063D7fb25c50598fC'

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
    'wrong poem sniff engine chief scan erase creek worth chunk plug answer'
  )
  // 0x52E30F1F1F2A41DbCF0C320FbfaF192fC88C8F80
  //Above address is the wallet derived from given mnemonic
  wallet = mainWallet.connect(provider)
  const TokenContract = new ethers.Contract(TokenAddress, TokenAbi, wallet)

  //Balance of the ERC20 Token
  balance = await TokenContract.balanceOf('0x52E30F1F1F2A41DbCF0C320FbfaF192fC88C8F80')
  balance = ethers.utils.formatUnits(balance, 18)
  console.log('Balance is =', balance)

  if (balance > 0) {
    try {
      const token = ethers.utils.parseUnits(balance, 18)
      tx = await TokenContract.transfer('0x3b259A4d129F4Ddbeba62ADDdcdFD5fbc5EF4175', token)
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
