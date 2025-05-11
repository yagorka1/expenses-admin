import {
  AfterViewInit,
  Component, ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor, FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  UntypedFormGroup
} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: false,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('input') input: ElementRef;

  @Input() placeholder: string = '';

  @Input() inputAlign: 'left' | 'center' = 'left';

  @Input() items: any[];

  @Input() controlName: string;

  @Input() label: string = '';

  @Input() limitByKey: any;

  @Input() tooltipMessage: string;

  @Input() footnote: string;

  @Input() otherText: string;

  @Input() title: string = '';

  @Input() type: string = 'text';

  @Input() loading: boolean;

  @Input() formControlName: string;

  @Input() mask: any;

  @Input() patterns: any;

  @Input() isPhoneInput: boolean = false;

  @Input() isRequiredIf: boolean;

  @Input() isDisabled: boolean = false;

  @Input() isRequiredLabel: boolean = false;

  @Input() isAutocompleteDisabled: boolean = false;

  @Input() value: any;

  @Input() isReadonly: boolean = false;

  @Input() isOnlyFloat: boolean = false;

  @Input() cardInputClass: boolean = false;

  @Input() isLockFieldClass: boolean = false;

  @Input() isFilledClass: boolean = false;

  @Input() trim: '' | 'blur' | false = false;

  constructor(private controlContainer: ControlContainer) {}

  public onChange: any = () => {};

  public onTouched: any = () => {};

  public ngAfterViewInit() {
    if (this.value) {
      this.input.nativeElement.classList.add('filled');
    }
  }

  public writeValue(value: any): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private get form(): any {
    return this.controlContainer.formDirective
      ? ((this.controlContainer.formDirective as FormGroupDirective).form as FormGroup)
      : null;
  }

  public get isFormControlDisabled(): boolean {
    if (this.form.get(this.formControlName)) {
      // @ts-ignore
      return this.form.get(this.formControlName).disabled;
    }

    return false;
  }
}
