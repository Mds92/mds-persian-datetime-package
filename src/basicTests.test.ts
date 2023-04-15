/// <reference types="ts-jest" />

import { Mds } from "./mds.persian.datetime";


describe('convertToPersianDate', () => {
  it('1363-01-01 without time 1', function () {
    const persianDate1 = Mds.PersianDateTime.fromPersianDate(1363, 1, 1);
    const date1 = new Date(1984, 2, 21);
    expect(persianDate1.getTime()).toBe(date1.getTime());
  });

  it('1363-01-01 without time 2', function () {
    const persianDate1 = Mds.PersianDateTime.fromPersianDate(1363, 1, 1);
    const persianDate2 = new Mds.PersianDateTime(new Date(1984, 2, 21));
    expect(persianDate1.getTime()).toBe(persianDate2.getTime());
  });
});

describe('getDifference', () => {
  it('1 Year difference should return 365 days and 0 hours', function () {
    var testObj = Mds.PersianDateTime.fromPersianDate(1398, 1, 1);
    const oneYearAgo = Mds.PersianDateTime.fromPersianDate(1397, 1, 1);
    const res: Mds.PersianDateTimeSpan2 = testObj.getDifference(oneYearAgo);
    expect(res.days).toBe(365);
    expect(res.hours).toBe(0);
  });

  it('1/7 - 1-6 Should Return 31 days and 0 hours', function () {
    var mehr = new Mds.PersianDateTime(new Date('9/23/2019'));
    const shahrivar = new Mds.PersianDateTime(new Date('8/23/2019'));
    const res: Mds.PersianDateTimeSpan2 = mehr.getDifference(shahrivar);
    expect(res.days).toBe(31);
    expect(res.hours).toBe(0);
  });

  it('1/7 - 31-6 Should Return 1 days and 0 hours', function () {
    var mehr = Mds.PersianDateTime.fromPersianDate(1398, 7, 1);
    const shahrivar = Mds.PersianDateTime.fromPersianDate(1398, 6, 31);
    const res: Mds.PersianDateTimeSpan2 = mehr.getDifference(shahrivar);
    expect(res.days).toBe(1);
    expect(res.hours).toBe(0);
  });

  it('1/1 - 1-12 Should Return 29 days and 0 hours', function () {
    var farvardin = new Mds.PersianDateTime(new Date('3/21/2019'));
    const esfand = new Mds.PersianDateTime(new Date('2/20/2019'));
    const res: Mds.PersianDateTimeSpan2 = farvardin.getDifference(esfand);
    expect(res.days).toBe(29);
    expect(res.hours).toBe(0);
  });
});

describe('getLongNumber', () => {
  it('getLongNumber should return correct time', function () {
    var persianDateTime = Mds.PersianDateTime.fromPersianDateTime(1398, 2, 1, 22, 14, 30, 0)
    expect(persianDateTime.getLongNumber()).toBe(13980201221430);
  });
});

describe('getDatesInYearByPersianDayOfWeek', () => {
  var persianDateTimes = Mds.PersianDateTime.getDatesInYearByPersianDayOfWeek(1400, [Mds.PersianDayOfWeek.Friday]);
  it('1- getDatesInYearByPersianDayOfWeek should return correct dates', function () {
    persianDateTimes.forEach(pdt => {
      expect(pdt.dayOfWeek).toBe(Mds.PersianDayOfWeek.Friday);
    });
    expect(persianDateTimes[0].getShortNumber()).toBe(14000106);
    expect(persianDateTimes[persianDateTimes.length - 1].getShortNumber()).toBe(14001227);
  });
  it('2- getDatesInYearByPersianDayOfWeek dates should be without time', function () {
    persianDateTimes.forEach(pdt => {
      expect(pdt.toString('HH:mm:ss')).toBe('00:00:00');
    });
  });
});

describe('toDate', () => {
  it('toDate should return correct and cloned value', function () {
    var date1 = new Date('2021/10/14');
    var persianDateTime1 = new Mds.PersianDateTime(date1);
    var date2 = persianDateTime1.toDate();
    expect(date1.getTime()).toBe(date2.getTime()); // بکی بودن مقادیر
    date1 = new Date(date1.setHours(1, 0, 0, 0));
    expect(date1.getTime()).not.toBe(date2.getTime());
  });
});

describe('fromPersianDate', () => {
  it('fromPersianDate should return hour 00:00:00', function () {
    var persianDateTime1 = Mds.PersianDateTime.fromPersianDate(1400, 7, 21);
    expect(persianDateTime1.hour).toBe(0);
    expect(persianDateTime1.minute).toBe(0);
    expect(persianDateTime1.second).toBe(0);
    expect(persianDateTime1.millisecond).toBe(0);
  });
});

describe('addDays', () => {
  it('addDays should add just one day', function () {
    var persianDateTime1 = Mds.PersianDateTime.fromPersianDate(1400, 7, 21);
    persianDateTime1 = persianDateTime1.addDays(1);
    var dateTime = new Date('10/14/2021');
    expect(dateTime.getTime()).toBe(persianDateTime1.getTime());
  });
});

describe('isValid', () => {
  it('isValid should be correct', function () {
    expect(Mds.PersianDateTime.isValid('1400/12/31')).toBe(false);
    expect(Mds.PersianDateTime.isValid('1400/12/30')).toBe(false);
    expect(Mds.PersianDateTime.isValid('1400/12/29')).toBe(true);
    expect(Mds.PersianDateTime.isValid('1400/06/32')).toBe(false);
    expect(Mds.PersianDateTime.isValid('1400/07/31')).toBe(false);
    expect(Mds.PersianDateTime.isValid('1401/11/31')).toBe(false);
  });
});

describe('getStartEndDayOfWeek', () => {
  it('getStartEndDayOfWeek should be correct, test with 1402/01/05 - 1402/01/11', function () {
    const startWeekDate = Mds.PersianDateTime.fromPersianDate(1402, 1, 5);
    const endWeekDate = Mds.PersianDateTime.fromPersianDate(1402, 1, 11);
    const startEndDateOfCurrentWeek = startWeekDate.getStartEndDayOfWeek();
    expect(startEndDateOfCurrentWeek[0].getTime()).toBe(startWeekDate.getTime());
    expect(startEndDateOfCurrentWeek[1].getTime()).toBe(endWeekDate.getTime());
  });
  it('getStartEndDayOfWeek should be correct, test with 1402/01/12 - 1402/01/18', function () {
    const startWeekDate = Mds.PersianDateTime.fromPersianDate(1402, 1, 12);
    const endWeekDate = Mds.PersianDateTime.fromPersianDate(1402, 1, 18);
    const startEndDateOfCurrentWeek = endWeekDate.getStartEndDayOfWeek();
    expect(startEndDateOfCurrentWeek[0].getTime()).toBe(startWeekDate.getTime());
    expect(startEndDateOfCurrentWeek[1].getTime()).toBe(endWeekDate.getTime());
  });
  it('getStartEndDayOfWeek between two years should be correct, test with 1401/12/27 - 1402/01/04', function () {
    const startWeekDate = Mds.PersianDateTime.fromPersianDate(1401, 12, 27);
    const endWeekDate = Mds.PersianDateTime.fromPersianDate(1402, 1, 4);
    const startEndDateOfCurrentWeek = startWeekDate.getStartEndDayOfWeek();
    expect(startEndDateOfCurrentWeek[0].getTime()).toBe(startWeekDate.getTime());
    expect(startEndDateOfCurrentWeek[1].getTime()).toBe(endWeekDate.getTime());
  });
});

describe('isPersianDateTimeInstance', () => {
  it('isPersianDateTimeInstance should be correct', function () {
    const persianDateTime = Mds.PersianDateTime.fromPersianDate(1402, 1, 26);
    expect(Mds.PersianDateTime.isPersianDateTimeInstance(new Date())).toBe(false);
    expect(Mds.PersianDateTime.isPersianDateTimeInstance(persianDateTime)).toBe(true);
  });
});

describe('isDateTimeInstance', () => {
  it('isDateTimeInstance should be correct, test with new Date()', function () {
    expect(Mds.PersianDateTime.isDateTimeInstance(new Date())).toBe(true);
    expect(Mds.PersianDateTime.isDateTimeInstance(new Date("2023-04-15"))).toBe(true);
  });
  it('isDateTimeInstance should be correct, test with toDate of PersianDateTime', function () {
    const dateTime1 = Mds.PersianDateTime.fromPersianDate(1402, 1, 12).toDate();
    const dateTime2 = Mds.PersianDateTime.fromPersianDate(1402, 1, 12).date.toDate();
    expect(Mds.PersianDateTime.isDateTimeInstance(dateTime1)).toBe(true);
    expect(Mds.PersianDateTime.isDateTimeInstance(dateTime2)).toBe(true);
  });
  it('isDateTimeInstance should not be correct, test with PersianDateTime', function () {
    const persianDateTime = Mds.PersianDateTime.fromPersianDate(1402, 1, 12);
    expect(Mds.PersianDateTime.isDateTimeInstance(persianDateTime)).toBe(false);
  });
});



