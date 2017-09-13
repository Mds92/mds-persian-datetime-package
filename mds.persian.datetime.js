"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mds;
(function (Mds) {
    var PersianDateTime = /** @class */ (function () {
        function PersianDateTime(gregorianDateTime) {
            this.dateTime = null;
            this.dateTime = gregorianDateTime;
        }
        /**
         * بدست آوردن آبجکت از یه تاریخ مشخص شمسی
         * @param persianYear سال شمسی
         * @param persianMonth ماه شمسی
         * @param persianDay روز شمسی
         */
        PersianDateTime.fromPersianDate = function (persianYear, persianMonth, persianDay) {
            return PersianDateTime.fromPersianDateTime(persianYear, persianMonth, persianDay, 0, 0, 0, 0);
        };
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
        PersianDateTime.fromPersianDateTime = function (persianYear, persianMonth, persianDay, hour, minute, second, millisecond) {
            var dateTime = PersianDateConverter.toGregorian(persianYear, persianMonth, persianDay);
            return new PersianDateTime(new Date(dateTime.year, dateTime.month - 1, dateTime.day, hour, minute, second, millisecond));
        };
        /**
         * پارس کردن رشته و تبدیل آن به آبجکت
         * @param persianDateTimeInString متن مورد نظر برای پارس کردن
         * @param dateSeperatorPattern جدا کننده های اعداد ماه و سال که پیش فرض / می باشد
         */
        PersianDateTime.parse = function (persianDateTimeInString, dateSeperatorPattern) {
            if (dateSeperatorPattern === void 0) { dateSeperatorPattern = '\/|-'; }
            persianDateTimeInString = this.toEnglishNumber(persianDateTimeInString);
            var month = '', year = '0', day = '0', hour = '0', minute = '0', second = '0', miliSecond = '0', amPm = AmPmEnum.None, dateSeperatorPatternRegExp = new RegExp(dateSeperatorPattern, 'img'), containMonthSeperator = dateSeperatorPatternRegExp.test(persianDateTimeInString);
            persianDateTimeInString = persianDateTimeInString.replace(/&nbsp;/img, ' ').replace(/\s+/img, '-').replace(/\\/img, '-');
            persianDateTimeInString = persianDateTimeInString.replace(dateSeperatorPatternRegExp, '-');
            persianDateTimeInString = persianDateTimeInString.replace(/ك/img, 'ک').replace(/ي/img, 'ی');
            persianDateTimeInString = "-" + persianDateTimeInString + "-";
            // بدست آوردن ب.ظ یا ق.ظ
            if (persianDateTimeInString.indexOf('ق.ظ') > -1)
                amPm = AmPmEnum.AM;
            else if (persianDateTimeInString.indexOf('ب.ظ') > -1)
                amPm = AmPmEnum.PM;
            if (persianDateTimeInString.indexOf(':') > -1) {
                try {
                    persianDateTimeInString = persianDateTimeInString.replace(/-*:-*/img, ':');
                    hour = persianDateTimeInString.match(/-\d{1,2}(?=:)/img)[0].replace(/\D+/img, '');
                    minute = persianDateTimeInString.match(/\d{1,2}:\d{1,2}(?=:?)/img)[0].match(/\d{1,2}$/img)[0];
                    if (persianDateTimeInString.indexOf(':') != persianDateTimeInString.lastIndexOf(':')) {
                        second = persianDateTimeInString.match(/-\d{1,2}:\d{1,2}:\d{1,2}(?=(\d{1,2})?)/img)[0].match(/:\d{1,2}$/img)[0].replace(/\D+/img, '');
                        var miliSecondMatch = persianDateTimeInString.match(/-\d{1,2}:\d{1,2}:\d{1,2}:\d{1,4}(?=(\d{1,2})?)/img);
                        if (miliSecondMatch == null)
                            miliSecond = '0';
                        miliSecond = miliSecondMatch[0].match(/:\d{1,4}-/img)[0].replace(/\D+/img, '');
                    }
                }
                catch (e) {
                }
            }
            var objValues = Object.keys(PersianDateTimeMonthEnum).map(function (k) { return PersianDateTimeMonthEnum[k]; });
            var persianMonthNames = objValues.filter(function (v) { return typeof v === "string"; });
            if (containMonthSeperator) {
                // بدست آوردن ماه
                var monthMatch = persianDateTimeInString.match(/\d{2,4}-\d{1,2}(?=-\d{1,2}[^:])/img);
                if (monthMatch != null && monthMatch.length > 0)
                    monthMatch = monthMatch[0].match(/-\d{1,2}/img);
                if (monthMatch != null && monthMatch.length > 0)
                    month = monthMatch[0].replace(/\D+/img, '');
                if (month == '' || month == null)
                    for (var i = 0; i < persianMonthNames.length; i++) {
                        var monthName = persianMonthNames[i];
                        if (persianDateTimeInString.indexOf(monthName) <= -1)
                            continue;
                        month = PersianDateTimeMonthEnum[monthName];
                        break;
                    }
                // بدست آوردن روز
                var dayMatch = persianDateTimeInString.match(/\d{2,4}-\d{1,2}-\d{1,2}(?=-)/img);
                if (dayMatch != null && dayMatch.length > 0)
                    dayMatch = dayMatch[0].match(/\d+$/img);
                if (dayMatch != null && dayMatch.length > 0)
                    day = dayMatch[0];
                // بدست آوردن سال
                var yearMatch = persianDateTimeInString.match(/\d{2,4}(?=-\d{1,2}-\d{1,2})/img);
                if (yearMatch != null && yearMatch.length > 0)
                    yearMatch = yearMatch[0].match(/\d+/img);
                if (yearMatch != null && yearMatch.length > 0)
                    year = yearMatch[0];
            }
            else {
                for (var i = 0; i < persianMonthNames.length; i++) {
                    var monthName = persianMonthNames[i];
                    if (persianDateTimeInString.indexOf(monthName) <= -1)
                        continue;
                    month = PersianDateTimeMonthEnum[monthName];
                    break;
                }
                if (month == '' || month == null)
                    throw new Error("عدد یا حرف ماه در رشته ورودی وجود ندارد");
                // بدست آوردن روز
                var dayMatch = persianDateTimeInString.match(/-\d{1,2}(?=-)/img);
                if (dayMatch != null) {
                    day = dayMatch[0].replace(/\D+/img, '');
                    persianDateTimeInString = persianDateTimeInString.replace(new RegExp("-" + day + "(?=-)", 'img'), '-');
                }
                else
                    throw new Error("عدد روز در رشته ورودی وجود ندارد");
                // بدست آوردن سال
                var yearMatch = persianDateTimeInString.match(/-\d{4}(?=-)/img);
                if (yearMatch != null && yearMatch.length > 0)
                    year = yearMatch[0].replace(/\D+/img, '');
                else {
                    yearMatch = persianDateTimeInString.match(/-\d{2,4}(?=-)/img);
                    if (yearMatch != null && yearMatch.length > 0)
                        year = yearMatch[0].replace(/\D+/img, '');
                    else
                        throw new Error("عدد سال در رشته ورودی وجود ندارد");
                }
            }
            var numericYear = Number(year);
            var numericMonth = Number(month);
            var numericDay = Number(day);
            var numericHour = Number(hour);
            var numericMinute = Number(minute);
            var numericSecond = Number(second);
            var numericMiliSecond = Number(miliSecond);
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
        };
        PersianDateTime.prototype.getPersianDateTime = function () {
            var persianDate = PersianDateConverter.toPersian(this.dateTime.getFullYear(), this.dateTime.getMonth() + 1, this.dateTime.getDate());
            return {
                year: persianDate.year,
                month: persianDate.month,
                day: persianDate.day,
                hour: this.dateTime.getHours(),
                minute: this.dateTime.getMinutes(),
                second: this.dateTime.getSeconds(),
                millisecond: this.dateTime.getMilliseconds()
            };
        };
        Object.defineProperty(PersianDateTime, "now", {
            get: function () {
                return new PersianDateTime(new Date());
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(PersianDateTime, "today", {
            get: function () {
                var dateTime = new Date();
                var persianDate = PersianDateConverter.toPersian(dateTime.getFullYear(), dateTime.getMonth() + 1, dateTime.getDay());
                return PersianDateTime.fromPersianDate(persianDate.year, persianDate.month, persianDate.day);
            },
            enumerable: true,
            configurable: true
        });
        ;
        PersianDateTime.elapsedFromNow = function (persianDateTime) {
            return PersianDateTime.now.subtract(persianDateTime);
        };
        ;
        Object.defineProperty(PersianDateTime.prototype, "englishNumber", {
            /**
             * آیا اعداد در خروجی به صورت انگلیسی نمایش داده شوند؟
             */
            get: function () {
                return this.englishNumberPrivate;
            },
            set: function (value) {
                this.englishNumberPrivate = value;
            },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        Object.defineProperty(PersianDateTime.prototype, "year", {
            /**
             * سال
             */
            get: function () {
                return this.getPersianDateTime().year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersianDateTime.prototype, "shortYear", {
            /**
             * سال دو رقمی
             */
            get: function () {
                return this.getPersianDateTime().year % 100;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersianDateTime.prototype, "month", {
            /**
             * ماه
             */
            get: function () {
                return this.getPersianDateTime().month;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersianDateTime.prototype, "day", {
            /**
             * روز ماه
             */
            get: function () {
                return this.getPersianDateTime().day;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersianDateTime.prototype, "monthName", {
            /**
             * نام شمسی ماه
             */
            get: function () {
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
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersianDateTime.prototype, "dayOfWeek", {
            /**
             * روز هفته
             */
            get: function () {
                var gregorianDayOfWeek = this.dateTime.getDay();
                var persianDayOfWeek = PersianDayOfWeek.Saturday;
                switch (gregorianDayOfWeek) {
                    case GregorianDayOfWeek.Saturday:
                        persianDayOfWeek = PersianDayOfWeek.Saturday;
                        break;
                    case GregorianDayOfWeek.Sunday:
                        persianDayOfWeek = PersianDayOfWeek.Sunday;
                        break;
                    case GregorianDayOfWeek.Monday:
                        persianDayOfWeek = PersianDayOfWeek.Monday;
                        break;
                    case GregorianDayOfWeek.Tuesday:
                        persianDayOfWeek = PersianDayOfWeek.Tuesday;
                        break;
                    case GregorianDayOfWeek.Thursday:
                        persianDayOfWeek = PersianDayOfWeek.Thursday;
                        break;
                    case GregorianDayOfWeek.Wednesday:
                        persianDayOfWeek = PersianDayOfWeek.Wednesday;
                        break;
                    case GregorianDayOfWeek.Friday:
                        persianDayOfWeek = PersianDayOfWeek.Friday;
                        break;
                }
                return persianDayOfWeek;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersianDateTime.prototype, "startDayOfMonthDayOfWeek", {
            /**
             * روز شروع ماه
             */
            get: function () {
                var persianDateTime = this.getPersianDateTime();
                return PersianDateTime.fromPersianDate(persianDateTime.year, persianDateTime.month, 1).dayOfWeek;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersianDateTime.prototype, "endDayOfMonthDayOfWeek", {
            /**
             * روز پایان ماه
             */
            get: function () {
                var persianDateTime = this.getPersianDateTime();
                return PersianDateTime.fromPersianDate(persianDateTime.year, persianDateTime.month, this.getMonthDays).dayOfWeek;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersianDateTime.prototype, "dayOfWeekName", {
            /**
             * نام روز هفته
             */
            get: function () {
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
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersianDateTime.prototype, "getShortDayOfWeekName", {
            /**
             * شکل کوتاه شده نام روز هفته
             */
            get: function () {
                return this.dayOfWeekName[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersianDateTime.prototype, "getMonthDays", {
            /**
             * تعدا روز در ماه
             */
            get: function () {
                var persianDateTime = this.getPersianDateTime();
                return PersianDateConverter.getDaysInPersianMonth(persianDateTime.year, persianDateTime.month);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersianDateTime.prototype, "hour", {
            /**
             * ساعت 1 تا 24
             */
            get: function () {
                return this.getPersianDateTime().hour;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersianDateTime.prototype, "shortHour", {
            /**
             * ساعت 1 تا 12
             */
            get: function () {
                var shortHour = this.hour;
                if (shortHour > 12)
                    shortHour = shortHour - 12;
                return shortHour;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersianDateTime.prototype, "minute", {
            /**
             * دقیقه
             */
            get: function () {
                return this.getPersianDateTime().minute;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersianDateTime.prototype, "second", {
            /**
             * ثانیه
             */
            get: function () {
                return this.getPersianDateTime().second;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersianDateTime.prototype, "millisecond", {
            /**
             * میلی ثانیه
             */
            get: function () {
                return this.getPersianDateTime().millisecond;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersianDateTime.prototype, "isLeapYear", {
            /**
             * آیا سال کبیسه است
             */
            get: function () {
                return PersianDateConverter.isLeapPersianYear(this.dateTime.getFullYear());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersianDateTime.prototype, "getPersianAmPmEnum", {
            /**
             * بعد از ظهر یا قبل از ظهر
             */
            get: function () {
                if (this.hour < 12)
                    return 'قبل از ظهر';
                return 'بعد از ظهر';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersianDateTime.prototype, "getShortPersianAmPmEnum", {
            /**
             * شکل کوتاه شده قبل از ظهر یا بعد از ظهر
             */
            get: function () {
                if (this.hour < 12)
                    return 'ق.ظ';
                return 'ب.ظ';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersianDateTime, "getPersianMonthNames", {
            /**
             * لیست نام ماه های تقویم فارسی
             */
            get: function () {
                return ["فروردین", "اردیبهشت", "خرداد",
                    "تیر", "مرداد", "شهریور",
                    "مهر", "آبان", "آذر",
                    "دی", "بهمن", "اسفند"];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * بدست آوردن ایندکس ماه ایرانی از روی نام ماه
         */
        PersianDateTime.getPersianMonthIndex = function (persianMonthName) {
            return this.getPersianMonthNames.indexOf(persianMonthName);
        };
        Object.defineProperty(PersianDateTime, "getPersianWeekdayNames", {
            /**
             * لیست روزهای هفته در تقویم فارسی
             */
            get: function () {
                return ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه"];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * بدست آوردن ایندکس نام روز ایرانی از روی نام روزها
         */
        PersianDateTime.getPersianWeekdayIndex = function (persianWeekdayName) {
            return this.getPersianWeekdayNames.indexOf(persianWeekdayName);
        };
        Object.defineProperty(PersianDateTime, "getGregorianWeekdayNames", {
            /**
             * لیست روزهای هفته در تقویم میلادی
             */
            get: function () {
                return ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * بدست آوردن ایندکس نام روز میلادی از روی نام روزها
         */
        PersianDateTime.getGregorianWeekdayIndex = function (gregorianWeekdayName) {
            return this.getGregorianWeekdayNames.indexOf(gregorianWeekdayName);
        };
        Object.defineProperty(PersianDateTime, "getGregorianMonthNames", {
            /**
             * لیست نام ماه های تقویم میلادی
             */
            get: function () {
                return ["January", "February", "March",
                    "April", "May", "June",
                    "July", "August", "September",
                    "October", "November", "December"];
            },
            enumerable: true,
            configurable: true
        });
        /**
        * بدست آوردن ایندکس نام ماه میلادی از روی نام ماه ها
        */
        PersianDateTime.getGregorianMonthNameIndex = function (gregorianMonthName) {
            return this.getGregorianMonthNames.indexOf(gregorianMonthName);
        };
        Object.defineProperty(PersianDateTime.prototype, "timeOfDay", {
            /**
            * @description زمان به فرمتی مشابه
            * 13:47:40:530
            **/
            get: function () {
                return this.zeroPad(this.hour, '00') + " : " + this.zeroPad(this.minute, '00') + " : " + this.zeroPad(this.second, '00') + " : " + this.zeroPad(this.millisecond, '000');
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(PersianDateTime.prototype, "longTimeOfDay", {
            /**
             * @description  زمان به فرمتی مشابه زیر
             * ساعت 01:47:40:530 ب.ظ
            **/
            get: function () {
                return "\u0633\u0627\u0639\u062A " + this.zeroPad(this.hour, '00') + " : " + this.zeroPad(this.minute, '00') + " : " + this.zeroPad(this.second, '00') + " : " + this.zeroPad(this.millisecond, '000') + " " + this.getShortPersianAmPmEnum;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(PersianDateTime.prototype, "shortTimeOfDay", {
            /**
            * @description زمان به فرمتی مشابه زیر
            * 01:47:40 ب.ظ
            **/
            get: function () {
                return this.zeroPad(this.hour, '00') + " : " + this.zeroPad(this.minute, '00') + " : " + this.zeroPad(this.second, '00') + " " + this.getShortPersianAmPmEnum;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(PersianDateTime.prototype, "date", {
            /**
             *
             * تاریخ بدون احتساب زمان
             *
            **/
            get: function () {
                var persianDateTime = this.getPersianDateTime();
                return PersianDateTime.fromPersianDate(persianDateTime.year, persianDateTime.month, persianDateTime.day);
            },
            enumerable: true,
            configurable: true
        });
        ;
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
        PersianDateTime.prototype.toString = function (format) {
            if (format === void 0) { format = ''; }
            var persianDateTime = this.getPersianDateTime();
            if (format == '' || format == null)
                return this.zeroPad(persianDateTime.year, '0000') + "/" + this.zeroPad(persianDateTime.month, '00') + "/" + this.zeroPad(persianDateTime.day, '00') + "   " + this.zeroPad(persianDateTime.hour, '00') + ":" + this.zeroPad(persianDateTime.minute, '00') + ":" + this.zeroPad(persianDateTime.second, '00');
            var dateTimeString = format;
            dateTimeString = dateTimeString.replace(/yyyy/mg, this.zeroPad(persianDateTime.year, '0000'));
            dateTimeString = dateTimeString.replace(/yy/mg, this.zeroPad(persianDateTime.year, '00'));
            dateTimeString = dateTimeString.replace(/MMMM/mg, this.monthName);
            dateTimeString = dateTimeString.replace(/MM/mg, this.zeroPad(persianDateTime.month, '00'));
            dateTimeString = dateTimeString.replace(/M/mg, persianDateTime.month.toString());
            dateTimeString = dateTimeString.replace(/dddd/mg, this.dayOfWeekName);
            dateTimeString = dateTimeString.replace(/dd/mg, this.zeroPad(persianDateTime.day, '00'));
            dateTimeString = dateTimeString.replace(/d/mg, persianDateTime.day.toString());
            dateTimeString = dateTimeString.replace(/HH/mg, this.zeroPad(persianDateTime.hour, '00'));
            dateTimeString = dateTimeString.replace(/H/mg, persianDateTime.hour.toString());
            dateTimeString = dateTimeString.replace(/hh/mg, this.zeroPad(this.shortHour, '00'));
            dateTimeString = dateTimeString.replace(/h/mg, this.shortHour.toString());
            dateTimeString = dateTimeString.replace(/mm/mg, this.zeroPad(persianDateTime.minute, '00'));
            dateTimeString = dateTimeString.replace(/m/mg, persianDateTime.minute.toString());
            dateTimeString = dateTimeString.replace(/ss/mg, this.zeroPad(persianDateTime.second, '00'));
            dateTimeString = dateTimeString.replace(/s/mg, persianDateTime.second.toString());
            dateTimeString = dateTimeString.replace(/fff/mg, this.zeroPad(persianDateTime.millisecond, '000'));
            dateTimeString = dateTimeString.replace(/ff/mg, this.zeroPad(persianDateTime.millisecond / 10, '00'));
            dateTimeString = dateTimeString.replace(/f/mg, (this.millisecond / 10).toString());
            dateTimeString = dateTimeString.replace(/tt/mg, this.getShortPersianAmPmEnum);
            dateTimeString = dateTimeString.replace(/t/mg, this.getPersianAmPmEnum[0]);
            if (!this.englishNumber)
                dateTimeString = this.toPersianNumber(dateTimeString);
            return dateTimeString;
        };
        ;
        /**
        * اضافه کردن سال به تاریخ
        */
        PersianDateTime.prototype.addYears = function (years) {
            return this.setPersianYear(this.year + years);
        };
        /**
         * اضافه کردن ماه به تاریخ
         */
        PersianDateTime.prototype.addMonths = function (months) {
            var currentMonth = this.month;
            var currentYear = this.year;
            var newMonth = currentMonth + months;
            if (newMonth < 1) {
                newMonth += 12;
                currentYear--;
                return this.setPersianYear(currentYear).setPersianMonth(newMonth);
            }
            else {
                return this.setPersianMonth(newMonth);
            }
        };
        /**
         * اضافه کردن روز به تاریخ
         */
        PersianDateTime.prototype.addDays = function (days) {
            var dateTime = this.cloneDateTime();
            dateTime.setDate(dateTime.getDate() + days);
            return new PersianDateTime(dateTime);
        };
        /**
         * اضافه کردن ساعت به تاریخ
         */
        PersianDateTime.prototype.addHours = function (hours) {
            var dateTime = this.cloneDateTime();
            dateTime.setHours(dateTime.getHours() + hours);
            return new PersianDateTime(dateTime);
        };
        /**
         * اضافه کردن دقیقه به تاریخ
         */
        PersianDateTime.prototype.addMinutes = function (minutes) {
            var dateTime = this.cloneDateTime();
            dateTime.setMinutes(dateTime.getMinutes() + minutes);
            return new PersianDateTime(dateTime);
        };
        /**
         * اضافه کردن به ثانیه به تاریخ
         */
        PersianDateTime.prototype.addSeconds = function (seconds) {
            var dateTime = this.cloneDateTime();
            dateTime.setSeconds(dateTime.getSeconds() + seconds);
            return new PersianDateTime(dateTime);
        };
        /**
         * اضافه کردن به میلی ثانیه به تاریخ
         */
        PersianDateTime.prototype.addMilliSeconds = function (milliseconds) {
            var dateTime = this.cloneDateTime();
            dateTime.setMilliseconds(dateTime.getMilliseconds() + milliseconds);
            return new PersianDateTime(dateTime);
        };
        /**
         * کم کردن دو تاریخ از همدیگر
         */
        PersianDateTime.prototype.subtract = function (persianDateTime) {
            var datetime1 = this.cloneDateTime();
            var datetime2 = persianDateTime.toDate();
            datetime1.setFullYear(datetime1.getFullYear() - datetime2.getFullYear());
            datetime1.setMonth(datetime1.getMonth() - datetime2.getMonth());
            datetime1.setDate(datetime1.getDate() - datetime2.getDate());
            datetime1.setHours(datetime1.getHours() - datetime2.getHours());
            datetime1.setMinutes(datetime1.getMinutes() - datetime2.getMinutes());
            datetime1.setSeconds(datetime1.getSeconds() - datetime2.getSeconds());
            datetime1.setMilliseconds(datetime1.getMilliseconds() - datetime2.getMilliseconds());
            return new PersianDateTime(datetime1);
        };
        PersianDateTime.prototype.clone = function () {
            var dateTime = new Date(this.dateTime.getTime());
            return new PersianDateTime(dateTime);
        };
        PersianDateTime.prototype.cloneDateTime = function () {
            return new Date(this.dateTime.getTime());
        };
        /**
         * بدست آوردن آبجکت استاندارد تاریخ و زمان
         */
        PersianDateTime.prototype.toDate = function () {
            return this.dateTime;
        };
        PersianDateTime.prototype.setPersianYear = function (persianYear) {
            return PersianDateTime.fromPersianDateTime(persianYear, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
        };
        PersianDateTime.prototype.setPersianMonth = function (persianMonth) {
            var persianDateTime = this.getPersianDateTime();
            var day = persianDateTime.day;
            if (persianMonth > 6 && persianMonth < 12 && day > 30)
                day = 30;
            else if (persianMonth >= 12 && day > 29) {
                var isYearLeap = PersianDateConverter.isLeapPersianYear(persianDateTime.year);
                if (isYearLeap)
                    day = 30;
                else
                    day = 29;
            }
            return PersianDateTime.fromPersianDateTime(persianDateTime.year, persianMonth, day, persianDateTime.hour, persianDateTime.minute, persianDateTime.second, persianDateTime.millisecond);
        };
        PersianDateTime.prototype.setPersianDay = function (persianDay) {
            var persianDateTime = this.getPersianDateTime();
            return PersianDateTime.fromPersianDateTime(persianDateTime.year, persianDateTime.month, persianDay, persianDateTime.hour, persianDateTime.minute, persianDateTime.second, persianDateTime.millisecond);
        };
        PersianDateTime.prototype.setHour = function (hour) {
            var persianDateTime = this.getPersianDateTime();
            return PersianDateTime.fromPersianDateTime(persianDateTime.year, persianDateTime.month, persianDateTime.day, hour, persianDateTime.minute, persianDateTime.second, persianDateTime.millisecond);
        };
        PersianDateTime.prototype.setMinute = function (minute) {
            var persianDateTime = this.getPersianDateTime();
            return PersianDateTime.fromPersianDateTime(persianDateTime.year, persianDateTime.month, persianDateTime.day, persianDateTime.hour, minute, persianDateTime.second, persianDateTime.millisecond);
        };
        PersianDateTime.prototype.setSecond = function (second) {
            var persianDateTime = this.getPersianDateTime();
            return PersianDateTime.fromPersianDateTime(persianDateTime.year, persianDateTime.month, persianDateTime.day, persianDateTime.hour, persianDateTime.minute, second, persianDateTime.millisecond);
        };
        PersianDateTime.prototype.setMillisecond = function (millisecond) {
            var persianDateTime = this.getPersianDateTime();
            return PersianDateTime.fromPersianDateTime(persianDateTime.year, persianDateTime.month, persianDateTime.day, persianDateTime.hour, persianDateTime.minute, persianDateTime.second, millisecond);
        };
        PersianDateTime.prototype.setPersianDate = function (year, month, day) {
            var persianDateTime = this.getPersianDateTime();
            return PersianDateTime.fromPersianDateTime(year, month, day, persianDateTime.hour, persianDateTime.minute, persianDateTime.second, persianDateTime.millisecond);
        };
        PersianDateTime.prototype.setTime = function (hour, minute, second, millisecond) {
            var persianDateTime = this.getPersianDateTime();
            return PersianDateTime.fromPersianDateTime(persianDateTime.year, persianDateTime.month, persianDateTime.day, hour, minute, second, millisecond);
        };
        PersianDateTime.prototype.zeroPad = function (nr, base) {
            if (nr == undefined || nr == '')
                return base;
            var len = (String(base).length - String(nr).length) + 1;
            return len > 0 ? new Array(len).join('0') + nr : nr;
        };
        PersianDateTime.prototype.toPersianNumber = function (input) {
            if (input == '' || input == null)
                return '';
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
        };
        PersianDateTime.toEnglishNumber = function (input) {
            if (input == '' || input == null)
                return '';
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
        };
        return PersianDateTime;
    }());
    Mds.PersianDateTime = PersianDateTime;
    var PersianDateConverter = /** @class */ (function () {
        function PersianDateConverter() {
        }
        /*
         Converts a Gregorian date to Persian.
         */
        PersianDateConverter.toPersian = function (gregorianYear, gregorianMonth, gregorianDay) {
            return this.d2J(this.g2D(gregorianYear, gregorianMonth, gregorianDay));
        };
        /*
         Converts a Persian date to Gregorian.
         */
        PersianDateConverter.toGregorian = function (persinYear, persianMonth, persianDay) {
            return this.d2G(this.j2D(persinYear, persianMonth, persianDay));
        };
        /*
         Checks whether a Persian date is valid or not.
         */
        PersianDateConverter.isValidPersianDate = function (persianYear, persianMonth, persianDay) {
            return persianYear >= -61 &&
                persianYear <= 3177 &&
                persianMonth >= 1 &&
                persianMonth <= 12 &&
                persianDay >= 1 &&
                persianDay <= this.getDaysInPersianMonth(persianYear, persianMonth);
        };
        /*
         Is this a leap year or not?
         */
        PersianDateConverter.isLeapPersianYear = function (persianYear) {
            return this.persianCalendar(persianYear).leap == 0;
        };
        /*
         Number of days in a given month in a Persian year.
         */
        PersianDateConverter.getDaysInPersianMonth = function (persianYear, persianMonth) {
            if (persianMonth <= 6)
                return 31;
            if (persianMonth <= 11)
                return 30;
            if (this.isLeapPersianYear(persianYear))
                return 30;
            return 29;
        };
        PersianDateConverter.getDaysInPersianYear = function (persianYear) {
            if (this.isLeapPersianYear(persianYear))
                return 366;
            return 365;
        };
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
        PersianDateConverter.persianCalendar = function (persianYear) {
            // Persian years starting the 33-year rule.
            var breaks = [
                -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456,
                3178
            ];
            var bl = breaks.length;
            var gregorianYear = persianYear + 621;
            var leapJ = -14, jp = breaks[0], persianMonth, jump = 1, leap, n, i;
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
            var leapG = this.div(gregorianYear, 4) - this.div((this.div(gregorianYear, 100) + 1) * 3, 4) - 150;
            // Determine the Gregorian date of Farletdin the 1st.
            var march = 20 + leapJ - leapG;
            // Find how many years have passed since the last leap year.
            if (jump - n < 6)
                n = n - jump + this.div(jump + 4, 33) * 33;
            leap = this.mod(this.mod(n + 1, 33) - 1, 4);
            if (leap === -1)
                leap = 4;
            return {
                leap: leap,
                gregorianYear: gregorianYear,
                march: march
            };
        };
        /*
         Converts a date of the Persian calendar to the Julian day number.
     
         @param persianYear Persian year (1 to 3100)
         @param persianMonth Persian month (1 to 12)
         @param persianDay Persian day (1 to 29/31)
         @return Julian day number
         */
        PersianDateConverter.j2D = function (persianYear, persianMonth, persianDay) {
            var r = this.persianCalendar(persianYear);
            return this.g2D(r.gregorianYear, 3, r.march) +
                (persianMonth - 1) * 31 -
                this.div(persianMonth, 7) * (persianMonth - 7) +
                persianDay -
                1;
        };
        /*
         Converts the Julian day number to a date in the Persian calendar.
     
         @param jdn Julian day number
         @return
         persianYear: Persian year (1 to 3100)
         persianMonth: Persian month (1 to 12)
         persianDay: Persian day (1 to 29/31)
         */
        PersianDateConverter.d2J = function (jdn) {
            var gregorianYear = this.d2G(jdn).year;
            var // Calendarculate Gregorian year (gregorianYear).
            persianYear = gregorianYear - 621;
            var r = this.persianCalendar(persianYear);
            var jdn1F = this.g2D(gregorianYear, 3, r.march);
            var persianDay, persianMonth, k;
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
                }
                else {
                    // The remaining months.
                    k -= 186;
                }
            }
            else {
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
        };
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
        PersianDateConverter.g2D = function (gregorianYear, gregorianMonth, gregorianDay) {
            var d = this.div((gregorianYear + this.div(gregorianMonth - 8, 6) + 100100) * 1461, 4) +
                this.div(153 * this.mod(gregorianMonth + 9, 12) + 2, 5) +
                gregorianDay -
                34840408;
            d = d - this.div(this.div(gregorianYear + 100100 + this.div(gregorianMonth - 8, 6), 100) * 3, 4) + 752;
            return d;
        };
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
        PersianDateConverter.d2G = function (jdn) {
            var j;
            j = 4 * jdn + 139361631;
            j = j + this.div(this.div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
            var i = this.div(this.mod(j, 1461), 4) * 5 + 308;
            ;
            var gregorianDay = this.div(this.mod(i, 153), 5) + 1;
            var gregorianMonth = this.mod(this.div(i, 153), 12) + 1;
            var gregorianYear = this.div(j, 1461) - 100100 + this.div(8 - gregorianMonth, 6);
            return {
                year: gregorianYear,
                month: gregorianMonth,
                day: gregorianDay
            };
        };
        /*
         Utility helper functions.
         */
        PersianDateConverter.div = function (a, b) {
            return ~~(a / b);
        };
        PersianDateConverter.mod = function (a, b) {
            return a - ~~(a / b) * b;
        };
        return PersianDateConverter;
    }());
    Mds.PersianDateConverter = PersianDateConverter;
    var PersianDayOfWeek;
    (function (PersianDayOfWeek) {
        /// <summary>
        /// شنبه
        /// </summary>
        PersianDayOfWeek[PersianDayOfWeek["Saturday"] = 0] = "Saturday";
        /// <summary>
        /// یکشنبه
        /// </summary>
        PersianDayOfWeek[PersianDayOfWeek["Sunday"] = 1] = "Sunday";
        /// <summary>
        /// دو شنبه
        /// </summary>
        PersianDayOfWeek[PersianDayOfWeek["Monday"] = 2] = "Monday";
        /// <summary>
        /// سه شنبه
        /// </summary>
        PersianDayOfWeek[PersianDayOfWeek["Tuesday"] = 3] = "Tuesday";
        /// <summary>
        /// چهار شنبه
        /// </summary>
        PersianDayOfWeek[PersianDayOfWeek["Wednesday"] = 4] = "Wednesday";
        /// <summary>
        /// پنج شنبه
        /// </summary>
        PersianDayOfWeek[PersianDayOfWeek["Thursday"] = 5] = "Thursday";
        /// <summary>
        /// جمعه
        /// </summary>
        PersianDayOfWeek[PersianDayOfWeek["Friday"] = 6] = "Friday";
    })(PersianDayOfWeek = Mds.PersianDayOfWeek || (Mds.PersianDayOfWeek = {}));
    var GregorianDayOfWeek;
    (function (GregorianDayOfWeek) {
        /// <summary>
        /// شنبه
        /// </summary>
        GregorianDayOfWeek[GregorianDayOfWeek["Saturday"] = 6] = "Saturday";
        /// <summary>
        /// یکشنبه
        /// </summary>
        GregorianDayOfWeek[GregorianDayOfWeek["Sunday"] = 0] = "Sunday";
        /// <summary>
        /// دو شنبه
        /// </summary>
        GregorianDayOfWeek[GregorianDayOfWeek["Monday"] = 1] = "Monday";
        /// <summary>
        /// سه شنبه
        /// </summary>
        GregorianDayOfWeek[GregorianDayOfWeek["Tuesday"] = 2] = "Tuesday";
        /// <summary>
        /// چهار شنبه
        /// </summary>
        GregorianDayOfWeek[GregorianDayOfWeek["Wednesday"] = 3] = "Wednesday";
        /// <summary>
        /// پنج شنبه
        /// </summary>
        GregorianDayOfWeek[GregorianDayOfWeek["Thursday"] = 4] = "Thursday";
        /// <summary>
        /// جمعه
        /// </summary>
        GregorianDayOfWeek[GregorianDayOfWeek["Friday"] = 5] = "Friday";
    })(GregorianDayOfWeek = Mds.GregorianDayOfWeek || (Mds.GregorianDayOfWeek = {}));
    var AmPmEnum;
    (function (AmPmEnum) {
        AmPmEnum[AmPmEnum["None"] = 0] = "None";
        AmPmEnum[AmPmEnum["AM"] = 1] = "AM";
        AmPmEnum[AmPmEnum["PM"] = 2] = "PM";
    })(AmPmEnum || (AmPmEnum = {}));
    // در پارس کردن مورد استفاده قرا میگیرد
    var PersianDateTimeMonthEnum;
    (function (PersianDateTimeMonthEnum) {
        PersianDateTimeMonthEnum[PersianDateTimeMonthEnum["\u0641\u0631\u0648\u0631\u062F\u06CC\u0646"] = 1] = "\u0641\u0631\u0648\u0631\u062F\u06CC\u0646";
        PersianDateTimeMonthEnum[PersianDateTimeMonthEnum["\u0627\u0631\u062F\u06CC\u0628\u0647\u0634\u062A"] = 2] = "\u0627\u0631\u062F\u06CC\u0628\u0647\u0634\u062A";
        PersianDateTimeMonthEnum[PersianDateTimeMonthEnum["\u062E\u0631\u062F\u0627\u062F"] = 3] = "\u062E\u0631\u062F\u0627\u062F";
        PersianDateTimeMonthEnum[PersianDateTimeMonthEnum["\u062A\u06CC\u0631"] = 4] = "\u062A\u06CC\u0631";
        PersianDateTimeMonthEnum[PersianDateTimeMonthEnum["\u0645\u0631\u062F\u0627\u062F"] = 5] = "\u0645\u0631\u062F\u0627\u062F";
        PersianDateTimeMonthEnum[PersianDateTimeMonthEnum["\u0634\u0647\u0631\u06CC\u0648\u0631"] = 6] = "\u0634\u0647\u0631\u06CC\u0648\u0631";
        PersianDateTimeMonthEnum[PersianDateTimeMonthEnum["\u0645\u0647\u0631"] = 7] = "\u0645\u0647\u0631";
        PersianDateTimeMonthEnum[PersianDateTimeMonthEnum["\u0622\u0628\u0627\u0646"] = 8] = "\u0622\u0628\u0627\u0646";
        PersianDateTimeMonthEnum[PersianDateTimeMonthEnum["\u0622\u0630\u0631"] = 9] = "\u0622\u0630\u0631";
        PersianDateTimeMonthEnum[PersianDateTimeMonthEnum["\u062F\u06CC"] = 10] = "\u062F\u06CC";
        PersianDateTimeMonthEnum[PersianDateTimeMonthEnum["\u0628\u0647\u0645\u0646"] = 11] = "\u0628\u0647\u0645\u0646";
        PersianDateTimeMonthEnum[PersianDateTimeMonthEnum["\u0627\u0633\u0641\u0646\u062F"] = 12] = "\u0627\u0633\u0641\u0646\u062F";
    })(PersianDateTimeMonthEnum || (PersianDateTimeMonthEnum = {}));
})(Mds = exports.Mds || (exports.Mds = {}));
//# sourceMappingURL=mds.persian.datetime.js.map