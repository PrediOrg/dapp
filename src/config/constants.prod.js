// env: production;
const Ticket_CONTRACT = '0xc4F3b652917e9B8A12c96B2990b5C5e8531C3440';
const TicketSale_CONTRACT = '0x033956F3d53c72f24C11bDC38C88177fBDEA0B4E';
const TicketMarket_CONTRACT = '';
const Vault_CONTRACT = '0xB6390e82Ab79950E9e4Cc6e9f1131a322Fb87015';
const PRDS = '0xfDEe9CD7090f8A30fa6Df9De3871A94392f6b10b';
const BridgeAddr = '0x8B20023accFC177D05E1c28157cEda9e49Fc51f1';

const baseURL = '';
const Network = {
  '0x38': {
    chainId: '0x38',
    chainType: '2',
    chainName: 'BSC',
    icon: 'BNB',
    chainNameMobile: 'BSC',
    rpcUrls: ['https://eth.llamarpc.com'],
    blockExplorerUrls: ['https://etherscan.io'],
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    ferc20: {
      name: 'PRDS',
      address: PRDS,
      decimals: 18,
      icon: '/images/FERC20.jpg',
    },
    payToken: {
      name: 'USDT',
      address: '0x55d398326f99059ff775485246999027b3197955',
      decimals: 18,
      icon: '/images/FBET.jpg',
    },
  },
};
const EtherScanMap = {
  BSC: 'https://bscscan.com',
};
const ChainIdMap = {
  BSC: '0x38',
};
const ChainMapById = {
  '0x38': 'BSC',
};
export { ChainIdMap, ChainMapById, EtherScanMap, Network, Ticket_CONTRACT, TicketSale_CONTRACT, Vault_CONTRACT, TicketMarket_CONTRACT, BridgeAddr, baseURL };
