import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../model/user.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Skill } from '../../model/skills.model';
import { UserInfoCardService } from '../../service/user-info-card.service';

@Component({
  selector: 'app-user-detail-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user-detail-dialog.component.html',
  styleUrl: './user-detail-dialog.component.css'
})
export class UserDetailDialogComponent {
  user: User;
  ratings: number[] = [1,2,3,4,5];
  skills: Skill[] | undefined = [];
  form: FormGroup;
  isEdit = false;
  editId: number | null = null;
  searchTerm: string = '';
  filteredSkills: Skill[] | undefined= [];
  categories: string[] = ['Skills', 'Rating'];
  searchValue: string = '';
  searchCategory: string = 'Skills';
  
  constructor(
    public dialogRef: MatDialogRef<UserDetailDialogComponent>,
    public service: UserInfoCardService,
    private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.user = data.user;

      this.form = this.formBuilder.group({
        name: [''],
        rating: ['']
      });
  }

  ngOnInit(): void {
    this.loadSkillItems();
  }

  loadSkillItems(): void {
    this.service.getSkills(this.user.id).subscribe( data => {
      this.skills = data;
      this.filteredSkills = this.skills?.filter(skill =>
        (this.searchCategory==='Skills' && skill.name?.toLowerCase().includes(this.searchTerm.toLowerCase()))
        || (this.searchCategory==='Rating' && skill.rating?.toString().includes(this.searchTerm))
      )
  })
  }

  addSkillItem(): void {
    const newSkill = this.form.value;
    this.service.addSkill(this.user.id, newSkill).subscribe(() => {
      alert(newSkill.name+ " has been added for "+this.user.name);
      this.loadSkillItems();
      this.form.reset();
    })
  }

  editSkill(item: any): void {
    this.form.patchValue(item);
    this.isEdit = true;
    this.editId = item.id;
  }

  updateSkill(): void {
    const updatedItem = { ...this.form.value, id: this.editId };
    this.service.updateSkill(this.user.id, updatedItem).subscribe(() => {
      this.loadSkillItems();
      this.form.reset();
      this.isEdit = false;
      this.editId = null;
      alert(updatedItem.name+ " has been modified for "+this.user.name);
    });
  }

  deleteSkill(skill : Skill): void {
    this.service.deleteSkill(this.user.id, skill).subscribe(() =>{
       this.loadSkillItems();
       alert(skill.name+ " has been deleted for "+this.user.name);
  });
  }

  onSubmit(){
    this.isEdit? this.updateSkill() : this.addSkillItem();
  }

  public onCloseDialog(){
    this.dialogRef.close();
  }
}
