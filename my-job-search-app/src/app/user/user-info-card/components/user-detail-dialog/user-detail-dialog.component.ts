import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { UserInfoCardService } from '../../service/user-info-card.service';

import { User } from '../../model/user.model';
import { Skill } from '../../model/skills.model';

@Component({
  selector: 'app-user-detail-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatButtonModule],
  templateUrl: './user-detail-dialog.component.html',
  styleUrl: './user-detail-dialog.component.css'
})
export class UserDetailDialogComponent {
  user: User;
  ratings: number[] = [1, 2, 3, 4, 5];
  skills: Skill[] | undefined = [];
  form: FormGroup;
  isEdit = false;
  editId: number | null = null;
  searchTerm: string = '';
  filteredSkills: Skill[] | undefined = [];
  categories: string[] = ['Skills', 'Rating'];
  searchValue: string = '';
  searchCategory: string = 'Skills';
  selectedEntryIndex: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<UserDetailDialogComponent>,
    public service: UserInfoCardService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = data.user;

    this.form = this.formBuilder.group({
      entries: this.formBuilder.array([this.createEntryFormGroup()])
    });
  }

  get entries() {
    return this.form.get('entries') as FormArray;
  }

  createEntryFormGroup(data: any = { id: -1, skill: '', rating: '' }): FormGroup {
    return this.formBuilder.group({
      id: [!!data ? data.id : -1, [Validators.required]],
      name: [!!data ? data.name : '', [Validators.required]],
      rating: [!!data ? data.rating : '', Validators.required]
    });
  }

  addEntry(): void {
    this.entries.push(this.createEntryFormGroup());
  }

  editSkill(item: any): void {
    this.entries.push(this.createEntryFormGroup(item));
    this.isEdit = true;
    this.editId = item.id;
  }

  removeEntry(index: number): void {
    this.entries.removeAt(index);
  }

  ngOnInit(): void {
    this.loadSkillItems();
    this.form.controls['rating'].setValue('5');
  }

  loadSkillItems(): void {
    this.service.getSkills(this.user.id).subscribe(data => {
      this.skills = data;
      this.filteredSkills = this.skills?.filter(skill =>
        (this.searchCategory === 'Skills' && skill.name?.toLowerCase().includes(this.searchTerm.toLowerCase()))
        || (this.searchCategory === 'Rating' && skill.rating?.toString().includes(this.searchTerm))
      )
    })
  }

  addOrUpdateSkills(): void {
    const newSkill = this.form.value;
    this.service.addOrUpdateSkills(this.user.id, newSkill.entries).subscribe(() => {
      alert(JSON.stringify(newSkill.entries) + " has been added for " + this.user.name);
      this.loadSkillItems();
      this.form.reset();
    })
  }

  deleteSkill(skill: Skill): void {
    this.service.deleteSkill(this.user.id, skill).subscribe(() => {
      this.loadSkillItems();
      alert(skill.name + " has been deleted for " + this.user.name);
    });
  }

  onSubmit() {
    this.addOrUpdateSkills();
  }

  public onCloseDialog() {
    this.dialogRef.close();
  }
}
