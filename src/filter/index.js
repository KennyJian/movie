import { formatDate } from '@/common/utils';

const filters = {
  formatDate(time) {
    var date = new Date(Number(time) * 1000);
    return formatDate(date, 'yyyy-MM-dd');
  },
  formatDateTime(time) {
    var date = new Date(Number(time) * 1000);
    return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
  },
  formatDateStd(time) {
    var date = new Date(Number(time) * 1000);
    return formatDate(date, 'yyyy/MM/dd hh:mm:ss');
  },
  formatDateStdTime(time) {
    var date = new Date(Number(time) * 1000);
    return formatDate(date, 'yyyy/MM/dd');
  },
  formatDateTimeHm(time) {
    var date = new Date(Number(time) * 1000);
    return formatDate(date, 'yyyy-MM-dd hh:mm');
  },
  formatHm(time) {
    var date = new Date(Number(time) * 1000);
    return formatDate(date, 'hh:mm');
  },
  formatDataHm(time) {
    var date = new Date(Number(time) * 1000);
    return formatDate(date, "hh'mm''");
  },
};

export default filters;
