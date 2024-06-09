import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ICategory} from "../../interfaces/i-category";
import {elementAt} from "rxjs";

@Component({
  selector: 'app-drop-down-list',
  standalone: true,
  imports: [],
  templateUrl: './drop-down-list.component.html',
  styleUrl: './drop-down-list.component.css'
})
export class DropDownListComponent {
  @Input() items: any[] = [];
  @Input() default: string = "";
  @Output() option: EventEmitter<number | string> = new EventEmitter<number | string>();

  changeOption(selectedValue: any): void {
    this.option.emit(selectedValue.value);
  }
}
