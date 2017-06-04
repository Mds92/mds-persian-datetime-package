# MdsPersianCalendarTypeScript
### Persian calendar library in TypeScript for using in TypeScript projects like angular

### Install
Use npm to install:
```cmd
npm install mds.persian.calendar
```
Then import `Mds` namespace it in your project
```typescript
import { Mds } from 'mds-persian-calendar'
import PersianDateTime = Mds.PersianDateTime;
```
## Using
-----------------------------
### Define new object
You can define new `PersianDateTime` object with following ways:
1. Constructor and with date object
 ```typescript
let pc = new PersianDateTime(new Date());
```
2. FromPersianDate
 ```typescript
let pc = PersianDateTime.fromPersianDate(1396, 03, 14)
```
3. FromPersianDateTime
 ```typescript
let pc = PersianDateTime.fromPersianDateTime(1396, 03, 14, 23, 12, 22, 10)
```
4. Parse

 You can parse diffrent date string 
 ```typescript
let pc1 = PersianDateTime.parse('14 خرداد 1396')
let pc2 = PersianDateTime.parse('1396-03-16')
let pc3 = PersianDateTime.parse('1396-03-16  22:12:30')
let pc4 = PersianDateTime.parse('14 خرداد 1396 ساعت 22:10')
let pc5 = PersianDateTime.parse('1396/01/03')
let pc6 = PersianDateTime.parse('یکشنبه 14 خرداد 1396')
```
5.Now property

 you can get current datetime with `now` property
 ```typescript
let pc = PersianDateTime.now
```

6.Today property

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
 * @description convert datetime to string
 * فرمت پیش فرض 1393/09/14   13:49:40 
 * yyyy: سال چهار رقمی 
 * yy: سال دو رقمی 
 * MMMM: نام فارسی ماه 
 * MM: عدد دو رقمی ماه 
 * M: عدد یک رقمی ماه 
 * dddd: نام فارسی روز هفته 
 * dd: عدد دو رقمی روز ماه 
 * d: عدد یک رقمی روز ماه 
 * HH: ساعت دو رقمی با فرمت 00 تا 24 
 * H: ساعت یک رقمی با فرمت 0 تا 24 
 * hh: ساعت دو رقمی با فرمت 00 تا 12 
 * h: ساعت یک رقمی با فرمت 0 تا 12 
 * mm: عدد دو رقمی دقیقه 
 * m: عدد یک رقمی دقیقه 
 * ss: ثانیه دو رقمی 
 * s: ثانیه یک رقمی 
 * fff: میلی ثانیه 3 رقمی 
 * ff: میلی ثانیه 2 رقمی 
 * f: میلی ثانیه یک رقمی 
 * tt: ب.ظ یا ق.ظ 
 * t: حرف اول از ب.ظ یا ق.ظ 
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


