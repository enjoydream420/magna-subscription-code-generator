const { ethers, solidityPackedKeccak256, getBytes, zeroPadValue, hexlify, isBytesLike, concat } = require("ethers");
require("dotenv").config()

const privateKey = process.env.PRIVATE_KEY
const provider = new ethers.AbstractProvider()
const wallet = new ethers.Wallet(privateKey)

const signer = wallet.connect(provider)

async function main() {
    for (let i = 0; i < 10; i++) {
       await getSignature(i)
    }
}

main()

async function getSignature(index) {
    const hashData = solidityPackedKeccak256(["uint256"], [index])
    const signature = await signer.signMessage(getBytes(hashData))
    let indexToHex = index.toString(16)
    if (indexToHex.length % 2) indexToHex = "0" + indexToHex
    indexToHex = zeroPadValue("0x"+indexToHex, 32)
    let promotion_code = concat([indexToHex, signature])
    console.log(indexToHex, signature, promotion_code)
}