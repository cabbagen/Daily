
// 取消通知
export const removeNotification = () => ({
  type : 'removeNotification'
});

// 拉取本月日程任务数据
export const requireMonthData = (timestamp) => ({
  type : 'requireMonthData',
  timestamp : timestamp
});

// 拉取当日日程任务数据
export const requireDayData = (timestamp) => ({
  type : 'requireDayData',
  timestamp : timestamp
});

// 请求图表数据
export const requireChartData = () => ({
  type : 'requireChartData'
});
