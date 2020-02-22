import moment from 'moment';

class DatesTimes {

	public static readableDate = (d: Date | string): string => moment(d).format('dddd Do of MMMM YYYY');

	public static hoursMinutes = (d: Date | string): string => moment(d).format('HH:mm a');

}

export default DatesTimes;
