import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Game } from 'src/app/games/games.component';

@Component({
  selector: 'app-games-create-edit-dialog',
  templateUrl: './games-create-edit-dialog.component.html',
  styleUrls: ['./games-create-edit-dialog.component.css'],
})
export class GamesCreateEditDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { isEdit: boolean; selectedGame: Game },
    public dialogRef: MatDialogRef<GamesCreateEditDialogComponent>
  ) {
    this.form = this.fb.group({
      id: ['00000000-0000-0000-0000-000000000000'],
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      creationDate: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    if (this.data.isEdit) {
      this.form.patchValue({
        id: this.data.selectedGame.id,
        name: this.data.selectedGame.name,
        description: this.data.selectedGame.description,
        category: this.data.selectedGame.category,
        creationDate: this.data.selectedGame.creationDate,
      });
    }
  }

  submit(form: NgForm) {
    this.dialogRef.close({
      clicked: 'submit',
      form: form,
    });
  }
}
