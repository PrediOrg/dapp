import BigNumber from 'bignumber.js';
const ETHDecimal = 18;
const MaxUint256 = BigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff').toFixed(0);
// import { ChainIdMap, EtherScanMap, Network, Ticket_CONTRACT, TicketSale_CONTRACT, Vault_CONTRACT, TicketMarket_CONTRACT, BridgeAddr, ChainMapById, baseURL } from './constants.testing';
import { ChainIdMap, EtherScanMap, Network, Ticket_CONTRACT, TicketSale_CONTRACT, Vault_CONTRACT, TicketMarket_CONTRACT, BridgeAddr, ChainMapById, baseURL } from './constants.prod';
export { ETHDecimal, ChainIdMap, ChainMapById, MaxUint256, EtherScanMap, Network, Ticket_CONTRACT, TicketSale_CONTRACT, Vault_CONTRACT, TicketMarket_CONTRACT, baseURL, BridgeAddr };
