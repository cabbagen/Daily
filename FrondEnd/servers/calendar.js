import Require from '../utils/require';

export const deleteAffairAsync = (affairId, from_calendar_id) => {
	var params = {affairId, from_calendar_id};
	return Require.ajax('/Home/Calendars/deleteAffair', 'post', params).then(data => data, e => e);
}

export const updateAffairAsync = (params) => {
	return Require.ajax('/Home/Calendars/updateAffair', 'post', params).then(data => data, e => e);
}

export const requireMonthDataAsync = (timestamp) => {
	var params = {timestamp};
	return Require.ajax('/Home/Calendars/getMonthAffairData', 'post', params).then(data => data, e => e);
}

export const addAffairAsync = (params) => {
	return Require.ajax('/Home/Calendars/addAffair', 'post', params).then(data => data, e => e);
}

export const completeAffairAsync = (affairId, from_calendar_id) => {
	var params = {affairId, from_calendar_id};
	return Require.ajax('/Home/Calendars/completeAffair', 'post', params).then(data => data, e => e);
};	

export const cancelCompleteAffairAsync = (affairId, from_calendar_id) => {
	var params = {affairId, from_calendar_id};
	return Require.ajax('/Home/Calendars/cancelCompleteAffair', 'post', params).then(data => data, e => e);
}

export const requireDayDataAsync = (timestamp) => {
	var params = {timestamp};
	return Require.ajax('/Home/Calendars/getDayAffairData', 'post', params).then(data => data, e => e);
};

export const requireChartDataAsync = () => (
	Require.ajax('/Home/Calendars/getTypeCompleteData', 'post').then(data => data, e => e)
);