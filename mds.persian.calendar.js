"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mds;
(function (Mds) {
    var PersianDateTime = (function () {
        function PersianDateTime(gregorianDateTime) {
            var _this = this;
            this.dateTime = null;
            /**
             * سال
             */
            this.year = function () {
                return _this.getPersianDateTime().year;
            };
            /**
             * سال دو رقمی
             */
            this.shortYear = function () {
                return _this.getPersianDateTime().year % 100;
            };
            /**
             * ماه
             */
            this.month = function () {
                return _this.getPersianDateTime().month;
            };
            /**
             * روز ماه
             */
            this.day = function () {
                return _this.getPersianDateTime().day;
            };
            /**
             * نام شمسی ماه
             */
            this.monthName = function () {
                switch (_this.month()) {
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
            };
            /**
             * روز هفته
             */
            this.dayOfWeek = function () {
                return _this.dateTime.getDay();
            };
            /**
             * نام روز هفته
             */
            this.dayOfWeekName = function () {
                switch (_this.dayOfWeek()) {
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
            };
            /**
             * شکل کوتاه شده نام روز هفته
             */
            this.getShortDayOfWeekName = function () {
                return _this.dayOfWeekName()[0];
            };
            /**
             * تعدا روز در ماه
             */
            this.getMonthDays = function () {
                return PersianDateConverter.getDaysInPersianMonth(_this.dateTime.getFullYear(), _this.dateTime.getMonth());
            };
            /**
             * ساعت 1 تا 24
             */
            this.hour = function () {
                return _this.getPersianDateTime().hour;
            };
            /**
             * ساعت 1 تا 12
             */
            this.shortHour = function () {
                var shortHour = _this.hour();
                if (shortHour > 12)
                    shortHour = shortHour - 12;
                return shortHour;
            };
            /**
             * دقیقه
             */
            this.minute = function () {
                return _this.getPersianDateTime().minute;
            };
            /**
             * ثانیه
             */
            this.second = function () {
                return _this.getPersianDateTime().second;
            };
            /**
             * میلی ثانیه
             */
            this.millisecond = function () {
                return _this.getPersianDateTime().millisecond;
            };
            /**
             * آیا سال کبیسه است
             */
            this.isLeapYear = function () {
                return PersianDateConverter.isLeapPersianYear(_this.dateTime.getFullYear());
            };
            /**
             * بعد از ظهر یا قبل از ظهر
             */
            this.getPersianAmPmEnum = function () {
                if (_this.hour() < 12)
                    return 'قبل از ظهر';
                return 'بعد از ظهر';
            };
            /**
             * شکل کوتاه شده قبل از ظهر یا بعد از ظهر
             */
            this.getShortPersianAmPmEnum = function () {
                if (_this.hour() < 12)
                    return 'ق.ظ';
                return 'ب.ظ';
            };
            /**
            * @description زمان به فرمتی مشابه
            * 13:47:40:530
            **/
            this.timeOfDay = function () {
                return _this.zeroPad(_this.hour(), '00') + " : " + _this.zeroPad(_this.minute(), '00') + " : " + _this.zeroPad(_this.second(), '00') + " : " + _this.zeroPad(_this.millisecond(), '000');
            };
            /**
             * @description  زمان به فرمتی مشابه زیر
             * ساعت 01:47:40:530 ب.ظ
            **/
            this.longTimeOfDay = function () {
                return "\u0633\u0627\u0639\u062A " + _this.zeroPad(_this.hour(), '00') + " : " + _this.zeroPad(_this.minute(), '00') + " : " + _this.zeroPad(_this.second(), '00') + " : " + _this.zeroPad(_this.millisecond(), '000') + " " + _this.getShortPersianAmPmEnum();
            };
            /**
            * @description زمان به فرمتی مشابه زیر
            * 01:47:40 ب.ظ
            **/
            this.shortTimeOfDay = function () {
                return _this.zeroPad(_this.hour(), '00') + " : " + _this.zeroPad(_this.minute(), '00') + " : " + _this.zeroPad(_this.second(), '00') + " " + _this.getShortPersianAmPmEnum();
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
            this.toString = function (format) {
                if (format === void 0) { format = ''; }
                if (format == '' || format == null)
                    return _this.zeroPad(_this.year(), '0000') + "/" + _this.zeroPad(_this.month(), '00') + "/" + _this.zeroPad(_this.day(), '00') + "   " + _this.zeroPad(_this.hour(), '00') + ":" + _this.zeroPad(_this.minute(), '00') + ":" + _this.zeroPad(_this.second(), '00');
                var dateTimeString = format;
                dateTimeString = dateTimeString.replace(/yyyy/img, _this.zeroPad(_this.year(), '0000'));
                dateTimeString = dateTimeString.replace(/yy/img, _this.zeroPad(_this.year(), '00'));
                dateTimeString = dateTimeString.replace(/MMMM/img, _this.monthName());
                dateTimeString = dateTimeString.replace(/MM/img, _this.zeroPad(_this.month(), '00'));
                dateTimeString = dateTimeString.replace(/M/img, _this.month().toString());
                dateTimeString = dateTimeString.replace(/dddd/img, _this.dayOfWeekName());
                dateTimeString = dateTimeString.replace(/dd/img, _this.zeroPad(_this.day(), '00'));
                dateTimeString = dateTimeString.replace(/d/img, _this.day().toString());
                dateTimeString = dateTimeString.replace(/HH/img, _this.zeroPad(_this.hour(), '00'));
                dateTimeString = dateTimeString.replace(/H/img, _this.hour().toString());
                dateTimeString = dateTimeString.replace(/hh/img, _this.zeroPad(_this.shortHour(), '00'));
                dateTimeString = dateTimeString.replace(/h/img, _this.shortHour().toString());
                dateTimeString = dateTimeString.replace(/mm/img, _this.zeroPad(_this.minute(), '00'));
                dateTimeString = dateTimeString.replace(/m/img, _this.minute().toString());
                dateTimeString = dateTimeString.replace(/ss/img, _this.zeroPad(_this.second(), '00'));
                dateTimeString = dateTimeString.replace(/s/img, _this.second().toString());
                dateTimeString = dateTimeString.replace(/fff/img, _this.zeroPad(_this.millisecond(), '000'));
                dateTimeString = dateTimeString.replace(/ff/img, _this.zeroPad(_this.millisecond() / 10, '00'));
                dateTimeString = dateTimeString.replace(/f/img, (_this.millisecond() / 10).toString());
                dateTimeString = dateTimeString.replace(/tt/img, _this.getPersianAmPmEnum());
                dateTimeString = dateTimeString.replace(/t/img, _this.getPersianAmPmEnum()[0]);
                if (!_this.englishNumber)
                    dateTimeString = _this.toPersianNumber(dateTimeString);
                return dateTimeString;
            };
            this.dateTime = gregorianDateTime;
        }
        /**
         * بدست آوردن آبجکت از یه تاریخ مشخص شمسی
         * @param persianYear سال شمسی
         * @param persianMonth ماه شمسی
         * @param persianDay روز شمسی
         */
        PersianDateTime.fromPersianDate = function (persianYear, persianMonth, persianDay) {
            var persianDate = PersianDateConverter.toGregorian(persianYear, persianMonth, persianDay);
            return new PersianDateTime(new Date(persianDate.year, persianDate.month, persianDate.day, 0, 0, 0, 0));
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
            var persianDate = PersianDateConverter.toGregorian(persianYear, persianMonth, persianDay);
            return new PersianDateTime(new Date(persianDate.year, persianDate.month, persianDate.day, hour, minute, second, millisecond));
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
            if (containMonthSeperator) {
                // بدست آوردن ماه
                month = persianDateTimeInString.match(/\d{2,4}-\d{1,2}(?=-\d{1,2}[^:])/img)[0].match(/-\d{1,2}/img)[0].replace(/\D+/img, '');
                // بدست آوردن روز
                day = persianDateTimeInString.match(/\d{2,4}-\d{1,2}-\d{1,2}(?=-)/img)[0].match(/\d+$/img)[0];
                // بدست آوردن سال
                year = persianDateTimeInString.match(/\d{2,4}(?=-\d{1,2}-\d{1,2})/img)[0].replace(/\D+/img, '');
            }
            else {
                var objValues = Object.keys(PersianDateTimeMonthEnum).map(function (k) { return PersianDateTimeMonthEnum[k]; });
                var persianMonthNames = objValues.filter(function (v) { return typeof v === "string"; });
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
        PersianDateTime.now = function () {
            return new PersianDateTime(new Date());
        };
        ;
        PersianDateTime.elapsedFromNow = function () {
            var dateTime = new Date();
            var persianDate = PersianDateConverter.toPersian(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDay());
            return PersianDateTime.fromPersianDate(persianDate.year, persianDate.month, persianDate.day);
        };
        ;
        /**
         * لیست نام ماه های تقویم فارسی
         */
        PersianDateTime.prototype.getPersianMonthNames = function () {
            return ["فروردین", "اردیبهشت", "خرداد",
                "تیر", "مرداد", "شهریور",
                "مهر", "آبان", "آذر",
                "دی", "بهمن", "اسفند"];
        };
        /**
         * لیست روزهای هفته در تقویم فارسی
         */
        PersianDateTime.prototype.getPersianWeekdayNames = function () {
            return ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه"];
        };
        /**
         * لیست روزهای هفته در تقویم میلادی
         */
        PersianDateTime.prototype.getGregorianWeekdayNames = function () {
            return ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        };
        /**
         * لیست نام ماه های تقویم میلادی
         */
        PersianDateTime.prototype.getGregorianMonthNames = function () {
            return ["January", "February", "March",
                "April", "May", "June",
                "July", "August", "September",
                "October", "November", "December"];
        };
        /**
        * @description تاریخ بدون احتساب زمان
        **/
        PersianDateTime.prototype.date = function () {
            return PersianDateTime.fromPersianDate(this.year(), this.month(), this.day());
        };
        ;
        /**
        * اضافه کردن سال به تاریخ
        */
        PersianDateTime.prototype.addYears = function (years) {
            this.dateTime.setFullYear(this.dateTime.getFullYear() + years);
            return new PersianDateTime(this.dateTime);
        };
        /**
         * اضافه کردن ماه به تاریخ
         */
        PersianDateTime.prototype.addMonths = function (months) {
            this.dateTime.setMonth(this.dateTime.getMonth() + months);
            return new PersianDateTime(this.dateTime);
        };
        /**
         * اضافه کردن روز به تاریخ
         */
        PersianDateTime.prototype.addDays = function (days) {
            this.dateTime.setDate(this.dateTime.getDate() + days);
            return new PersianDateTime(this.dateTime);
        };
        /**
         * اضافه کردن ساعت به تاریخ
         */
        PersianDateTime.prototype.addHours = function (hours) {
            this.dateTime.setHours(this.dateTime.getHours() + hours);
            return new PersianDateTime(this.dateTime);
        };
        /**
         * اضافه کردن دقیقه به تاریخ
         */
        PersianDateTime.prototype.addMinutes = function (minutes) {
            this.dateTime.setHours(this.dateTime.getMinutes() + minutes);
            return new PersianDateTime(this.dateTime);
        };
        /**
         * اضافه کردن به ثانیه به تاریخ
         */
        PersianDateTime.prototype.addSeconds = function (seconds) {
            this.dateTime.setSeconds(this.dateTime.getSeconds() + seconds);
            return new PersianDateTime(this.dateTime);
        };
        /**
         * اضافه کردن به میلی ثانیه به تاریخ
         */
        PersianDateTime.prototype.addMilliSeconds = function (milliseconds) {
            this.dateTime.setMilliseconds(this.dateTime.getMilliseconds() + milliseconds);
            return new PersianDateTime(this.dateTime);
        };
        /**
         * اضافه کردن سال و ماه و روز به تاریخ
         */
        PersianDateTime.prototype.addDate = function (year, month, day) {
            this.addYears(year);
            this.addMonths(month);
            this.addDays(day);
            return new PersianDateTime(this.dateTime);
        };
        /**
         * بدست آوردن آبجکت استاندارد تاریخ و زمان
         */
        PersianDateTime.prototype.toDate = function () {
            return this.dateTime;
        };
        /**
         * اضافه کردن دو تاریخ به همدیگر
         */
        PersianDateTime.prototype.add = function (persianDateTime) {
            var datetime = persianDateTime.toDate();
            this.dateTime.setFullYear(this.dateTime.getFullYear() + datetime.getFullYear());
            this.dateTime.setMonth(this.dateTime.getMonth() + datetime.getMonth());
            this.dateTime.setDate(this.dateTime.getDate() + datetime.getDate());
            this.dateTime.setHours(this.dateTime.getHours() + datetime.getHours());
            this.dateTime.setMinutes(this.dateTime.getMinutes() + datetime.getMinutes());
            this.dateTime.setSeconds(this.dateTime.getSeconds() + datetime.getSeconds());
            this.dateTime.setMilliseconds(this.dateTime.getMilliseconds() + datetime.getMilliseconds());
            return new PersianDateTime(this.dateTime);
        };
        /**
         * کم کردن دو تاریخ از همدیگر
         */
        PersianDateTime.prototype.subtract = function (persianDateTime) {
            var datetime = persianDateTime.toDate();
            this.dateTime.setFullYear(this.dateTime.getFullYear() - datetime.getFullYear());
            this.dateTime.setMonth(this.dateTime.getMonth() - datetime.getMonth());
            this.dateTime.setDate(this.dateTime.getDate() - datetime.getDate());
            this.dateTime.setHours(this.dateTime.getHours() - datetime.getHours());
            this.dateTime.setMinutes(this.dateTime.getMinutes() - datetime.getMinutes());
            this.dateTime.setSeconds(this.dateTime.getSeconds() - datetime.getSeconds());
            this.dateTime.setMilliseconds(this.dateTime.getMilliseconds() - datetime.getMilliseconds());
            return new PersianDateTime(this.dateTime);
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
    PersianDateTime.today = function () {
        var dateTime = new Date();
        var persianDate = PersianDateConverter.toPersian(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDay());
        return PersianDateTime.fromPersianDate(persianDate.year, persianDate.month, persianDate.day);
    };
    Mds.PersianDateTime = PersianDateTime;
    var PersianDateConverter = (function () {
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
        PersianDayOfWeek[PersianDayOfWeek["Saturday"] = 6] = "Saturday";
        /// <summary>
        /// یکشنبه
        /// </summary>
        PersianDayOfWeek[PersianDayOfWeek["Sunday"] = 0] = "Sunday";
        /// <summary>
        /// دو شنبه
        /// </summary>
        PersianDayOfWeek[PersianDayOfWeek["Monday"] = 1] = "Monday";
        /// <summary>
        /// سه شنبه
        /// </summary>
        PersianDayOfWeek[PersianDayOfWeek["Tuesday"] = 2] = "Tuesday";
        /// <summary>
        /// چهار شنبه
        /// </summary>
        PersianDayOfWeek[PersianDayOfWeek["Wednesday"] = 3] = "Wednesday";
        /// <summary>
        /// پنج شنبه
        /// </summary>
        PersianDayOfWeek[PersianDayOfWeek["Thursday"] = 4] = "Thursday";
        /// <summary>
        /// جمعه
        /// </summary>
        PersianDayOfWeek[PersianDayOfWeek["Friday"] = 5] = "Friday";
    })(PersianDayOfWeek = Mds.PersianDayOfWeek || (Mds.PersianDayOfWeek = {}));
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
//# sourceMappingURL=mds.persian.calendar.js.map