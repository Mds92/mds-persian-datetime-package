export namespace Mds {

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
      return PersianDateTime.fromPersianDateTime(persianYear, persianMonth, persianDay, 0, 0, 0, 0);
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
      const dateTime = PersianDateConverter.toGregorian(persianYear, persianMonth, persianDay);
      return new PersianDateTime(new Date(dateTime.year, dateTime.month - 1, dateTime.day, hour, minute, second, millisecond));
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

      const objValues = Object.keys(PersianDateTimeMonthEnum).map(k => PersianDateTimeMonthEnum[k]);
      const persianMonthNames = objValues.filter(v => typeof v === "string") as string[];

      if (containMonthSeperator) {

        // بدست آوردن ماه
        let monthMatch = persianDateTimeInString.match(/\d{2,4}-\d{1,2}(?=-\d{1,2}[^:])/img)
        if (monthMatch != null && monthMatch.length > 0)
          monthMatch = monthMatch[0].match(/-\d{1,2}/img);
        if (monthMatch != null && monthMatch.length > 0)
          month = monthMatch[0].replace(/\D+/img, '');

        if (month == '' || month == null)
          for (let i = 0; i < persianMonthNames.length; i++) {
            let monthName = persianMonthNames[i];
            if (persianDateTimeInString.indexOf(monthName) <= -1) continue;
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
      const persianDate = PersianDateConverter.toPersian(dateTime.getFullYear(), dateTime.getMonth() + 1, dateTime.getDay());
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
      const gregorianDayOfWeek = this.dateTime.getDay() as GregorianDayOfWeek;
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
     * روز شروع ماه
     */
    get startDayOfMonthDayOfWeek(): PersianDayOfWeek {
      const persianDateTime = this.getPersianDateTime();
      return PersianDateTime.fromPersianDate(persianDateTime.year, persianDateTime.month, 1).dayOfWeek;
    }

    /**
     * روز پایان ماه
     */
    get endDayOfMonthDayOfWeek(): PersianDayOfWeek {
      const persianDateTime = this.getPersianDateTime();
      return PersianDateTime.fromPersianDate(persianDateTime.year, persianDateTime.month, this.getMonthDays).dayOfWeek;
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
      const persianDateTime = this.getPersianDateTime();
      return PersianDateConverter.getDaysInPersianMonth(persianDateTime.year, persianDateTime.month);
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
    static get getPersianMonthNames(): string[] {
      return ["فروردین", "اردیبهشت", "خرداد",
        "تیر", "مرداد", "شهریور",
        "مهر", "آبان", "آذر",
        "دی", "بهمن", "اسفند"];
    }

    /**
     * بدست آوردن ایندکس ماه ایرانی از روی نام ماه
     */
    static getPersianMonthIndex(persianMonthName: string): number {
      return this.getPersianMonthNames.indexOf(persianMonthName);
    }

    /**
     * لیست روزهای هفته در تقویم فارسی
     */
    static get getPersianWeekdayNames(): string[] {
      return ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه"];
    }

    /**
     * بدست آوردن ایندکس نام روز ایرانی از روی نام روزها
     */
    static getPersianWeekdayIndex(persianWeekdayName: string): number {
      return this.getPersianWeekdayNames.indexOf(persianWeekdayName);
    }

    /**
     * لیست روزهای هفته در تقویم میلادی
     */
    static get getGregorianWeekdayNames(): string[] {
      return ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    }

    /**
     * بدست آوردن ایندکس نام روز میلادی از روی نام روزها
     */
    static getGregorianWeekdayIndex(gregorianWeekdayName: string): number {
      return this.getGregorianWeekdayNames.indexOf(gregorianWeekdayName);
    }

    /**
     * لیست نام ماه های تقویم میلادی
     */
    static get getGregorianMonthNames(): string[] {
      return ["January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"];
    }

    /**
    * بدست آوردن ایندکس نام ماه میلادی از روی نام ماه ها
    */
    static getGregorianMonthNameIndex(gregorianMonthName: string): number {
      return this.getGregorianMonthNames.indexOf(gregorianMonthName);
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
     * 
     * تاریخ بدون احتساب زمان
     * 
    **/
    get date(): PersianDateTime {
      const persianDateTime = this.getPersianDateTime();
      return PersianDateTime.fromPersianDate(persianDateTime.year, persianDateTime.month, persianDateTime.day);
    };

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
    toString(format: string = ''): string {
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
    };

    /**
    * اضافه کردن سال به تاریخ
    */
    addYears(years: number): PersianDateTime {
      return this.setPersianYear(this.year + years);
    }

    /**
     * اضافه کردن ماه به تاریخ
     */
    addMonths(months: number): PersianDateTime {
      const currentMonth = this.month;
      let currentYear = this.year;
      let newMonth = currentMonth + months;
      if (newMonth < 1) {
        newMonth += 12;
        currentYear--;
        return this.setPersianYear(currentYear).setPersianMonth(newMonth);
      } else {
        return this.setPersianMonth(newMonth);
      }
    }

    /**
     * اضافه کردن روز به تاریخ
     */
    addDays(days: number): PersianDateTime {
      const dateTime = this.cloneDateTime();
      dateTime.setDate(dateTime.getDate() + days);
      return new PersianDateTime(dateTime);
    }

    /**
     * اضافه کردن ساعت به تاریخ
     */
    addHours(hours: number): PersianDateTime {
      const dateTime = this.cloneDateTime();
      dateTime.setHours(dateTime.getHours() + hours);
      return new PersianDateTime(dateTime);
    }

    /**
     * اضافه کردن دقیقه به تاریخ
     */
    addMinutes(minutes: number): PersianDateTime {
      const dateTime = this.cloneDateTime();
      dateTime.setMinutes(dateTime.getMinutes() + minutes);
      return new PersianDateTime(dateTime);
    }

    /**
     * اضافه کردن به ثانیه به تاریخ
     */
    addSeconds(seconds: number): PersianDateTime {
      const dateTime = this.cloneDateTime();
      dateTime.setSeconds(dateTime.getSeconds() + seconds);
      return new PersianDateTime(dateTime);
    }

    /**
     * اضافه کردن به میلی ثانیه به تاریخ
     */
    addMilliSeconds(milliseconds: number): PersianDateTime {
      const dateTime = this.cloneDateTime();
      dateTime.setMilliseconds(dateTime.getMilliseconds() + milliseconds);
      return new PersianDateTime(dateTime);
    }

    /**
     * کم کردن دو تاریخ از همدیگر
     */
    subtract(persianDateTime: PersianDateTime): PersianDateTime {
      const datetime1 = this.cloneDateTime();
      const datetime2 = persianDateTime.toDate();
      datetime1.setFullYear(datetime1.getFullYear() - datetime2.getFullYear());
      datetime1.setMonth(datetime1.getMonth() - datetime2.getMonth());
      datetime1.setDate(datetime1.getDate() - datetime2.getDate());
      datetime1.setHours(datetime1.getHours() - datetime2.getHours());
      datetime1.setMinutes(datetime1.getMinutes() - datetime2.getMinutes());
      datetime1.setSeconds(datetime1.getSeconds() - datetime2.getSeconds());
      datetime1.setMilliseconds(datetime1.getMilliseconds() - datetime2.getMilliseconds());
      return new PersianDateTime(datetime1);
    }

    clone(): PersianDateTime {
      const dateTime = new Date(this.dateTime.getTime());
      return new PersianDateTime(dateTime);
    }
    private cloneDateTime() {
      return new Date(this.dateTime.getTime());
    }

    /**
     * بدست آوردن آبجکت استاندارد تاریخ و زمان
     */
    toDate() {
      return this.dateTime;
    }

    setPersianYear(persianYear: number): PersianDateTime {
      return PersianDateTime.fromPersianDateTime(persianYear, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
    }
    setPersianMonth(persianMonth: number): PersianDateTime {
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
    setPersianDay(persianDay: number): PersianDateTime {
      const persianDateTime = this.getPersianDateTime();
      return PersianDateTime.fromPersianDateTime(persianDateTime.year, persianDateTime.month, persianDay, persianDateTime.hour, persianDateTime.minute, persianDateTime.second, persianDateTime.millisecond);
    }
    setHour(hour: number): PersianDateTime {
      const persianDateTime = this.getPersianDateTime();
      return PersianDateTime.fromPersianDateTime(persianDateTime.year, persianDateTime.month, persianDateTime.day, hour, persianDateTime.minute, persianDateTime.second, persianDateTime.millisecond);
    }
    setMinute(minute: number): PersianDateTime {
      const persianDateTime = this.getPersianDateTime();
      return PersianDateTime.fromPersianDateTime(persianDateTime.year, persianDateTime.month, persianDateTime.day, persianDateTime.hour, minute, persianDateTime.second, persianDateTime.millisecond);
    }
    setSecond(second: number): PersianDateTime {
      const persianDateTime = this.getPersianDateTime();
      return PersianDateTime.fromPersianDateTime(persianDateTime.year, persianDateTime.month, persianDateTime.day, persianDateTime.hour, persianDateTime.minute, second, persianDateTime.millisecond);
    }
    setMillisecond(millisecond: number): PersianDateTime {
      const persianDateTime = this.getPersianDateTime();
      return PersianDateTime.fromPersianDateTime(persianDateTime.year, persianDateTime.month, persianDateTime.day, persianDateTime.hour, persianDateTime.minute, persianDateTime.second, millisecond);
    }
    setPersianDate(year: number, month: number, day: number): PersianDateTime {
      const persianDateTime = this.getPersianDateTime();
      return PersianDateTime.fromPersianDateTime(year, month, day, persianDateTime.hour, persianDateTime.minute, persianDateTime.second, persianDateTime.millisecond);
    }
    setTime(hour: number, minute: number, second: number, millisecond: number): PersianDateTime {
      const persianDateTime = this.getPersianDateTime();
      return PersianDateTime.fromPersianDateTime(persianDateTime.year, persianDateTime.month, persianDateTime.day,
        hour, minute, second, millisecond);
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

    static getDaysInPersianYear(persianYear): number {
      if (this.isLeapPersianYear(persianYear)) return 366;
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
    Saturday = 0,

    /// <summary>
    /// یکشنبه
    /// </summary>
    Sunday = 1,

    /// <summary>
    /// دو شنبه
    /// </summary>
    Monday = 2,

    /// <summary>
    /// سه شنبه
    /// </summary>
    Tuesday = 3,

    /// <summary>
    /// چهار شنبه
    /// </summary>
    Wednesday = 4,

    /// <summary>
    /// پنج شنبه
    /// </summary>
    Thursday = 5,

    /// <summary>
    /// جمعه
    /// </summary>
    Friday = 6
  }

  export enum GregorianDayOfWeek {
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