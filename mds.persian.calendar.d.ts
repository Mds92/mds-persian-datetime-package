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
        private getPersianDateTime();
        static now(): PersianDateTime;
        static today: () => PersianDateTime;
        /**
         * آیا اعداد در خروجی به صورت انگلیسی نمایش داده شوند؟
         */
        englishNumber: boolean;
        /**
         * سال
         */
        year: () => number;
        /**
         * سال دو رقمی
         */
        shortYear: () => number;
        /**
         * ماه
         */
        month: () => number;
        /**
         * روز ماه
         */
        day: () => number;
        /**
         * نام شمسی ماه
         */
        monthName: () => string;
        /**
         * روز هفته
         */
        dayOfWeek: () => PersianDayOfWeek;
        /**
         * نام روز هفته
         */
        dayOfWeekName: () => string;
        /**
         * شکل کوتاه شده نام روز هفته
         */
        getShortDayOfWeekName: () => string;
        /**
         * تعدا روز در ماه
         */
        getMonthDays: () => number;
        /**
         * ساعت 1 تا 24
         */
        hour: () => number;
        /**
         * ساعت 1 تا 12
         */
        shortHour: () => number;
        /**
         * دقیقه
         */
        minute: () => number;
        /**
         * ثانیه
         */
        second: () => number;
        /**
         * میلی ثانیه
         */
        millisecond: () => number;
        /**
         * آیا سال کبیسه است
         */
        isLeapYear: () => boolean;
        /**
         * بعد از ظهر یا قبل از ظهر
         */
        getPersianAmPmEnum: () => string;
        /**
         * شکل کوتاه شده قبل از ظهر یا بعد از ظهر
         */
        getShortPersianAmPmEnum: () => string;
        /**
        * @description زمان به فرمتی مشابه
        * 13:47:40:530
        **/
        timeOfDay: () => string;
        /**
         * @description  زمان به فرمتی مشابه زیر
         * ساعت 01:47:40:530 ب.ظ
        **/
        longTimeOfDay: () => string;
        /**
        * @description زمان به فرمتی مشابه زیر
        * 01:47:40 ب.ظ
        **/
        shortTimeOfDay: () => string;
        /**
        * @description تاریخ بدون احتساب زمان
        **/
        date(): PersianDateTime;
        /**
        * @description تبدیل تاریخ به رشته <br>
        * فرمت پیش فرض 1393/09/14   13:49:40 <br>
        * yyyy: سال چهار رقمی <br>
        * yy: سال دو رقمی <br>
        * MMMM: نام فارسی ماه <br>
        * MM: عدد دو رقمی ماه <br>
        * M: عدد یک رقمی ماه <br>
        * dddd: نام فارسی روز هفته <br>
        * dd: عدد دو رقمی روز ماه <br>
        * d: عدد یک رقمی روز ماه <br>
        * HH: ساعت دو رقمی با فرمت 00 تا 24 <br>
        * H: ساعت یک رقمی با فرمت 0 تا 24 <br>
        * hh: ساعت دو رقمی با فرمت 00 تا 12 <br>
        * h: ساعت یک رقمی با فرمت 0 تا 12 <br>
        * mm: عدد دو رقمی دقیقه <br>
        * m: عدد یک رقمی دقیقه <br>
        * ss: ثانیه دو رقمی <br>
        * s: ثانیه یک رقمی <br>
        * fff: میلی ثانیه 3 رقمی <br>
        * ff: میلی ثانیه 2 رقمی <br>
        * f: میلی ثانیه یک رقمی <br>
        * tt: ب.ظ یا ق.ظ <br>
        * t: حرف اول از ب.ظ یا ق.ظ
        **/
        toString: (format?: string) => string;
        /**
        * اضافه کردن سال به تاریخ
        */
        addYears(years: number): void;
        /**
         * اضافه کردن ماه به تاریخ
         */
        addMonths(months: number): void;
        /**
         * اضافه کردن روز به تاریخ
         */
        addDays(days: number): void;
        /**
         * اضافه کردن ساعت به تاریخ
         */
        addHours(hours: number): void;
        /**
         * اضافه کردن دقیقه به تاریخ
         */
        addMinutes(minutes: number): void;
        /**
         * اضافه کردن به ثانیه به تاریخ
         */
        addSeconds(seconds: number): void;
        /**
         * اضافه کردن به میلی ثانیه به تاریخ
         */
        addMilliSeconds(milliseconds: number): void;
        /**
         * اضافه کردن سال و ماه و روز به تاریخ
         */
        addDate(year: number, month: number, day: number): void;
        /**
         * بدست آوردن آبجکت استاندارد تاریخ و زمان
         */
        toDate(): Date;
        /**
         * اضافه کردن دو تاریخ به همدیگر
         */
        add(persianDateTime: PersianDateTime): void;
        /**
         * کم کردن دو تاریخ از همدیگر
         */
        subtract(persianDateTime: PersianDateTime): void;
        private zeroPad(nr, base);
        private toPersianNumber(input);
        private static toEnglishNumber(input);
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
        private static persianCalendar(persianYear);
        private static j2D(persianYear, persianMonth, persianDay);
        private static d2J(jdn);
        private static g2D(gregorianYear, gregorianMonth, gregorianDay);
        private static d2G(jdn);
        private static div(a, b);
        private static mod(a, b);
    }
    enum PersianDayOfWeek {
        Saturday = 6,
        Sunday = 0,
        Monday = 1,
        Tuesday = 2,
        Wednesday = 3,
        Thursday = 4,
        Friday = 5,
    }
    enum AmPmEnum {
        None = 0,
        AM = 1,
        PM = 2,
    }
}
