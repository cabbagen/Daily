import Require from '../utils/require';

export const leaveTribeAsync = (tribeId) => {
  var params = {tribeId};
  return Require.ajax('/Home/Group/leaveTribe', 'post', params).then(data => data, e => e);
};

export const deleteTribeAsync = (tribeId) => {
  var params = {tribeId};
  return Require.ajax('/Home/Group/dismissTribe', 'post', params).then(data => data, e => e);
}

export const confirmJoinTribeAsync = (params) => {
  return Require.ajax('/Home/Group/argressJoinTribe', 'post', params).then(data => data, e => e);
};

export const inviteJoinTribeAsync = (params) => {
  return Require.ajax('/Home/Group/inviteJoinTribe', 'post', params).then(data => data, e => e);
}

export const expelTribeMemberAsync = (params) => {
  return Require.ajax('/Home/Group/expelTribeMember', 'post', params).then(data => data, e => e);
}