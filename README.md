# Persian DateTime In TypeScript
### Persian datetime library in TypeScript for using in TypeScript projects like angular

### Install
Use npm to install:
```
npm install mds.persian.datetime@latest --save
```
Then import `Mds` namespace it in your project
```typescript
import { Mds } from 'mds.persian.datetime'
import PersianDateTime = Mds.PersianDateTime;
```

-----------------------------
### Define new object
You can define new `PersianDateTime` object with following ways:
* Constructor and with date object
 ```typescript
let pc = new PersianDateTime(new Date());
```
* FromPersianDate
 ```typescript
let pc = PersianDateTime.fromPersianDate(1396, 03, 14)
```
* FromPersianDateTime
 ```typescript
let pc = PersianDateTime.fromPersianDateTime(1396, 03, 14, 23, 12, 22, 10)
```
* Parse

 You can parse diffrent date string 
 ```typescript
let pc1 = PersianDateTime.parse('14 خرداد 1396')
let pc2 = PersianDateTime.parse('1396-03-16')
let pc3 = PersianDateTime.parse('1396-03-16  22:12:30')
let pc4 = PersianDateTime.parse('14 خرداد 1396 ساعت 22:10')
let pc5 = PersianDateTime.parse('1396/01/03')
let pc6 = PersianDateTime.parse('یکشنبه 14 خرداد 1396')
```
* Now property

 you can get current datetime with `now` property
 ```typescript
let pc = PersianDateTime.now
```

* Today property

 you can get current date without time with `today` property
 ```typescript
let pc = PersianDateTime.today
```
-----------------------------------
### Properties
```typescript
englishNumber: boolean // English number or persian number in output of object
year: number // Year of selected date
shortYear: number // year with two digit
month: number // month number in year, start from 1
monthName: string // month name => فروردین، اردیبهشت، ...
dayOfWeek: string // day name in week, PersianDayOfWeek enum
startDayOfMonthDayOfWeek: string // start day of week in month
endDayOfMonthDayOfWeek: string // end day of week in month
dayOfWeekName: string // name of day in week, شنبه، بکشنبه، ....
getShortDayOfWeekName: string // first character of dayOfWeekName ش، ی ، د، ...
getMonthDays: number // days number in month
hour: number // hour from 1 to 24
shortHour: number // hour from 1 to 12
minute: number
second: number
millisecond: number
isLeapYear: boolean // is year leap آیا سال کبیسه است
getPersianAmPmEnum: string // show قبل از ظهر or بعد از ظهر
getShortPersianAmPmEnum: string // short ق.ظ or ب.ظ
static getPersianMonthNames: string[] // list of all persian months فروردین، اردیبهشت، ...
static getPersianMonthIndex: number // get index of persian month with persian month name
static getPersianWeekdayNames: string[]  // list of all persian week day names
static getGregorianWeekdayNames: string[] // get list of all gregorian week day names
timeOfDay: string // get time like 13:47:40:530
longTimeOfDay: string // get time like ساعت 01:47:40:530 ب.ظ
shortTimeOfDay: string // get time like 01:47:40 ب.ظ
date: PersianDateTime // get new object of date without time
```
-----------------------------------
### Methods
```typescript
static getPersianMonthIndex(persianMonthName: string): number // Get persian index of input month name
static getPersianWeekdayIndex(persianWeekdayName: string): number // Get persian index of input week day name
static getGregorianWeekdayIndex(gregorianWeekdayName: string): number // Get gregorian index of input week day name
static getGregorianMonthNameIndex(gregorianMonthName: string): number // Get gregorian index of input month name
```
```typescript
/**
 * convert datetime to string
 * فرمت پیش فرض 1393/09/14   13:49:40 
 * yyyy: year with four digit
 * yy: year with two digit
 * MMMM: persian month name
 * MM: month number with two digit
 * M: month number
 * dddd: persian week day name
 * dd: month day number with two digit
 * d: month day number
 * HH: hour with two digit from 0 to 24
 * H: hour from 0 to 24
 * hh: hour with two digit from 0 to 12
 * h: hour from 0 to 12
 * mm: minute with two digit
 * m: minute
 * ss: second with two digit
 * s: second 
 * fff: millisecond with three digit
 * ff: millisecond with two digit
 * f: millisecond
 * tt: ب.ظ or ق.ظ 
 * t: first character of ب.ظ or ق.ظ
 **/
toString(format: string = ''): string
```
```typescript
addYears(years: number): PersianDateTime // add years to datetime object
addMonths(years: number): PersianDateTime // add months to datetime object
addDays(days: number): PersianDateTime // add days to datetime object
addHours(hours: number): PersianDateTime // add hours to datetime object
addMinutes(minutes: number): PersianDateTime // add minutes to datetime object
addSeconds(seconds: number): PersianDateTime // add seconds to datetime object
addMilliSeconds(milliseconds: number): PersianDateTime // add milliseconds to datetime object
```
```typescript
// get date object
toDate(): Date
```
```typescript
setPersianYear(persianYear: number): PersianDateTime // set persian year
setPersianMonth(persianMonth: number): PersianDateTime // set persian month
setPersianDay(persianDay: number): PersianDateTime // set persian day
setHour(hour: number): PersianDateTime // set hour
setMinute(minute: number): PersianDateTime // set minute
setSecond(second: number): PersianDateTime // set second
setMillisecond(millisecond: number): PersianDateTime // set millisecond
setPersianDate(year: number, month: number, day: number): PersianDateTime // set persian date
setTime(hour: number, minute: number, second: number, millisecond: number): PersianDateTime // set time
```
-----------------------------------
### DateTimePicker

If you need a DateTimePicker for your apps, I recommned the following:

https://github.com/Mds92/mds-angular-datetime-picker-package

![Mds Angular Persian and Gregorian DateTimePicker](https://raw.githubusercontent.com/Mds92/Mds92.github.io/master/MdsDateTimePickerSample/images/Angular-Persian-Date-Time-Picker-1.jpg)
![Mds Angular Persian and Gregorian DateTimePicker](https://raw.githubusercontent.com/Mds92/Mds92.github.io/master/MdsDateTimePickerSample/images/Angular-Persian-Date-Time-Picker-2.jpg)

