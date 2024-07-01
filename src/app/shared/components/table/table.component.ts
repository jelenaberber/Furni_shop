import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() columns: { colName: string, displayName: string }[] = [];
  @Input() data: any = [];
  @Input() isProductTable: boolean = false;
  @Input() roleOptions: { name: string, id: number }[] = [];
  @Input() changeOption: boolean = false;
  @Output() valueChange = new EventEmitter<{ id: number, colName: string, value: any }>();
  @Output() delete = new EventEmitter<number>();
  @Output() change = new EventEmitter<number>();


  getValue(data: any, colName: string): any {
    if (colName === 'role_id') {
      return data.role.id;
    }
    return data[colName];
  }

  onValueChange(id: number, colName: string, event: any) {
    const value = event.target.value;
    this.valueChange.emit({ id, colName, value });
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }

  onChange(id: number) {
    this.change.emit(id);
  }
}
