import moment from 'moment';

class DatesTimes {

	public static readableDate = (d: Date | string): string => moment(d).format('MMMM Do YYYY');

	public static hoursMinutes = (d: Date | string): string => moment(d).format('HH:mm');

}

export default DatesTimes;