import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule, ControlValueAccessor, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() required: boolean = true;
  @Input() placeholder: string = '';
  @Input() emptyFieldMessage: string = '';
  @Input() invalidValueMessage: string = '';
  @Output() valueChange = new EventEmitter<string>();

  control: FormControl = new FormControl('');

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.control.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  onTouched: () => void = () => {};

  get value(): string {
    return this.control.value;
  }

  set value(val: string) {
    this.control.setValue(val);
    this.valueChange.emit(val);
    console.log("Vrednost kontrolera:", this.control.value);
    console.log("Greške kontrolera:", this.control.errors);
  }
}
