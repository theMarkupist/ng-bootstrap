import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {NgbdOverviewSection} from '../../shared/overview';

@Component({
  selector: 'ngbd-datepicker-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './datepicker-overview.component.html'
})

export class NgbdDatepickerOverviewComponent {

  @Input() sections: { [name: string]: NgbdOverviewSection };

  snippets = {
    basic: `
<!-- 1. inline datepicker -->
<ngb-datepicker #d></ngb-datepicker>

<!-- 2. datepicker in the popup -->
<input type="text" ngbDatepicker #d="ngbDatepicker"/>
`,
    popup: `
<input type="text" ngbDatepicker #d="ngbDatepicker"/>
<button (click)="d.toggle()">Toggle</button>
`,
    form: `
<input type="text" ngbDatepicker [(ngModel)]="date"/>
`,
    selection: `
<!-- inline -->
<ngb-datepicker (select)="onDateSelect($event)"></ngb-datepicker>

<!-- in the popup -->
<input type="text" ngbDatepicker (dateSelect)="onDateSelect($event)"/>
`,
    navigation: `
<ngb-datepicker #d [startDate]="{year: 1789, month: 7}"></ngb-datepicker>
<button (click)="d.navigateTo({year: 2048, month: 1})">Goto JAN 2048</button>
`,
    dateStruct: `
const date: NgbDateStruct = { day: 14, month: 7, year: 1789 }; // July, 14 1789
`,
    adapter: `
@Injectable()
export abstract class NgbDateAdapter<T> {
  abstract fromModel(value: T): NgbDateStruct; // from your model -> internal model
  abstract toModel(date: NgbDateStruct): T; // from internal model -> your mode
}

// create your own if necessary
providers: [{provide: NgbDateAdapter, useClass: YourOwnDateAdapter}]

// native adapter is bundled with library
providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
`,
    formatter: `
@Injectable()
export abstract class NgbDateParserFormatter {
  abstract parse(value: string): NgbDateStruct; // from input -> internal model
  abstract format(date: NgbDateStruct): string; // from internal model -> string
}

// create your own if necessary
providers: [{provide: NgbDateParserFormatter, useClass: YourOwnParserFormatter}]
`,
    dayTemplate: `
<ng-template #t let-date="date">
	{{ date.day }}
</ng-template>

<ngbDatepicker [dayTemplate]=“t”/>
`,
  disablingTS: `
// disable the 13th of each month
const isDisabled = (date: NgbDateStruct, current: {month: number}) => day.date === 13;
`,
  disablingHTML: `
<ngb-datepicker [minDate]="{year: 2010, month: 1, day, 1}"
                [maxDate]="{year: 2048, month 12, day, 31}"
                [markDisabled]="isDisabled">
</ngb-datepicker>
`,
  calendars: `
providers: [{provide: NgbCalendar, useClass: NgbCalendarHijri}]
`,
  i18n: `
@Injectable()
export abstract class NgbDatepickerI18n {
  abstract getWeekdayShortName(weekday: number): string;
  abstract getMonthShortName(month: number): string;
  abstract getMonthFullName(month: number): string;
  abstract getDayAriaLabel(date: NgbDateStruct): string;
}

// provide your own if necessary
providers: [{provide: NgbDatepickerI18n, useClass: YourOwnDatepickerI18n}]
`
  };
}
