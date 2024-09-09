//env:testing
const Ticket_CONTRACT = '0x72da158cbCA980f98C070B7c44b91e003E77a2A7';
const TicketSale_CONTRACT = '0x01E38D3Ea1367a297B7E3bf407457FBf77ec3A88';
const TicketMarket_CONTRACT = '0xC8De6413410a793b7Bd1C61c7985Fa301b6b3d43';
const CHAIN_ID = '0xaa36a7';
const FERC20 = '0x51272a9E298A99B265E4ee2b1Ead354417A85355';
const FBET = '0x3Fddd0Bee100c515e428D25a01db2a4680C77eb1';
const Vault_CONTRACT = '0x0f96d0DfbC059dC8549A477D3b89eDe5215ABA10';
const BridgeAddr = '0x1CaB3c1E499F6C444C7bb7970eA63faF574891eC';
const baseURL = '';
const EtherScanMap = {
  ETH: 'https://sepolia.etherscan.io/',
  BSC: 'https://testnet.bscscan.com/',
};
const ChainIdMap = {
  ETH: '0xaa36a7',
  BSC: '0x61',
};
let chainMapById = {};
for (var _name in ChainIdMap) {
  chainMapById[ChainIdMap[_name]] = _name;
}
const ChainMapById = chainMapById;
const Network = {
  '0xaa36a7': {
    chainId: CHAIN_ID,
    chainType: '1',
    chainName: 'ICPCHAIN',
    icon: 'ETH',
    chainNameMobile: 'ETH',
    rpcUrls: ['https://eth-sepolia.public.blastapi.io'],
    blockExplorerUrls: ['https://sepolia.etherscan.io/'],
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
  },
  '0x61': {
    chainId: CHAIN_ID,
    chainType: '1',
    chainName: 'BSC',
    icon: 'BNB',
    chainNameMobile: 'BSC',
    rpcUrls: ['https://bsc-testnet.public.blastapi.io'],
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
    nativeCurrency: {
      name: 'BSC',
      symbol: 'BNB',
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
  },
};
export { ChainIdMap, ChainMapById, EtherScanMap, Network, Ticket_CONTRACT, TicketSale_CONTRACT, Vault_CONTRACT, TicketMarket_CONTRACT, BridgeAddr, baseURL };
