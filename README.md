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
longTimeOfDay: string get time like ساعت 01:47:40:530 ب.ظ
```
