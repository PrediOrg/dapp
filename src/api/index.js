import request from '../utils/request';

export function transStatus(data) {
  return request({
    url: '/api/get-trans-status',
    method: 'post',
    data,
  });
}

export function eventMaket(data) {
  return request({
    url: '/api/markets',
    method: 'post',
    data,
  });
}

export function eventDetail(data) {
  return request({
    url: '/api/market/detail',
    method: 'post',
    data,
  });
}

export function tickets(data) {
  return request({
    url: '/api/ticket/tokens',
    method: 'post',
    data,
  });
}

export function issueConfig(data) {
  return request({
    url: '/api/config/issue',
    method: 'post',
    data,
  });
}

export function issueUnderlying(data) {
  return request({
    url: '/api/issue/submit-underlying',
    method: 'post',
    data,
  });
}
export function upload(data) {
  return request({
    url: '/api/upload',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'post',
    data,
  });
}
export function ticketSale(data) {
  return request({
    url: '/api/ticket-sale/sale',
    method: 'post',
    data,
  });
}

export function ticketMarket(data) {
  return request({
    url: '/api/ticket-market',
    method: 'post',
    data,
  });
}

export function nftDetail(data) {
  return request({
    url: '/api/ticket-market/detail',
    method: 'post',
    data,
  });
}

export function ticketPackets(data) {
  return request({
    url: '/api/ticket-market/packets',
    method: 'post',
    data,
  });
}

export function issued(data) {
  return request({
    url: '/api/issued',
    method: 'post',
    data,
  });
}

export function bought(data) {
  return request({
    url: '/api/bought',
    method: 'post',
    data,
  });
}

export function getUserDealt(data) {
  return request({
    url: '/api/user-dealt',
    method: 'post',
    data,
  });
}
export function actions(data) {
  return request({
    url: '/api/actions',
    method: 'post',
    data,
  });
}

export function ticketBalance(data) {
  return request({
    url: '/api/ticket/balance',
    method: 'post',
    data,
  });
}

export function ticketTransaction(data) {
  return request({
    url: '/api/ticket/transactions',
    method: 'post',
    data,
  });
}

export function getUserInfo(user, chain) {
  return request({
    url: '/api/user/info',
    method: 'post',
    data: {
      user,
      chain,
    },
  });
}
