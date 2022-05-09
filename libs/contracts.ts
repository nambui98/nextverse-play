import ERC20ABI from 'abi/ERC20.abi.json';
import NOXY from 'abi/NOXY.json';
import NVER from 'abi/NVER.json';
import NextItem from 'abi/NextItem.json';
import NextShop from 'abi/NextShop.json';
import NextAuction from 'abi/NextAuction.json';
import NextPack from 'abi/NextPack.json';


interface Map {
  [key: string]: any;
}

const addresses: Map = {
  ['deployment']: { // bscTestnet
    nextDeployer: '0x21cf4A779fd7B58b4487Ccd192cc591C817a2425',
    noxy: '0x15bfe3A2492e9D7Cf2C0B0886ca16274fB72C692',
    nver: '0x04968120b53D883d7A82d32d15ab156B0b65c43C',
    nextItem: '0x124BFd3773231B27b07b1e8577bF65790444814e',
    nextShop: '0x33797baB6FE81D9e21EC5fF287a6E85e2E7F6d30',
    nextAuction: '0xAB1fcf6b123084d90DCDf3C01cd13590F382D7f0',
    nextMarket: '0x55fB465d1CE088fD483b890794a76F2CfF3a9146',
    nextPack: '0x03dbB95547399d91659f6aF4F5E4B6f8f4aAC2A4'
  },
  ['localhost']: {
    nextDeployer: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
    noxy: '0xCfEB869F69431e42cdB54A4F4f105C19C080A601',
    nver: '0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B',
    nextItem: '0xC89Ce4735882C9F0f0FE26686c53074E09B0D550',
    nextShop: '0xD833215cBcc3f914bD1C9ece3EE7BF8B14f841bb',
    nextAuction: '0x9561C133DD8580860B6b7E504bC5Aa500f0f06a7',
    nextMarket: '0xA7f49bDf151A126335b36D346bc834D4a2B77B53',
  },
}
const addressKey = process.env.NEXT_PUBLIC_ADDRESS || 'deployment';
const address = addresses[addressKey] || addresses['deployment'];
console.log(address);

export const nextDeployerAddress = address.nextDeployer

export const noxyContract = { address: address.noxy, abi: NOXY.abi }

export const nverContract = { address: address.nver, abi: NVER.abi }

export const nextItemContract = { address: address.nextItem, abi: NextItem.abi }

export const nextShopContract = { address: address.nextShop, abi: NextShop.abi }

export const nextAuctionContract = { address: address.nextAuction, abi: NextAuction.abi }

export const nextMarketContract = { address: address.nextShop, abi: NextShop.abi }

export const nextPackContract = { address: address.nextPack, abi: NextPack.abi }
