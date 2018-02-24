/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { InjectionToken, LOCALE_ID } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/** InjectionToken for datepicker that can be used to override default locale code. */
export const MAT_DATE_LOCALE = new InjectionToken<string>('MAT_DATE_LOCALE');

/** Provider for MAT_DATE_LOCALE injection token. */
export const MAT_DATE_LOCALE_PROVIDER = {
  provide: MAT_DATE_LOCALE,
  useExisting: LOCALE_ID
};

/** Adapts type `D` to be usable as a date by cdk-based components that work with dates. */
export abstract class DateAdapter<D> {
  /** The locale to use for all dates. */
  protected locale: any;

  /** A stream that emits when the locale changes. */
  get localeChanges(): Observable<void> {
    return this._localeChanges;
  }
  protected _localeChanges = new Subject<void>();

  /**
   * Gets the year component of the given date.
   * @param date The date to extract the year from.
   * @returns The year component.
   */
  abstract getYear(date: D): number;

  /**
   * Gets the month component of the given date.
   * @param date The date to extract the month from.
   * @returns The month component (0-indexed, 0 = January).
   */
  abstract getMonth(date: D): number;

  abstract getHours(date: D): number;

  abstract setHours(date: D, value: number): void;

  abstract getMinutes(date: D): number;

  abstract setMinutes(date: D, value: number): void;

  abstract setSeconds(date: D, value: number, ms?: number): void;

  /**
   * Gets the date of the month component of the given date.
   * @param date The date to extract the date of the month from.
   * @returns The month component (1-indexed, 1 = first of month).
   */
  abstract getDate(date: D): number;

  /**
   * Gets the day of the week component of the given date.
   * @param date The date to extract the day of the week from.
   * @returns The month component (0-indexed, 0 = Sunday).
   */
  abstract getDayOfWeek(date: D): number;

  /**
   * Gets a list of names for the months.
   * @param style The naming style (e.g. long = 'January', short = 'Jan', narrow = 'J').
   * @returns An ordered list of all month names, starting with January.
   */
  abstract getMonthNames(style: 'long' | 'short' | 'narrow'): string[];

  /**
   * Gets a list of names for the dates of the month.
   * @returns An ordered list of all date of the month names, starting with '1'.
   */
  abstract getDateNames(): string[];

  abstract getHourNames(): string[];

  abstract getMinuteNames(): string[];

  /**
   * Gets a list of names for the days of the week.
   * @param style The naming style (e.g. long = 'Sunday', short = 'Sun', narrow = 'S').
   * @returns An ordered list of all weekday names, starting with Sunday.
   */
  abstract getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];

  /**
   * Gets the name for the year of the given date.
   * @param date The date to get the year name for.
   * @returns The name of the given year (e.g. '2017').
   */
  abstract getYearName(date: D): string;

  /**
   * Gets the first day of the week.
   * @returns The first day of the week (0-indexed, 0 = Sunday).
   */
  abstract getFirstDayOfWeek(): number;

  /**
   * Gets the number of days in the month of the given date.
   * @param date The date whose month should be checked.
   * @returns The number of days in the month of the given date.
   */
  abstract getNumDaysInMonth(date: D): number;

  /**
   * Clones the given date.
   * @param date The date to clone
   * @returns A new date equal to the given date.
   */
  abstract clone(date: D): D;

  /**
   * Creates a date with the given year, month, and date. Does not allow over/under-flow of the
   * month and date.
   * @param year The full year of the date. (e.g. 89 means the year 89, not the year 1989).
   * @param month The month of the date (0-indexed, 0 = January). Must be an integer 0 - 11.
   * @param date The date of month of the date. Must be an integer 1 - length of the given month.
   * @returns The new date, or null if invalid.
   */
  abstract createDate(
    year: number,
    month: number,
    date: number,
    hours?: number,
    minutes?: number
  ): D;

  /**
   * Gets today's date.
   * @returns Today's date.
   */
  abstract today(): D;

  /**
   * Parses a date from a value.
   * @param value The value to parse.
   * @param parseFormat The expected format of the value being parsed
   *     (type is implementation-dependent).
   */
  abstract parse(value: any, parseFormat: any): D | null;

  /**
   * Formats a date as a string.
   * @param date The value to format.
   * @param displayFormat The format to use to display the date as a string.
   * @returns The formatted date string.
   */
  abstract format(date: D, displayFormat: any): string;

  /**
   * Adds the given number of years to the date. Years are counted as if flipping 12 pages on the
   * calendar for each year and then finding the closest date in the new month. For example when
   * adding 1 year to Feb 29, 2016, the resulting date will be Feb 28, 2017.
   * @param date The date to add years to.
   * @param years The number of years to add (may be negative).
   * @returns A new date equal to the given one with the specified number of years added.
   */
  abstract addCalendarYears(date: D, years: number): D;

  /**
   * Adds the given number of months to the date. Months are counted as if flipping a page on the
   * calendar for each month and then finding the closest date in the new month. For example when
   * adding 1 month to Jan 31, 2017, the resulting date will be Feb 28, 2017.
   * @param date The date to add months to.
   * @param months The number of months to add (may be negative).
   * @returns A new date equal to the given one with the specified number of months added.
   */
  abstract addCalendarMonths(date: D, months: number): D;

  /**
   * Adds the given number of days to the date. Days are counted as if moving one cell on the
   * calendar for each day.
   * @param date The date to add days to.
   * @param days The number of days to add (may be negative).
   * @returns A new date equal to the given one with the specified number of days added.
   */
  abstract addCalendarDays(date: D, days: number): D;

  abstract addCalendarHours(date: D, hours: number): D;

  abstract addCalendarMinutes(date: D, minutes: number): D;

  /**
   * Gets the RFC 3339 compatible string (https://tools.ietf.org/html/rfc3339) for the given date.
   * @param date The date to get the ISO date string for.
   * @returns The ISO date string date string.
   */
  abstract toIso8601(date: D): string;

  /**
   * Creates a date from an RFC 3339 compatible string (https://tools.ietf.org/html/rfc3339).
   * @param iso8601String The ISO date string to create a date from
   * @returns The date created from the ISO date string.
   */
  abstract fromIso8601(iso8601String: string): D | null;

  /**
   * Checks whether the given object is considered a date instance by this DateAdapter.
   * @param obj The object to check
   * @returns Whether the object is a date instance.
   */
  abstract isDateInstance(obj: any): boolean;

  /**
   * Checks whether the given date is valid.
   * @param date The date to check.
   * @returns Whether the date is valid.
   */
  abstract isValid(date: D): boolean;

  /**
   * Sets the locale used for all dates.
   * @param locale The new locale.
   */
  setLocale(locale: any) {
    this.locale = locale;
    this._localeChanges.next();
  }

  /**
   * Compares two dates.
   * @param first The first date to compare.
   * @param second The second date to compare.
   * @param unit Unit deep of the comparision.
   * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
   *     a number greater than 0 if the first date is later.
   */
  compareDate(first: D, second: D, unit = 'minute'): number {
    let f = this.getYear(first).toString();
    let s = this.getYear(second).toString();

    if (['y', 'year', 'years'].indexOf(unit) >= 0) {
      return Number(f) - Number(s);
    } else {
      f = f.concat(('00' + this.getMonth(first)).slice(-2));
      s = s.concat(('00' + this.getMonth(second)).slice(-2));
    }

    if (['M', 'month', 'months'].indexOf(unit) >= 0) {
      return Number(f) - Number(s);
    } else {
      f = f.concat(('00' + this.getDate(first)).slice(-2));
      s = s.concat(('00' + this.getDate(second)).slice(-2));
    }

    if (['d', 'day', 'days'].indexOf(unit) >= 0) {
      return Number(f) - Number(s);
    } else {
      f = f.concat(('00' + this.getHours(first)).slice(-2));
      s = s.concat(('00' + this.getHours(second)).slice(-2));
    }

    if (['h', 'hour', 'hours'].indexOf(unit) >= 0) {
      return Number(f) - Number(s);
    } else {
      f = f.concat(('00' + this.getMinutes(first)).slice(-2));
      s = s.concat(('00' + this.getMinutes(second)).slice(-2));
    }

    return Number(f) - Number(s);
  }

  /**
   * Checks if two dates are equal.
   * @param first The first date to check.
   * @param second The second date to check.
   * @param unit Unit deep of the comparision.
   * @returns Whether the two dates are equal.
   *     Null dates are considered equal to other null dates.
   */
  sameDate(first: D | null, second: D | null, unit = 'minute'): boolean {
    return first && second ? !this.compareDate(first, second, unit) : first === second;
  }

  /**
   * Clamp the given date between min and max dates.
   * @param date The date to clamp.
   * @param min The minimum value to allow. If null or omitted no min is enforced.
   * @param max The maximum value to allow. If null or omitted no max is enforced.
   * @param unit Unit deep of the comparision.
   * @returns `min` if `date` is less than `min`, `max` if date is greater than `max`,
   *     otherwise `date`.
   */
  clampDate(date: D | null, min?: D | null, max?: D | null, unit = 'minute'): D | null {
    if (!date) {
      return null;
    }
    if (min && this.compareDate(date, min, unit) < 0) {
      return min;
    }
    if (max && this.compareDate(date, max, unit) > 0) {
      return max;
    }
    return date;
  }
}
