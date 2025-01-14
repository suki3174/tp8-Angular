import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../model/category';
import { ControlContainer, Form, FormArray,  FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { Game } from '../../model/game';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-game-add',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './game-add.component.html',
  styleUrl: './game-add.component.css'
})
export class GameAddComponent implements OnInit {


category:String[]=Object.values(Category);
gameService:GameService=inject(GameService);
games:Game[]=[];
game!:Game;
gameForm!:FormGroup;

// gameForm:FormGroup=new FormGroup({
//   id:new FormControl(1, {nonNullable:true}),
//   name:new FormControl("echec", {nonNullable:true}),
//   price:new FormControl(46.3, {nonNullable:true}),
//   madeIn:new FormControl('Tunisie', {nonNullable:true}),
//   category:new FormControl(Category.BoardGames, {nonNullable:true}),
//   isNew:new FormControl(true, {nonNullable:true}),
// })

formBuilder:FormBuilder=inject(FormBuilder);
ngOnInit(): void {
this.gameForm=this.formBuilder.nonNullable.group({
  id:[1],
  name:['',[Validators.required,Validators.pattern('[A-Z](.)+')]],
  price:[0,[Validators.required,Validators.min(0.1)]],
  madeIn:['Tunisie'],
  category:[Category.BoardGames,Validators.required],
  isNew:[true],
  shops:this.formBuilder.array([])
})
this.gameForm.get('name')?.valueChanges.subscribe(
  (value)=>console.log(value)
)
  this.gameService.getGames().subscribe(
    data=>{this.games=data
      console.log(data)}
  )
 
}
public get gameShops(){
  return this.gameForm.get('shops') as FormArray;
}
get name(){
  return this.gameForm.get('name');
}
get price(){
  return this.gameForm.get('price');
}

priceInvalid(){
  return this.gameForm.get('price')?.errors?.['min'] && this.gameForm.get('price')?.dirty;
}

onAddShop(){
  this.gameShops.push(this.formBuilder.control('',[Validators.required,Validators.pattern('(.)(.)+')]));
}
onValider(id:number){
  return this.gameShops.controls[id]?.invalid && this.gameShops.controls[id]?.dirty;
}

onSubmit(){
  
console.log(this.gameForm.value);
// console.log(this.gameForm.get('name')?.value);
// console.log(this.gameForm.controls['price'].value);
// console.log(this.gameForm.value['category']);
// console.log(this.gameForm.value.madeIn);


console.log(this.games);
this.gameForm.get('id')?.setValue(this.games.length+1);
this.game=new Game(this.gameForm.get('id')?.value,this.gameForm.value.name,this.gameForm.value.price,this.gameForm.value.madeIn,this.gameForm.value.category,this.gameForm.value.isNew);
this.gameService.addGame(this.game).subscribe(
  data=>{this.gameService.getGames().subscribe(
    data=>{this.games=data
    console.log(data)}
  )
  }
)
console.log(this.games);
}
onResetForm(){
  console.log(this.games);
this.gameForm.reset();
this.gameForm.get('id')?.setValue(this.games.length+1);
this.gameForm.get('madeIn')?.setValue("Autre");
this.gameForm.get('category')?.setValue(Category.CardGames);
this.gameShops.clear();
}

}