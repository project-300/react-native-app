import moment, { Duration, Moment } from 'moment';

class DatesTimes {

	public static readableDate = (d: Date | string): string => moment(d).format('dddd Do of MMMM YYYY');

	public static readableDateNoYear = (d: Date | string): string => moment(d).format('dddd Do of MMMM');

	public static hoursMinutes = (d: Date | string): string => moment(d).format('HH:mm a');

	public static dayAndTime = (d: string): string => {
		const date: Moment = moment(d);
		const duration: Duration = moment.duration(moment(date).diff(moment()));

		if (duration.asDays() > 6) return date.format('dddd MMMM Do YYYY, h:mm A');
		return moment(d).calendar();
	}

	public static minutesSince = (date: string): number => {
		return Math.floor(moment.duration(moment().diff(moment(date))).asMinutes());
	}
}

export default DatesTimes;
