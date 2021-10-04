export declare namespace Mds {
    class PersianDateTime {
        dateTime: Date;
        constructor(gregorianDateTime: Date | string);
        /**
         * @description بدست آوردن آبجکت از یه تاریخ مشخص شمسی
         * @param persianYear سال شمسی
         * @param persianMonth ماه شمسی
         * @param persianDay روز شمسی
         */
        static fromPersianDate(persianYear: number, persianMonth: number, persianDay: number): PersianDateTime;
        /**
         * @description بدست آوردن آبجکت از یه تاریخ مشخص شمسی
         * @param persianYear سال شمسی
         * @param persianMonth ماه شمسی
         * @param persianDay روز شمسی
         * @param hour ساعت
         * @param minute دقیقه
         * @param second ثانیه
         * @param millisecond میلی ثانیه
         */
        static fromPersianDateTime(persianYear: number, persianMonth: number, persianDay: number, hour: number, minute: number, second: number, millisecond: number): PersianDateTime;
        /**
         * @description پارس کردن رشته و تبدیل آن به آبجکت
         * @param persianDateTimeInString متن مورد نظر برای پارس کردن
         * @param dateSeparatorPattern جدا کننده های اعداد ماه و سال که پیش فرض / می باشد
         */
        static parse(persianDateTimeInString: string, dateSeparatorPattern?: string): PersianDateTime;
        private getPersianDateTime;
        /**
         * @description تاریخ الان به همراه ساعت
         */
        static get now(): PersianDateTime;
        /**
         * @description تاریخ الان بدون ساعت
         */
        static get today(): PersianDateTime;
        /**
         * @description بدست آوردن زمان سپری شده از زمان فعلی
         */
        static elapsedFromNow(persianDateTime: PersianDateTime): PersianDateTimeSpan1;
        /**
         * @description آیا اعداد در خروجی به صورت انگلیسی نمایش داده شوند؟
         */
        get englishNumber(): boolean;
        set englishNumber(value: boolean);
        private englishNumberPrivate;
        /**
         * @description سال
         */
        get year(): number;
        /**
         * @description سال دو رقمی
         */
        get shortYear(): number;
        /**
         * @description ماه
         */
        get month(): number;
        /**
         * @description روز ماه
         */
        get day(): number;
        /**
         * @description نام شمسی ماه
         */
        get monthName(): string;
        /**
         * @description روز هفته شمسی
         */
        get dayOfWeek(): PersianDayOfWeek;
        /**
         * @description روز هفته میلادی
         */
        get dayOfWeekGregorian(): GregorianDayOfWeek;
        /**
         * @description روز شروع ماه
         */
        get startDayOfMonthDayOfWeek(): PersianDayOfWeek;
        /**
         * @description روز پایان ماه
         */
        get endDayOfMonthDayOfWeek(): PersianDayOfWeek;
        /**
         * @description نام روز هفته
         */
        get dayOfWeekName(): string;
        /**
         * @description شکل کوتاه شده نام روز هفته
         */
        get getShortDayOfWeekName(): string;
        /**
         * @description تعداد روز در ماه
         */
        get getMonthDays(): number;
        /**
        * @description تاریخ اولین روز ماه
        */
        get getDateOfFirstDayOfMonth(): PersianDateTime;
        /**
         * @description تاریخ آخرین روز ماه
         */
        get getDateOfLastDayOfMonth(): PersianDateTime;
        /**
         * @description تاریخ اولین روز سال
         */
        get getDateOfFirstDayOfYear(): PersianDateTime;
        /**
         * @description تاریخ آخرین روز سال
         */
        get getDateOfLastDayOfYear(): PersianDateTime;
        /**
         * @description ساعت 1 تا 24
         */
        get hour(): number;
        /**
         * @description ساعت 1 تا 12
         */
        get shortHour(): number;
        /**
         * @description دقیقه
         */
        get minute(): number;
        /**
         * @description ثانیه
         */
        get second(): number;
        /**
         * @description میلی ثانیه
         */
        get millisecond(): number;
        /**
         *@description  آیا سال کبیسه است
         */
        get isLeapYear(): boolean;
        /**
         * @description بعد از ظهر یا قبل از ظهر
         */
        get getPersianAmPmEnum(): string;
        /**
         * @description شکل کوتاه شده قبل از ظهر یا بعد از ظهر
         */
        get getShortPersianAmPmEnum(): string;
        /**
         * @description لیست نام ماه های تقویم فارسی
         */
        static get getPersianMonthNames(): string[];
        /**
         * @description بدست آوردن ایندکس ماه ایرانی از روی نام ماه
         */
        static getPersianMonthIndex(persianMonthName: string): number;
        /**
         * @description لیست نام ها روزهای هفته در تقویم فارسی
         */
        static get getPersianWeekdayNames(): string[];
        /**
         * @description لیست نام ها روزهای هفته خلاصه شده در تقویم فارسی
         */
        static get getPersianWeekdayNamesShort(): string[];
        /**
         * @description بدست آوردن ایندکس نام روز ایرانی از روی نام روزها
         */
        static getPersianWeekdayIndex(persianWeekdayName: string): number;
        /**
         * @description لیست روزهای هفته در تقویم میلادی
         */
        static get getGregorianWeekdayNames(): string[];
        /**
         * @description بدست آوردن ایندکس نام روز میلادی از روی نام روزها
         */
        static getGregorianWeekdayIndex(gregorianWeekdayName: string): number;
        /**
         * @description لیست نام ماه های تقویم میلادی
         */
        static get getGregorianMonthNames(): string[];
        /**
        * @description بدست آوردن ایندکس نام ماه میلادی از روی نام ماه ها
        */
        static getGregorianMonthNameIndex(gregorianMonthName: string): number;
        /**
         * @description آیا تاریخ وارد شده معتبر می باشد یا نه
         */
        static isValid(persianDateTime: string, dateSeparatorPattern?: string): boolean;
        /**
         * @description آیا آبجکت ورودی از نوع MdsPersianDateTime هست
         * @param obj
         */
        static isPersianDateTimeInstance(obj: any): boolean;
        /**
        * @description زمان به فرمتی مشابه
        * 13:47:40:530
        **/
        get timeOfDay(): string;
        /**
         * @description  زمان به فرمتی مشابه زیر
         * ساعت 01:47:40:530 ب.ظ
        **/
        get longTimeOfDay(): string;
        /**
        * @description زمان به فرمتی مشابه زیر
        * 01:47:40 ب.ظ
        **/
        get shortTimeOfDay(): string;
        /**
         * @description تاریخ بدون احتساب زمان
        **/
        get date(): PersianDateTime;
        /**
         * @description برای بررسی اینکه آیا آبجکت اینستنس این آبجکت هست یا نه استفاده می شود
         */
        get isMdsPersianDateTimeInstance(): boolean;
        /**
         * @description گرفتن تاریخ به شکل عدد تا دقت روز
         */
        getShortNumber(): number;
        /**
         * @description دریافت تاریخ به شکل عدد تا دقت ثانیه
         */
        getLongNumber(): number;
        /**
        * @description تبدیل تاریخ به رشته
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
        toString(format?: string): string;
        /**
         * @description بدست آوردن تاریخ در فرمت
         * iso 8601
         * YYYY-MM-DDTHH:mm:ss.sssZ
         */
        toIsoString(): string;
        /**
        * @description اضافه کردن سال به تاریخ
        */
        addYears(years: number): PersianDateTime;
        /**
         * @description اضافه کردن ماه به تاریخ
         */
        addMonths(months: number): PersianDateTime;
        /**
         * @description اضافه کردن روز به تاریخ
         */
        addDays(days: number): PersianDateTime;
        /**
         * @description اضافه کردن ساعت به تاریخ
         */
        addHours(hours: number): PersianDateTime;
        /**
         * @description اضافه کردن دقیقه به تاریخ
         */
        addMinutes(minutes: number): PersianDateTime;
        /**
         * @description اضافه کردن به ثانیه به تاریخ
         */
        addSeconds(seconds: number): PersianDateTime;
        /**
         * @description اضافه کردن به میلی ثانیه به تاریخ
         */
        addMilliSeconds(milliseconds: number): PersianDateTime;
        /**
         * @description گرفتن کپی از آبجکت
         */
        clone(): PersianDateTime;
        private cloneDateTime;
        /**
         * @description بدست آوردن آبجکت استاندارد تاریخ و زمان
         */
        toDate(): Date;
        /**
         * @description بدست آوردن تعداد میلی ثانیه سپری شده از تاریخ 1 ژانویه 1970
         * معادل getTime آبجکت استاندارد تاریخ
         */
        getTime(): number;
        /**
         * @description بدست آوردن تعداد میلی ثانیه سپری شده از تاریخ 1 ژانویه 1970
         * معادل getTime آبجکت استاندارد تاریخ بر مبنای خط گرینویچ
         * - یعنی بدون در نظر گرفتن +3.5 یا + یا ...4.5 وقت محلی
         */
        getTimeUTC(): number;
        /**
         *  @description بدست آوردن اختلاف با تاریخ ورودی
         */
        getDifference(persianDateTime: PersianDateTime): PersianDateTimeSpan2;
        /**
         * @description تغییر سال
         * @param persianYear سال شمسی جدید
         * @returns تاریخ جدید
         */
        setPersianYear(persianYear: number): PersianDateTime;
        /**
         * @description تغییر ماه
         * @param persianMonth ماه شمسی جدید
         * @returns تاریخ جدید
         */
        setPersianMonth(persianMonth: number): PersianDateTime;
        /**
         * @description تغییر روز
         * @param persianDay روز شمسی جدید
         * @returns تاریخ جدید
         */
        setPersianDay(persianDay: number): PersianDateTime;
        /**
         * @description تغییر ساعت
         * @param hour ساعت جدید
         * @returns تاریخ جدید
         */
        setHour(hour: number): PersianDateTime;
        /**
         * @description تغییر دقیقه
         * @param minute دقیقه جدید
         * @returns تاریخ جدید
         */
        setMinute(minute: number): PersianDateTime;
        /**
         * @description تغییر ثانیه
         */
        setSecond(second: number): PersianDateTime;
        /**
         * @description تغییر میلی ثانیه
         * @param millisecond میلی ثانیه جدید
         * @returns تاریخ جدید
         */
        setMillisecond(millisecond: number): PersianDateTime;
        /**
         * @description تغییر تاریخ
         * @param year  سال شمسی
         * @param month ماه شمسی
         * @param day روز شمسی
         * @returns تاریخ جدید
         */
        setPersianDate(year: number, month: number, day: number): PersianDateTime;
        /**
         * @description تغییر ساعت
         * @param hour ساعت
         * @param minute دقیقه
         * @param second ثانیه
         * @param millisecond میلی ثانیه
         * @returns تاریخ جدید
         */
        setTime(hour: number, minute: number, second: number, millisecond: number): PersianDateTime;
        private isDST;
        private zeroPad;
        private toPersianNumber;
        private toEnglishNumber;
        private static toEnglishNumber;
    }
    class PersianDateConverter {
        static toPersian(gregorianYear: number, gregorianMonth: number, gregorianDay: number): {
            year: number;
            month: number;
            day: number;
        };
        static toGregorian(persianYear: number, persianMonth: number, persianDay: number): {
            year: number;
            month: number;
            day: number;
        };
        static isValidPersianDate(persianYear: number, persianMonth: number, persianDay: number): boolean;
        static isLeapPersianYear(persianYear: number): boolean;
        static getDaysInPersianMonth(persianYear: any, persianMonth: any): number;
        static getDaysInPersianYear(persianYear: any): number;
        private static persianCalendar;
        private static j2D;
        private static d2J;
        private static g2D;
        private static d2G;
        private static div;
        private static mod;
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
    enum PersianDateTimeMonthEnum {
        فروردین = 1,
        اردیبهشت = 2,
        خرداد = 3,
        تیر = 4,
        مرداد = 5,
        شهریور = 6,
        مهر = 7,
        آبان = 8,
        آذر = 9,
        دی = 10,
        بهمن = 11,
        اسفند = 12
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
