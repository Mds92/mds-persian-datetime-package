export declare namespace Mds {
    class PersianDateTime {
        dateTime: Date;
        constructor(gregorianDateTime: Date);
        /**
         * بدست آوردن آبجکت از یه تاریخ مشخص شمسی
         * @param persianYear سال شمسی
         * @param persianMonth ماه شمسی
         * @param persianDay روز شمسی
         */
        static fromPersianDate(persianYear: number, persianMonth: number, persianDay: number): PersianDateTime;
        /**
         * بدست آوردن آبجکت از یه تاریخ مشخص شمسی
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
         * پارس کردن رشته و تبدیل آن به آبجکت
         * @param persianDateTimeInString متن مورد نظر برای پارس کردن
         * @param dateSeperatorPattern جدا کننده های اعداد ماه و سال که پیش فرض / می باشد
         */
        static parse(persianDateTimeInString: string, dateSeperatorPattern?: string): PersianDateTime;
        private getPersianDateTime;
        static readonly now: PersianDateTime;
        static readonly today: PersianDateTime;
        /**
         * بدست آوردن زمان سپری شده از زمان فعلی
         */
        static elapsedFromNow(persianDateTime: PersianDateTime): PersianDateTimeSpan1;
        /**
         * آیا اعداد در خروجی به صورت انگلیسی نمایش داده شوند؟
         */
        englishNumber: boolean;
        private englishNumberPrivate;
        /**
         * سال
         */
        readonly year: number;
        /**
         * سال دو رقمی
         */
        readonly shortYear: number;
        /**
         * ماه
         */
        readonly month: number;
        /**
         * روز ماه
         */
        readonly day: number;
        /**
         * نام شمسی ماه
         */
        readonly monthName: string;
        /**
         * روز هفته شمسی
         */
        readonly dayOfWeek: PersianDayOfWeek;
        /**
         * روز هفته شمسی
         */
        readonly dayOfWeekGregorian: GregorianDayOfWeek;
        /**
         * روز شروع ماه
         */
        readonly startDayOfMonthDayOfWeek: PersianDayOfWeek;
        /**
         * روز پایان ماه
         */
        readonly endDayOfMonthDayOfWeek: PersianDayOfWeek;
        /**
         * نام روز هفته
         */
        readonly dayOfWeekName: string;
        /**
         * شکل کوتاه شده نام روز هفته
         */
        readonly getShortDayOfWeekName: string;
        /**
         * تعدا روز در ماه
         */
        readonly getMonthDays: number;
        /**
         * ساعت 1 تا 24
         */
        readonly hour: number;
        /**
         * ساعت 1 تا 12
         */
        readonly shortHour: number;
        /**
         * دقیقه
         */
        readonly minute: number;
        /**
         * ثانیه
         */
        readonly second: number;
        /**
         * میلی ثانیه
         */
        readonly millisecond: number;
        /**
         * آیا سال کبیسه است
         */
        readonly isLeapYear: boolean;
        /**
         * بعد از ظهر یا قبل از ظهر
         */
        readonly getPersianAmPmEnum: string;
        /**
         * شکل کوتاه شده قبل از ظهر یا بعد از ظهر
         */
        readonly getShortPersianAmPmEnum: string;
        /**
         * لیست نام ماه های تقویم فارسی
         */
        static readonly getPersianMonthNames: string[];
        /**
         * بدست آوردن ایندکس ماه ایرانی از روی نام ماه
         */
        static getPersianMonthIndex(persianMonthName: string): number;
        /**
         * لیست نام ها روزهای هفته در تقویم فارسی
         */
        static readonly getPersianWeekdayNames: string[];
        /**
         * لیست نام ها روزهای هفته خلاصه شده در تقویم فارسی
         */
        static readonly getPersianWeekdayNamesShort: string[];
        /**
         * بدست آوردن ایندکس نام روز ایرانی از روی نام روزها
         */
        static getPersianWeekdayIndex(persianWeekdayName: string): number;
        /**
         * لیست روزهای هفته در تقویم میلادی
         */
        static readonly getGregorianWeekdayNames: string[];
        /**
         * بدست آوردن ایندکس نام روز میلادی از روی نام روزها
         */
        static getGregorianWeekdayIndex(gregorianWeekdayName: string): number;
        /**
         * لیست نام ماه های تقویم میلادی
         */
        static readonly getGregorianMonthNames: string[];
        /**
        * بدست آوردن ایندکس نام ماه میلادی از روی نام ماه ها
        */
        static getGregorianMonthNameIndex(gregorianMonthName: string): number;
        /**
         * آیا تاریخ وارد شده معتبر می باشد یا نه
         */
        static isValid(persianDateTime: string, dateSeperatorPattern?: string): boolean;
        /**
         * آیا آبجکت ورودی از نوع MdsPersianDateTime هست
         * @param obj
         */
        static isPersianDateTimeInstance(obj: any): boolean;
        /**
        * @description زمان به فرمتی مشابه
        * 13:47:40:530
        **/
        readonly timeOfDay: string;
        /**
         * @description  زمان به فرمتی مشابه زیر
         * ساعت 01:47:40:530 ب.ظ
        **/
        readonly longTimeOfDay: string;
        /**
        * @description زمان به فرمتی مشابه زیر
        * 01:47:40 ب.ظ
        **/
        readonly shortTimeOfDay: string;
        /**
         * @description تاریخ بدون احتساب زمان
        **/
        readonly date: PersianDateTime;
        /**
         * @description برای بررسی اینکه آیا آبجکت اینستنس این آبجکت هست یا نه استفاده می شود
         */
        readonly isMdsPersianDateTimInstance: boolean;
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
         * بدست آوردن تاریخ در فرمت
         * iso 8601
         * YYYY-MM-DDTHH:mm:ss.sssZ
         */
        toIsoString(): string;
        /**
        * اضافه کردن سال به تاریخ
        */
        addYears(years: number): PersianDateTime;
        /**
         * اضافه کردن ماه به تاریخ
         */
        addMonths(months: number): PersianDateTime;
        /**
         * اضافه کردن روز به تاریخ
         */
        addDays(days: number): PersianDateTime;
        /**
         * اضافه کردن ساعت به تاریخ
         */
        addHours(hours: number): PersianDateTime;
        /**
         * اضافه کردن دقیقه به تاریخ
         */
        addMinutes(minutes: number): PersianDateTime;
        /**
         * اضافه کردن به ثانیه به تاریخ
         */
        addSeconds(seconds: number): PersianDateTime;
        /**
         * اضافه کردن به میلی ثانیه به تاریخ
         */
        addMilliSeconds(milliseconds: number): PersianDateTime;
        /**
         * کم کردن دو تاریخ از همدیگر
         */
        subtract(persianDateTime: PersianDateTime): PersianDateTime;
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
        setPersianYear(persianYear: number): PersianDateTime;
        setPersianMonth(persianMonth: number): PersianDateTime;
        setPersianDay(persianDay: number): PersianDateTime;
        setHour(hour: number): PersianDateTime;
        setMinute(minute: number): PersianDateTime;
        setSecond(second: number): PersianDateTime;
        setMillisecond(millisecond: number): PersianDateTime;
        setPersianDate(year: number, month: number, day: number): PersianDateTime;
        setTime(hour: number, minute: number, second: number, millisecond: number): PersianDateTime;
        /**
         * گرفتن تاریخ به شکل عدد تا دقت روز
         */
        getShortNumber(): number;
        /**
         * دریافت تاریخ به شکل عدد تا دقت ثانیه
         */
        getLongNumber(): number;
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
        static toGregorian(persinYear: number, persianMonth: number, persianDay: number): {
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
