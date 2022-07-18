export var Mds;
(function (Mds) {
    class PersianDateTime {
        constructor(gregorianDateTime) {
            this.dateTime = new Date();
            this.englishNumberPrivate = true;
            if (typeof gregorianDateTime == 'string')
                this.dateTime = new Date(gregorianDateTime);
            else
                this.dateTime = gregorianDateTime;
        }
        /**
         * @description بدست آوردن آبجکت از یه تاریخ مشخص شمسی
         * @param persianYear سال شمسی
         * @param persianMonth ماه شمسی
         * @param persianDay روز شمسی
         */
        static fromPersianDate(persianYear, persianMonth, persianDay) {
            return PersianDateTime.fromPersianDateTime(persianYear, persianMonth, persianDay, 0, 0, 0, 0);
        }
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
        static fromPersianDateTime(persianYear, persianMonth, persianDay, hour, minute, second, millisecond) {
            const dateTime = PersianDateConverter.toGregorian(persianYear, persianMonth, persianDay);
            return new PersianDateTime(new Date(dateTime.year, dateTime.month - 1, dateTime.day, hour, minute, second, millisecond));
        }
        /**
         * @description پارس کردن رشته و تبدیل آن به آبجکت
         * @param persianDateTimeInString متن مورد نظر برای پارس کردن
         * @param dateSeparatorPattern جدا کننده های اعداد ماه و سال که پیش فرض / می باشد
         */
        static parse(persianDateTimeInString, dateSeparatorPattern = '\/|-') {
            persianDateTimeInString = this.toEnglishNumber(persianDateTimeInString);
            let month = '', year = '0', day = '0', hour = '0', minute = '0', second = '0', millisecond = '0', amPm = AmPmEnum.None;
            const dateSeparatorPatternRegExp = new RegExp(dateSeparatorPattern, 'img'), containMonthSeparator = dateSeparatorPatternRegExp.test(persianDateTimeInString);
            persianDateTimeInString = persianDateTimeInString.replace(/&nbsp;/img, ' ').replace(/\s+/img, '-').replace(/\\/img, '-');
            persianDateTimeInString = persianDateTimeInString.replace(dateSeparatorPatternRegExp, '-');
            persianDateTimeInString = persianDateTimeInString.replace(/ك/img, 'ک').replace(/ي/img, 'ی');
            persianDateTimeInString = `-${persianDateTimeInString}-`;
            // بدست آوردن ب.ظ یا ق.ظ
            if (persianDateTimeInString.indexOf('ق.ظ') > -1)
                amPm = AmPmEnum.AM;
            else if (persianDateTimeInString.indexOf('ب.ظ') > -1)
                amPm = AmPmEnum.PM;
            if (persianDateTimeInString.indexOf(':') > -1) // رشته ورودی شامل ساعت نیز هست
             {
                persianDateTimeInString = persianDateTimeInString.replace(/-*:-*/img, ':');
                const hourMatch = persianDateTimeInString.match(/-\d{1,2}(?=:)/img);
                let minuteMatch = persianDateTimeInString.match(/\d{1,2}:\d{1,2}(?=:?)/img);
                if (hourMatch && hourMatch.length > 0)
                    hour = hourMatch[0].replace(/\D+/img, '');
                if (minuteMatch && minuteMatch.length > 0) {
                    minuteMatch = minuteMatch[0].match(/\d{1,2}$/img);
                    if (minuteMatch && minuteMatch.length > 0)
                        minute = minuteMatch[0].replace(/\D+/img, '');
                }
                const secondMatch = persianDateTimeInString.match(/-\d{1,2}:\d{1,2}:\d{1,2}(?=(\d{1,2})?)/img);
                const millisecondMatch = persianDateTimeInString.match(/-\d{1,2}:\d{1,2}:\d{1,2}:\d{1,4}(?=(\d{1,2})?)/img);
                if (persianDateTimeInString.indexOf(':') != persianDateTimeInString.lastIndexOf(':')) {
                    if (secondMatch != null && secondMatch.length > 0) {
                        const secondMatch1 = secondMatch[0].match(/:\d{1,2}$/img);
                        if (secondMatch1 != null && secondMatch1.length > 0)
                            second = secondMatch1[0].replace(/\D+/img, '');
                    }
                    if (millisecondMatch != null && millisecondMatch.length > 0) {
                        const millisecondMatch1 = millisecondMatch[0].match(/:\d{1,4}-/img);
                        if (millisecondMatch1 != null && millisecondMatch1.length > 0)
                            millisecond = millisecondMatch1[0].replace(/\D+/img, '');
                    }
                }
            }
            const objValues = Object.keys(PersianDateTimeMonthEnum).map((k) => PersianDateTimeMonthEnum[k]);
            const persianMonthNames = objValues.filter(v => typeof v === "string");
            if (containMonthSeparator) {
                // بدست آوردن ماه
                let monthMatch = persianDateTimeInString.match(/\d{2,4}-\d{1,2}(?=-\d{1,2}[^:])/img);
                if (monthMatch != null && monthMatch.length > 0)
                    monthMatch = monthMatch[0].match(/-\d{1,2}/img);
                if (monthMatch != null && monthMatch.length > 0)
                    month = monthMatch[0].replace(/\D+/img, '');
                if (month)
                    for (let i = 0; i < persianMonthNames.length; i++) {
                        const monthName = persianMonthNames[i];
                        if (persianDateTimeInString.indexOf(monthName) <= -1)
                            continue;
                        month = PersianDateTimeMonthEnum[monthName];
                        break;
                    }
                // بدست آوردن روز
                let dayMatch = persianDateTimeInString.match(/\d{2,4}-\d{1,2}-\d{1,2}(?=-)/img);
                if (dayMatch != null && dayMatch.length > 0)
                    dayMatch = dayMatch[0].match(/\d+$/img);
                if (dayMatch != null && dayMatch.length > 0)
                    day = dayMatch[0];
                // بدست آوردن سال
                let yearMatch = persianDateTimeInString.match(/\d{2,4}(?=-\d{1,2}-\d{1,2})/img);
                if (yearMatch != null && yearMatch.length > 0)
                    yearMatch = yearMatch[0].match(/\d+/img);
                if (yearMatch != null && yearMatch.length > 0)
                    year = yearMatch[0];
            }
            else {
                for (let i = 0; i < persianMonthNames.length; i++) {
                    const monthName = persianMonthNames[i];
                    if (persianDateTimeInString.indexOf(monthName) <= -1)
                        continue;
                    month = PersianDateTimeMonthEnum[monthName];
                    break;
                }
                if (month == '' || month == null)
                    throw new Error("عدد یا حرف ماه در رشته ورودی وجود ندارد");
                // بدست آوردن روز
                const dayMatch = persianDateTimeInString.match(/-\d{1,2}(?=-)/img);
                if (dayMatch != null) {
                    day = dayMatch[0].replace(/\D+/img, '');
                    persianDateTimeInString = persianDateTimeInString.replace(new RegExp(`-${day}(?=-)`, 'img'), '-');
                }
                else
                    throw new Error("عدد روز در رشته ورودی وجود ندارد");
                // بدست آوردن سال
                let yearMatch = persianDateTimeInString.match(/-\d{4}(?=-)/img);
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
            let numericYear = Number(year);
            let numericHour = Number(hour);
            const numericMonth = Number(month);
            const numericDay = Number(day);
            const numericMinute = Number(minute);
            const numericSecond = Number(second);
            const numericMillisecond = Number(millisecond);
            if (numericYear <= 0 || numericMonth <= 0 || numericMonth > 12 || numericDay <= 0 || numericDay > 31)
                throw new Error('تاریخ وارد شده نامعتبر است');
            if (numericMonth == 12 && !PersianDateConverter.isLeapPersianYear(numericYear) && numericDay > 29)
                throw new Error(`سال ${numericYear} کبیسه نیست!`);
            if (numericMonth > 6 && numericDay > 30)
                throw new Error(`ماه ${numericMonth} باید 30 روزه باشد!`);
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
            return PersianDateTime.fromPersianDateTime(numericYear, numericMonth, numericDay, numericHour, numericMinute, numericSecond, numericMillisecond);
        }
        getPersianDateTime() {
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
        /**
         * @description تاریخ الان به همراه ساعت
         */
        static get now() {
            return new PersianDateTime(new Date());
        }
        ;
        /**
         * @description تاریخ الان بدون ساعت
         */
        static get today() {
            const dateTime = new Date();
            const persianDate = PersianDateConverter.toPersian(dateTime.getFullYear(), dateTime.getMonth() + 1, dateTime.getDay());
            return PersianDateTime.fromPersianDate(persianDate.year, persianDate.month, persianDate.day);
        }
        ;
        /**
         * @description بدست آوردن زمان سپری شده از زمان فعلی
         */
        static elapsedFromNow(persianDateTime) {
            const dateTimeNow = new Date();
            const datetime = persianDateTime.toDate();
            return {
                year: dateTimeNow.getFullYear() - datetime.getFullYear(),
                month: dateTimeNow.getMonth() - datetime.getMonth(),
                day: dateTimeNow.getDate() - datetime.getDate(),
                hour: dateTimeNow.getHours() - datetime.getHours(),
                minute: dateTimeNow.getMinutes() - datetime.getMinutes(),
                second: dateTimeNow.getSeconds() - datetime.getSeconds(),
            };
        }
        ;
        /**
         * @description آیا اعداد در خروجی به صورت انگلیسی نمایش داده شوند؟
         */
        get englishNumber() {
            return this.englishNumberPrivate;
        }
        ;
        set englishNumber(value) {
            this.englishNumberPrivate = value;
        }
        ;
        /**
         * @description سال
         */
        get year() {
            return this.getPersianDateTime().year;
        }
        /**
         * @description سال دو رقمی
         */
        get shortYear() {
            return this.getPersianDateTime().year % 100;
        }
        /**
         * @description ماه
         */
        get month() {
            return this.getPersianDateTime().month;
        }
        /**
         * @description روز ماه
         */
        get day() {
            return this.getPersianDateTime().day;
        }
        /**
         * @description نام شمسی ماه
         */
        get monthName() {
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
         * @description روز هفته شمسی
         */
        get dayOfWeek() {
            const gregorianDayOfWeek = this.dateTime.getDay();
            let persianDayOfWeek = PersianDayOfWeek.Saturday;
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
        }
        /**
         * @description روز هفته میلادی
         */
        get dayOfWeekGregorian() {
            return this.dateTime.getDay();
        }
        /**
         * @description روز شروع ماه
         */
        get startDayOfMonthDayOfWeek() {
            const persianDateTime = this.getPersianDateTime();
            return PersianDateTime.fromPersianDate(persianDateTime.year, persianDateTime.month, 1).dayOfWeek;
        }
        /**
         * @description روز پایان ماه
         */
        get endDayOfMonthDayOfWeek() {
            const persianDateTime = this.getPersianDateTime();
            return PersianDateTime.fromPersianDate(persianDateTime.year, persianDateTime.month, this.getMonthDays).dayOfWeek;
        }
        /**
         * @description نام روز هفته
         */
        get dayOfWeekName() {
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
                    return 'چهارشنبه';
                case PersianDayOfWeek.Thursday:
                    return 'پنج شنبه';
                case PersianDayOfWeek.Friday:
                    return 'جمعه';
                default:
                    return '';
            }
        }
        /**
         * @description شکل کوتاه شده نام روز هفته
         */
        get getShortDayOfWeekName() {
            return this.dayOfWeekName[0];
        }
        /**
         * @description تعداد روز در ماه
         */
        get getMonthDays() {
            const persianDateTime = this.getPersianDateTime();
            return PersianDateConverter.getDaysInPersianMonth(persianDateTime.year, persianDateTime.month);
        }
        /**
        * @description تاریخ اولین روز ماه
        */
        get getDateOfFirstDayOfMonth() {
            return PersianDateTime.fromPersianDate(this.year, this.month, 1);
        }
        /**
         * @description تاریخ آخرین روز ماه
         */
        get getDateOfLastDayOfMonth() {
            return PersianDateTime.fromPersianDate(this.year, this.month, this.getMonthDays);
        }
        /**
         * @description تاریخ اولین روز سال
         */
        get getDateOfFirstDayOfYear() {
            return PersianDateTime.fromPersianDate(this.year, 1, 1);
        }
        /**
         * @description تاریخ آخرین روز سال
         */
        get getDateOfLastDayOfYear() {
            return PersianDateTime.fromPersianDate(this.year, 12, PersianDateConverter.getDaysInPersianMonth(this.year, 12));
        }
        /**
         * @description ساعت 1 تا 24
         */
        get hour() {
            return this.getPersianDateTime().hour;
        }
        /**
         * @description ساعت 1 تا 12
         */
        get shortHour() {
            let shortHour = this.hour;
            if (shortHour > 12)
                shortHour = shortHour - 12;
            return shortHour;
        }
        /**
         * @description دقیقه
         */
        get minute() {
            return this.getPersianDateTime().minute;
        }
        /**
         * @description ثانیه
         */
        get second() {
            return this.getPersianDateTime().second;
        }
        /**
         * @description میلی ثانیه
         */
        get millisecond() {
            return this.getPersianDateTime().millisecond;
        }
        /**
         *@description  آیا سال کبیسه است
         */
        get isLeapYear() {
            return PersianDateConverter.isLeapPersianYear(this.dateTime.getFullYear());
        }
        /**
         * @description بعد از ظهر یا قبل از ظهر
         */
        get getPersianAmPmEnum() {
            if (this.hour < 12)
                return 'قبل از ظهر';
            return 'بعد از ظهر';
        }
        /**
         * @description شکل کوتاه شده قبل از ظهر یا بعد از ظهر
         */
        get getShortPersianAmPmEnum() {
            if (this.hour < 12)
                return 'ق.ظ';
            return 'ب.ظ';
        }
        /**
         * @description لیست نام ماه های تقویم فارسی
         */
        static get getPersianMonthNames() {
            return ["فروردین", "اردیبهشت", "خرداد",
                "تیر", "مرداد", "شهریور",
                "مهر", "آبان", "آذر",
                "دی", "بهمن", "اسفند"];
        }
        /**
         * @description بدست آوردن ایندکس ماه ایرانی از روی نام ماه
         */
        static getPersianMonthIndex(persianMonthName) {
            return this.getPersianMonthNames.indexOf(persianMonthName);
        }
        /**
         * @description لیست نام ها روزهای هفته در تقویم فارسی
         */
        static get getPersianWeekdayNames() {
            return ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه"];
        }
        /**
         * @description لیست نام ها روزهای هفته خلاصه شده در تقویم فارسی
         */
        static get getPersianWeekdayNamesShort() {
            return ["ش", "ی", "د", "س", "چ", "پ", "ج"];
        }
        /**
         * @description بدست آوردن ایندکس نام روز ایرانی از روی نام روزها
         */
        static getPersianWeekdayIndex(persianWeekdayName) {
            return this.getPersianWeekdayNames.indexOf(persianWeekdayName);
        }
        /**
         * @description لیست روزهای هفته در تقویم میلادی
         */
        static get getGregorianWeekdayNames() {
            return ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        }
        /**
         * @description بدست آوردن ایندکس نام روز میلادی از روی نام روزها
         */
        static getGregorianWeekdayIndex(gregorianWeekdayName) {
            return this.getGregorianWeekdayNames.indexOf(gregorianWeekdayName);
        }
        /**
         * @description لیست نام ماه های تقویم میلادی
         */
        static get getGregorianMonthNames() {
            return ["January", "February", "March",
                "April", "May", "June",
                "July", "August", "September",
                "October", "November", "December"];
        }
        /**
        * @description بدست آوردن ایندکس نام ماه میلادی از روی نام ماه ها
        */
        static getGregorianMonthNameIndex(gregorianMonthName) {
            return this.getGregorianMonthNames.indexOf(gregorianMonthName);
        }
        /**
         * @description آیا تاریخ وارد شده معتبر می باشد یا نه
         */
        static isValid(persianDateTime, dateSeparatorPattern = '\/|-') {
            try {
                this.parse(persianDateTime, dateSeparatorPattern);
                return true;
            }
            catch (e) {
                return false;
            }
        }
        /**
         * @description آیا آبجکت ورودی از نوع MdsPersianDateTime هست
         * @param obj
         */
        static isPersianDateTimeInstance(obj) {
            if (!obj)
                return false;
            return obj['isMdsPersianDateTimeInstance'] == undefined ? false : true;
        }
        /**
        * @description زمان به فرمتی مشابه
        * 13:47:40:530
        **/
        get timeOfDay() {
            return `${this.zeroPad(this.hour, '00')} : ${this.zeroPad(this.minute, '00')} : ${this.zeroPad(this.second, '00')} : ${this.zeroPad(this.millisecond, '000')}`;
        }
        ;
        /**
         * @description  زمان به فرمتی مشابه زیر
         * ساعت 01:47:40:530 ب.ظ
        **/
        get longTimeOfDay() {
            return `ساعت ${this.zeroPad(this.hour, '00')} : ${this.zeroPad(this.minute, '00')} : ${this.zeroPad(this.second, '00')} : ${this.zeroPad(this.millisecond, '000')} ${this.getShortPersianAmPmEnum}`;
        }
        ;
        /**
        * @description زمان به فرمتی مشابه زیر
        * 01:47:40 ب.ظ
        **/
        get shortTimeOfDay() {
            return `${this.zeroPad(this.hour, '00')} : ${this.zeroPad(this.minute, '00')} : ${this.zeroPad(this.second, '00')} ${this.getShortPersianAmPmEnum}`;
        }
        ;
        /**
         * @description تاریخ بدون احتساب زمان
        **/
        get date() {
            const persianDateTime = this.getPersianDateTime();
            return PersianDateTime.fromPersianDate(persianDateTime.year, persianDateTime.month, persianDateTime.day);
        }
        ;
        /**
         * @description برای بررسی اینکه آیا آبجکت اینستنس این آبجکت هست یا نه استفاده می شود
         */
        get isMdsPersianDateTimeInstance() {
            return true;
        }
        /**
         * @description گرفتن تاریخ به شکل عدد تا دقت روز
         */
        getShortNumber() {
            return Number(this.toEnglishNumber(this.toString('yyyyMMdd')));
        }
        /**
         * @description دریافت تاریخ به شکل عدد تا دقت ثانیه
         */
        getLongNumber() {
            return Number(this.toEnglishNumber(this.toString('yyyyMMddHHmmss')));
        }
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
        toString(format = '') {
            const persianDateTime = this.getPersianDateTime();
            if (format == '' || format == null)
                return `${this.zeroPad(persianDateTime.year, '0000')}/${this.zeroPad(persianDateTime.month, '00')}/${this.zeroPad(persianDateTime.day, '00')}   ${this.zeroPad(persianDateTime.hour, '00')}:${this.zeroPad(persianDateTime.minute, '00')}:${this.zeroPad(persianDateTime.second, '00')}`;
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
        }
        ;
        /**
         * @description بدست آوردن تاریخ در فرمت
         * iso 8601
         * YYYY-MM-DDTHH:mm:ss.sssZ
         */
        toIsoString() {
            return this.dateTime.toISOString();
        }
        /**
        * @description اضافه کردن سال به تاریخ
        */
        addYears(years) {
            return this.setPersianYear(this.year + years);
        }
        /**
         * @description اضافه کردن ماه به تاریخ
         */
        addMonths(months) {
            const currentMonth = this.month;
            let currentYear = this.year;
            let newMonth = currentMonth + months;
            if (newMonth < 1) {
                newMonth += 12;
                currentYear--;
                return this.setPersianYear(currentYear).setPersianMonth(newMonth);
            }
            else {
                return this.setPersianMonth(newMonth);
            }
        }
        /**
         * @description اضافه کردن روز به تاریخ
         */
        addDays(days) {
            const dateTime = this.cloneDateTime();
            dateTime.setDate(dateTime.getDate() + days);
            return new PersianDateTime(dateTime);
        }
        /**
         * @description اضافه کردن ساعت به تاریخ
         */
        addHours(hours) {
            const dateTime = this.cloneDateTime();
            dateTime.setHours(dateTime.getHours() + hours);
            return new PersianDateTime(dateTime);
        }
        /**
         * @description اضافه کردن دقیقه به تاریخ
         */
        addMinutes(minutes) {
            const dateTime = this.cloneDateTime();
            dateTime.setMinutes(dateTime.getMinutes() + minutes);
            return new PersianDateTime(dateTime);
        }
        /**
         * @description اضافه کردن به ثانیه به تاریخ
         */
        addSeconds(seconds) {
            const dateTime = this.cloneDateTime();
            dateTime.setSeconds(dateTime.getSeconds() + seconds);
            return new PersianDateTime(dateTime);
        }
        /**
         * @description اضافه کردن به میلی ثانیه به تاریخ
         */
        addMilliSeconds(milliseconds) {
            const dateTime = this.cloneDateTime();
            dateTime.setMilliseconds(dateTime.getMilliseconds() + milliseconds);
            return new PersianDateTime(dateTime);
        }
        /**
         * @description گرفتن کپی از آبجکت
         */
        clone() {
            return new PersianDateTime(new Date(this.dateTime.getTime()));
        }
        cloneDateTime() {
            return new Date(this.dateTime.getTime());
        }
        /**
         * @description بدست آوردن آبجکت استاندارد تاریخ و زمان
         */
        toDate() {
            return this.cloneDateTime();
        }
        /**
         * @description بدست آوردن تعداد میلی ثانیه سپری شده از تاریخ 1 ژانویه 1970
         * معادل getTime آبجکت استاندارد تاریخ
         */
        getTime() {
            return this.dateTime.getTime();
        }
        /**
         * @description بدست آوردن تعداد میلی ثانیه سپری شده از تاریخ 1 ژانویه 1970
         * معادل getTime آبجکت استاندارد تاریخ بر مبنای خط گرینویچ
         * - یعنی بدون در نظر گرفتن +3.5 یا + یا ...4.5 وقت محلی
         */
        getTimeUTC() {
            return Date.UTC(this.dateTime.getUTCFullYear(), this.dateTime.getUTCMonth(), this.dateTime.getUTCDate(), this.dateTime.getUTCHours(), this.dateTime.getUTCMinutes(), this.dateTime.getUTCSeconds());
        }
        /**
         * @description دریافت تمامی تاریخ های روزهایی از هفته در طول سال
         * به طول مثال تاریخ های تمامی 5 شنبه های سال
         */
        static getDatesInYearByPersianDayOfWeek(year, daysOfWeek) {
            const firstDayOfYear = PersianDateTime.fromPersianDate(year, 1, 1);
            const lastDayOfYear = firstDayOfYear.getDateOfLastDayOfYear.getTime();
            let tempDate = PersianDateTime.fromPersianDate(year, 1, 1);
            const persianDates = [];
            while (tempDate.getTime() <= lastDayOfYear) {
                if (daysOfWeek.findIndex(dw => dw == tempDate.dayOfWeek) > -1) {
                    persianDates.push(tempDate.date.clone());
                }
                tempDate = tempDate.addDays(1);
            }
            return persianDates;
        }
        /**
         *  @description بدست آوردن اختلاف با تاریخ ورودی
         */
        getDifference(persianDateTime) {
            const isFirstDst = this.isDST(persianDateTime.toDate());
            const isSecondDst = this.isDST(this.dateTime);
            if (isFirstDst && !isSecondDst) {
                persianDateTime.addHours(-1);
            }
            if (isSecondDst && !isFirstDst) {
                this.dateTime.setHours(this.dateTime.getHours() + 1);
            }
            let diff = Math.abs(persianDateTime.getTimeUTC() - this.getTimeUTC());
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            diff -= days * (1000 * 60 * 60 * 24);
            let hours = Math.floor(diff / (1000 * 60 * 60));
            if (this.isDST(persianDateTime.toDate()))
                hours -= 1;
            if (this.isDST(this.dateTime))
                hours += 1;
            diff -= hours * (1000 * 60 * 60);
            const mins = Math.floor(diff / (1000 * 60));
            diff -= mins * (1000 * 60);
            const seconds = Math.floor(diff / (1000));
            diff -= seconds * (1000);
            return {
                days,
                hours,
                minutes: mins,
                seconds
            };
        }
        /**
         * @description تغییر سال
         * @param persianYear سال شمسی جدید
         * @returns تاریخ جدید
         */
        setPersianYear(persianYear) {
            return PersianDateTime.fromPersianDateTime(persianYear, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
        }
        /**
         * @description تغییر ماه
         * @param persianMonth ماه شمسی جدید
         * @returns تاریخ جدید
         */
        setPersianMonth(persianMonth) {
            const persianDateTime = this.getPersianDateTime();
            let day = persianDateTime.day;
            if (persianMonth > 6 && persianMonth < 12 && day > 30)
                day = 30;
            else if (persianMonth >= 12 && day > 29) {
                const isYearLeap = PersianDateConverter.isLeapPersianYear(persianDateTime.year);
                if (isYearLeap)
                    day = 30;
                else
                    day = 29;
            }
            return PersianDateTime.fromPersianDateTime(persianDateTime.year, persianMonth, day, persianDateTime.hour, persianDateTime.minute, persianDateTime.second, persianDateTime.millisecond);
        }
        /**
         * @description تغییر روز
         * @param persianDay روز شمسی جدید
         * @returns تاریخ جدید
         */
        setPersianDay(persianDay) {
            const persianDateTime = this.getPersianDateTime();
            return PersianDateTime.fromPersianDateTime(persianDateTime.year, persianDateTime.month, persianDay, persianDateTime.hour, persianDateTime.minute, persianDateTime.second, persianDateTime.millisecond);
        }
        /**
         * @description تغییر ساعت
         * @param hour ساعت جدید
         * @returns تاریخ جدید
         */
        setHour(hour) {
            const persianDateTime = this.getPersianDateTime();
            return PersianDateTime.fromPersianDateTime(persianDateTime.year, persianDateTime.month, persianDateTime.day, hour, persianDateTime.minute, persianDateTime.second, persianDateTime.millisecond);
        }
        /**
         * @description تغییر دقیقه
         * @param minute دقیقه جدید
         * @returns تاریخ جدید
         */
        setMinute(minute) {
            const persianDateTime = this.getPersianDateTime();
            return PersianDateTime.fromPersianDateTime(persianDateTime.year, persianDateTime.month, persianDateTime.day, persianDateTime.hour, minute, persianDateTime.second, persianDateTime.millisecond);
        }
        /**
         * @description تغییر ثانیه
         */
        setSecond(second) {
            const persianDateTime = this.getPersianDateTime();
            return PersianDateTime.fromPersianDateTime(persianDateTime.year, persianDateTime.month, persianDateTime.day, persianDateTime.hour, persianDateTime.minute, second, persianDateTime.millisecond);
        }
        /**
         * @description تغییر میلی ثانیه
         * @param millisecond میلی ثانیه جدید
         * @returns تاریخ جدید
         */
        setMillisecond(millisecond) {
            const persianDateTime = this.getPersianDateTime();
            return PersianDateTime.fromPersianDateTime(persianDateTime.year, persianDateTime.month, persianDateTime.day, persianDateTime.hour, persianDateTime.minute, persianDateTime.second, millisecond);
        }
        /**
         * @description تغییر تاریخ
         * @param year  سال شمسی
         * @param month ماه شمسی
         * @param day روز شمسی
         * @returns تاریخ جدید
         */
        setPersianDate(year, month, day) {
            const persianDateTime = this.getPersianDateTime();
            return PersianDateTime.fromPersianDateTime(year, month, day, persianDateTime.hour, persianDateTime.minute, persianDateTime.second, persianDateTime.millisecond);
        }
        /**
         * @description تغییر ساعت
         * @param hour ساعت
         * @param minute دقیقه
         * @param second ثانیه
         * @param millisecond میلی ثانیه
         * @returns تاریخ جدید
         */
        setTime(hour, minute, second, millisecond) {
            const persianDateTime = this.getPersianDateTime();
            return PersianDateTime.fromPersianDateTime(persianDateTime.year, persianDateTime.month, persianDateTime.day, hour, minute, second, millisecond);
        }
        isDST(dateTime) {
            const farvardin = new Date(dateTime.getFullYear(), 3, 21).getTimezoneOffset();
            const mehr = new Date(dateTime.getFullYear(), 9, 23).getTimezoneOffset();
            return Math.max(farvardin, mehr) != dateTime.getTimezoneOffset();
        }
        zeroPad(nr, base) {
            if (nr == undefined || nr == '')
                return base;
            const len = (String(base).length - String(nr).length) + 1;
            return len > 0 ? new Array(len).join('0') + nr : nr;
        }
        toPersianNumber(input) {
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
        }
        toEnglishNumber(input) {
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
        }
        static toEnglishNumber(input) {
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
        }
    }
    Mds.PersianDateTime = PersianDateTime;
    class PersianDateConverter {
        /*
         Converts a Gregorian date to Persian.
         */
        static toPersian(gregorianYear, gregorianMonth, gregorianDay) {
            return this.d2J(this.g2D(gregorianYear, gregorianMonth, gregorianDay));
        }
        /*
         Converts a Persian date to Gregorian.
         */
        static toGregorian(persianYear, persianMonth, persianDay) {
            return this.d2G(this.j2D(persianYear, persianMonth, persianDay));
        }
        /*
         Checks whether a Persian date is valid or not.
         */
        static isValidPersianDate(persianYear, persianMonth, persianDay) {
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
        static isLeapPersianYear(persianYear) {
            return this.persianCalendar(persianYear).leap == 0;
        }
        /*
         Number of days in a given month in a Persian year.
         */
        static getDaysInPersianMonth(persianYear, persianMonth) {
            if (persianMonth <= 6)
                return 31;
            if (persianMonth <= 11)
                return 30;
            if (this.isLeapPersianYear(persianYear))
                return 30;
            return 29;
        }
        static getDaysInPersianYear(persianYear) {
            if (this.isLeapPersianYear(persianYear))
                return 366;
            return 365;
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
         march: the march day of Farvardin the 1st (1st day of persianYear)
         @see: http://www.astro.uni.torun.pl/~kb/Papers/EMP/PersianC-EMP.htm
         @see: http://www.fourmilab.ch/documents/calendar/
         */
        static persianCalendar(persianYear) {
            // Persian years starting the 33-year rule.
            const breaks = [
                -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456,
                3178
            ];
            const bl = breaks.length;
            const gregorianYear = persianYear + 621;
            let leapJ = -14, jp = breaks[0], persianMonth, jump = 1, leap, n, i;
            if (persianYear < jp || persianYear >= breaks[bl - 1])
                throw new Error('سال شمسی نامعتبر است => ' + persianYear);
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
            // Determine the Gregorian date of Farvardin the 1st.
            const march = 20 + leapJ - leapG;
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
        }
        /*
         Converts a date of the Persian calendar to the Julian day number.
     
         @param persianYear Persian year (1 to 3100)
         @param persianMonth Persian month (1 to 12)
         @param persianDay Persian day (1 to 29/31)
         @return Julian day number
         */
        static j2D(persianYear, persianMonth, persianDay) {
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
        static d2J(jdn) {
            const gregorianYear = this.d2G(jdn).year;
            let persianYear = gregorianYear - 621;
            const r = this.persianCalendar(persianYear);
            const jdn1F = this.g2D(gregorianYear, 3, r.march);
            let persianDay, persianMonth, k;
            // Find number of days that passed since 1 Farvardin.
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
        }
        /*
         Converts the Julian day number from Gregorian or Julian
         calendar dates. This integer number corresponds to the noon of
         the date (i.e. 12 hours of Universal Time).
         The procedure was tested to be good since 1 march, -100100 (of both
         calendars) up to a few million years into the future.
     
         @param gregorianYear Calendar year (years BC numbered 0, -1, -2, ...)
         @param gregorianMonth Calendar month (1 to 12)
         @param gregorianDay Calendar day of the month (1 to 28/29/30/31)
         @return Julian day number
         */
        static g2D(gregorianYear, gregorianMonth, gregorianDay) {
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
         gregorianYear: Calendar year (years BC numbered 0, -1, -2, ...)
         gregorianMonth: Calendar month (1 to 12)
         gregorianDay: Calendar day of the month M (1 to 28/29/30/31)
         */
        static d2G(jdn) {
            let j;
            j = 4 * jdn + 139361631;
            j = j + this.div(this.div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
            const i = this.div(this.mod(j, 1461), 4) * 5 + 308;
            ;
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
        static div(a, b) {
            return ~~(a / b);
        }
        static mod(a, b) {
            return a - ~~(a / b) * b;
        }
    }
    let PersianDayOfWeek;
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
        /// چهارشنبه
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
    let GregorianDayOfWeek;
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
        /// چهارشنبه
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
    let AmPmEnum;
    (function (AmPmEnum) {
        AmPmEnum[AmPmEnum["None"] = 0] = "None";
        AmPmEnum[AmPmEnum["AM"] = 1] = "AM";
        AmPmEnum[AmPmEnum["PM"] = 2] = "PM";
    })(AmPmEnum || (AmPmEnum = {}));
    // در پارس کردن مورد استفاده قرا می گیرد
    let PersianDateTimeMonthEnum;
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
})(Mds || (Mds = {}));
//# sourceMappingURL=mds.persian.datetime.js.map