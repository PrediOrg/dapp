import { ethers, constants } from 'ethers';
import { PRDsClaim_CONTRACT ,ssssssssssssssssssssssBridgeAddr, Vault_CONTRACT, TicketMarket_CONTRACT, Ticket_CONTRACT, TicketSale_CONTRACT } from '@/config/constants';

import { issueUnderlying } from '@/api/index';
import { Buffer } from 'buffer';

const Vault_ABI = require('./abi/Vault.json');
const Bridge_ABI = require('./abi/Bridge.json');
const IERC20_ABI = require('./abi/IERC20.json');
const TicketSale_ABI = require('./abi/TicketSale.json');
const Ticket_ABI = require('./abi/Ticket.json');
const TicketMarket_ABI = require('./abi/TicketMarket.json');
const Claim_ABI = require('./abi/Claim.json');
const cdsSdk = {};
cdsSdk.MaxUint256 = constants.MaxUint256;
cdsSdk.getProvider = () => {
  if (!window.ethereum) {
    return;
  }
  //coinbasewallet
  if (window.ethereum.providers) {
    return new ethers.providers.Web3Provider(window.ethereum.providers[0]);
  } else {
    //metamask
    return new ethers.providers.Web3Provider(window.ethereum);
  }
};

cdsSdk.getSigner = () => {
  const provider = cdsSdk.getProvider();
  const signer = provider ? provider.getSigner() : null;
  return signer;
};
// claim
cdsSdk.getClaimContract = () => {
  return cdsSdk.connectContract(PRDsClaim_CONTRACT, Claim_ABI);
};
cdsSdk.hasClaimed = async (address) => {
  const claimContract = cdsSdk.getClaimContract();
  return claimContract.hasClaimed(address);
};
cdsSdk.claimPRDs = async () => {
  const claimContract = cdsSdk.getClaimContract();
  return claimContract.claim();
};
// claim end
cdsSdk.connectContract = (contract, contractABI) => {
  let signer = cdsSdk.getSigner();
  return new ethers.Contract(contract, contractABI, signer);
};

cdsSdk.getTicketContract = () => {
  return cdsSdk.connectContract(Ticket_CONTRACT, Ticket_ABI);
};

cdsSdk.getTicketMarketContract = () => {
  return cdsSdk.connectContract(TicketMarket_CONTRACT, TicketMarket_ABI);
};
cdsSdk.getVaultContract = () => {
  return cdsSdk.connectContract(Vault_CONTRACT, Vault_ABI);
};

cdsSdk.getBridgeContract = () => {
  return cdsSdk.connectContract(BridgeAddr, Bridge_ABI);
};

cdsSdk.getTicketSaleContract = () => {
  return cdsSdk.connectContract(TicketSale_CONTRACT, TicketSale_ABI);
};

cdsSdk.rewardQuery = async function (account) {
  let contract = cdsSdk.getTicketSaleContract();
  let { inviter, bought, reward, rewardEth } = await contract.boughtUser(account);
  return { inviter, bought, reward, rewardEth };
};

cdsSdk.withdrawReward = async function () {
  let contract = cdsSdk.getTicketSaleContract();
  return await contract.withdrawReward();
};

cdsSdk.allowance = function (token_contract, user, spender) {
  let erc20Contract = cdsSdk.connectContract(token_contract, IERC20_ABI);
  return erc20Contract.allowance(user, spender);
};

cdsSdk.balanceOf = function (token_contract, user) {
  let erc20Contract = cdsSdk.connectContract(token_contract, IERC20_ABI);
  return erc20Contract.balanceOf(user);
};
cdsSdk.decimals = function (token_contract) {
  let erc20Contract = cdsSdk.connectContract(token_contract, IERC20_ABI);
  return erc20Contract.decimals();
};
cdsSdk.balance = async (user) => {
  const provider = cdsSdk.getProvider();
  return provider.getBalance(user, 'latest');
};

cdsSdk.waitForTransaction = async (hash) => {
  let provider = cdsSdk.getProvider();
  return provider.waitForTransaction(hash);
};

cdsSdk.approve = async (token_contract, spender, amount) => {
  if (!amount) {
    amount = constants.MaxUint256;
  }
  let erc20Contract = cdsSdk.connectContract(token_contract, IERC20_ABI);
  return erc20Contract.approve(spender, amount);
};

cdsSdk.buyNftNative = async (stageNum, cat_id, token_index, amount) => {
  const ticketSaleContract = cdsSdk.getTicketSaleContract();
  return ticketSaleContract.buy(stageNum, cat_id, token_index, {
    value: amount,
  });
};

cdsSdk.buyNftErc20 = async (inviter) => {
  const ticketSaleContract = cdsSdk.getTicketSaleContract();
  return ticketSaleContract.buy(inviter);
};
cdsSdk.ethBuyNftErc20 = async (inviter, val) => {
  const ticketSaleContract = cdsSdk.getTicketSaleContract();
  return ticketSaleContract.ethBuy(inviter, {
    value: val.toString(),
  });
};
cdsSdk.whiteList = async (addr) => {
  const ticketSaleContract = cdsSdk.getTicketSaleContract();
  return ticketSaleContract.whiteList(addr);
};
cdsSdk.issueCDS = async (_baseToken, chain, cat_id, _tokenId, _underlying, _isStakeNFT, _maturityDate, source, additional_information, image, options) => {
  console.log({
    _baseToken,
    chain,
    cat_id,
    _tokenId,
    _underlying,
    _isStakeNFT,
    _maturityDate,
    source,
    additional_information,
    image,
    options,
  });
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', Buffer.from(_underlying + '|' + source + '|' + JSON.stringify(options)));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const underlying_hash_buffer = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  const underlying_hash = '0x' + underlying_hash_buffer.toString('hex');
  console.log({
    additional_information,
    image,
    chain,
    content: _underlying,
    resolution_source: source,
    cat_id,
    options: options,
    underlying_hash,
  });
  let ret = await issueUnderlying({
    additional_information,
    image,
    chain,
    content: _underlying,
    resolution_source: source,
    cat_id,
    options: options,
    underlying_hash,
  });
  if (!ret || ret.code !== 0) {
    throw new Error('submit underlying error');
  }
  return cdsSdk.getVaultContract().issue(_baseToken, _tokenId, underlying_hash, _isStakeNFT, _maturityDate);
};

cdsSdk.makeSale = async (_token, _tokenId, _payToken, _price, _amount, _term, _rental) => {
  const marketContract = cdsSdk.getTicketMarketContract();
  return marketContract.make(_token, _tokenId, _payToken, _price, _amount, _term, _rental);
};

cdsSdk.setApprovalForAll = async (account, approved) => {
  const ticket_contract = cdsSdk.getTicketContract();
  return ticket_contract.setApprovalForAll(account, approved);
};

cdsSdk.isApprovedForAll = async (account, operator) => {
  const ticket_contract = cdsSdk.getTicketContract();
  return ticket_contract.isApprovedForAll(account, operator);
};

cdsSdk.cancelSale = async (_token, _tokenId) => {
  const marketContract = cdsSdk.getTicketMarketContract();
  return marketContract.cancel(_token, _tokenId);
};
cdsSdk.take = async (seller, _token, _tokenId) => {
  const marketContract = cdsSdk.getTicketMarketContract();
  return marketContract.take(seller, _token, _tokenId);
};

cdsSdk.cancelCDS = async (eventId, timestamp, signture) => {
  const cdsContract = cdsSdk.getVaultContract();
  return cdsContract.cancelEvent(eventId, timestamp, signture);
};
cdsSdk.recycleTicket = async (eventId, _result, signture) => {
  const cdsContract = cdsSdk.getVaultContract();
  return cdsContract.confirmResult(eventId, _result, signture);
};
cdsSdk.deposit = async (token, amount) => {
  const cdsContract = cdsSdk.getVaultContract();
  return cdsContract.deposit(token, amount);
};
cdsSdk.withdraw = async (token, amount, expired, signature) => {
  const cdsContract = cdsSdk.getVaultContract();
  return cdsContract.withdraw(token, amount, expired, signature);
};

// bridge
cdsSdk.calculatedFees = async (destinationChainSelector, isTicket, amount) => {
  const cdsContract = cdsSdk.getBridgeContract();
  return cdsContract.calculatedFees(destinationChainSelector, isTicket, amount);
};
cdsSdk.moveToChain = async (destinationChainSelector, amount, isTicket, value) => {
  const options = {
    value,
  };
  const cdsContract = cdsSdk.getBridgeContract();
  console.log({ destinationChainSelector, isTicket, amount, options });
  return cdsContract.moveToChain(destinationChainSelector, isTicket, amount, options);
};
export default cdsSdk;
