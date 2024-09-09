// env: production;
const Ticket_CONTRACT = '0xF8522853bD9Ae4D1215814D81e4f66dc34E44472';
const TicketSale_CONTRACT = '0x4775fE43A6ddafa7dfA76d624743c48DDcf5508b';
const TicketMarket_CONTRACT = '';
const Vault_CONTRACT = '0x9B318AfE589bEc2d23d4dc1429622E01C7d95F06';
const FERC20 = '0x2eCBa91da63C29EA80Fbe7b52632CA2d1F8e5Be0';
const FBET = '0x6F6A40a7149b4b4F6568c46A0C5A98927A00E9F1';
const BridgeAddr = '0x8B20023accFC177D05E1c28157cEda9e49Fc51f1';
const CHAIN_ID = '0x1';
const baseURL = '';
const Network = {
  '0x1': {
    chainId: CHAIN_ID,
    chainType: '1',
    chainName: 'ICPCHAIN',
    icon: 'ETH',
    chainNameMobile: 'ETH',
    rpcUrls: ['https://eth.llamarpc.com'],
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
  },
  '0x38': {
    chainId: '0x38',
    chainType: '2',
    chainName: 'BSC',
    icon: 'BNB',
    chainNameMobile: 'BSC',
    rpcUrls: ['https://eth.llamarpc.com'],
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
      address: '0xf926868FC2eFd41dabe94f8F1AAd85eF7E2d3dda',
      decimals: 18,
      icon: '/images/FBET.jpg',
    },
  },
};
const EtherScanMap = {
  ICP: 'https://etherscan.io',
  BSC: 'https://bscscan.com',
};
const ChainIdMap = {
  ICP: '0x1',
  BSC: '0x38',
};
const ChainMapById = {
  '0x1': 'ICP',
  '0x38': 'BSC',
};
export { ChainIdMap, ChainMapById, EtherScanMap, Network, Ticket_CONTRACT, TicketSale_CONTRACT, Vault_CONTRACT, TicketMarket_CONTRACT, BridgeAddr, baseURL };
