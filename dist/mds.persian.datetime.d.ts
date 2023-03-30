export declare namespace Mds {
    class PersianDateTime {
        dateTime: Date;
        constructor(gregorianDateTime: Date | string);
        static fromPersianDate(persianYear: number, persianMonth: number, persianDay: number): PersianDateTime;
        static fromPersianDateTime(persianYear: number, persianMonth: number, persianDay: number, hour: number, minute: number, second: number, millisecond: number): PersianDateTime;
        static parse(persianDateTimeInString: string, dateSeparatorPattern?: string): PersianDateTime;
        private getPersianDateTime;
        static get now(): PersianDateTime;
        static get today(): PersianDateTime;
        static elapsedFromNow(persianDateTime: PersianDateTime): PersianDateTimeSpan1;
        get englishNumber(): boolean;
        set englishNumber(value: boolean);
        private englishNumberPrivate;
        get year(): number;
        get shortYear(): number;
        get month(): number;
        get day(): number;
        get monthName(): string;
        get dayOfWeek(): PersianDayOfWeek;
        get dayOfWeekGregorian(): GregorianDayOfWeek;
        get startDayOfMonthDayOfWeek(): PersianDayOfWeek;
        get endDayOfMonthDayOfWeek(): PersianDayOfWeek;
        get dayOfWeekName(): string;
        get getShortDayOfWeekName(): string;
        get getMonthDays(): number;
        get getDateOfFirstDayOfMonth(): PersianDateTime;
        get getDateOfLastDayOfMonth(): PersianDateTime;
        get getDateOfFirstDayOfYear(): PersianDateTime;
        get getDateOfLastDayOfYear(): PersianDateTime;
        get hour(): number;
        get shortHour(): number;
        get minute(): number;
        get second(): number;
        get millisecond(): number;
        get isLeapYear(): boolean;
        get getPersianAmPmEnum(): string;
        get getShortPersianAmPmEnum(): string;
        static get getPersianMonthNames(): string[];
        static getPersianMonthIndex(persianMonthName: string): number;
        static get getPersianWeekdayNames(): string[];
        static get getPersianWeekdayNamesShort(): string[];
        static getPersianWeekdayIndex(persianWeekdayName: string): number;
        static get getGregorianWeekdayNames(): string[];
        static getGregorianWeekdayIndex(gregorianWeekdayName: string): number;
        static get getGregorianMonthNames(): string[];
        static getGregorianMonthNameIndex(gregorianMonthName: string): number;
        static isValid(persianDateTime: string, dateSeparatorPattern?: string): boolean;
        static isPersianDateTimeInstance(obj: any): boolean;
        get timeOfDay(): string;
        get longTimeOfDay(): string;
        get shortTimeOfDay(): string;
        get date(): PersianDateTime;
        get isMdsPersianDateTimeInstance(): boolean;
        getShortNumber(): number;
        getLongNumber(): number;
        toString(format?: string): string;
        toIsoString(): string;
        addYears(years: number): PersianDateTime;
        addMonths(months: number): PersianDateTime;
        addDays(days: number): PersianDateTime;
        addHours(hours: number): PersianDateTime;
        addMinutes(minutes: number): PersianDateTime;
        addSeconds(seconds: number): PersianDateTime;
        addMilliSeconds(milliseconds: number): PersianDateTime;
        clone(): PersianDateTime;
        private cloneDateTime;
        toDate(): Date;
        getTime(): number;
        getTimeUTC(): number;
        static getDatesInYearByPersianDayOfWeek(year: number, daysOfWeek: PersianDayOfWeek[]): PersianDateTime[];
        getDifference(persianDateTime: PersianDateTime): PersianDateTimeSpan2;
        static getStartEndDayOfWeek(date: Date | PersianDateTime): [PersianDateTime, PersianDateTime];
        setPersianYear(persianYear: number): PersianDateTime;
        setPersianMonth(persianMonth: number): PersianDateTime;
        setPersianDay(persianDay: number): PersianDateTime;
        setHour(hour: number): PersianDateTime;
        setMinute(minute: number): PersianDateTime;
        setSecond(second: number): PersianDateTime;
        setMillisecond(millisecond: number): PersianDateTime;
        setPersianDate(year: number, month: number, day: number): PersianDateTime;
        setTime(hour: number, minute: number, second: number, millisecond: number): PersianDateTime;
        private isDST;
        private zeroPad;
        private toPersianNumber;
        private toEnglishNumber;
        private static toEnglishNumber;
    }
    enum PersianDayOfWeek {
        Saturday = 0,
        Sunday = 1,
        Monday = 2,
        Tuesday = 3,
        Wednesday = 4,
        Thursday = 5,
        Friday = 6
    }
    enum GregorianDayOfWeek {
        Saturday = 6,
        Sunday = 0,
        Monday = 1,
        Tuesday = 2,
        Wednesday = 3,
        Thursday = 4,
        Friday = 5
    }
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
}
