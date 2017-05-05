﻿export namespace Mds {

    export class PersianDateTime {

        dateTime: Date = null;

        public constructor(gregorianDateTime: Date) {
            this.dateTime = gregorianDateTime;
        }

        /**
         * بدست آوردن آبجکت از یه تاریخ مشخص شمسی
         * @param persianYear سال شمسی
         * @param persianMonth ماه شمسی
         * @param persianDay روز شمسی
         */
        static fromPersianDate(persianYear: number, persianMonth: number, persianDay: number) {
            const persianDate = PersianDateConverter.toGregorian(persianYear, persianMonth, persianDay);
            return new PersianDateTime(new Date(persianDate.year, persianDate.month, persianDate.day, 0, 0, 0, 0));
        }

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
        static fromPersianDateTime(persianYear: number, persianMonth: number, persianDay: number, hour: number, minute: number, second: number, millisecond: number) {
            const persianDate = PersianDateConverter.toGregorian(persianYear, persianMonth, persianDay);
            return new PersianDateTime(new Date(persianDate.year, persianDate.month, persianDate.day, hour, minute, second, millisecond));
        }

        /**
         * پارس کردن رشته و تبدیل آن به آبجکت
         * @param persianDateTimeInString متن مورد نظر برای پارس کردن
         * @param dateSeperatorPattern جدا کننده های اعداد ماه و سال که پیش فرض / می باشد
         */
        static parse(persianDateTimeInString: string, dateSeperatorPattern: string = '\/|-') {
            persianDateTimeInString = this.toEnglishNumber(persianDateTimeInString);
            let month = '',
                year = '0',
                day = '0',
                hour = '0',
                minute = '0',
                second = '0',
                miliSecond = '0',
                amPm = AmPmEnum.None,
                dateSeperatorPatternRegExp = new RegExp(dateSeperatorPattern, 'img'),
                containMonthSeperator = dateSeperatorPatternRegExp.test(persianDateTimeInString);

            persianDateTimeInString = persianDateTimeInString.replace(/&nbsp;/img, ' ').replace(/\s+/img, '-').replace(/\\/img, '-');
            persianDateTimeInString = persianDateTimeInString.replace(dateSeperatorPatternRegExp, '-');
            persianDateTimeInString = persianDateTimeInString.replace(/ك/img, 'ک').replace(/ي/img, 'ی');

            persianDateTimeInString = `-${persianDateTimeInString}-`;

            // بدست آوردن ب.ظ یا ق.ظ
            if (persianDateTimeInString.indexOf('ق.ظ') > -1)
                amPm = AmPmEnum.AM;
            else if (persianDateTimeInString.indexOf('ب.ظ') > -1)
                amPm = AmPmEnum.PM;

            if (persianDateTimeInString.indexOf(':') > -1) // رشته ورودی شامل ساعت نیز هست
            {
                try {
                    persianDateTimeInString = persianDateTimeInString.replace(/-*:-*/img, ':');
                    hour = persianDateTimeInString.match(/-\d{1,2}(?=:)/img)[0].replace(/\D+/img, '');
                    minute = persianDateTimeInString.match(/\d{1,2}:\d{1,2}(?=:?)/img)[0].match(/\d{1,2}$/img)[0];
                    if (persianDateTimeInString.indexOf(':') != persianDateTimeInString.lastIndexOf(':')) {
                        second = persianDateTimeInString.match(/-\d{1,2}:\d{1,2}:\d{1,2}(?=(\d{1,2})?)/img)[0].match(/:\d{1,2}$/img)[0].replace(/\D+/img, '');
                        const miliSecondMatch = persianDateTimeInString.match(/-\d{1,2}:\d{1,2}:\d{1,2}:\d{1,4}(?=(\d{1,2})?)/img);
                        if (miliSecondMatch == null) miliSecond = '0';
                        miliSecond = miliSecondMatch[0].match(/:\d{1,4}-/img)[0].replace(/\D+/img, '');
                    }
                } catch (e) {

                }
            }

            if (containMonthSeperator) {
                // بدست آوردن ماه
                month = persianDateTimeInString.match(/\d{2,4}-\d{1,2}(?=-\d{1,2}[^:])/img)[0].match(/-\d{1,2}/img)[0].replace(/\D+/img, '');

                // بدست آوردن روز
                day = persianDateTimeInString.match(/\d{2,4}-\d{1,2}-\d{1,2}(?=-)/img)[0].match(/\d+$/img)[0];

                // بدست آوردن سال
                year = persianDateTimeInString.match(/\d{2,4}(?=-\d{1,2}-\d{1,2})/img)[0].replace(/\D+/img, '');
            }
            else {
                const objValues = Object.keys(PersianDateTimeMonthEnum).map(k => PersianDateTimeMonthEnum[k]);
                const persianMonthNames = objValues.filter(v => typeof v === "string") as string[];
                for (let i = 0; i < persianMonthNames.length; i++) {
                    let monthName = persianMonthNames[i];
                    if (persianDateTimeInString.indexOf(monthName) <= -1) continue;
                    month = PersianDateTimeMonthEnum[monthName];
                    break;
                }
                if (month == '' || month == null)
                    throw new Error("عدد یا حرف ماه در رشته ورودی وجود ندارد");
                // بدست آوردن روز
                let dayMatch = persianDateTimeInString.match(/-\d{1,2}(?=-)/img);
                if (dayMatch != null) {
                    day = dayMatch[0].replace(/\D+/img, '');
                    persianDateTimeInString = persianDateTimeInString.replace(new RegExp(`-${day}(?=-)`, 'img'), '-');
                }
                else
                    throw new Error("عدد روز در رشته ورودی وجود ندارد");
                // بدست آوردن سال
                let yearMatch = persianDateTimeInString.match(/-\d{4}(?=-)/img);
                if (yearMatch != null)
                    year = yearMatch[0].replace(/\D+/img, '');
                else {
                    yearMatch = persianDateTimeInString.match(/-\d{2,4}(?=-)/img);
                    if (yearMatch != null)
                        year = yearMatch[0].replace(/\D+/img, '');
                    else
                        throw new Error("عدد سال در رشته ورودی وجود ندارد");
                }
            }

            let numericYear = Number(year);
            let numericMonth = Number(month);
            let numericDay = Number(day);
            let numericHour = Number(hour);
            let numericMinute = Number(minute);
            let numericSecond = Number(second);
            let numericMiliSecond = Number(miliSecond);

            if (numericYear < 100)
                numericYear += 1300;

            switch (amPm) {
                case AmPmEnum.PM:
                    if (numericHour < 12)
                        numericHour = numericHour + 12;
                    break;
                case AmPmEnum.AM:
                case AmPmEnum.None:
                    break;
            }

            return PersianDateTime.fromPersianDateTime(numericYear, numericMonth, numericDay, numericHour, numericMinute, numericSecond, numericMiliSecond);
        }

        private getPersianDateTime(): { year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number } {
            const persianDate = PersianDateConverter.toPersian(this.dateTime.getFullYear(), this.dateTime.getMonth() + 1, this.dateTime.getDate());
            return {
                year: persianDate.year,
                month: persianDate.month,
                day: persianDate.day,
                hour: this.dateTime.getHours(),
                minute: this.dateTime.getMinutes(),
                second: this.dateTime.getSeconds(),
                millisecond: this.dateTime.getMilliseconds()
            };
        }

        static get now(): PersianDateTime {
            return new PersianDateTime(new Date());
        };

        static get today(): PersianDateTime {
            const dateTime = new Date();
            const persianDate = PersianDateConverter.toPersian(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDay());
            return PersianDateTime.fromPersianDate(persianDate.year, persianDate.month, persianDate.day);
        };

        static elapsedFromNow(persianDateTime: PersianDateTime): PersianDateTime {
            return PersianDateTime.now.subtract(persianDateTime);
        };

        /**
         * آیا اعداد در خروجی به صورت انگلیسی نمایش داده شوند؟
         */
        get englishNumber(): boolean {
            return this.englishNumberPrivate;
        };
        set englishNumber(value: boolean) {
            this.englishNumberPrivate = value;
        };
        private englishNumberPrivate: boolean;

        /**
         * سال
         */
        get year(): number {
            return this.getPersianDateTime().year;
        }

        /**
         * سال دو رقمی
         */
        get shortYear(): number {
            return this.getPersianDateTime().year % 100;
        }

        /**
         * ماه
         */
        get month(): number {
            return this.getPersianDateTime().month;
        }

        /**
         * روز ماه
         */
        get day(): number {
            return this.getPersianDateTime().day;
        }

        /**
         * نام شمسی ماه
         */
        get monthName(): string {
            switch (this.month) {
                case 1:
                    return 'فروردین';
                case 2:
                    return 'اردیبهشت';
                case 3:
                    return 'خرداد';
                case 4:
                    return 'تیر';
                case 5:
                    return 'مرداد';
                case 6:
                    return 'شهریور';
                case 7:
                    return 'مهر';
                case 8:
                    return 'آبان';
                case 9:
                    return 'آذر';
                case 10:
                    return 'دی';
                case 11:
                    return 'بهمن';
                case 12:
                    return 'اسفند';
                default:
                    return '';
            }
        }

        /**
         * روز هفته
         */
        get dayOfWeek(): PersianDayOfWeek {
            return this.dateTime.getDay();
        }

        /**
         * نام روز هفته
         */
        get dayOfWeekName(): string {
            switch (this.dayOfWeek) {
                case PersianDayOfWeek.Saturday:
                    return 'شنبه';

                case PersianDayOfWeek.Sunday:
                    return 'یکشنبه';

                case PersianDayOfWeek.Monday:
                    return 'دوشنبه';

                case PersianDayOfWeek.Tuesday:
                    return 'سه شنبه';

                case PersianDayOfWeek.Wednesday:
                    return 'چهار شنبه';

                case PersianDayOfWeek.Thursday:
                    return 'پنج شنبه';

                case PersianDayOfWeek.Friday:
                    return 'جمعه';

                default:
                    return '';
            }
        }

        /**
         * شکل کوتاه شده نام روز هفته
         */
        get getShortDayOfWeekName(): string {
            return this.dayOfWeekName[0];
        }

        /**
         * تعدا روز در ماه
         */
        get getMonthDays(): number {
            return PersianDateConverter.getDaysInPersianMonth(this.dateTime.getFullYear(), this.dateTime.getMonth());
        }

        /**
         * ساعت 1 تا 24
         */
        get hour(): number {
            return this.getPersianDateTime().hour;
        }

        /**
         * ساعت 1 تا 12
         */
        get shortHour(): number {
            let shortHour = this.hour;
            if (shortHour > 12)
                shortHour = shortHour - 12;
            return shortHour;
        }

        /**
         * دقیقه
         */
        get minute(): number {
            return this.getPersianDateTime().minute;
        }

        /**
         * ثانیه
         */
        get second(): number {
            return this.getPersianDateTime().second;
        }

        /**
         * میلی ثانیه
         */
        get millisecond(): number {
            return this.getPersianDateTime().millisecond;
        }

        /**
         * آیا سال کبیسه است
         */
        get isLeapYear(): boolean {
            return PersianDateConverter.isLeapPersianYear(this.dateTime.getFullYear());
        }

        /**
         * بعد از ظهر یا قبل از ظهر
         */
        get getPersianAmPmEnum(): string {
            if (this.hour < 12)
                return 'قبل از ظهر';
            return 'بعد از ظهر';
        }

        /**
         * شکل کوتاه شده قبل از ظهر یا بعد از ظهر
         */
        get getShortPersianAmPmEnum(): string {
            if (this.hour < 12)
                return 'ق.ظ';
            return 'ب.ظ';
        }

        /**
         * لیست نام ماه های تقویم فارسی
         */
        get getPersianMonthNames(): string[] {
            return ["فروردین", "اردیبهشت", "خرداد",
                "تیر", "مرداد", "شهریور",
                "مهر", "آبان", "آذر",
                "دی", "بهمن", "اسفند"];
        }

        /**
         * لیست روزهای هفته در تقویم فارسی
         */
        get getPersianWeekdayNames(): string[] {
            return ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه"];
        }

        /**
         * لیست روزهای هفته در تقویم میلادی
         */
        get getGregorianWeekdayNames(): string[] {
            return ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        }

        /**
         * لیست نام ماه های تقویم میلادی
         */
        get getGregorianMonthNames(): string[] {
            return ["January", "February", "March",
                "April", "May", "June",
                "July", "August", "September",
                "October", "November", "December"];
        }

        /**
        * @description زمان به فرمتی مشابه 
        * 13:47:40:530
        **/
        get timeOfDay(): string {
            return `${this.zeroPad(this.hour, '00')} : ${this.zeroPad(this.minute, '00')} : ${this.zeroPad(this.second, '00')} : ${this.zeroPad(this.millisecond, '000')}`;
        };

        /**
         * @description  زمان به فرمتی مشابه زیر
         * ساعت 01:47:40:530 ب.ظ
        **/
        get longTimeOfDay(): string {
            return `ساعت ${this.zeroPad(this.hour, '00')} : ${this.zeroPad(this.minute, '00')} : ${this.zeroPad(this.second, '00')} : ${this.zeroPad(this.millisecond, '000')} ${this.getShortPersianAmPmEnum}`;
        };

        /**
        * @description زمان به فرمتی مشابه زیر
        * 01:47:40 ب.ظ
        **/
        get shortTimeOfDay(): string {
            return `${this.zeroPad(this.hour, '00')} : ${this.zeroPad(this.minute, '00')} : ${this.zeroPad(this.second, '00')} ${this.getShortPersianAmPmEnum}`;
        };

        /**
        * @description تاریخ بدون احتساب زمان
        **/
        get date(): PersianDateTime {
            return PersianDateTime.fromPersianDate(this.year, this.month, this.day);
        };

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
        toString(format: string = ''): string {
            if (format == '' || format == null)
                return `${this.zeroPad(this.year, '0000')}/${this.zeroPad(this.month, '00')}/${this.zeroPad(this.day, '00')}   ${this.zeroPad(this.hour, '00')}:${this.zeroPad(this.minute, '00')}:${this.zeroPad(this.second, '00')}`;
            var dateTimeString = format;
            dateTimeString = dateTimeString.replace(/yyyy/img, this.zeroPad(this.year, '0000'));
            dateTimeString = dateTimeString.replace(/yy/img, this.zeroPad(this.year, '00'));
            dateTimeString = dateTimeString.replace(/MMMM/img, this.monthName);
            dateTimeString = dateTimeString.replace(/MM/img, this.zeroPad(this.month, '00'));
            dateTimeString = dateTimeString.replace(/M/img, this.month.toString());
            dateTimeString = dateTimeString.replace(/dddd/img, this.dayOfWeekName);
            dateTimeString = dateTimeString.replace(/dd/img, this.zeroPad(this.day, '00'));
            dateTimeString = dateTimeString.replace(/d/img, this.day.toString());
            dateTimeString = dateTimeString.replace(/HH/img, this.zeroPad(this.hour, '00'));
            dateTimeString = dateTimeString.replace(/H/img, this.hour.toString());
            dateTimeString = dateTimeString.replace(/hh/img, this.zeroPad(this.shortHour, '00'));
            dateTimeString = dateTimeString.replace(/h/img, this.shortHour.toString());
            dateTimeString = dateTimeString.replace(/mm/img, this.zeroPad(this.minute, '00'));
            dateTimeString = dateTimeString.replace(/m/img, this.minute.toString());
            dateTimeString = dateTimeString.replace(/ss/img, this.zeroPad(this.second, '00'));
            dateTimeString = dateTimeString.replace(/s/img, this.second.toString());
            dateTimeString = dateTimeString.replace(/fff/img, this.zeroPad(this.millisecond, '000'));
            dateTimeString = dateTimeString.replace(/ff/img, this.zeroPad(this.millisecond / 10, '00'));
            dateTimeString = dateTimeString.replace(/f/img, (this.millisecond / 10).toString());
            dateTimeString = dateTimeString.replace(/tt/img, this.getPersianAmPmEnum);
            dateTimeString = dateTimeString.replace(/t/img, this.getPersianAmPmEnum[0]);
            if (!this.englishNumber)
                dateTimeString = this.toPersianNumber(dateTimeString);
            return dateTimeString;
        };

        /**
        * اضافه کردن سال به تاریخ
        */
        addYears(years: number): PersianDateTime {
            this.dateTime.setFullYear(this.dateTime.getFullYear() + years);
            return new PersianDateTime(this.dateTime);
        }

        /**
         * اضافه کردن ماه به تاریخ
         */
        addMonths(months: number): PersianDateTime {
            this.dateTime.setMonth(this.dateTime.getMonth() + months);
            return new PersianDateTime(this.dateTime);
        }

        /**
         * اضافه کردن روز به تاریخ
         */
        addDays(days: number): PersianDateTime {
            this.dateTime.setDate(this.dateTime.getDate() + days);
            return new PersianDateTime(this.dateTime);
        }

        /**
         * اضافه کردن ساعت به تاریخ
         */
        addHours(hours: number): PersianDateTime {
            this.dateTime.setHours(this.dateTime.getHours() + hours);
            return new PersianDateTime(this.dateTime);
        }

        /**
         * اضافه کردن دقیقه به تاریخ
         */
        addMinutes(minutes: number): PersianDateTime {
            this.dateTime.setHours(this.dateTime.getMinutes() + minutes);
            return new PersianDateTime(this.dateTime);
        }

        /**
         * اضافه کردن به ثانیه به تاریخ
         */
        addSeconds(seconds: number): PersianDateTime {
            this.dateTime.setSeconds(this.dateTime.getSeconds() + seconds);
            return new PersianDateTime(this.dateTime);
        }

        /**
         * اضافه کردن به میلی ثانیه به تاریخ
         */
        addMilliSeconds(milliseconds: number): PersianDateTime {
            this.dateTime.setMilliseconds(this.dateTime.getMilliseconds() + milliseconds);
            return new PersianDateTime(this.dateTime);
        }

        /**
         * اضافه کردن سال و ماه و روز به تاریخ
         */
        addDate(year: number, month: number, day: number): PersianDateTime {
            this.addYears(year);
            this.addMonths(month);
            this.addDays(day);
            return new PersianDateTime(this.dateTime);
        }

        /**
         * بدست آوردن آبجکت استاندارد تاریخ و زمان
         */
        toDate() {
            return this.dateTime;
        }

        /**
         * اضافه کردن دو تاریخ به همدیگر
         */
        add(persianDateTime: PersianDateTime): PersianDateTime {
            const datetime = persianDateTime.toDate();
            this.dateTime.setFullYear(this.dateTime.getFullYear() + datetime.getFullYear());
            this.dateTime.setMonth(this.dateTime.getMonth() + datetime.getMonth());
            this.dateTime.setDate(this.dateTime.getDate() + datetime.getDate());
            this.dateTime.setHours(this.dateTime.getHours() + datetime.getHours());
            this.dateTime.setMinutes(this.dateTime.getMinutes() + datetime.getMinutes());
            this.dateTime.setSeconds(this.dateTime.getSeconds() + datetime.getSeconds());
            this.dateTime.setMilliseconds(this.dateTime.getMilliseconds() + datetime.getMilliseconds());
            return new PersianDateTime(this.dateTime);
        }

        /**
         * کم کردن دو تاریخ از همدیگر
         */
        subtract(persianDateTime: PersianDateTime): PersianDateTime {
            const datetime = persianDateTime.toDate();
            this.dateTime.setFullYear(this.dateTime.getFullYear() - datetime.getFullYear());
            this.dateTime.setMonth(this.dateTime.getMonth() - datetime.getMonth());
            this.dateTime.setDate(this.dateTime.getDate() - datetime.getDate());
            this.dateTime.setHours(this.dateTime.getHours() - datetime.getHours());
            this.dateTime.setMinutes(this.dateTime.getMinutes() - datetime.getMinutes());
            this.dateTime.setSeconds(this.dateTime.getSeconds() - datetime.getSeconds());
            this.dateTime.setMilliseconds(this.dateTime.getMilliseconds() - datetime.getMilliseconds());
            return new PersianDateTime(this.dateTime);
        }

        private zeroPad(nr: any, base: string): string {
            if (nr == undefined || nr == '') return base;
            const len = (String(base).length - String(nr).length) + 1;
            return len > 0 ? new Array(len).join('0') + nr : nr;
        }

        private toPersianNumber(input: string): string {
            if (input == '' || input == null) return '';
            input = input.replace(/ي/img, 'ی').replace(/ك/img, 'ک');
            //۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹
            return input.replace(/0/img, '۰')
                .replace(/1/img, '۱')
                .replace(/2/img, '۲')
                .replace(/3/img, '۳')
                .replace(/4/img, '۴')
                .replace(/5/img, '۵')
                .replace(/6/img, '۶')
                .replace(/7/img, '۷')
                .replace(/8/img, '۸')
                .replace(/9/img, '۹');
        }

        private static toEnglishNumber(input: string): string {
            if (input == '' || input == null) return '';
            input = input.replace(/ي/img, 'ی').replace(/ك/img, 'ک');
            //۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹
            return input.replace(/,/img, '')
                .replace(/۰/img, '0')
                .replace(/۱/img, '1')
                .replace(/۲/img, '2')
                .replace(/۳/img, '3')
                .replace(/۴/img, '4')
                .replace(/۵/img, '5')
                .replace(/۶/img, '6')
                .replace(/۷/img, '7')
                .replace(/۸/img, '8')
                .replace(/۹/img, '9');
        }
    }

    export class PersianDateConverter {

        /*
         Converts a Gregorian date to Persian.
         */
        static toPersian(gregorianYear: number, gregorianMonth: number, gregorianDay: number): {
            year: number,
            month: number,
            day: number;
        } {
            return this.d2J(this.g2D(gregorianYear, gregorianMonth, gregorianDay));
        }

        /*
         Converts a Persian date to Gregorian.
         */
        static toGregorian(persinYear: number, persianMonth: number, persianDay: number): {
            year: number,
            month: number,
            day: number;
        } {
            return this.d2G(this.j2D(persinYear, persianMonth, persianDay));
        }

        /*
         Checks whether a Persian date is valid or not.
         */
        static isValidPersianDate(persianYear: number, persianMonth: number, persianDay: number): boolean {
            return persianYear >= -61 &&
                persianYear <= 3177 &&
                persianMonth >= 1 &&
                persianMonth <= 12 &&
                persianDay >= 1 &&
                persianDay <= this.getDaysInPersianMonth(persianYear, persianMonth);
        }

        /*
         Is this a leap year or not?
         */
        static isLeapPersianYear(persianYear: number): boolean {
            return this.persianCalendar(persianYear).leap == 0;
        }

        /*
         Number of days in a given month in a Persian year.
         */
        static getDaysInPersianMonth(persianYear, persianMonth): number {
            if (persianMonth <= 6) return 31;
            if (persianMonth <= 11) return 30;
            if (this.isLeapPersianYear(persianYear)) return 30;
            return 29;
        }

        /*
         This function determines if the Persian (Persian) year is
         leap (366-day long) or is the common year (365 days), and
         finds the day in march (Gregorian calendar) of the first
         day of the Persian year (persianYear).
     
         @param persianYear Persian calendar year (-61 to 3177)
         @return
         leap: number of years since the last leap year (0 to 4)
         gregorianYear: Gregorian year of the beginning of Persian year
         march: the march day of Farletdin the 1st (1st day of persianYear)
         @see: http://www.astro.uni.torun.pl/~kb/Papers/EMP/PersianC-EMP.htm
         @see: http://www.fourmilab.ch/documents/calendar/
         */
        private static persianCalendar(persianYear: number): { leap: number, gregorianYear: number, march: number } {
            // Persian years starting the 33-year rule.
            const breaks = [
                -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456,
                3178
            ];
            const bl = breaks.length;
            const gregorianYear = persianYear + 621;
            let leapJ = -14,
                jp = breaks[0],
                persianMonth: number,
                jump = 1,
                leap: number,
                n: number,
                i: number;

            if (persianYear < jp || persianYear >= breaks[bl - 1])
                throw new Error('Invalid Persian year ' + persianYear);

            // Find the limiting years for the Persian year persianYear.
            for (i = 1; i < bl; i += 1) {
                persianMonth = breaks[i];
                jump = persianMonth - jp;
                if (persianYear < persianMonth)
                    break;
                leapJ = leapJ + this.div(jump, 33) * 8 + this.div(this.mod(jump, 33), 4);
                jp = persianMonth;
            }
            n = persianYear - jp;

            // Find the number of leap years from AD 621 to the beginning
            // of the current Persian year in the Persian calendar.
            leapJ = leapJ + this.div(n, 33) * 8 + this.div(this.mod(n, 33) + 3, 4);
            if (this.mod(jump, 33) === 4 && jump - n === 4)
                leapJ += 1;

            // And the same in the Gregorian calendar (until the year gregorianYear).
            const leapG = this.div(gregorianYear, 4) - this.div((this.div(gregorianYear, 100) + 1) * 3, 4) - 150;

            // Determine the Gregorian date of Farletdin the 1st.
            const march = 20 + leapJ - leapG;

            // Find how many years have passed since the last leap year.
            if (jump - n < 6)
                n = n - jump + this.div(jump + 4, 33) * 33;
            leap = this.mod(this.mod(n + 1, 33) - 1, 4);
            if (leap === -1) leap = 4;

            return {
                leap: leap,
                gregorianYear: gregorianYear,
                march: march
            };
        }

        /*
         Converts a date of the Persian calendar to the Julian day number.
     
         @param persianYear Persian year (1 to 3100)
         @param persianMonth Persian month (1 to 12)
         @param persianDay Persian day (1 to 29/31)
         @return Julian day number
         */
        private static j2D(persianYear, persianMonth, persianDay): number {
            const r = this.persianCalendar(persianYear);
            return this.g2D(r.gregorianYear, 3, r.march) +
                (persianMonth - 1) * 31 -
                this.div(persianMonth, 7) * (persianMonth - 7) +
                persianDay -
                1;
        }

        /*
         Converts the Julian day number to a date in the Persian calendar.
     
         @param jdn Julian day number
         @return
         persianYear: Persian year (1 to 3100)
         persianMonth: Persian month (1 to 12)
         persianDay: Persian day (1 to 29/31)
         */
        private static d2J(jdn) {
            const gregorianYear = this.d2G(jdn).year;
            let // Calendarculate Gregorian year (gregorianYear).
                persianYear = gregorianYear - 621;
            const r = this.persianCalendar(persianYear);
            const jdn1F = this.g2D(gregorianYear, 3, r.march);
            let persianDay,
                persianMonth,
                k: number;

            // Find number of days that passed since 1 Farletdin.
            k = jdn - jdn1F;
            if (k >= 0) {
                if (k <= 185) {
                    // The first 6 months.
                    persianMonth = 1 + this.div(k, 31);
                    persianDay = this.mod(k, 31) + 1;
                    return {
                        year: persianYear,
                        month: persianMonth,
                        day: persianDay
                    };
                } else {
                    // The remaining months.
                    k -= 186;
                }
            } else {
                // Previous Persian year.
                persianYear -= 1;
                k += 179;
                if (r.leap === 1)
                    k += 1;
            }
            persianMonth = 7 + this.div(k, 30);
            persianDay = this.mod(k, 30) + 1;
            return {
                year: persianYear,
                month: persianMonth,
                day: persianDay
            };
        }

        /*
         Converts the Julian day number from Gregorian or Julian
         calendar dates. This integer number corresponds to the noon of
         the date (i.e. 12 hours of Universal Time).
         The procedure was tested to be good since 1 march, -100100 (of both
         calendars) up to a few million years into the future.
     
         @param gregorianYear Calendarendar year (years BC numbered 0, -1, -2, ...)
         @param gregorianMonth Calendarendar month (1 to 12)
         @param gregorianDay Calendarendar day of the month (1 to 28/29/30/31)
         @return Julian day number
         */
        private static g2D(gregorianYear, gregorianMonth, gregorianDay): number {
            let d = this.div((gregorianYear + this.div(gregorianMonth - 8, 6) + 100100) * 1461, 4) +
                this.div(153 * this.mod(gregorianMonth + 9, 12) + 2, 5) +
                gregorianDay -
                34840408;
            d = d - this.div(this.div(gregorianYear + 100100 + this.div(gregorianMonth - 8, 6), 100) * 3, 4) + 752;
            return d;
        }

        /*
         Converts Gregorian and Julian calendar dates from the Julian day number
         (jdn) for the period since jdn=-34839655 (i.e. the year -100100 of both
         calendars) to some millions years ahead of the present.
     
         @param jdn Julian day number
         @return
         gregorianYear: Calendarendar year (years BC numbered 0, -1, -2, ...)
         gregorianMonth: Calendarendar month (1 to 12)
         gregorianDay: Calendarendar day of the month M (1 to 28/29/30/31)
         */
        private static d2G(jdn) {
            let j: number;
            j = 4 * jdn + 139361631;
            j = j + this.div(this.div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
            const i = this.div(this.mod(j, 1461), 4) * 5 + 308;;
            const gregorianDay = this.div(this.mod(i, 153), 5) + 1;
            const gregorianMonth = this.mod(this.div(i, 153), 12) + 1;
            const gregorianYear = this.div(j, 1461) - 100100 + this.div(8 - gregorianMonth, 6);
            return {
                year: gregorianYear,
                month: gregorianMonth,
                day: gregorianDay
            };
        }

        /*
         Utility helper functions.
         */

        private static div(a, b) {
            return ~~(a / b);
        }

        private static mod(a, b) {
            return a - ~~(a / b) * b;
        }
    }

    export enum PersianDayOfWeek {
        /// <summary>
        /// شنبه
        /// </summary>
        Saturday = 6,

        /// <summary>
        /// یکشنبه
        /// </summary>
        Sunday = 0,

        /// <summary>
        /// دو شنبه
        /// </summary>
        Monday = 1,

        /// <summary>
        /// سه شنبه
        /// </summary>
        Tuesday = 2,

        /// <summary>
        /// چهار شنبه
        /// </summary>
        Wednesday = 3,

        /// <summary>
        /// پنج شنبه
        /// </summary>
        Thursday = 4,

        /// <summary>
        /// جمعه
        /// </summary>
        Friday = 5
    }

    enum AmPmEnum {
        None = 0,
        AM = 1,
        PM = 2,
    }

    // در پارس کردن مورد استفاده قرا میگیرد
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
}
