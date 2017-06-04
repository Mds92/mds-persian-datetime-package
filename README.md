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
### Using
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
 ...you can parse diffrent date string 
 ```typescript
let pc1 = PersianDateTime.parse('14 خرداد 1396')
let pc2 = PersianDateTime.parse('1396-03-16')
let pc3 = PersianDateTime.parse('1396-03-16  22:12:30')
let pc4 = PersianDateTime.parse('14 خرداد 1396 ساعت 22:10')
let pc5 = PersianDateTime.parse('1396/01/03')
```
5.Now
 ...you can get current datetime with now property
 ```typescript
let pc = PersianDateTime.now
```

6.Today
 ...you can get current date without time with today property
 ```typescript
let pc = PersianDateTime.today
```
