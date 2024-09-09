import request from '../utils/request';

export function signWithdraw(data) {
  return request({
    url: '/api/signature/withdraw',
    method: 'post',
    direct: 1,
    params: data,
  });
}



export function signBuy(data) {
  return request({
    url: '/api/signature/buy',
    method: 'post',
    direct: 1,
    params: data,
  });
}
export function signChallenge(data) {
  return request({
    url: '/api/signature/challenge',
    method: 'post',
    direct: 1,
    params: data,
  });
}
export function signCancel(data) {
  return request({
    url: '/api/signature/cancel',
    method: 'post',
    direct: 1,
    params: data,
  });
}

export function signSetResult(data) {
  return request({
    url: '/api/signature/set-result',
    method: 'post',
    direct: 1,
    params: data,
  });
}
