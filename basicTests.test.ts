/// <reference types="ts-jest" />

import { Mds } from "./mds.persian.datetime";

describe('getDifference', () => {
	it('1 Year difference should return 365 days and 0 hours', function() {
		var testObj = new Mds.PersianDateTime(new Date());
		let oneYearAgo = new Date();
		oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
		let res: Mds.PersianDateTimeSpan2 = testObj.getDifference(new Mds.PersianDateTime(oneYearAgo));
		expect(res.days).toBe(365);
		expect(res.hours).toBe(0);
	});

	it('2 Hours difference should return 0 days and 2 hours', function() {
		var testObj = new Mds.PersianDateTime(new Date());
		let twoHoursAgo = new Date();
		twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);
		let res: Mds.PersianDateTimeSpan2 = testObj.getDifference(new Mds.PersianDateTime(twoHoursAgo));
		expect(res.days).toBe(0);
		expect(res.hours).toBe(2);
	});

	it('1/7 - 1-6 Should Return 31 days and 0 hours', function() {
		var mehr = new Mds.PersianDateTime(new Date('9/23/2019'));
		let shahrivar = new Mds.PersianDateTime(new Date('8/23/2019'));

		let res: Mds.PersianDateTimeSpan2 = mehr.getDifference(shahrivar);
		//console.log(res);
		expect(res.days).toBe(31);
		expect(res.hours).toBe(0);
	});

	it('1/7 - 31-6 Should Return 1 days and 0 hours', function() {
		var mehr = Mds.PersianDateTime.fromPersianDate(1398, 7, 1);
		let shahrivar = Mds.PersianDateTime.fromPersianDate(1398, 6, 31);

		let res: Mds.PersianDateTimeSpan2 = mehr.getDifference(shahrivar);
		//console.log(res);
		expect(res.days).toBe(1);
		expect(res.hours).toBe(0);
	});

	it('1/1 - 1-12 Should Return 29 days and 0 hours', function() {
		var farvardin = new Mds.PersianDateTime(new Date('3/21/2019'));
		let esfand = new Mds.PersianDateTime(new Date('2/20/2019'));

		let res: Mds.PersianDateTimeSpan2 = farvardin.getDifference(esfand);
		//console.log(res);
		expect(res.days).toBe(29);
		expect(res.hours).toBe(0);
	});
});


describe('getLongNumber', () => {
	it('getLongNumber should return correct time', function() {
		var persianDateTime = Mds.PersianDateTime.fromPersianDateTime(1398, 2, 1, 22, 14, 30, 0)
		const persianDateTimeLongNumber = persianDateTime.getLongNumber();
		expect(persianDateTimeLongNumber).toBe(13980201221430);
	});
});
