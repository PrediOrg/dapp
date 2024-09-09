import request from '../utils/request';

/*
    token move
 */
export function getTokenMoveInfo(data) {
  return request({
    url: 'api/token-move/config',
    method: 'post',
    direct: 1,
    params: data,
  });
}
export function getMyTokenMoveLast(data) {
  return request({
    url: 'api/token-move/info',
    method: 'post',
    direct: 1,
    params: data,
  });
}
export function getMyTokenMoveHistory(data) {
  return request({
    url: 'api/token-move/history',
    method: 'post',
    direct: 1,
    params: data,
  });
}

export function getPending(data) {
  return request({
    url: 'api/token-move/pending',
    method: 'post',
    direct: 1,
    params: data,
  });
}
