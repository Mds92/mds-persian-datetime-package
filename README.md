# mds.persian.datetime

[![npm version](https://img.shields.io/npm/v/mds.persian.datetime.svg)](https://www.npmjs.com/package/mds.persian.datetime)
[![npm downloads](https://img.shields.io/npm/dm/mds.persian.datetime.svg)](https://www.npmjs.com/package/mds.persian.datetime)
[![license](https://img.shields.io/npm/l/mds.persian.datetime.svg)](https://github.com/Mds92/mds-persian-datetime-package/blob/master/LICENSE)

A dependency-free Persian (Jalali/Shamsi) date-time library for TypeScript and JavaScript projects (Angular, React, Node, etc.), with no external calendar dependency — the Gregorian ⇄ Jalali conversion is implemented directly in the package.

## Table of contents

- [Install](#install)
- [Import](#import)
- [Creating a `PersianDateTime`](#creating-a-persiandatetime)
- [Properties](#properties)
- [Formatting: `toString`](#formatting-tostring)
- [Adding to a date](#adding-to-a-date)
- [Setting parts of a date](#setting-parts-of-a-date)
- [Comparing & measuring](#comparing--measuring)
- [Numeric representations](#numeric-representations)
- [Static helpers](#static-helpers)
- [Interfaces](#interfaces)
- [DateTimePicker](#datetimepicker)
- [Development](#development)

---

## Install

Use npm to install:

```
npm install mds.persian.datetime@latest --save
```

Then import the `Mds` namespace in your project:

```typescript
import { Mds } from "mds.persian.datetime";
import PersianDateTime = Mds.PersianDateTime;
```

---

## Creating a `PersianDateTime`

- Constructor, from a native `Date` (or an ISO/date string)

```typescript
let pc = new PersianDateTime(new Date());
let pc2 = new PersianDateTime("2021-10-14");
```

- `fromPersianDate` — from a Jalali year/month/day (time defaults to 00:00:00)

```typescript
let pc = PersianDateTime.fromPersianDate(1396, 3, 14);
```

- `fromPersianDateTime` — from a full Jalali date and time

```typescript
let pc = PersianDateTime.fromPersianDateTime(1396, 3, 14, 23, 12, 22, 10);
```

- `parse` — parse a variety of Persian date/time string formats

```typescript
let pc1 = PersianDateTime.parse("14 خرداد 1396");
let pc2 = PersianDateTime.parse("1396-03-16");
let pc3 = PersianDateTime.parse("1396-03-16  22:12:30");
let pc4 = PersianDateTime.parse("14 خرداد 1396 ساعت 22:10");
let pc5 = PersianDateTime.parse("1396/01/03");
let pc6 = PersianDateTime.parse("یکشنبه 14 خرداد 1396");
```

- `now` — current date and time

```typescript
let pc = PersianDateTime.now;
```

- `today` — current date, time reset to 00:00:00

```typescript
let pc = PersianDateTime.today;
```

- `clone` — a copy of an existing instance

```typescript
let copy = pc.clone();
```

---

## Properties

| Property | Type | Description |
|---|---|---|
| `englishNumber` | `boolean` | Read/write. Whether output strings use English or Persian digits (defaults to `true`). |
| `year` | `number` | Jalali year. |
| `shortYear` | `number` | Jalali year, two digits (e.g. `1403` → `3`). |
| `month` | `number` | Jalali month, `1`–`12`. |
| `monthName` | `string` | Jalali month name — فروردین، اردیبهشت، ... |
| `day` | `number` | Day of the Jalali month. |
| `dayOfWeek` | `PersianDayOfWeek` | Day of the week using the Persian week (Saturday = `0`). |
| `dayOfWeekGregorian` | `GregorianDayOfWeek` | Day of the week using the Gregorian week (Sunday = `0`). |
| `dayOfWeekName` | `string` | Persian day name — شنبه، یکشنبه، ... |
| `getShortDayOfWeekName` | `string` | First character of `dayOfWeekName` — ش، ی، د، ... |
| `startDayOfMonthDayOfWeek` | `PersianDayOfWeek` | Day of week the current month starts on. |
| `endDayOfMonthDayOfWeek` | `PersianDayOfWeek` | Day of week the current month ends on. |
| `getMonthDays` | `number` | Number of days in the current Jalali month. |
| `getDateOfFirstDayOfMonth` | `PersianDateTime` | Date of the 1st day of the current month. |
| `getDateOfLastDayOfMonth` | `PersianDateTime` | Date of the last day of the current month. |
| `getDateOfFirstDayOfYear` | `PersianDateTime` | Date of the 1st day of the current year (1 Farvardin). |
| `getDateOfLastDayOfYear` | `PersianDateTime` | Date of the last day of the current year. |
| `hour` | `number` | Hour, `0`–`24`. |
| `shortHour` | `number` | Hour, `0`–`12`. |
| `minute` | `number` | Minute. |
| `second` | `number` | Second. |
| `millisecond` | `number` | Millisecond. |
| `isLeapYear` | `boolean` | Whether the Jalali year is a leap year (کبیسه). |
| `getPersianAmPmEnum` | `string` | `قبل از ظهر` or `بعد از ظهر`. |
| `getShortPersianAmPmEnum` | `string` | `ق.ظ` or `ب.ظ`. |
| `timeOfDay` | `string` | Time formatted like `13 : 47 : 40 : 530`. |
| `longTimeOfDay` | `string` | Time formatted like `ساعت 01 : 47 : 40 : 530 ب.ظ`. |
| `shortTimeOfDay` | `string` | Time formatted like `01 : 47 : 40 ب.ظ`. |
| `date` | `PersianDateTime` | A new instance with the time reset to `00:00:00`. |
| `isMdsPersianDateTimeInstance` | `boolean` | Always `true`; used internally by `isPersianDateTimeInstance`. |

### Static properties

| Property | Type | Description |
|---|---|---|
| `getPersianMonthNames` | `string[]` | All Jalali month names. |
| `getPersianWeekdayNames` | `string[]` | All Jalali weekday names. |
| `getPersianWeekdayNamesShort` | `string[]` | All Jalali weekday names, single character each. |
| `getGregorianWeekdayNames` | `string[]` | All Gregorian weekday names (English). |
| `getGregorianMonthNames` | `string[]` | All Gregorian month names (English). |

---

## Formatting: `toString`

```typescript
toString(format: string = ''): string
```

Calling `toString()` with no arguments returns the default format `1393/09/14   13:49:40`. Pass a custom format string using the tokens below:

| Token | Meaning |
|---|---|
| `yyyy` | Year, 4 digits |
| `yy` | Year, 2 digits |
| `MMMM` | Persian month name |
| `MM` | Month, 2 digits |
| `M` | Month |
| `dddd` | Persian weekday name |
| `dd` | Day of month, 2 digits |
| `d` | Day of month |
| `HH` | Hour, 2 digits, 0–24 |
| `H` | Hour, 0–24 |
| `hh` | Hour, 2 digits, 0–12 |
| `h` | Hour, 0–12 |
| `mm` | Minute, 2 digits |
| `m` | Minute |
| `ss` | Second, 2 digits |
| `s` | Second |
| `fff` | Millisecond, 3 digits |
| `ff` | Millisecond, 2 digits |
| `f` | Millisecond |
| `tt` | `ب.ظ` or `ق.ظ` |
| `t` | First character of `tt` |

```typescript
PersianDateTime.now.toString('yyyy/MM/dd dddd HH:mm'); // => 1403/05/28 یکشنبه 14:32
```

`toIsoString(): string` returns the underlying date as an ISO 8601 string (`YYYY-MM-DDTHH:mm:ss.sssZ`).

---

## Adding to a date

Each method returns a **new** `PersianDateTime` instance and does not mutate the original.

```typescript
addYears(years: number): PersianDateTime
addMonths(months: number): PersianDateTime
addDays(days: number): PersianDateTime
addHours(hours: number): PersianDateTime
addMinutes(minutes: number): PersianDateTime
addSeconds(seconds: number): PersianDateTime
addMilliSeconds(milliseconds: number): PersianDateTime
```

---

## Setting parts of a date

Each method returns a **new** `PersianDateTime` instance and does not mutate the original.

```typescript
setPersianYear(persianYear: number): PersianDateTime
setPersianMonth(persianMonth: number): PersianDateTime
setPersianDay(persianDay: number): PersianDateTime
setPersianDate(year: number, month: number, day: number): PersianDateTime
setHour(hour: number): PersianDateTime
setMinute(minute: number): PersianDateTime
setSecond(second: number): PersianDateTime
setMillisecond(millisecond: number): PersianDateTime
setTime(hour: number, minute: number, second: number, millisecond?: number): PersianDateTime
```

---

## Comparing & measuring

```typescript
// Difference between this instance and another, as days/hours/minutes/seconds
getDifference(persianDateTime: PersianDateTime): Mds.PersianDateTimeSpan2

// Elapsed time between now and the given instance
static elapsedFromNow(persianDateTime: PersianDateTime): Mds.PersianDateTimeSpan1

// [start, end] of the week (Saturday..Friday) containing this date
getStartEndDayOfWeek(): [PersianDateTime, PersianDateTime]

// All dates in a Jalali year that fall on the given weekday(s), e.g. every Friday
static getDatesInYearByPersianDayOfWeek(year: number, daysOfWeek: Mds.PersianDayOfWeek[]): PersianDateTime[]
```

```typescript
const fridays = PersianDateTime.getDatesInYearByPersianDayOfWeek(1403, [Mds.PersianDayOfWeek.Friday]);
```

---

## Numeric representations

```typescript
getShortNumber(): number // year-month-day as a number, e.g. 13970624
getLongNumber(): number  // year-month-day-hour-minute-second as a number, e.g. 13970624031526
getTimeNumber(second?: boolean): number // hour-minute(-second) as a number, e.g. 1012 or 101213
```

```typescript
toDate(): Date       // a cloned, standard JS Date object
getTime(): number     // ms since epoch, same as Date.getTime()
getTimeUTC(): number  // ms since epoch, based on UTC (ignores local timezone offset)
```

---

## Static helpers

```typescript
// Validate a date/time string without throwing
static isValid(persianDateTime: string, dateSeparatorPattern?: string): boolean

// Type guards
static isPersianDateTimeInstance(obj: any): boolean // true if obj is a Mds.PersianDateTime
static isDateTimeInstance(obj: any): boolean        // true if obj is a native Date

// Index lookups
static getPersianMonthIndex(persianMonthName: string): number
static getPersianWeekdayIndex(persianWeekdayName: string): number
static getGregorianWeekdayIndex(gregorianWeekdayName: string): number
static getGregorianMonthNameIndex(gregorianMonthName: string): number
```

```typescript
PersianDateTime.isValid('1400/12/30'); // => false (1400 is not a leap year)
PersianDateTime.isValid('1400/12/29'); // => true
```

---

## Interfaces

```typescript
interface PersianDateTimeSpan1 {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

interface PersianDateTimeSpan2 {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

enum PersianDayOfWeek { Saturday = 0, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday }

enum GregorianDayOfWeek { Sunday = 0, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday }
```

---

## DateTimePicker

If you need a DateTimePicker for your apps, I recommend the following:
https://github.com/Mds92/MD.BootstrapPersianDateTimePicker

![Mds Angular Persian and Gregorian DateTimePicker](https://raw.githubusercontent.com/Mds92/MD.BootstrapPersianDateTimePicker/master-bs5/images/MdPersianDateTimePicker.jpg)

---

## Development

```
npm install    # install dependencies
npm run build  # build ESM + CJS output into dist/
npm run lint   # run eslint
npm test       # run the jest test suite
```
