
// 取消通知
export const removeNotification = () => ({
  type : 'removeNotification'
});

// 拉取本月日程任务数据
export const requireMonthData = (currentCategoryId, timestamp) => ({
  type : 'requireMonthData',
  timestamp : timestamp,
  from_calendar_id : currentCategoryId
});

// 拉取当日日程任务数据
export const requireDayData = (currentCategoryId, timestamp) => ({
  type : 'requireDayData',
  timestamp : timestamp,
  from_calendar_id : currentCategoryId
});

// 请求图表数据
export const requireChartData = (currentCategoryId) => ({
  type : 'requireChartData',
  from_calendar_id : currentCategoryId
});
