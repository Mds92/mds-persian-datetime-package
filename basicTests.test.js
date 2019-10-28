"use strict";
/// <reference types="ts-jest" />
Object.defineProperty(exports, "__esModule", { value: true });
var mds_persian_datetime_1 = require("./mds.persian.datetime");
describe('getDifference', function () {
    it('1 Year difference should return 365 days and 0 hours', function () {
        var testObj = new mds_persian_datetime_1.Mds.PersianDateTime(new Date());
        var oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        var res = testObj.getDifference(new mds_persian_datetime_1.Mds.PersianDateTime(oneYearAgo));
        expect(res.days).toBe(365);
        expect(res.hours).toBe(0);
    });
    it('2 Hours difference should return 0 days and 2 hours', function () {
        var testObj = new mds_persian_datetime_1.Mds.PersianDateTime(new Date());
        var twoHoursAgo = new Date();
        twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);
        var res = testObj.getDifference(new mds_persian_datetime_1.Mds.PersianDateTime(twoHoursAgo));
        expect(res.days).toBe(0);
        expect(res.hours).toBe(2);
    });
    it('1/7 - 1-6 Should Return 31 days and 0 hours', function () {
        var mehr = new mds_persian_datetime_1.Mds.PersianDateTime(new Date('9/23/2019'));
        var shahrivar = new mds_persian_datetime_1.Mds.PersianDateTime(new Date('8/23/2019'));
        var res = mehr.getDifference(shahrivar);
        //console.log(res);
        expect(res.days).toBe(31);
        expect(res.hours).toBe(0);
    });
    it('1/7 - 31-6 Should Return 1 days and 0 hours', function () {
        var mehr = mds_persian_datetime_1.Mds.PersianDateTime.fromPersianDate(1398, 7, 1);
        var shahrivar = mds_persian_datetime_1.Mds.PersianDateTime.fromPersianDate(1398, 6, 31);
        var res = mehr.getDifference(shahrivar);
        //console.log(res);
        expect(res.days).toBe(1);
        expect(res.hours).toBe(0);
    });
    it('1/1 - 1-12 Should Return 29 days and 0 hours', function () {
        var farvardin = new mds_persian_datetime_1.Mds.PersianDateTime(new Date('3/21/2019'));
        var esfand = new mds_persian_datetime_1.Mds.PersianDateTime(new Date('2/20/2019'));
        var res = farvardin.getDifference(esfand);
        //console.log(res);
        expect(res.days).toBe(29);
        expect(res.hours).toBe(0);
    });
});
describe('getLongNumber', function () {
    it('getLongNumber should return correct time', function () {
        var persianDateTime = mds_persian_datetime_1.Mds.PersianDateTime.fromPersianDateTime(1398, 2, 1, 22, 14, 30, 0);
        var persianDateTimeLongNumber = persianDateTime.getLongNumber();
        expect(persianDateTimeLongNumber).toBe(13980201221430);
    });
});
//# sourceMappingURL=basicTests.test.js.map