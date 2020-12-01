/// <reference types="ts-jest" />

import { Mds } from "./mds.persian.datetime";

describe('convertToPersianDate', () => {
  it('1363-01-01 without time 1', function () {
    let persianDate1 = Mds.PersianDateTime.fromPersianDate(1363, 1, 1);
    let date1 = new Date(1984, 2, 21);
    console.log(date1);
    expect(persianDate1.getTime()).toBe(date1.getTime());
  });

  it('1363-01-01 without time 2', function () {
    let persianDate1 = Mds.PersianDateTime.fromPersianDate(1363, 1, 1);
    let persianDate2 = new Mds.PersianDateTime(new Date(1984, 2, 21));
    expect(persianDate1.getTime()).toBe(persianDate2.getTime());
  });
});

describe('getDifference', () => {
  it('1 Year difference should return 365 days and 0 hours', function () {
    var testObj = Mds.PersianDateTime.fromPersianDate(1398, 1, 1);
    let oneYearAgo = Mds.PersianDateTime.fromPersianDate(1397, 1, 1);
    let res: Mds.PersianDateTimeSpan2 = testObj.getDifference(oneYearAgo);
    expect(res.days).toBe(365);
    expect(res.hours).toBe(0);
  });

  it('1/7 - 1-6 Should Return 31 days and 0 hours', function () {
    var mehr = new Mds.PersianDateTime(new Date('9/23/2019'));
    let shahrivar = new Mds.PersianDateTime(new Date('8/23/2019'));
    let res: Mds.PersianDateTimeSpan2 = mehr.getDifference(shahrivar);
    expect(res.days).toBe(31);
    expect(res.hours).toBe(0);
  });

  it('1/7 - 31-6 Should Return 1 days and 0 hours', function () {
    var mehr = Mds.PersianDateTime.fromPersianDate(1398, 7, 1);
    let shahrivar = Mds.PersianDateTime.fromPersianDate(1398, 6, 31);
    let res: Mds.PersianDateTimeSpan2 = mehr.getDifference(shahrivar);
    expect(res.days).toBe(1);
    expect(res.hours).toBe(0);
  });

  it('1/1 - 1-12 Should Return 29 days and 0 hours', function () {
    var farvardin = new Mds.PersianDateTime(new Date('3/21/2019'));
    let esfand = new Mds.PersianDateTime(new Date('2/20/2019'));
    let res: Mds.PersianDateTimeSpan2 = farvardin.getDifference(esfand);
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
