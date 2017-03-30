import Require from '../utils/require';

export const leaveTribeAsync = (tribeId) => {
  var params = {tribeId};
  return Require.ajax('/Home/Group/leaveTribe', 'post', params).then(data => data, e => e);
};

export const deleteTribeAsync = (tribeId) => {
  var params = {tribeId};
  return Require.ajax('/Home/Group/dismissTribe', 'post', params).then(data => data, e => e);
}