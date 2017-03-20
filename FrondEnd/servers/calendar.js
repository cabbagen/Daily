import Require from '../utils/require';

export const deleteAffairAsync = (affairId, from_calendar_id) => {
	var params = {affairId, from_calendar_id};
	return Require.ajax('/Home/Calendars/deleteAffair', 'post', params).then(data => data, e => e);
}

export const updateAffairAsync = (params) => {
	return Require.ajax('/Home/Calendars/updateAffair', 'post', params).then(data => data, e => e);
}

export const requireMonthData = () => {
	return Require.ajax('/Home/Calendars/getMonthData', 'post').then(data => data, e => e);
}