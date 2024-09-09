// env: local;
const Ticket_CONTRACT = '0x6E97DA2c9c0B900C1131FCe5eD004dF912360cea';
const TicketSale_CONTRACT = '0xC8a7e4d643A30c259e7dDA03235dCc0B6BC314BE';
const TicketMarket_CONTRACT = '0xb29DB4B0e0e97b94635f2D0acC474b68Cce002Db';
const FERC20 = '0x3B87efB636dEc8190F4e3d9fE3Dd9c2990521e6B';
const FBET = '0xB78173ED390C82690A40eE81A69a8A9b462e2b09';
const BridgeAddr = '';
const Vault_CONTRACT = '0x6C4Ca3cE0D09A95a7f7eD42D2593b0bc73aa9d04';
const CHAIN_ID = '0x539';
const EtherScanMap = {
  ETH: 'https://sepolia.etherscan.io/',
  BSC: 'https://testnet.bscscan.com/',
};
const ChainIdMap = {
  ETH: CHAIN_ID,
  BSC: '0x61',
};
let chainMapById = {};
for (var _name in ChainIdMap) {
  chainMapById[ChainIdMap[_name]] = _name;
}
const ChainMapById = chainMapById;
const baseURL = '';
const network_local = {
  chainId: CHAIN_ID,
  chainType: '1',
  chainName: 'ICPCHAIN',
  icon: 'ETH',
  chainNameMobile: 'ETH',
  rpcUrls: ['http://127.0.0.1:7545'],
  blockExplorerUrls: ['https://etherscan.io'],
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  ferc20: {
    name: 'FERC20',
    address: FERC20,
    decimals: 18,
    icon: '/images/FERC20.jpg',
  },
  payToken: {
    name: 'FBET',
    address: FBET,
    decimals: 18,
    icon: '/images/FBET.jpg',
  },
};
let network = {};
network[CHAIN_ID] = network_local;
const Network = network;
export { ChainIdMap, ChainMapById, EtherScanMap, Network, Ticket_CONTRACT, TicketSale_CONTRACT, Vault_CONTRACT, TicketMarket_CONTRACT, baseURL, BridgeAddr };
