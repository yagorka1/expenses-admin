import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../services/categories.service';
import { CategoryInterface } from '../../interfaces/category-interface';

@Component({
  selector: 'app-add-category-dialog',
  standalone: false,
  templateUrl: './add-category-dialog.component.html',
  styleUrl: './add-category-dialog.component.scss'
})
export class AddCategoryDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    private categoriesService: CategoriesService,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  public save(): void {
    if (this.form.valid) {
      this.categoriesService.createCategory(this.form.value).subscribe((data: CategoryInterface) => {
        this.dialogRef.close(data);
      });
    }
  }

  public close(): void {
    this.dialogRef.close();
  }
}
