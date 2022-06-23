	//Inline Date picker Property Deatil Page
    /**
    * @version: 2.1.24
    * @author: Dan Grossman http://www.dangrossman.info/
    * @copyright: Copyright (c) 2012-2016 Dan Grossman. All rights reserved.
    * @license: Licensed under the MIT license. See https://www.opensource.org/licenses/mit-license.php
    * @website: https://www.improvely.com/
    */
    // Follow the UMD template https://github.com/umdjs/umd/blob/master/templates/returnExportsGlobal.js
    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            // AMD. Make globaly available as well
            define(['moment', 'jquery'], function (moment, jquery) {
                return (root.daterangepicker = factory(moment, jquery));
            });
        } else if (typeof module === 'object' && module.exports) {
            // Node / Browserify
            //isomorphic issue
            var jQuery = (typeof window != 'undefined') ? window.jQuery : undefined;
            if (!jQuery) {
                jQuery = require('jquery');
                if (!jQuery.fn) jQuery.fn = {};
            }
            module.exports = factory(require('moment'), jQuery);
        } else {
            // Browser globals
            root.daterangepicker = factory(root.moment, root.jQuery);
        }
    }(this, function (moment, $) {
        var DateRangePicker = function (element, options, cb) {
    
            //default settings for options
            // If there is parentEl options we set it
            // Otherwise we check if inline options is set and we set the element.parent() by default or the body for a tootlip picker
            this.parentEl = (options && options.parentEl && $(options.parentEl).length) ? $(options.parentEl) :
              (options && options.inline) ? element.parent() : $('body');
            this.element = $(element);
            this.startDate = moment().startOf('day');
            this.endDate = moment().endOf('day');
            this.minDate = false;
            this.maxDate = false;
            this.dateLimit = false;
            this.autoApply = false;
            this.singleDatePicker = false;
            this.showDropdowns = false;
            this.showWeekNumbers = false;
            this.showISOWeekNumbers = false;
            this.showCustomRangeLabel = false;
            this.timePicker = false;
            this.timePicker24Hour = false;
            this.timePickerIncrement = 1;
            this.timePickerSeconds = false;
            this.linkedCalendars = true;
            this.autoUpdateInput = true;
            this.alwaysShowCalendars = false;
            this.inline = false;
            this.ranges = {};
    
            this.opens = 'right';
            if (this.element.hasClass('pull-right'))
                this.opens = 'left';
    
            this.drops = 'down';
            if (this.element.hasClass('dropup'))
                this.drops = 'up';
    
            this.buttonClasses = 'btn btn-sm';
            this.applyClass = 'btn-success';
            this.cancelClass = 'btn-default';
    
            this.locale = {
                direction: 'ltr',
                format: 'MM/DD/YYYY',
                separator: ' / ',
                applyLabel: 'Apply',
                cancelLabel: 'Cancel',
                weekLabel: 'W',
                customRangeLabel: 'Custom Range',
                daysOfWeek: moment.weekdaysMin(),
                monthNames: moment.monthsShort(),
                firstDay: moment.localeData().firstDayOfWeek()
            };
    
            this.callback = function () { };
    
            //some state information
            this.isShowing = false;
            this.leftCalendar = {};
            this.rightCalendar = {};
    
            //custom options from user
            if (typeof options !== 'object' || options === null)
                options = {};
    
            //allow setting options with data attributes
            //data-api options will be overwritten with custom javascript options
            options = $.extend(this.element.data(), options);
    
            //
            // handle all the possible options overriding defaults
            //
    
            if (typeof options.locale === 'object') {
    
                if (typeof options.locale.direction === 'string')
                    this.locale.direction = options.locale.direction;
    
                if (typeof options.locale.format === 'string')
                    this.locale.format = options.locale.format;
    
                if (typeof options.locale.separator === 'string')
                    this.locale.separator = options.locale.separator;
    
                if (typeof options.locale.daysOfWeek === 'object')
                    this.locale.daysOfWeek = options.locale.daysOfWeek.slice();
    
                if (typeof options.locale.monthNames === 'object')
                    this.locale.monthNames = options.locale.monthNames.slice();
    
                if (typeof options.locale.firstDay === 'number')
                    this.locale.firstDay = options.locale.firstDay;
    
                if (typeof options.locale.applyLabel === 'string')
                    this.locale.applyLabel = options.locale.applyLabel;
    
                if (typeof options.locale.cancelLabel === 'string')
                    this.locale.cancelLabel = options.locale.cancelLabel;
    
                if (typeof options.locale.weekLabel === 'string')
                    this.locale.weekLabel = options.locale.weekLabel;
    
                if (typeof options.locale.customRangeLabel === 'string')
                    this.locale.customRangeLabel = options.locale.customRangeLabel;
    
            }
    
    if (typeof options.startDate === 'string')
                this.startDate = moment(options.startDate, this.locale.format);
    
            if (typeof options.endDate === 'string')
                this.endDate = moment(options.endDate, this.locale.format);
    
            if (typeof options.minDate === 'string')
                this.minDate = moment(options.minDate, this.locale.format);
    
            if (typeof options.maxDate === 'string')
                this.maxDate = moment(options.maxDate, this.locale.format);
    
            if (typeof options.startDate === 'object')
                this.startDate = moment(options.startDate);
    
            if (typeof options.endDate === 'object')
                this.endDate = moment(options.endDate);
    
            if (typeof options.minDate === 'object')
                this.minDate = moment(options.minDate);
    
            if (typeof options.maxDate === 'object')
                this.maxDate = moment(options.maxDate);
    
            // sanity check for bad options
            if (this.minDate && this.startDate.isBefore(this.minDate))
                this.startDate = this.minDate.clone();
    
            // sanity check for bad options
            if (this.maxDate && this.endDate.isAfter(this.maxDate))
                this.endDate = this.maxDate.clone();
    
            if (typeof options.applyClass === 'string')
                this.applyClass = options.applyClass;
    
            if (typeof options.cancelClass === 'string')
                this.cancelClass = options.cancelClass;
    
            if (typeof options.dateLimit === 'object')
                this.dateLimit = options.dateLimit;
    
            if (typeof options.opens === 'string')
                this.opens = options.opens;
    
            if (typeof options.drops === 'string')
                this.drops = options.drops;
    
            if (typeof options.showWeekNumbers === 'boolean')
                this.showWeekNumbers = options.showWeekNumbers;
    
            if (typeof options.showISOWeekNumbers === 'boolean')
                this.showISOWeekNumbers = options.showISOWeekNumbers;
    
            if (typeof options.buttonClasses === 'string')
                this.buttonClasses = options.buttonClasses;
    
            if (typeof options.buttonClasses === 'object')
                this.buttonClasses = options.buttonClasses.join(' ');
    
            if (typeof options.showDropdowns === 'boolean')
                this.showDropdowns = options.showDropdowns;
    
            if (typeof options.showCustomRangeLabel === 'boolean')
                this.showCustomRangeLabel = options.showCustomRangeLabel;
    
            if (typeof options.singleDatePicker === 'boolean') {
                this.singleDatePicker = options.singleDatePicker;
                if (this.singleDatePicker)
                    this.endDate = this.startDate.clone();
            }
    
            if (typeof options.timePicker === 'boolean')
                this.timePicker = options.timePicker;
    
            if (typeof options.timePickerSeconds === 'boolean')
                this.timePickerSeconds = options.timePickerSeconds;
    
            if (typeof options.timePickerIncrement === 'number')
                this.timePickerIncrement = options.timePickerIncrement;
    
            if (typeof options.timePicker24Hour === 'boolean')
                this.timePicker24Hour = options.timePicker24Hour;
    
            if (typeof options.autoApply === 'boolean')
                this.autoApply = options.autoApply;
    
            if (typeof options.autoUpdateInput === 'boolean')
                this.autoUpdateInput = options.autoUpdateInput;
    
            if (typeof options.linkedCalendars === 'boolean')
                this.linkedCalendars = options.linkedCalendars;
    
            if (typeof options.isInvalidDate === 'function')
                this.isInvalidDate = options.isInvalidDate;
    
            if (typeof options.isCustomDate === 'function')
                this.isCustomDate = options.isCustomDate;
    
            if (typeof options.alwaysShowCalendars === 'boolean')
                this.alwaysShowCalendars = options.alwaysShowCalendars;
    
            if (typeof options.inline === 'boolean')
                this.inline = options.inline;
    
            // update day names order to firstDay
            if (this.locale.firstDay != 0) {
                var iterator = this.locale.firstDay;
                while (iterator > 0) {
                    this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
                    iterator--;
                }
            }
    
            //html template for the picker UI
            if (typeof options.template !== 'string' && !(options.template instanceof $))
                options.template = '<div class="daterangepicker ' + (this.inline ? 'daterangepicker-inline' : 'daterangepicker-tooltip dropdown-menu') + '">' +
                    '<div class="calendar left">' +
                        '<div class="daterangepicker_input">' +
                          '<input class="input-mini form-control" type="number" name="daterangepicker_start" value="" />' +
                          '<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
                          '<div class="calendar-time">' +
                            '<div></div>' +
                            '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
                          '</div>' +
                        '</div>' +
                        '<div class="calendar-table"></div>' +
                    '</div>' +
                    '<div class="calendar right">' +
                        '<div class="daterangepicker_input">' +
                          '<input class="input-mini form-control" type="number" name="daterangepicker_end" value="" />' +
                          '<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
                          '<div class="calendar-time">' +
                            '<div></div>' +
                            '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
                          '</div>' +
                        '</div>' +
                        '<div class="calendar-table"></div>' +
                    '</div>' 
                '</div>';
    
            this.container = $(options.template).appendTo(this.parentEl);
            this.container.addClass(this.locale.direction);
    
            var start, end, range;
    
            //if no start/end dates set, check if an input element contains initial values
            if (typeof options.startDate === 'undefined' && typeof options.endDate === 'undefined') {
                if ($(this.element).is('input[type=text]')) {
                    var val = $(this.element).val(),
                        split = val.split(this.locale.separator);
    
                    start = end = null;
    
                    if (split.length == 2) {
                        start = moment(split[0], this.locale.format);
                        end = moment(split[1], this.locale.format);
                    } else if (this.singleDatePicker && val !== "") {
                        start = moment(val, this.locale.format);
                        end = moment(val, this.locale.format);
                    }
                    if (start !== null && end !== null) {
                        this.setStartDate(start);
                        this.setEndDate(end);
                    }
                }
            }
    
            if (typeof options.ranges === 'object') {
                for (range in options.ranges) {
    
                    if (typeof options.ranges[range][0] === 'string')
                        start = moment(options.ranges[range][0], this.locale.format);
                    else
                        start = moment(options.ranges[range][0]);
    
                    if (typeof options.ranges[range][1] === 'string')
                        end = moment(options.ranges[range][1], this.locale.format);
                    else
                        end = moment(options.ranges[range][1]);
    
                    // If the start or end date exceed those allowed by the minDate or dateLimit
                    // options, shorten the range to the allowable period.
                    if (this.minDate && start.isBefore(this.minDate))
                        start = this.minDate.clone();
    
                    var maxDate = this.maxDate;
                    if (this.dateLimit && maxDate && start.clone().add(this.dateLimit).isAfter(maxDate))
                        maxDate = start.clone().add(this.dateLimit);
                    if (maxDate && end.isAfter(maxDate))
                        end = maxDate.clone();
    
                    // If the end of the range is before the minimum or the start of the range is
                    // after the maximum, don't display this range option at all.
                    if ((this.minDate && end.isBefore(this.minDate, this.timepicker ? 'minute' : 'day'))
                      || (maxDate && start.isAfter(maxDate, this.timepicker ? 'minute' : 'day')))
                        continue;
    
                    //Support unicode chars in the range names.
                    var elem = document.createElement('textarea');
                    elem.innerHTML = range;
                    var rangeHtml = elem.value;
    
                    this.ranges[rangeHtml] = [start, end];
                }
    
                var list = '<ul>';
                for (range in this.ranges) {
                    list += '<li data-range-key="' + range + '">' + range + '</li>';
                }
                if (this.showCustomRangeLabel) {
                    list += '<li data-range-key="' + this.locale.customRangeLabel + '">' + this.locale.customRangeLabel + '</li>';
                }
                list += '</ul>';
                this.container.find('.ranges').prepend(list);
            }
    
            if (typeof cb === 'function') {
                this.callback = cb;
            }
    
            if (!this.timePicker) {
                this.startDate = this.startDate.startOf('day');
                this.endDate = this.endDate.endOf('day');
                this.container.find('.calendar-time').hide();
            }
    
            // can't be used together for now
            // You can only use it with inline option
            if (this.timePicker && this.autoApply && !this.inline)
                this.autoApply = false;
    
            if (this.autoApply && typeof options.ranges !== 'object') {
                this.container.find('.ranges').hide();
            } else if (this.autoApply) {
                this.container.find('.applyBtn, .cancelBtn').addClass('hide');
            }
    
            if (this.singleDatePicker) {
                this.container.addClass('single');
                this.container.find('.calendar.left').addClass('single');
                this.container.find('.calendar.left').show();
                this.container.find('.calendar.right').hide();
                this.container.find('.daterangepicker_input input, .daterangepicker_input > i').hide();
                if (this.timePicker) {
                    this.container.find('.ranges ul').hide();
                } else {
                    this.container.find('.ranges').hide();
                }
            }
    
            if ((typeof options.ranges === 'undefined' && !this.singleDatePicker) || this.alwaysShowCalendars) {
                this.container.addClass('show-calendar');
            }
    
            this.container.addClass('opens' + this.opens);
    
            //swap the position of the predefined ranges if opens right
            if (typeof options.ranges !== 'undefined' && this.opens == 'right') {
                this.container.find('.ranges').prependTo(this.container.find('.calendar.left').parent());
            }
    
            //apply CSS classes and labels to buttons
            this.container.find('.applyBtn, .cancelBtn').addClass(this.buttonClasses);
            if (this.applyClass.length)
                this.container.find('.applyBtn').addClass(this.applyClass);
            if (this.cancelClass.length)
                this.container.find('.cancelBtn').addClass(this.cancelClass);
            this.container.find('.applyBtn').html(this.locale.applyLabel);
            this.container.find('.cancelBtn').html(this.locale.cancelLabel);
    
            //
            // event listeners
            //
    
            this.container.find('.calendar')
                .on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this))
                .on('click.daterangepicker', '.next', $.proxy(this.clickNext, this))
                .on('mousedown.daterangepicker', 'td.available', $.proxy(this.clickDate, this))
                .on('mouseenter.daterangepicker', 'td.available', $.proxy(this.hoverDate, this))
                .on('mouseleave.daterangepicker', 'td.available', $.proxy(this.updateFormInputs, this))
                .on('change.daterangepicker', 'select.yearselect', $.proxy(this.monthOrYearChanged, this))
                .on('change.daterangepicker', 'select.monthselect', $.proxy(this.monthOrYearChanged, this))
                .on('change.daterangepicker', 'select.hourselect,select.minuteselect,select.secondselect,select.ampmselect', $.proxy(this.timeChanged, this))
                .on('click.daterangepicker', '.daterangepicker_input input', $.proxy(this.showCalendars, this))
                .on('focus.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsFocused, this))
                .on('blur.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsBlurred, this))
                .on('change.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsChanged, this));
    
            this.container.find('.ranges')
                .on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this))
                .on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this))
                .on('click.daterangepicker', 'li', $.proxy(this.clickRange, this))
                .on('mouseenter.daterangepicker', 'li', $.proxy(this.hoverRange, this))
                .on('mouseleave.daterangepicker', 'li', $.proxy(this.updateFormInputs, this));
    
            if (this.element.is('input') || this.element.is('button')) {
                this.element.on({
                    'click.daterangepicker': $.proxy(this.show, this),
                    'focus.daterangepicker': $.proxy(this.show, this),
                    'keyup.daterangepicker': $.proxy(this.elementChanged, this),
                    'keydown.daterangepicker': $.proxy(this.keydown, this)
                });
            } else {
                this.element.on('click.daterangepicker', $.proxy(this.toggle, this));
            }
    
            //
            // if attached to a text input, set the initial value
            //
    
            if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
                this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
                this.element.trigger('change');
            } else if (this.element.is('input') && this.autoUpdateInput) {
                this.element.val(this.startDate.format(this.locale.format));
                this.element.trigger('change');
            }
    
            // Show the daterangepicker since it's started for inline mode
            if (this.inline)
                this.show()
        };
    
        DateRangePicker.prototype = {
    
            constructor: DateRangePicker,
    
            setStartDate: function (startDate) {
                if (typeof startDate === 'string')
                    this.startDate = moment(startDate, this.locale.format);
    
                if (typeof startDate === 'object')
                    this.startDate = moment(startDate);
    
                if (!this.timePicker)
                    this.startDate = this.startDate.startOf('day');
    
                if (this.timePicker && this.timePickerIncrement)
                    this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
    
                if (this.minDate && this.startDate.isBefore(this.minDate)) {
                    this.startDate = this.minDate;
                    if (this.timePicker && this.timePickerIncrement)
                        this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
                }
    
                if (this.maxDate && this.startDate.isAfter(this.maxDate)) {
                    this.startDate = this.maxDate;
                    if (this.timePicker && this.timePickerIncrement)
                        this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
                }
    
                if (!this.isShowing)
                    this.updateElement();
    
                this.updateMonthsInView();
            },
    
            setEndDate: function (endDate) {
                if (typeof endDate === 'string')
                    this.endDate = moment(endDate, this.locale.format);
    
                if (typeof endDate === 'object')
                    this.endDate = moment(endDate);
    
                if (!this.timePicker)
                    this.endDate = this.endDate.endOf('day');
    
                if (this.timePicker && this.timePickerIncrement)
                    this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
    
                if (this.endDate.isBefore(this.startDate))
                    this.endDate = this.startDate.clone();
    
                if (this.maxDate && this.endDate.isAfter(this.maxDate))
                    this.endDate = this.maxDate;
    
                if (this.dateLimit && this.startDate.clone().add(this.dateLimit).isBefore(this.endDate))
                    this.endDate = this.startDate.clone().add(this.dateLimit);
    
                this.previousRightTime = this.endDate.clone();
    
                if (!this.isShowing)
                    this.updateElement();
    
                this.updateMonthsInView();
            },
    
            isInvalidDate: function () {
                return false;
            },
    
            isCustomDate: function () {
                return false;
            },
    
            updateView: function () {
                if (this.timePicker) {
                    this.renderTimePicker('left');
                    this.renderTimePicker('right');
                    if (!this.endDate) {
                        this.container.find('.right .calendar-time select').attr('disabled', 'disabled').addClass('disabled');
                    } else {
                        this.container.find('.right .calendar-time select').removeAttr('disabled').removeClass('disabled');
                    }
                }
                if (this.endDate) {
                    this.container.find('input[name="daterangepicker_end"]').removeClass('active');
                    this.container.find('input[name="daterangepicker_start"]').addClass('active');
                } else {
                    this.container.find('input[name="daterangepicker_end"]').addClass('active');
                    this.container.find('input[name="daterangepicker_start"]').removeClass('active');
                }
                this.updateMonthsInView();
                this.updateCalendars();
                this.updateFormInputs();
            },
    
            updateMonthsInView: function () {
                if (this.endDate) {
    
                    //if both dates are visible already, do nothing
                    if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month &&
                        (this.startDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.startDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                        &&
                        (this.endDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.endDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                        ) {
                        return;
                    }
    
                    this.leftCalendar.month = this.startDate.clone().date(2);
                    if (!this.linkedCalendars && (this.endDate.month() != this.startDate.month() || this.endDate.year() != this.startDate.year())) {
                        this.rightCalendar.month = this.endDate.clone().date(2);
                    } else {
                        this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                    }
    
                } else {
                    if (this.leftCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM') && this.rightCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM')) {
                        this.leftCalendar.month = this.startDate.clone().date(2);
                        this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                    }
                }
                if (this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate) {
                    this.rightCalendar.month = this.maxDate.clone().date(2);
                    this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, 'month');
                }
            },
    
            updateCalendars: function () {
    
                if (this.timePicker) {
                    var hour, minute, second;
                    if (this.endDate) {
                        hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                        minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                        second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                        if (!this.timePicker24Hour) {
                            var ampm = this.container.find('.left .ampmselect').val();
                            if (ampm === 'PM' && hour < 12)
                                hour += 12;
                            if (ampm === 'AM' && hour === 12)
                                hour = 0;
                        }
                    } else {
                        hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                        minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                        second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                        if (!this.timePicker24Hour) {
                            var ampm = this.container.find('.right .ampmselect').val();
                            if (ampm === 'PM' && hour < 12)
                                hour += 12;
                            if (ampm === 'AM' && hour === 12)
                                hour = 0;
                        }
                    }
                    this.leftCalendar.month.hour(hour).minute(minute).second(second);
                    this.rightCalendar.month.hour(hour).minute(minute).second(second);
                }
    
                this.renderCalendar('left');
                this.renderCalendar('right');
    
                //highlight any predefined range matching the current start and end dates
                this.container.find('.ranges li').removeClass('active');
                if (this.endDate == null) return;
    
                this.calculateChosenLabel();
            },
    
            renderCalendar: function (side) {
    
                //
                // Build the matrix of dates that will populate the calendar
                //
    
                var calendar = side == 'left' ? this.leftCalendar : this.rightCalendar;
                var month = calendar.month.month();
                var year = calendar.month.year();
                var hour = calendar.month.hour();
                var minute = calendar.month.minute();
                var second = calendar.month.second();
                var daysInMonth = moment([year, month]).daysInMonth();
                var firstDay = moment([year, month, 1]);
                var lastDay = moment([year, month, daysInMonth]);
                var lastMonth = moment(firstDay).subtract(1, 'month').month();
                var lastYear = moment(firstDay).subtract(1, 'month').year();
                var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
                var dayOfWeek = firstDay.day();
    
                //initialize a 6 rows x 7 columns array for the calendar
                var calendar = [];
                calendar.firstDay = firstDay;
                calendar.lastDay = lastDay;
    
                for (var i = 0; i < 6; i++) {
                    calendar[i] = [];
                }
    
                //populate the calendar with date objects
                var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
                if (startDay > daysInLastMonth)
                    startDay -= 7;
    
                if (dayOfWeek == this.locale.firstDay)
                    startDay = daysInLastMonth - 6;
    
                var curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);
    
                var col, row;
                for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
                    if (i > 0 && col % 7 === 0) {
                        col = 0;
                        row++;
                    }
                    calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
                    curDate.hour(12);
    
                    if (this.minDate && calendar[row][col].format('YYYY-MM-DD') == this.minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(this.minDate) && side == 'left') {
                        calendar[row][col] = this.minDate.clone();
                    }
    
                    if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') == this.maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(this.maxDate) && side == 'right') {
                        calendar[row][col] = this.maxDate.clone();
                    }
    
                }
    
                //make the calendar object available to hoverDate/clickDate
                if (side == 'left') {
                    this.leftCalendar.calendar = calendar;
                } else {
                    this.rightCalendar.calendar = calendar;
                }
    
                //
                // Display the calendar
                //
    
                var minDate = side == 'left' ? this.minDate : this.startDate;
                var maxDate = this.maxDate;
                var selected = side == 'left' ? this.startDate : this.endDate;
                var arrow = this.locale.direction == 'ltr' ? { left: 'chevron-left', right: 'chevron-right' } : { left: 'chevron-right', right: 'chevron-left' };
    
                var html = '<table class="table-condensed">';
                html += '<thead>';
                html += '<tr>';
    
                // add empty cell for week number
                if (this.showWeekNumbers || this.showISOWeekNumbers)
                    html += '<th></th>';
    
                if ((!minDate || minDate.isBefore(calendar.firstDay)) && (!this.linkedCalendars || side == 'left')) {
                    html += '<th class="prev available"><i class="fa fa-' + arrow.left + ' glyphicon glyphicon-' + arrow.left + '"></i></th>';
                } else {
                    html += '<th></th>';
                }
    
                var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");
    
                if (this.showDropdowns) {
                    var currentMonth = calendar[1][1].month();
                    var currentYear = calendar[1][1].year();
                    var maxYear = (maxDate && maxDate.year()) || (currentYear + 5);
                    var minYear = (minDate && minDate.year()) || (currentYear - 50);
                    var inMinYear = currentYear == minYear;
                    var inMaxYear = currentYear == maxYear;
    
                    var monthHtml = '<select class="monthselect">';
                    for (var m = 0; m < 12; m++) {
                        if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
                            monthHtml += "<option value='" + m + "'" +
                                (m === currentMonth ? " selected='selected'" : "") +
                                ">" + this.locale.monthNames[m] + "</option>";
                        } else {
                            monthHtml += "<option value='" + m + "'" +
                                (m === currentMonth ? " selected='selected'" : "") +
                                " disabled='disabled'>" + this.locale.monthNames[m] + "</option>";
                        }
                    }
                    monthHtml += "</select>";
    
                    var yearHtml = '<select class="yearselect">';
                    for (var y = minYear; y <= maxYear; y++) {
                        yearHtml += '<option value="' + y + '"' +
                            (y === currentYear ? ' selected="selected"' : '') +
                            '>' + y + '</option>';
                    }
                    yearHtml += '</select>';
    
                    dateHtml = monthHtml + yearHtml;
                }
    
                html += '<th colspan="5" class="month">' + dateHtml + '</th>';
                if ((!maxDate || maxDate.isAfter(calendar.lastDay)) && (!this.linkedCalendars || side == 'right' || this.singleDatePicker)) {
                    html += '<th class="next available"><i class="fa fa-' + arrow.right + ' glyphicon glyphicon-' + arrow.right + '"></i></th>';
                } else {
                    html += '<th></th>';
                }
    
                html += '</tr>';
                html += '<tr>';
    
                // add week number label
                if (this.showWeekNumbers || this.showISOWeekNumbers)
                    html += '<th class="week">' + this.locale.weekLabel + '</th>';
    
                $.each(this.locale.daysOfWeek, function (index, dayOfWeek) {
                    html += '<th>' + dayOfWeek + '</th>';
                });
    
                html += '</tr>';
                html += '</thead>';
                html += '<tbody>';
    
                //adjust maxDate to reflect the dateLimit setting in order to
                //grey out end dates beyond the dateLimit
                if (this.endDate == null && this.dateLimit) {
                    var maxLimit = this.startDate.clone().add(this.dateLimit).endOf('day');
                    if (!maxDate || maxLimit.isBefore(maxDate)) {
                        maxDate = maxLimit;
                    }
                }
    
                for (var row = 0; row < 6; row++) {
                    html += '<tr>';
    
                    // add week number
                    if (this.showWeekNumbers)
                        html += '<td class="week">' + calendar[row][0].week() + '</td>';
                    else if (this.showISOWeekNumbers)
                        html += '<td class="week">' + calendar[row][0].isoWeek() + '</td>';
    
                    for (var col = 0; col < 7; col++) {
    
                        var classes = [];
    
                        //highlight today's date
                        if (calendar[row][col].isSame(new Date(), "day"))
                            classes.push('today');
    
                        //highlight weekends
                        if (calendar[row][col].isoWeekday() > 5)
                            classes.push('weekend');
    
                        //grey out the dates in other months displayed at beginning and end of this calendar
                        if (calendar[row][col].month() != calendar[1][1].month())
                            classes.push('off');
    
                        //don't allow selection of dates before the minimum date
                        if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day'))
                            classes.push('off', 'disabled');
    
                        //don't allow selection of dates after the maximum date
                        if (maxDate && calendar[row][col].isAfter(maxDate, 'day'))
                            classes.push('off', 'disabled');
    
                        //don't allow selection of date if a custom function decides it's invalid
                        if (this.isInvalidDate(calendar[row][col]))
                            classes.push('off', 'disabled');
    
                        //highlight the currently selected start date
                        if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD'))
                            classes.push('active', 'start-date');
    
                        //highlight the currently selected end date
                        if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD'))
                            classes.push('active', 'end-date');
    
                        //highlight dates in-between the selected dates
                        if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate)
                            classes.push('in-range');
    
                        //apply custom classes for this date
                        var isCustom = this.isCustomDate(calendar[row][col]);
                        if (isCustom !== false) {
                            if (typeof isCustom === 'string')
                                classes.push(isCustom);
                            else
                                Array.prototype.push.apply(classes, isCustom);
                        }
    
                        var cname = '', disabled = false;
                        for (var i = 0; i < classes.length; i++) {
                            cname += classes[i] + ' ';
                            if (classes[i] == 'disabled')
                                disabled = true;
                        }
                        if (!disabled)
                            cname += 'available';
    
                        html += '<td class="' + cname.replace(/^\s+|\s+$/g, '') + '" data-title="' + 'r' + row + 'c' + col + '">' + calendar[row][col].date() + '</td>';
    
                    }
                    html += '</tr>';
                }
    
                html += '</tbody>';
                html += '</table>';
    
                this.container.find('.calendar.' + side + ' .calendar-table').html(html);
    
            },
    
            renderTimePicker: function (side) {
    
                // Don't bother updating the time picker if it's currently disabled
                // because an end date hasn't been clicked yet
                if (side == 'right' && !this.endDate) return;
    
                var html, selected, minDate, maxDate = this.maxDate;
    
                if (this.dateLimit && (!this.maxDate || this.startDate.clone().add(this.dateLimit).isAfter(this.maxDate)))
                    maxDate = this.startDate.clone().add(this.dateLimit);
    
                if (side == 'left') {
                    selected = this.startDate.clone();
                    minDate = this.minDate;
                } else if (side == 'right') {
                    selected = this.endDate.clone();
                    minDate = this.startDate;
    
                    //Preserve the time already selected
                    var timeSelector = this.container.find('.calendar.right .calendar-time div');
                    if (!this.endDate && timeSelector.html() != '') {
    
                        selected.hour(timeSelector.find('.hourselect option:selected').val() || selected.hour());
                        selected.minute(timeSelector.find('.minuteselect option:selected').val() || selected.minute());
                        selected.second(timeSelector.find('.secondselect option:selected').val() || selected.second());
    
                        if (!this.timePicker24Hour) {
                            var ampm = timeSelector.find('.ampmselect option:selected').val();
                            if (ampm === 'PM' && selected.hour() < 12)
                                selected.hour(selected.hour() + 12);
                            if (ampm === 'AM' && selected.hour() === 12)
                                selected.hour(0);
                        }
    
                    }
    
                    if (selected.isBefore(this.startDate))
                        selected = this.startDate.clone();
    
                    if (maxDate && selected.isAfter(maxDate))
                        selected = maxDate.clone();
    
                }
    
                //
                // hours
                //
    
                html = '<select class="hourselect">';
    
                var start = this.timePicker24Hour ? 0 : 1;
                var end = this.timePicker24Hour ? 23 : 12;
    
                for (var i = start; i <= end; i++) {
                    var i_in_24 = i;
                    if (!this.timePicker24Hour)
                        i_in_24 = selected.hour() >= 12 ? (i == 12 ? 12 : i + 12) : (i == 12 ? 0 : i);
    
                    var time = selected.clone().hour(i_in_24);
                    var disabled = false;
                    if (minDate && time.minute(59).isBefore(minDate))
                        disabled = true;
                    if (maxDate && time.minute(0).isAfter(maxDate))
                        disabled = true;
    
                    if (i_in_24 == selected.hour() && !disabled) {
                        html += '<option value="' + i + '" selected="selected">' + i + '</option>';
                    } else if (disabled) {
                        html += '<option value="' + i + '" disabled="disabled" class="disabled">' + i + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + i + '</option>';
                    }
                }
    
                html += '</select> ';
    
                //
                // minutes
                //
    
                html += ': <select class="minuteselect">';
    
                for (var i = 0; i < 60; i += this.timePickerIncrement) {
                    var padded = i < 10 ? '0' + i : i;
                    var time = selected.clone().minute(i);
    
                    var disabled = false;
                    if (minDate && time.second(59).isBefore(minDate))
                        disabled = true;
                    if (maxDate && time.second(0).isAfter(maxDate))
                        disabled = true;
    
                    if (selected.minute() == i && !disabled) {
                        html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                    } else if (disabled) {
                        html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + padded + '</option>';
                    }
                }
    
                html += '</select> ';
    
                //
                // seconds
                //
    
                if (this.timePickerSeconds) {
                    html += ': <select class="secondselect">';
    
                    for (var i = 0; i < 60; i++) {
                        var padded = i < 10 ? '0' + i : i;
                        var time = selected.clone().second(i);
    
                        var disabled = false;
                        if (minDate && time.isBefore(minDate))
                            disabled = true;
                        if (maxDate && time.isAfter(maxDate))
                            disabled = true;
    
                        if (selected.second() == i && !disabled) {
                            html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                        } else if (disabled) {
                            html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                        } else {
                            html += '<option value="' + i + '">' + padded + '</option>';
                        }
                    }
    
                    html += '</select> ';
                }
    
                //
                // AM/PM
                //
    
                if (!this.timePicker24Hour) {
                    html += '<select class="ampmselect">';
    
                    var am_html = '';
                    var pm_html = '';
    
                    if (minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate))
                        am_html = ' disabled="disabled" class="disabled"';
    
                    if (maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate))
                        pm_html = ' disabled="disabled" class="disabled"';
    
                    if (selected.hour() >= 12) {
                        html += '<option value="AM"' + am_html + '>AM</option><option value="PM" selected="selected"' + pm_html + '>PM</option>';
                    } else {
                        html += '<option value="AM" selected="selected"' + am_html + '>AM</option><option value="PM"' + pm_html + '>PM</option>';
                    }
    
                    html += '</select>';
                }
    
                this.container.find('.calendar.' + side + ' .calendar-time div').html(html);
    
            },
    
            updateFormInputs: function () {
    
                //ignore mouse movements while an above-calendar text input has focus
                if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                    return;
    
                this.container.find('input[name=daterangepicker_start]').val(this.startDate.format(this.locale.format));
                if (this.endDate)
                    this.container.find('input[name=daterangepicker_end]').val(this.endDate.format(this.locale.format));
    
                if (this.singleDatePicker || (this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)))) {
                    this.container.find('button.applyBtn').removeAttr('disabled');
                } else {
                    this.container.find('button.applyBtn').attr('disabled', 'disabled');
                }
    
            },
    
            move: function () {
                // Should not move if it's inline mode
                if (this.inline)
                    return;
    
                var parentOffset = { top: 0, left: 0 },
                    containerTop;
                var parentRightEdge = $(window).width();
                if (!this.parentEl.is('body')) {
                    parentOffset = {
                        top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                        left: this.parentEl.offset().left - this.parentEl.scrollLeft()
                    };
                    parentRightEdge = this.parentEl[0].clientWidth + this.parentEl.offset().left;
                }
    
                if (this.drops == 'up')
                    containerTop = this.element.offset().top - this.container.outerHeight() - parentOffset.top;
                else
                    containerTop = this.element.offset().top + this.element.outerHeight() - parentOffset.top;
                this.container[this.drops == 'up' ? 'addClass' : 'removeClass']('dropup');
    
                if (this.opens == 'left') {
                    this.container.css({
                        top: containerTop,
                        right: parentRightEdge - this.element.offset().left - this.element.outerWidth(),
                        left: 'auto'
                    });
                    if (this.container.offset().left < 0) {
                        this.container.css({
                            right: 'auto',
                            left: 9
                        });
                    }
                } else if (this.opens == 'center') {
                    this.container.css({
                        top: containerTop,
                        left: this.element.offset().left - parentOffset.left + this.element.outerWidth() / 2
                                - this.container.outerWidth() / 2,
                        right: 'auto'
                    });
                    if (this.container.offset().left < 0) {
                        this.container.css({
                            right: 'auto',
                            left: 9
                        });
                    }
                } else {
                    this.container.css({
                        top: containerTop,
                        left: this.element.offset().left - parentOffset.left,
                        right: 'auto'
                    });
                    if (this.container.offset().left + this.container.outerWidth() > $(window).width()) {
                        this.container.css({
                            left: 'auto',
                            right: 0
                        });
                    }
                }
            },
    
            show: function (e) {
                if (this.isShowing) return;
    
                // Create a click proxy that is private to this instance of datepicker, for unbinding
                this._outsideClickProxy = $.proxy(function (e) { this.outsideClick(e); }, this);
    
                // Bind global datepicker mousedown for hiding and
                $(document)
                  .on('mousedown.daterangepicker', this._outsideClickProxy)
                  // also support mobile devices
                  .on('touchend.daterangepicker', this._outsideClickProxy)
                  // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
                  .on('click.daterangepicker', '[data-toggle=dropdown]', this._outsideClickProxy)
                  // and also close when focus changes to outside the picker (eg. tabbing between controls)
                  .on('focusin.daterangepicker', this._outsideClickProxy);
    
                // Reposition the picker if the window is resized while it's open
                $(window).on('resize.daterangepicker', $.proxy(function (e) { this.move(e); }, this));
    
                this.oldStartDate = this.startDate.clone();
                this.oldEndDate = this.endDate.clone();
                this.previousRightTime = this.endDate.clone();
    
                this.updateView();
                this.container.show();
                this.move();
                this.element.trigger('show.daterangepicker', this);
                this.isShowing = true;
            },
    
            hide: function (e) {
                if (!this.isShowing) return;
    
                //if picker is attached to a text input, update it
                this.updateElement();
    
                $(document).off('.daterangepicker');
                $(window).off('.daterangepicker');
                this.container.hide();
                this.element.trigger('hide.daterangepicker', this);
                this.isShowing = false;
            },
    
            toggle: function (e) {
                if (this.isShowing && !this.inline) {
                    this.hide();
                } else {
                    this.show();
                }
            },
    
            outsideClick: function (e) {
                var target = $(e.target);
                // if the page is clicked anywhere except within the daterangerpicker/button
                // itself then call this.hide()
                if (
                    // ie modal dialog fix
                    e.type == "focusin" ||
                    target.closest(this.element).length ||
                    target.closest(this.container).length ||
                    target.closest('.calendar-table').length ||
                    this.inline
                    ) return;
                this.hide();
                this.element.trigger('outsideClick.daterangepicker', this);
            },
    
            showCalendars: function () {
                this.container.addClass('show-calendar');
                this.move();
                this.element.trigger('showCalendar.daterangepicker', this);
            },
    
            hideCalendars: function () {
                this.container.removeClass('show-calendar');
                this.element.trigger('hideCalendar.daterangepicker', this);
            },
    
            hoverRange: function (e) {
    
                //ignore mouse movements while an above-calendar text input has focus
                if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                    return;
    
                var label = e.target.getAttribute('data-range-key');
    
                if (label == this.locale.customRangeLabel) {
                    this.updateView();
                } else {
                    var dates = this.ranges[label];
                    this.container.find('input[name=daterangepicker_start]').val(dates[0].format(this.locale.format));
                    this.container.find('input[name=daterangepicker_end]').val(dates[1].format(this.locale.format));
                }
    
            },
    
            clickRange: function (e) {
                var label = e.target.getAttribute('data-range-key');
                this.chosenLabel = label;
                if (label == this.locale.customRangeLabel) {
                    this.showCalendars();
                } else {
                    var dates = this.ranges[label];
                    this.startDate = dates[0];
                    this.endDate = dates[1];
    
                    if (!this.timePicker) {
                        this.startDate.startOf('day');
                        this.endDate.endOf('day');
                    }
    
                    if (!this.alwaysShowCalendars)
                        this.hideCalendars();
                    this.clickApply();
                }
            },
    
            clickPrev: function (e) {
                var cal = $(e.target).parents('.calendar');
                if (cal.hasClass('left')) {
                    this.leftCalendar.month.subtract(1, 'month');
                    if (this.linkedCalendars)
                        this.rightCalendar.month.subtract(1, 'month');
                } else {
                    this.rightCalendar.month.subtract(1, 'month');
                }
                this.updateCalendars();
            },
    
            clickNext: function (e) {
                var cal = $(e.target).parents('.calendar');
                if (cal.hasClass('left')) {
                    this.leftCalendar.month.add(1, 'month');
                } else {
                    this.rightCalendar.month.add(1, 'month');
                    if (this.linkedCalendars)
                        this.leftCalendar.month.add(1, 'month');
                }
                this.updateCalendars();
            },
    
            hoverDate: function (e) {
    
                //ignore mouse movements while an above-calendar text input has focus
                //if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                //    return;
    
                //ignore dates that can't be selected
                if (!$(e.target).hasClass('available')) return;
    
                //have the text inputs above calendars reflect the date being hovered over
                var title = $(e.target).attr('data-title');
                var row = title.substr(1, 1);
                var col = title.substr(3, 1);
                var cal = $(e.target).parents('.calendar');
                var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];
    
                if (this.endDate && !this.container.find('input[name=daterangepicker_start]').is(":focus")) {
                    this.container.find('input[name=daterangepicker_start]').val(date.format(this.locale.format));
                } else if (!this.endDate && !this.container.find('input[name=daterangepicker_end]').is(":focus")) {
                    this.container.find('input[name=daterangepicker_end]').val(date.format(this.locale.format));
                }
    
                //highlight the dates between the start date and the date being hovered as a potential end date
                var leftCalendar = this.leftCalendar;
                var rightCalendar = this.rightCalendar;
                var startDate = this.startDate;
                if (!this.endDate) {
                    this.container.find('.calendar td').each(function (index, el) {
    
                        //skip week numbers, only look at dates
                        if ($(el).hasClass('week')) return;
    
                        var title = $(el).attr('data-title');
                        var row = title.substr(1, 1);
                        var col = title.substr(3, 1);
                        var cal = $(el).parents('.calendar');
                        var dt = cal.hasClass('left') ? leftCalendar.calendar[row][col] : rightCalendar.calendar[row][col];
    
                        if ((dt.isAfter(startDate) && dt.isBefore(date)) || dt.isSame(date, 'day')) {
                            $(el).addClass('in-range');
                        } else {
                            $(el).removeClass('in-range');
                        }
    
                    });
                }
    
            },
    
            clickDate: function (e) {
    
                if (!$(e.target).hasClass('available')) return;
    
                var title = $(e.target).attr('data-title');
                var row = title.substr(1, 1);
                var col = title.substr(3, 1);
                var cal = $(e.target).parents('.calendar');
                var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];
    
                //
                // this function needs to do a few things:
                // * alternate between selecting a start and end date for the range,
                // * if the time picker is enabled, apply the hour/minute/second from the select boxes to the clicked date
                // * if autoapply is enabled, and an end date was chosen, apply the selection
                // * if single date picker mode, and time picker isn't enabled, apply the selection immediately
                // * if one of the inputs above the calendars was focused, cancel that manual input
                //
    
                if (this.endDate || date.isBefore(this.startDate, 'day')) { //picking start
                    if (this.timePicker) {
                        var hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                        if (!this.timePicker24Hour) {
                            var ampm = this.container.find('.left .ampmselect').val();
                            if (ampm === 'PM' && hour < 12)
                                hour += 12;
                            if (ampm === 'AM' && hour === 12)
                                hour = 0;
                        }
                        var minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                        var second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                        date = date.clone().hour(hour).minute(minute).second(second);
                    }
                    this.endDate = null;
                    this.setStartDate(date.clone());
                } else if (!this.endDate && date.isBefore(this.startDate)) {
                    //special case: clicking the same date for start/end,
                    //but the time of the end date is before the start date
                    this.setEndDate(this.startDate.clone());
                } else { // picking end
                    if (this.timePicker) {
                        var hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                        if (!this.timePicker24Hour) {
                            var ampm = this.container.find('.right .ampmselect').val();
                            if (ampm === 'PM' && hour < 12)
                                hour += 12;
                            if (ampm === 'AM' && hour === 12)
                                hour = 0;
                        }
                        var minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                        var second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                        date = date.clone().hour(hour).minute(minute).second(second);
                    }
                    this.setEndDate(date.clone());
                    if (this.autoApply) {
                        this.calculateChosenLabel();
                        this.clickApply();
                    }
                }
    
                if (this.singleDatePicker) {
                    this.setEndDate(this.startDate);
                    if (!this.timePicker)
                        this.clickApply();
                }
    
                this.updateView();
    
                //This is to cancel the blur event handler if the mouse was in one of the inputs
                e.stopPropagation();
    
            },
    
            calculateChosenLabel: function () {
                var customRange = true;
                var i = 0;
                for (var range in this.ranges) {
                    if (this.timePicker) {
                        if (this.startDate.isSame(this.ranges[range][0]) && this.endDate.isSame(this.ranges[range][1])) {
                            customRange = false;
                            this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                            break;
                        }
                    } else {
                        //ignore times when comparing dates if time picker is not enabled
                        if (this.startDate.format('YYYY-MM-DD') == this.ranges[range][0].format('YYYY-MM-DD') && this.endDate.format('YYYY-MM-DD') == this.ranges[range][1].format('YYYY-MM-DD')) {
                            customRange = false;
                            this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                            break;
                        }
                    }
                    i++;
                }
                if (customRange && this.showCustomRangeLabel) {
                    this.chosenLabel = this.container.find('.ranges li:last').addClass('active').html();
                    this.showCalendars();
                }
            },
    
            clickApply: function (e) {
                // Should not hide the picker if it's inline mode, but should update the parentElement
                (!this.inline) ? this.hide() : this.updateElement();
                this.element.trigger('apply.daterangepicker', this);
            },
    
            clickCancel: function (e) {
                this.startDate = this.oldStartDate;
                this.endDate = this.oldEndDate;
                // Should not hide the picker if it's inline mode, but should update the parentElement
                (!this.inline) ? this.hide() : this.updateElement();
                this.element.trigger('cancel.daterangepicker', this);
            },
    
            monthOrYearChanged: function (e) {
                var isLeft = $(e.target).closest('.calendar').hasClass('left'),
                    leftOrRight = isLeft ? 'left' : 'right',
                    cal = this.container.find('.calendar.' + leftOrRight);
    
                // Month must be Number for new moment versions
                var month = parseInt(cal.find('.monthselect').val(), 10);
                var year = cal.find('.yearselect').val();
    
                if (!isLeft) {
                    if (year < this.startDate.year() || (year == this.startDate.year() && month < this.startDate.month())) {
                        month = this.startDate.month();
                        year = this.startDate.year();
                    }
                }
    
                if (this.minDate) {
                    if (year < this.minDate.year() || (year == this.minDate.year() && month < this.minDate.month())) {
                        month = this.minDate.month();
                        year = this.minDate.year();
                    }
                }
    
                if (this.maxDate) {
                    if (year > this.maxDate.year() || (year == this.maxDate.year() && month > this.maxDate.month())) {
                        month = this.maxDate.month();
                        year = this.maxDate.year();
                    }
                }
    
                if (isLeft) {
                    this.leftCalendar.month.month(month).year(year);
                    if (this.linkedCalendars)
                        this.rightCalendar.month = this.leftCalendar.month.clone().add(1, 'month');
                } else {
                    this.rightCalendar.month.month(month).year(year);
                    if (this.linkedCalendars)
                        this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, 'month');
                }
                this.updateCalendars();
            },
    
            timeChanged: function (e) {
    
                var cal = $(e.target).closest('.calendar'),
                    isLeft = cal.hasClass('left');
    
                var hour = parseInt(cal.find('.hourselect').val(), 10);
                var minute = parseInt(cal.find('.minuteselect').val(), 10);
                var second = this.timePickerSeconds ? parseInt(cal.find('.secondselect').val(), 10) : 0;
    
                if (!this.timePicker24Hour) {
                    var ampm = cal.find('.ampmselect').val();
                    if (ampm === 'PM' && hour < 12)
                        hour += 12;
                    if (ampm === 'AM' && hour === 12)
                        hour = 0;
                }
    
                if (isLeft) {
                    var start = this.startDate.clone();
                    start.hour(hour);
                    start.minute(minute);
                    start.second(second);
                    this.setStartDate(start);
                    if (this.singleDatePicker) {
                        this.endDate = this.startDate.clone();
                    } else if (this.endDate && this.endDate.format('YYYY-MM-DD') == start.format('YYYY-MM-DD') && this.endDate.isBefore(start)) {
                        this.setEndDate(start.clone());
                    }
                } else if (this.endDate) {
                    var end = this.endDate.clone();
                    end.hour(hour);
                    end.minute(minute);
                    end.second(second);
                    this.setEndDate(end);
                }
    
                // Update the parent element with the autoplay option in inline mode
                if (this.inline && this.autoApply)
                    this.updateElement()
    
                //update the calendars so all clickable dates reflect the new time component
                this.updateCalendars();
    
                //update the form inputs above the calendars with the new time
                this.updateFormInputs();
    
                //re-render the time pickers because changing one selection can affect what's enabled in another
                this.renderTimePicker('left');
                this.renderTimePicker('right');
    
            },
    
            formInputsChanged: function (e) {
                var isRight = $(e.target).closest('.calendar').hasClass('right');
                var start = moment(this.container.find('input[name="daterangepicker_start"]').val(), this.locale.format);
                var end = moment(this.container.find('input[name="daterangepicker_end"]').val(), this.locale.format);
    
                if (start.isValid() && end.isValid()) {
    
                    if (isRight && end.isBefore(start))
                        start = end.clone();
    
                    this.setStartDate(start);
                    this.setEndDate(end);
    
                    if (isRight) {
                        this.container.find('input[name="daterangepicker_start"]').val(this.startDate.format(this.locale.format));
                    } else {
                        this.container.find('input[name="daterangepicker_end"]').val(this.endDate.format(this.locale.format));
                    }
    
                }
    
                this.updateView();
    
                // Update the parent element with the autoplay option in inline mode
                if (this.inline && this.autoApply)
                    this.updateElement()
            },
    
            formInputsFocused: function (e) {
    
                // Highlight the focused input
                this.container.find('input[name="daterangepicker_start"], input[name="daterangepicker_end"]').removeClass('active');
                $(e.target).addClass('active');
    
                // Set the state such that if the user goes back to using a mouse,
                // the calendars are aware we're selecting the end of the range, not
                // the start. This allows someone to edit the end of a date range without
                // re-selecting the beginning, by clicking on the end date input then
                // using the calendar.
                var isRight = $(e.target).closest('.calendar').hasClass('right');
                if (isRight) {
                    this.endDate = null;
                    this.setStartDate(this.startDate.clone());
                    this.updateView();
                }
    
            },
    
            formInputsBlurred: function (e) {
    
                // this function has one purpose right now: if you tab from the first
                // text input to the second in the UI, the endDate is nulled so that
                // you can click another, but if you tab out without clicking anything
                // or changing the input value, the old endDate should be retained
    
                if (!this.endDate) {
                    var val = this.container.find('input[name="daterangepicker_end"]').val();
                    var end = moment(val, this.locale.format);
                    if (end.isValid()) {
                        this.setEndDate(end);
                        this.updateView();
                    }
                }
    
            },
    
            elementChanged: function () {
                if (!this.element.is('input')) return;
                if (!this.element.val().length) return;
                if (this.element.val().length < this.locale.format.length) return;
    
                var dateString = this.element.val().split(this.locale.separator),
                    start = null,
                    end = null;
    
                if (dateString.length === 2) {
                    start = moment(dateString[0], this.locale.format);
                    end = moment(dateString[1], this.locale.format);
                }
    
                if (this.singleDatePicker || start === null || end === null) {
                    start = moment(this.element.val(), this.locale.format);
                    end = start;
                }
    
                if (!start.isValid() || !end.isValid()) return;
    
                this.setStartDate(start);
                this.setEndDate(end);
                this.updateView();
            },
    
            keydown: function (e) {
                //hide on tab or enter
                if ((e.keyCode === 9) || (e.keyCode === 13)) {
                    this.hide();
                }
            },
    
            updateElement: function () {
    
                //incomplete date selection, revert to last values
                if (!this.endDate) {
                    this.startDate = this.oldStartDate.clone();
                    this.endDate = this.oldEndDate.clone();
                }
    
                //if a new date range was selected, invoke the user callback function
                if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
                    this.callback(this.startDate, this.endDate, this.chosenLabel);
    
                if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
                    this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
                    this.element.trigger('change');
                } else if (this.element.is('input') && this.autoUpdateInput) {
                    this.element.val(this.startDate.format(this.locale.format));
                    this.element.trigger('change');
                }
            },
    
            remove: function () {
                this.container.remove();
                this.element.off('.daterangepicker');
                this.element.removeData();
            }
    
        };
    
        $.fn.daterangepicker = function (options, callback) {
            this.each(function () {
                var el = $(this);
                if (el.data('daterangepicker'))
                    el.data('daterangepicker').remove();
                el.data('daterangepicker', new DateRangePicker(el, options, callback));
            });
            return this;
        };
    
        return DateRangePicker;
    
    }));


	// Date Picker Function
    $('#inlinePicker').daterangepicker({
             locale: {
                 format: 'DD-MM-YYYY'
             },
             parentEl: "#inline-calendar",
             alwaysShowCalendars: false,
             autoApply :true,
             inline: true,
         });
    

   // search bar date picker
   $('#searhBar-date-picker').daterangepicker({
    locale: {
        format: 'MM-DD'
		// mediumDate:     "mmm d, yyyy",
    },
    // parentEl: "#inline-calendar",
    alwaysShowCalendars: false,
    autoApply :false,
    inline: false,
    autoUpdateInput: true,
});  
$('#searhBar-index-date-picker').daterangepicker({
    locale: {
        format: 'MM-DD'
		// mediumDate:     "mmm d, yyyy",
    },
    // parentEl: "#inline-calendar",
    alwaysShowCalendars: false,
    autoApply :false,
    inline: false,
    autoUpdateInput: true,
});  
$('#searhBar-index-date-picker-inline').daterangepicker({
    locale: {
        format: 'MM-DD'
		// mediumDate:     "mmm d, yyyy",
    },
    // parentEl: "#inline-calendar",
    alwaysShowCalendars: true,
    autoApply :true,
    inline: true,
    autoUpdateInput: true,
}); 
function getDate()
{
	var dateInput = document.getElementById("searhBar-date-picker").value;
	document.getElementById("Filter-date").innerHTML = dateInput;
	console.log("dateInput" , dateInput)
}

// Three calendars
/* =========================================================
 * bootstrap-datepicker.js
 * Repo: https://github.com/eternicode/bootstrap-datepicker/
 * Demo: https://eternicode.github.io/bootstrap-datepicker/
 * Docs: http://bootstrap-datepicker.readthedocs.org/
 * Forked from http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Started by Stefan Petre; improvements by Andrew Rowls + contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

(function($, undefined){

	var $window = $(window);

	function UTCDate(){
		return new Date(Date.UTC.apply(Date, arguments));
	}
	function UTCToday(){
		var today = new Date();
		return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
	}
	function alias(method){
		return function(){
			return this[method].apply(this, arguments);
		};
	}

	var DateArray = (function(){
		var extras = {
			get: function(i){
				return this.slice(i)[0];
			},
			contains: function(d){
				// Array.indexOf is not cross-browser;
				// $.inArray doesn't work with Dates
				var val = d && d.valueOf();
				for (var i=0, l=this.length; i < l; i++)
					if (this[i].valueOf() === val)
						return i;
				return -1;
			},
			remove: function(i){
				this.splice(i,1);
			},
			replace: function(new_array){
				if (!new_array)
					return;
				if (!$.isArray(new_array))
					new_array = [new_array];
				this.clear();
				this.push.apply(this, new_array);
			},
			clear: function(){
				this.length = 0;
			},
			copy: function(){
				var a = new DateArray();
				a.replace(this);
				return a;
			}
		};

		return function(){
			var a = [];
			a.push.apply(a, arguments);
			$.extend(a, extras);
			return a;
		};
	})();


	// Picker object

	var Datepicker = function(element, options){
		this.dates = new DateArray();
		this.viewDate = UTCToday();
		this.focusDate = null;

		this._process_options(options);

		this.element = $(element);
		this.isInline = false;
		this.isInput = this.element.is('input');
		this.component = this.element.is('.date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
		this.hasInput = this.component && this.element.find('input').length;
		if (this.component && this.component.length === 0)
			this.component = false;

		this.picker = $(DPGlobal.template);
		this._buildEvents();
		this._attachEvents();

		if (this.isInline){
			this.picker.addClass('datepicker-inline').appendTo(this.element);
		}
		else {
			this.picker.addClass('datepicker-dropdown dropdown-menu');
		}

		if (this.o.rtl){
			this.picker.addClass('datepicker-rtl');
		}

		this.viewMode = this.o.startView;

		if (this.o.calendarWeeks)
			this.picker.find('tfoot th.today')
						.attr('colspan', function(i, val){
							return parseInt(val) + 1;
						});

		this._allow_update = false;

		this.setStartDate(this._o.startDate);
		this.setEndDate(this._o.endDate);
		this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);

		this.fillDow();
		this.fillMonths();

		this._allow_update = true;

		this.update();
		this.showMode();

		if (this.isInline){
			this.show();
		}
	};

	Datepicker.prototype = {
		constructor: Datepicker,

		_process_options: function(opts){
			// Store raw options for reference
			this._o = $.extend({}, this._o, opts);
			// Processed options
			var o = this.o = $.extend({}, this._o);

			// Check if "de-DE" style date is available, if not language should
			// fallback to 2 letter code eg "de"
			var lang = o.language;
			if (!dates[lang]){
				lang = lang.split('-')[0];
				if (!dates[lang])
					lang = defaults.language;
			}
			o.language = lang;

			switch (o.startView){
				case 2:
				case 'decade':
					o.startView = 2;
					break;
				case 1:
				case 'year':
					o.startView = 1;
					break;
				default:
					o.startView = 0;
			}

			switch (o.minViewMode){
				case 1:
				case 'months':
					o.minViewMode = 1;
					break;
				case 2:
				case 'years':
					o.minViewMode = 2;
					break;
				default:
					o.minViewMode = 0;
			}

			o.startView = Math.max(o.startView, o.minViewMode);

			// true, false, or Number > 0
			if (o.multidate !== true){
				o.multidate = Number(o.multidate) || false;
				if (o.multidate !== false)
					o.multidate = Math.max(0, o.multidate);
				else
					o.multidate = 1;
			}
			o.multidateSeparator = String(o.multidateSeparator);

			o.weekStart %= 7;
			o.weekEnd = ((o.weekStart + 6) % 7);

			var format = DPGlobal.parseFormat(o.format);
			if (o.startDate !== -Infinity){
				if (!!o.startDate){
					if (o.startDate instanceof Date)
						o.startDate = this._local_to_utc(this._zero_time(o.startDate));
					else
						o.startDate = DPGlobal.parseDate(o.startDate, format, o.language);
				}
				else {
					o.startDate = -Infinity;
				}
			}
			if (o.endDate !== Infinity){
				if (!!o.endDate){
					if (o.endDate instanceof Date)
						o.endDate = this._local_to_utc(this._zero_time(o.endDate));
					else
						o.endDate = DPGlobal.parseDate(o.endDate, format, o.language);
				}
				else {
					o.endDate = Infinity;
				}
			}

			o.daysOfWeekDisabled = o.daysOfWeekDisabled||[];
			if (!$.isArray(o.daysOfWeekDisabled))
				o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
			o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function(d){
				return parseInt(d, 10);
			});

			var plc = String(o.orientation).toLowerCase().split(/\s+/g),
				_plc = o.orientation.toLowerCase();
			plc = $.grep(plc, function(word){
				return (/^auto|left|right|top|bottom$/).test(word);
			});
			o.orientation = {x: 'auto', y: 'auto'};
			if (!_plc || _plc === 'auto')
				; // no action
			else if (plc.length === 1){
				switch (plc[0]){
					case 'top':
					case 'bottom':
						o.orientation.y = plc[0];
						break;
					case 'left':
					case 'right':
						o.orientation.x = plc[0];
						break;
				}
			}
			else {
				_plc = $.grep(plc, function(word){
					return (/^left|right$/).test(word);
				});
				o.orientation.x = _plc[0] || 'auto';

				_plc = $.grep(plc, function(word){
					return (/^top|bottom$/).test(word);
				});
				o.orientation.y = _plc[0] || 'auto';
			}
		},
		_events: [],
		_secondaryEvents: [],
		_applyEvents: function(evs){
			for (var i=0, el, ch, ev; i < evs.length; i++){
				el = evs[i][0];
				if (evs[i].length === 2){
					ch = undefined;
					ev = evs[i][1];
				}
				else if (evs[i].length === 3){
					ch = evs[i][1];
					ev = evs[i][2];
				}
				el.on(ev, ch);
			}
		},
		_unapplyEvents: function(evs){
			for (var i=0, el, ev, ch; i < evs.length; i++){
				el = evs[i][0];
				if (evs[i].length === 2){
					ch = undefined;
					ev = evs[i][1];
				}
				else if (evs[i].length === 3){
					ch = evs[i][1];
					ev = evs[i][2];
				}
				el.off(ev, ch);
			}
		},
		_buildEvents: function(){
			if (this.isInput){ // single input
				this._events = [
					[this.element, {
						focus: $.proxy(this.show, this),
						keyup: $.proxy(function(e){
							if ($.inArray(e.keyCode, [27,37,39,38,40,32,13,9]) === -1)
								this.update();
						}, this),
						keydown: $.proxy(this.keydown, this)
					}]
				];
			}
			else if (this.component && this.hasInput){ // component: input + button
				this._events = [
					// For components that are not readonly, allow keyboard nav
					[this.element.find('input'), {
						focus: $.proxy(this.show, this),
						keyup: $.proxy(function(e){
							if ($.inArray(e.keyCode, [27,37,39,38,40,32,13,9]) === -1)
								this.update();
						}, this),
						keydown: $.proxy(this.keydown, this)
					}],
					[this.component, {
						click: $.proxy(this.show, this)
					}]
				];
			}
			else if (this.element.is('div')){  // inline datepicker
				this.isInline = true;
			}
			else {
				this._events = [
					[this.element, {
						click: $.proxy(this.show, this)
					}]
				];
			}
			this._events.push(
				// Component: listen for blur on element descendants
				[this.element, '*', {
					blur: $.proxy(function(e){
						this._focused_from = e.target;
					}, this)
				}],
				// Input: listen for blur on element
				[this.element, {
					blur: $.proxy(function(e){
						this._focused_from = e.target;
					}, this)
				}]
			);

			this._secondaryEvents = [
				[this.picker, {
					click: $.proxy(this.click, this)
				}],
				[$(window), {
					resize: $.proxy(this.place, this)
				}],
				[$(document), {
					'mousedown touchstart': $.proxy(function(e){
						// Clicked outside the datepicker, hide it
						if (!(
							this.element.is(e.target) ||
							this.element.find(e.target).length ||
							this.picker.is(e.target) ||
							this.picker.find(e.target).length
						)){
							this.hide();
						}
					}, this)
				}]
			];
		},
		_attachEvents: function(){
			this._detachEvents();
			this._applyEvents(this._events);
		},
		_detachEvents: function(){
			this._unapplyEvents(this._events);
		},
		_attachSecondaryEvents: function(){
			this._detachSecondaryEvents();
			this._applyEvents(this._secondaryEvents);
		},
		_detachSecondaryEvents: function(){
			this._unapplyEvents(this._secondaryEvents);
		},
		_trigger: function(event, altdate){
			var date = altdate || this.dates.get(-1),
				local_date = this._utc_to_local(date);

			this.element.trigger({
				type: event,
				date: local_date,
				dates: $.map(this.dates, this._utc_to_local),
				format: $.proxy(function(ix, format){
					if (arguments.length === 0){
						ix = this.dates.length - 1;
						format = this.o.format;
					}
					else if (typeof ix === 'string'){
						format = ix;
						ix = this.dates.length - 1;
					}
					format = format || this.o.format;
					var date = this.dates.get(ix);
					return DPGlobal.formatDate(date, format, this.o.language);
				}, this)
			});
		},

		show: function(){
			if (!this.isInline)
				this.picker.appendTo('body');
			this.picker.show();
			this.place();
			this._attachSecondaryEvents();
			this._trigger('show');
		},

		hide: function(){
			if (this.isInline)
				return;
			if (!this.picker.is(':visible'))
				return;
			this.focusDate = null;
			this.picker.hide().detach();
			this._detachSecondaryEvents();
			this.viewMode = this.o.startView;
			this.showMode();

			if (
				this.o.forceParse &&
				(
					this.isInput && this.element.val() ||
					this.hasInput && this.element.find('input').val()
				)
			)
				this.setValue();
			this._trigger('hide');
		},

		remove: function(){
			this.hide();
			this._detachEvents();
			this._detachSecondaryEvents();
			this.picker.remove();
			delete this.element.data().datepicker;
			if (!this.isInput){
				delete this.element.data().date;
			}
		},

		_utc_to_local: function(utc){
			return utc && new Date(utc.getTime() + (utc.getTimezoneOffset()*60000));
		},
		_local_to_utc: function(local){
			return local && new Date(local.getTime() - (local.getTimezoneOffset()*60000));
		},
		_zero_time: function(local){
			return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
		},
		_zero_utc_time: function(utc){
			return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
		},

		getDates: function(){
			return $.map(this.dates, this._utc_to_local);
		},

		getUTCDates: function(){
			return $.map(this.dates, function(d){
				return new Date(d);
			});
		},

		getDate: function(){
			return this._utc_to_local(this.getUTCDate());
		},

		getUTCDate: function(){
			return new Date(this.dates.get(-1));
		},

		setDates: function(){
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
			this.update.apply(this, args);
			this._trigger('changeDate');
			this.setValue();
		},

		setUTCDates: function(){
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
			this.update.apply(this, $.map(args, this._utc_to_local));
			this._trigger('changeDate');
			this.setValue();
		},

		setDate: alias('setDates'),
		setUTCDate: alias('setUTCDates'),

		setValue: function(){
			var formatted = this.getFormattedDate();
			if (!this.isInput){
				if (this.component){
					this.element.find('input').val(formatted).change();
				}
			}
			else {
				this.element.val(formatted).change();
			}
		},

		getFormattedDate: function(format){
			if (format === undefined)
				format = this.o.format;

			var lang = this.o.language;
			return $.map(this.dates, function(d){
				return DPGlobal.formatDate(d, format, lang);
			}).join(this.o.multidateSeparator);
		},

		setStartDate: function(startDate){
			this._process_options({startDate: startDate});
			this.update();
			this.updateNavArrows();
		},

		setEndDate: function(endDate){
			this._process_options({endDate: endDate});
			this.update();
			this.updateNavArrows();
		},

		setDaysOfWeekDisabled: function(daysOfWeekDisabled){
			this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});
			this.update();
			this.updateNavArrows();
		},

		place: function(){
			if (this.isInline)
				return;
			var calendarWidth = this.picker.outerWidth(),
				calendarHeight = this.picker.outerHeight(),
				visualPadding = 10,
				windowWidth = $window.width(),
				windowHeight = $window.height(),
				scrollTop = $window.scrollTop();

			var zIndex = parseInt(this.element.parents().filter(function(){
					return $(this).css('z-index') !== 'auto';
				}).first().css('z-index'))+10;
			var offset = this.component ? this.component.parent().offset() : this.element.offset();
			var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
			var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
			var left = offset.left,
				top = offset.top;

			this.picker.removeClass(
				'datepicker-orient-top datepicker-orient-bottom '+
				'datepicker-orient-right datepicker-orient-left'
			);

			if (this.o.orientation.x !== 'auto'){
				this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
				if (this.o.orientation.x === 'right')
					left -= calendarWidth - width;
			}
			// auto x orientation is best-placement: if it crosses a window
			// edge, fudge it sideways
			else {
				// Default to left
				this.picker.addClass('datepicker-orient-left');
				if (offset.left < 0)
					left -= offset.left - visualPadding;
				else if (offset.left + calendarWidth > windowWidth)
					left = windowWidth - calendarWidth - visualPadding;
			}

			// auto y orientation is best-situation: top or bottom, no fudging,
			// decision based on which shows more of the calendar
			var yorient = this.o.orientation.y,
				top_overflow, bottom_overflow;
			if (yorient === 'auto'){
				top_overflow = -scrollTop + offset.top - calendarHeight;
				bottom_overflow = scrollTop + windowHeight - (offset.top + height + calendarHeight);
				if (Math.max(top_overflow, bottom_overflow) === bottom_overflow)
					yorient = 'top';
				else
					yorient = 'bottom';
			}
			this.picker.addClass('datepicker-orient-' + yorient);
			if (yorient === 'top')
				top += height;
			else
				top -= calendarHeight + parseInt(this.picker.css('padding-top'));

			this.picker.css({
				top: top,
				left: left,
				zIndex: zIndex
			});
		},

		_allow_update: true,
		update: function(){
			if (!this._allow_update)
				return;

			var oldDates = this.dates.copy(),
				dates = [],
				fromArgs = false;
			if (arguments.length){
				$.each(arguments, $.proxy(function(i, date){
					if (date instanceof Date)
						date = this._local_to_utc(date);
					dates.push(date);
				}, this));
				fromArgs = true;
			}
			else {
				dates = this.isInput
						? this.element.val()
						: this.element.data('date') || this.element.find('input').val();
				if (dates && this.o.multidate)
					dates = dates.split(this.o.multidateSeparator);
				else
					dates = [dates];
				delete this.element.data().date;
			}

			dates = $.map(dates, $.proxy(function(date){
				return DPGlobal.parseDate(date, this.o.format, this.o.language);
			}, this));
			dates = $.grep(dates, $.proxy(function(date){
				return (
					date < this.o.startDate ||
					date > this.o.endDate ||
					!date
				);
			}, this), true);
			this.dates.replace(dates);

			if (this.dates.length)
				this.viewDate = new Date(this.dates.get(-1));
			else if (this.viewDate < this.o.startDate)
				this.viewDate = new Date(this.o.startDate);
			else if (this.viewDate > this.o.endDate)
				this.viewDate = new Date(this.o.endDate);

			if (fromArgs){
				// setting date by clicking
				this.setValue();
			}
			else if (dates.length){
				// setting date by typing
				if (String(oldDates) !== String(this.dates))
					this._trigger('changeDate');
			}
			if (!this.dates.length && oldDates.length)
				this._trigger('clearDate');

			this.fill();
		},

		fillDow: function(){
			var dowCnt = this.o.weekStart,
				html = '<tr>';
			if (this.o.calendarWeeks){
				var cell = '<th class="cw">&nbsp;</th>';
				html += cell;
				this.picker.find('.datepicker-days thead tr:first-child').prepend(cell);
			}
			while (dowCnt < this.o.weekStart + 7){
				html += '<th class="dow">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';
			}
			html += '</tr>';
			this.picker.find('.datepicker-days thead').append(html);
		},

		fillMonths: function(){
			var html = '',
			i = 0;
			while (i < 12){
				html += '<span class="month">'+dates[this.o.language].monthsShort[i++]+'</span>';
			}
			this.picker.find('.datepicker-months td').html(html);
		},

		setRange: function(range){
			if (!range || !range.length)
				delete this.range;
			else
				this.range = $.map(range, function(d){
					return d.valueOf();
				});
			this.fill();
		},

		getClassNames: function(date){
			var cls = [],
				year = this.viewDate.getUTCFullYear(),
				month = this.viewDate.getUTCMonth(),
				today = new Date();
			if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)){
				cls.push('old');
			}
			else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)){
				cls.push('new');
			}
			if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
				cls.push('focused');
			// Compare internal UTC date with local today, not UTC today
			if (this.o.todayHighlight &&
				date.getUTCFullYear() === today.getFullYear() &&
				date.getUTCMonth() === today.getMonth() &&
				date.getUTCDate() === today.getDate()){
				cls.push('today');
			}
			if (this.dates.contains(date) !== -1)
				cls.push('active');
			if (date.valueOf() < this.o.startDate || date.valueOf() > this.o.endDate ||
				$.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1){
				cls.push('disabled');
			}
			if (this.range){
				if (date > this.range[0] && date < this.range[this.range.length-1]){
					cls.push('range');
				}
				if ($.inArray(date.valueOf(), this.range) !== -1){
					cls.push('selected');
				}
			}
			return cls;
		},

		fill: function(){
			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth(),
				startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
				startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
				endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
				endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
				todaytxt = dates[this.o.language].today || dates['en'].today || '',
				cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
				tooltip;
			this.picker.find('.datepicker-days thead th.datepicker-switch')
						.text(dates[this.o.language].months[month]+' '+year);
			this.picker.find('tfoot th.today')
						.text(todaytxt)
						.toggle(this.o.todayBtn !== false);
			this.picker.find('tfoot th.clear')
						.text(cleartxt)
						.toggle(this.o.clearBtn !== false);
			this.updateNavArrows();
			this.fillMonths();
			var prevMonth = UTCDate(year, month-1, 28),
				day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
			prevMonth.setUTCDate(day);
			prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);
			var nextMonth = new Date(prevMonth);
			nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
			nextMonth = nextMonth.valueOf();
			var html = [];
			var clsName;
			while (prevMonth.valueOf() < nextMonth){
				if (prevMonth.getUTCDay() === this.o.weekStart){
					html.push('<tr>');
					if (this.o.calendarWeeks){
						// ISO 8601: First week contains first thursday.
						// ISO also states week starts on Monday, but we can be more abstract here.
						var
							// Start of current week: based on weekstart/current date
							ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
							// Thursday of this week
							th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
							// First Thursday of year, year from thursday
							yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),
							// Calendar week: ms between thursdays, div ms per day, div 7 days
							calWeek =  (th - yth) / 864e5 / 7 + 1;
						html.push('<td class="cw">'+ calWeek +'</td>');

					}
				}
				clsName = this.getClassNames(prevMonth);
				clsName.push('day');

				if (this.o.beforeShowDay !== $.noop){
					var before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
					if (before === undefined)
						before = {};
					else if (typeof(before) === 'boolean')
						before = {enabled: before};
					else if (typeof(before) === 'string')
						before = {classes: before};
					if (before.enabled === false)
						clsName.push('disabled');
					if (before.classes)
						clsName = clsName.concat(before.classes.split(/\s+/));
					if (before.tooltip)
						tooltip = before.tooltip;
				}

				clsName = $.unique(clsName);
				html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + '>'+prevMonth.getUTCDate() + '</td>');
				if (prevMonth.getUTCDay() === this.o.weekEnd){
					html.push('</tr>');
				}
				prevMonth.setUTCDate(prevMonth.getUTCDate()+1);
			}
			this.picker.find('.datepicker-days tbody').empty().append(html.join(''));

			var months = this.picker.find('.datepicker-months')
						.find('th:eq(1)')
							.text(year)
							.end()
						.find('span').removeClass('active');

			$.each(this.dates, function(i, d){
				if (d.getUTCFullYear() === year)
					months.eq(d.getUTCMonth()).addClass('active');
			});

			if (year < startYear || year > endYear){
				months.addClass('disabled');
			}
			if (year === startYear){
				months.slice(0, startMonth).addClass('disabled');
			}
			if (year === endYear){
				months.slice(endMonth+1).addClass('disabled');
			}

			html = '';
			year = parseInt(year/10, 10) * 10;
			var yearCont = this.picker.find('.datepicker-years')
								.find('th:eq(1)')
									.text(year + '-' + (year + 9))
									.end()
								.find('td');
			year -= 1;
			var years = $.map(this.dates, function(d){
					return d.getUTCFullYear();
				}),
				classes;
			for (var i = -1; i < 11; i++){
				classes = ['year'];
				if (i === -1)
					classes.push('old');
				else if (i === 10)
					classes.push('new');
				if ($.inArray(year, years) !== -1)
					classes.push('active');
				if (year < startYear || year > endYear)
					classes.push('disabled');
				html += '<span class="' + classes.join(' ') + '">'+year+'</span>';
				year += 1;
			}
			yearCont.html(html);
		},

		updateNavArrows: function(){
			if (!this._allow_update)
				return;

			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth();
			switch (this.viewMode){
				case 0:
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()){
						this.picker.find('.prev').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()){
						this.picker.find('.next').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
				case 1:
				case 2:
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear()){
						this.picker.find('.prev').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear()){
						this.picker.find('.next').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
			}
		},

		click: function(e){
			e.preventDefault();
			var target = $(e.target).closest('span, td, th'),
				year, month, day;
			if (target.length === 1){
				switch (target[0].nodeName.toLowerCase()){
					case 'th':
						switch (target[0].className){
							case 'datepicker-switch':
								this.showMode(1);
								break;
							case 'prev':
							case 'next':
								var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1);
								switch (this.viewMode){
									case 0:
										this.viewDate = this.moveMonth(this.viewDate, dir);
										this._trigger('changeMonth', this.viewDate);
										break;
									case 1:
									case 2:
										this.viewDate = this.moveYear(this.viewDate, dir);
										if (this.viewMode === 1)
											this._trigger('changeYear', this.viewDate);
										break;
								}
								this.fill();
								break;
							case 'today':
								var date = new Date();
								date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

								this.showMode(-2);
								var which = this.o.todayBtn === 'linked' ? null : 'view';
								this._setDate(date, which);
								break;
							case 'clear':
								var element;
								if (this.isInput)
									element = this.element;
								else if (this.component)
									element = this.element.find('input');
								if (element)
									element.val("").change();
								this.update();
								this._trigger('changeDate');
								if (this.o.autoclose)
									this.hide();
								break;
						}
						break;
					case 'span':
						if (!target.is('.disabled')){
							this.viewDate.setUTCDate(1);
							if (target.is('.month')){
								day = 1;
								month = target.parent().find('span').index(target);
								year = this.viewDate.getUTCFullYear();
								this.viewDate.setUTCMonth(month);
								this._trigger('changeMonth', this.viewDate);
								if (this.o.minViewMode === 1){
									this._setDate(UTCDate(year, month, day));
								}
							}
							else {
								day = 1;
								month = 0;
								year = parseInt(target.text(), 10)||0;
								this.viewDate.setUTCFullYear(year);
								this._trigger('changeYear', this.viewDate);
								if (this.o.minViewMode === 2){
									this._setDate(UTCDate(year, month, day));
								}
							}
							this.showMode(-1);
							this.fill();
						}
						break;
					case 'td':
						if (target.is('.day') && !target.is('.disabled')){
							day = parseInt(target.text(), 10)||1;
							year = this.viewDate.getUTCFullYear();
							month = this.viewDate.getUTCMonth();
							if (target.is('.old')){
								if (month === 0){
									month = 11;
									year -= 1;
								}
								else {
									month -= 1;
								}
							}
							else if (target.is('.new')){
								if (month === 11){
									month = 0;
									year += 1;
								}
								else {
									month += 1;
								}
							}
							this._setDate(UTCDate(year, month, day));
						}
						break;
				}
			}
			if (this.picker.is(':visible') && this._focused_from){
				$(this._focused_from).focus();
			}
			delete this._focused_from;
		},

		_toggle_multidate: function(date){
			var ix = this.dates.contains(date);
			if (!date){
				this.dates.clear();
			}
			else if (ix !== -1){
				this.dates.remove(ix);
			}
			else {
				this.dates.push(date);
			}
			if (typeof this.o.multidate === 'number')
				while (this.dates.length > this.o.multidate)
					this.dates.remove(0);
		},

		_setDate: function(date, which){
			if (!which || which === 'date')
				this._toggle_multidate(date && new Date(date));
			if (!which || which  === 'view')
				this.viewDate = date && new Date(date);

			this.fill();
			this.setValue();
			this._trigger('changeDate');
			var element;
			if (this.isInput){
				element = this.element;
			}
			else if (this.component){
				element = this.element.find('input');
			}
			if (element){
				element.change();
			}
			if (this.o.autoclose && (!which || which === 'date')){
				this.hide();
			}
		},

		moveMonth: function(date, dir){
			if (!date)
				return undefined;
			if (!dir)
				return date;
			var new_date = new Date(date.valueOf()),
				day = new_date.getUTCDate(),
				month = new_date.getUTCMonth(),
				mag = Math.abs(dir),
				new_month, test;
			dir = dir > 0 ? 1 : -1;
			if (mag === 1){
				test = dir === -1
					// If going back one month, make sure month is not current month
					// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
					? function(){
						return new_date.getUTCMonth() === month;
					}
					// If going forward one month, make sure month is as expected
					// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
					: function(){
						return new_date.getUTCMonth() !== new_month;
					};
				new_month = month + dir;
				new_date.setUTCMonth(new_month);
				// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
				if (new_month < 0 || new_month > 11)
					new_month = (new_month + 12) % 12;
			}
			else {
				// For magnitudes >1, move one month at a time...
				for (var i=0; i < mag; i++)
					// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
					new_date = this.moveMonth(new_date, dir);
				// ...then reset the day, keeping it in the new month
				new_month = new_date.getUTCMonth();
				new_date.setUTCDate(day);
				test = function(){
					return new_month !== new_date.getUTCMonth();
				};
			}
			// Common date-resetting loop -- if date is beyond end of month, make it
			// end of month
			while (test()){
				new_date.setUTCDate(--day);
				new_date.setUTCMonth(new_month);
			}
			return new_date;
		},

		moveYear: function(date, dir){
			return this.moveMonth(date, dir*12);
		},

		dateWithinRange: function(date){
			return date >= this.o.startDate && date <= this.o.endDate;
		},

		keydown: function(e){
			if (this.picker.is(':not(:visible)')){
				if (e.keyCode === 27) // allow escape to hide and re-show picker
					this.show();
				return;
			}
			var dateChanged = false,
				dir, newDate, newViewDate,
				focusDate = this.focusDate || this.viewDate;
			switch (e.keyCode){
				case 27: // escape
					if (this.focusDate){
						this.focusDate = null;
						this.viewDate = this.dates.get(-1) || this.viewDate;
						this.fill();
					}
					else
						this.hide();
					e.preventDefault();
					break;
				case 37: // left
				case 39: // right
					if (!this.o.keyboardNavigation)
						break;
					dir = e.keyCode === 37 ? -1 : 1;
					if (e.ctrlKey){
						newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
						newViewDate = this.moveYear(focusDate, dir);
						this._trigger('changeYear', this.viewDate);
					}
					else if (e.shiftKey){
						newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
						newViewDate = this.moveMonth(focusDate, dir);
						this._trigger('changeMonth', this.viewDate);
					}
					else {
						newDate = new Date(this.dates.get(-1) || UTCToday());
						newDate.setUTCDate(newDate.getUTCDate() + dir);
						newViewDate = new Date(focusDate);
						newViewDate.setUTCDate(focusDate.getUTCDate() + dir);
					}
					if (this.dateWithinRange(newDate)){
						this.focusDate = this.viewDate = newViewDate;
						this.setValue();
						this.fill();
						e.preventDefault();
					}
					break;
				case 38: // up
				case 40: // down
					if (!this.o.keyboardNavigation)
						break;
					dir = e.keyCode === 38 ? -1 : 1;
					if (e.ctrlKey){
						newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
						newViewDate = this.moveYear(focusDate, dir);
						this._trigger('changeYear', this.viewDate);
					}
					else if (e.shiftKey){
						newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
						newViewDate = this.moveMonth(focusDate, dir);
						this._trigger('changeMonth', this.viewDate);
					}
					else {
						newDate = new Date(this.dates.get(-1) || UTCToday());
						newDate.setUTCDate(newDate.getUTCDate() + dir * 7);
						newViewDate = new Date(focusDate);
						newViewDate.setUTCDate(focusDate.getUTCDate() + dir * 7);
					}
					if (this.dateWithinRange(newDate)){
						this.focusDate = this.viewDate = newViewDate;
						this.setValue();
						this.fill();
						e.preventDefault();
					}
					break;
				case 32: // spacebar
					// Spacebar is used in manually typing dates in some formats.
					// As such, its behavior should not be hijacked.
					break;
				case 13: // enter
					focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
					this._toggle_multidate(focusDate);
					dateChanged = true;
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.setValue();
					this.fill();
					if (this.picker.is(':visible')){
						e.preventDefault();
						if (this.o.autoclose)
							this.hide();
					}
					break;
				case 9: // tab
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.fill();
					this.hide();
					break;
			}
			if (dateChanged){
				if (this.dates.length)
					this._trigger('changeDate');
				else
					this._trigger('clearDate');
				var element;
				if (this.isInput){
					element = this.element;
				}
				else if (this.component){
					element = this.element.find('input');
				}
				if (element){
					element.change();
				}
			}
		},

		showMode: function(dir){
			if (dir){
				this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + dir));
			}
			this.picker
				.find('>div')
				.hide()
				.filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName)
					.css('display', 'block');
			this.updateNavArrows();
		}
	};

	var DateRangePicker = function(element, options){
		this.element = $(element);
		this.inputs = $.map(options.inputs, function(i){
			return i.jquery ? i[0] : i;
		});
		delete options.inputs;

		$(this.inputs)
			.datepicker(options)
			.bind('changeDate', $.proxy(this.dateUpdated, this));

		this.pickers = $.map(this.inputs, function(i){
			return $(i).data('datepicker');
		});
		this.updateDates();
	};
	DateRangePicker.prototype = {
		updateDates: function(){
			this.dates = $.map(this.pickers, function(i){
				return i.getUTCDate();
			});
			this.updateRanges();
		},
		updateRanges: function(){
			var range = $.map(this.dates, function(d){
				return d.valueOf();
			});
			$.each(this.pickers, function(i, p){
				p.setRange(range);
			});
		},
		dateUpdated: function(e){
			// `this.updating` is a workaround for preventing infinite recursion
			// between `changeDate` triggering and `setUTCDate` calling.  Until
			// there is a better mechanism.
			if (this.updating)
				return;
			this.updating = true;

			var dp = $(e.target).data('datepicker'),
				new_date = dp.getUTCDate(),
				i = $.inArray(e.target, this.inputs),
				l = this.inputs.length;
			if (i === -1)
				return;

			$.each(this.pickers, function(i, p){
				if (!p.getUTCDate())
					p.setUTCDate(new_date);
			});

			if (new_date < this.dates[i]){
				// Date being moved earlier/left
				while (i >= 0 && new_date < this.dates[i]){
					this.pickers[i--].setUTCDate(new_date);
				}
			}
			else if (new_date > this.dates[i]){
				// Date being moved later/right
				while (i < l && new_date > this.dates[i]){
					this.pickers[i++].setUTCDate(new_date);
				}
			}
			this.updateDates();

			delete this.updating;
		},
		remove: function(){
			$.map(this.pickers, function(p){ p.remove(); });
			delete this.element.data().datepicker;
		}
	};

	function opts_from_el(el, prefix){
		// Derive options from element data-attrs
		var data = $(el).data(),
			out = {}, inkey,
			replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
		prefix = new RegExp('^' + prefix.toLowerCase());
		function re_lower(_,a){
			return a.toLowerCase();
		}
		for (var key in data)
			if (prefix.test(key)){
				inkey = key.replace(replace, re_lower);
				out[inkey] = data[key];
			}
		return out;
	}

	function opts_from_locale(lang){
		// Derive options from locale plugins
		var out = {};
		// Check if "de-DE" style date is available, if not language should
		// fallback to 2 letter code eg "de"
		if (!dates[lang]){
			lang = lang.split('-')[0];
			if (!dates[lang])
				return;
		}
		var d = dates[lang];
		$.each(locale_opts, function(i,k){
			if (k in d)
				out[k] = d[k];
		});
		return out;
	}

	var old = $.fn.datepicker;
	$.fn.datepicker = function(option){
		var args = Array.apply(null, arguments);
		args.shift();
		var internal_return;
		this.each(function(){
			var $this = $(this),
				data = $this.data('datepicker'),
				options = typeof option === 'object' && option;
			if (!data){
				var elopts = opts_from_el(this, 'date'),
					// Preliminary otions
					xopts = $.extend({}, defaults, elopts, options),
					locopts = opts_from_locale(xopts.language),
					// Options priority: js args, data-attrs, locales, defaults
					opts = $.extend({}, defaults, locopts, elopts, options);
				if ($this.is('.input-daterange') || opts.inputs){
					var ropts = {
						inputs: opts.inputs || $this.find('input').toArray()
					};
					$this.data('datepicker', (data = new DateRangePicker(this, $.extend(opts, ropts))));
				}
				else {
					$this.data('datepicker', (data = new Datepicker(this, opts)));
				}
			}
			if (typeof option === 'string' && typeof data[option] === 'function'){
				internal_return = data[option].apply(data, args);
				if (internal_return !== undefined)
					return false;
			}
		});
		if (internal_return !== undefined)
			return internal_return;
		else
			return this;
	};

	var defaults = $.fn.datepicker.defaults = {
		autoclose: false,
		beforeShowDay: $.noop,
		calendarWeeks: false,
		clearBtn: false,
		daysOfWeekDisabled: [],
		endDate: Infinity,
		forceParse: true,
		format: 'mm/dd/yyyy',
		keyboardNavigation: true,
		language: 'en',
		minViewMode: 0,
		multidate: false,
		multidateSeparator: ',',
		orientation: "auto",
		rtl: false,
		startDate: -Infinity,
		startView: 0,
		todayBtn: false,
		todayHighlight: false,
		weekStart: 0
	};
	var locale_opts = $.fn.datepicker.locale_opts = [
		'format',
		'rtl',
		'weekStart'
	];
	$.fn.datepicker.Constructor = Datepicker;
	var dates = $.fn.datepicker.dates = {
		en: {
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			today: "Today",
			clear: "Clear"
		}
	};

	var DPGlobal = {
		modes: [
			{
				clsName: 'days',
				navFnc: 'Month',
				navStep: 1
			},
			{
				clsName: 'months',
				navFnc: 'FullYear',
				navStep: 1
			},
			{
				clsName: 'years',
				navFnc: 'FullYear',
				navStep: 10
		}],
		isLeapYear: function(year){
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
		},
		getDaysInMonth: function(year, month){
			return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
		},
		validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
		nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
		parseFormat: function(format){
			// IE treats \0 as a string end in inputs (truncating the value),
			// so it's a bad format delimiter, anyway
			var separators = format.replace(this.validParts, '\0').split('\0'),
				parts = format.match(this.validParts);
			if (!separators || !separators.length || !parts || parts.length === 0){
				throw new Error("Invalid date format.");
			}
			return {separators: separators, parts: parts};
		},
		parseDate: function(date, format, language){
			if (!date)
				return undefined;
			if (date instanceof Date)
				return date;
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			var part_re = /([\-+]\d+)([dmwy])/,
				parts = date.match(/([\-+]\d+)([dmwy])/g),
				part, dir, i;
			if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)){
				date = new Date();
				for (i=0; i < parts.length; i++){
					part = part_re.exec(parts[i]);
					dir = parseInt(part[1]);
					switch (part[2]){
						case 'd':
							date.setUTCDate(date.getUTCDate() + dir);
							break;
						case 'm':
							date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
							break;
						case 'w':
							date.setUTCDate(date.getUTCDate() + dir * 7);
							break;
						case 'y':
							date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);
							break;
					}
				}
				return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
			}
			parts = date && date.match(this.nonpunctuation) || [];
			date = new Date();
			var parsed = {},
				setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
				setters_map = {
					yyyy: function(d,v){
						return d.setUTCFullYear(v);
					},
					yy: function(d,v){
						return d.setUTCFullYear(2000+v);
					},
					m: function(d,v){
						if (isNaN(d))
							return d;
						v -= 1;
						while (v < 0) v += 12;
						v %= 12;
						d.setUTCMonth(v);
						while (d.getUTCMonth() !== v)
							d.setUTCDate(d.getUTCDate()-1);
						return d;
					},
					d: function(d,v){
						return d.setUTCDate(v);
					}
				},
				val, filtered;
			setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
			setters_map['dd'] = setters_map['d'];
			date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
			var fparts = format.parts.slice();
			// Remove noop parts
			if (parts.length !== fparts.length){
				fparts = $(fparts).filter(function(i,p){
					return $.inArray(p, setters_order) !== -1;
				}).toArray();
			}
			// Process remainder
			function match_part(){
				var m = this.slice(0, parts[i].length),
					p = parts[i].slice(0, m.length);
				return m === p;
			}
			if (parts.length === fparts.length){
				var cnt;
				for (i=0, cnt = fparts.length; i < cnt; i++){
					val = parseInt(parts[i], 10);
					part = fparts[i];
					if (isNaN(val)){
						switch (part){
							case 'MM':
								filtered = $(dates[language].months).filter(match_part);
								val = $.inArray(filtered[0], dates[language].months) + 1;
								break;
							case 'M':
								filtered = $(dates[language].monthsShort).filter(match_part);
								val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
								break;
						}
					}
					parsed[part] = val;
				}
				var _date, s;
				for (i=0; i < setters_order.length; i++){
					s = setters_order[i];
					if (s in parsed && !isNaN(parsed[s])){
						_date = new Date(date);
						setters_map[s](_date, parsed[s]);
						if (!isNaN(_date))
							date = _date;
					}
				}
			}
			return date;
		},
		formatDate: function(date, format, language){
			if (!date)
				return '';
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			var val = {
				d: date.getUTCDate(),
				D: dates[language].daysShort[date.getUTCDay()],
				DD: dates[language].days[date.getUTCDay()],
				m: date.getUTCMonth() + 1,
				M: dates[language].monthsShort[date.getUTCMonth()],
				MM: dates[language].months[date.getUTCMonth()],
				yy: date.getUTCFullYear().toString().substring(2),
				yyyy: date.getUTCFullYear()
			};
			val.dd = (val.d < 10 ? '0' : '') + val.d;
			val.mm = (val.m < 10 ? '0' : '') + val.m;
			date = [];
			var seps = $.extend([], format.separators);
			for (var i=0, cnt = format.parts.length; i <= cnt; i++){
				if (seps.length)
					date.push(seps.shift());
				date.push(val[format.parts[i]]);
			}
			return date.join('');
		},
		headTemplate: '<thead>'+
							'<tr>'+
								'<th class="prev">&laquo;</th>'+
								'<th colspan="5" class="datepicker-switch"></th>'+
								'<th class="next">&raquo;</th>'+
							'</tr>'+
						'</thead>',
		contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
		footTemplate: '<tfoot>'+
							'<tr>'+
								'<th colspan="7" class="today"></th>'+
							'</tr>'+
							'<tr>'+
								'<th colspan="7" class="clear"></th>'+
							'</tr>'+
						'</tfoot>'
	};
	DPGlobal.template = '<div class="datepicker">'+
							'<div class="datepicker-days">'+
								'<table class=" table-condensed">'+
									DPGlobal.headTemplate+
									'<tbody></tbody>'+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-months">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-years">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
						'</div>';

	$.fn.datepicker.DPGlobal = DPGlobal;


	/* DATEPICKER NO CONFLICT
	* =================== */

	$.fn.datepicker.noConflict = function(){
		$.fn.datepicker = old;
		return this;
	};


	/* DATEPICKER DATA-API
	* ================== */

	$(document).on(
		'focus.datepicker.data-api click.datepicker.data-api',
		'[data-provide="datepicker"]',
		function(e){
			var $this = $(this);
			if ($this.data('datepicker'))
				return;
			e.preventDefault();
			// component click requires us to explicitly show it
			$this.datepicker('show');
		}
	);
	$(function(){
		$('[data-provide="datepicker-inline"]').datepicker();
	});

}(window.jQuery));

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

$.fn.notes = function(name){
	return this.each(function(){
		var self = $(this);
		var add  = self.find(name+"__add");
		var time = self.find(name+"__time");
		var field = self.find(name+"__field");
		var list = self.find(name+"__list");

		var prevHtml = '';

		add.on('click', function(){
			if(field.val() != '' && field.val() != prevHtml) {
				var html = "<li><span>"+ (time.val() ? time.val() : "00:00") +"</span>"+field.val()+"</li>";
				prevHtml = field.val();
				
				list.append(html);

				setInterval(function(){
					prevHtml = '';
				}, 5000)
			}

			return false;
		});
	});	
}

$(function(){
	$(".b-notes").notes(".b-notes");

    $("#mobile-calendar").datepicker({
		todayHighlight: true,
		weekStart: 1
	}).on({

		'changeDate': function(e) {

			if(typeof(e.date) == "undefined") return false;

			var milliseconds = Date.parse(e.date);

			setCelendarDay(milliseconds);
		}

	});
	$("#calendar").datepicker({
		todayHighlight: true,
		weekStart: 1
	}).on({

		'changeDate': function(e) {

			if(typeof(e.date) == "undefined") return false;

			var milliseconds = Date.parse(e.date);

			setCelendarDay(milliseconds);
		}

	});
    $("#calendar-two").datepicker({
		todayHighlight: true,
		weekStart: 1
	}).on({

		'changeDate': function(e) {

			if(typeof(e.date) == "undefined") return false;

			var milliseconds = Date.parse(e.date);

			setCelendarDay(milliseconds);
		}

	});
	$("#calendar-three").datepicker({
		todayHighlight: true,
		weekStart: 1
	}).on({

		'changeDate': function(e) {

			if(typeof(e.date) == "undefined") return false;

			var milliseconds = Date.parse(e.date);

			setCelendarDay(milliseconds);
		}

	});

	var today = new Date();
	var milliseconds = Date.parse(today);

	setCelendarDay(milliseconds);

	function setCelendarDay(milliseconds){
		var date = new Date(milliseconds).format("dd/mm/yyyy");
		var formatTitle = new Date(milliseconds).format("dddd, <b>d mmmm</b>");
		var list = $(".b-notes__list");
		var title = $(".b-app__title");

		// $.getJSON("https://dl.dropboxusercontent.com/u/27474693/db.json", function(data) {

		// 	$.each(data.days, function(){
		// 		var obj = this;
				
		// 		if(date == obj.day) {
		// 			var items = obj.data;
					
		// 			list.html('');

		// 			$.each(items, function(){
		// 				var html = "<li><span>"+ this.time +"</span>"+this.title+"</li>";
		// 				list.append(html);
		// 			});

		// 			return false;
		// 		} else {
		// 			list.html('');
		// 		}

		// 		title.html(formatTitle);
		// 	})

		// });
	}
});