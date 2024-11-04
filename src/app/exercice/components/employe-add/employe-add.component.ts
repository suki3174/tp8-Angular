import { Component, inject, OnInit } from '@angular/core';
import { EmployeListComponent } from "../employe-list/employe-list.component";
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-employe-add',
  standalone: true,
  imports: [EmployeListComponent],
  templateUrl: './employe-add.component.html',
  styleUrl: './employe-add.component.css'
})
export class EmployeAddComponent implements OnInit{
  formBuilder:FormBuilder=inject(FormBuilder);
  employeForm!:FormGroup

  ngOnInit(): void {
    // this.employeForm=this.formBuilder.nonNullable.group({
    //   id:[1],
    //   matricule:[''],
    //   nom:['0'],
    //   affiliation:['Finance'],
    //   category:[Category.BoardGames],
    //   isNew:[true]
    // })
  }


}
