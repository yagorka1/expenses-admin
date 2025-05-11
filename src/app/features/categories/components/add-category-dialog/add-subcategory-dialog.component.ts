import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../services/categories.service';
import { CategoryInterface } from '../../interfaces/category-interface';
import { SubcategoryInterface } from '../../interfaces/subcategory-interface';

@Component({
  selector: 'app-add-subcategory-dialog',
  standalone: false,
  templateUrl: './add-subcategory-dialog.component.html',
  styleUrl: './add-subcategory-dialog.component.scss'
})
export class AddSubcategoryDialogComponent {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddSubcategoryDialogComponent>,
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data: { categoryId: string },
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      isNecessary: [false],
    });
  }

  public save(): void {
    if (this.form.valid) {
      this.categoriesService.createSubcategory({
        ...this.form.value,
        categoryId: this.data.categoryId
      }).subscribe((data: SubcategoryInterface) => {
        this.dialogRef.close(data);
      });
    }
  }

  public close(): void {
    this.dialogRef.close();
  }
}
