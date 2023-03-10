import { Component } from '@angular/core';
import { empty } from 'rxjs';
import { JobVacanciesService } from '../services/job-vacancies.service';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent {
  jobCategories:any;//for use categories data
  vacancyData:any;
  allVacancyData:any;//for use vacancies data
  categorySelected:any;//for select category
  jobTypes:any;//for show job types
  jobModality:any;//for show job modality
  typeSelected:Array<String>=[];//for select type
  modalitySelected:Array<String>=[];//for select modality
  vacancySelected?:any;//for more datails
  isSelected:boolean=false;
  selectedJobType:any;
  searchText:any;//for get search text


  visible:boolean=false;//hide more details

  //for pagination
  page:number=1;
  count:number=0;
  tableSize:number=6;


  constructor(private categories:JobVacanciesService){}

  ngOnInit():void{
    this.postCategories();
    this.postVacancyData();
    this.postJobTypes();
    this.postJobModality();

  }

  //fetch categories
  postCategories():void{
  this.categories.categories().subscribe((data)=>{
    this.jobCategories=data;
    console.warn(this.jobCategories);
    this.categorySelected=null;
  });
  }



   //fetch vacancies
  postVacancyData():void{
    this.categories.vacancies().subscribe((data)=>{
      this.vacancyData=data;
      this.allVacancyData=this.vacancyData
      console.warn(this.allVacancyData);

    });
  }

  //post job type
  postJobTypes():void{
    this.categories.types().subscribe((data)=>{
      this.jobTypes=data;
      console.warn(this.jobTypes);
    });
  }

  //post job modality
  postJobModality():void{
    this.categories.modality().subscribe((data)=>{
      this.jobModality=data;
      console.warn(this.jobModality);
    });
  }

  //pagination start
  onTableDataChange(event:any){
    this.page=event;
   // this.postVacancyData();
   this.allVacancyData;

  }

  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    //this.postVacancyData();
    this.allVacancyData;

  }

  //pagination end

  //show and hide description
  onClick(data:any):void{

     console.warn(data)
     this.vacancySelected=data.id;
     this.visible=!this.visible;

  }


//select type
selectJobType(data:any):void{

console.warn(data);
var num=0;
for(let i=0;i<this.typeSelected.length;i++){
  if(data==this.typeSelected[i]){
   delete this.typeSelected[i];
   num++;
  }
}
if(num==0){
  this.typeSelected.push(data)
}
console.warn(this.typeSelected);
}

//select modality
selectJobModality(data:any):void{
  console.warn(data);
var num=0;
for(let i=0;i<this.modalitySelected.length;i++){
  if(data==this.modalitySelected[i]){
   delete this.modalitySelected[i];
   num++;
  }
}
if(num==0){
  this.modalitySelected.push(data)
}
console.warn(this.modalitySelected);
}

//select vacancy by comapany
onClickCompany(id:any):void{
  this.page=1;
console.warn(id)

var companyId={
  "id":id
}

console.warn(companyId)
this.categories.searchByCompany(companyId).subscribe((res)=>{
  this.allVacancyData=res;
  console.warn(this.allVacancyData)
}
)




  }


//search functionality
selectCategory(selectedCategoryId:any,searchedText:any):void{

console.warn(selectedCategoryId)
console.warn(searchedText)
if(searchedText!=undefined && searchedText.length>0){
  var words=searchedText.split(" ");

  console.warn(words)
var wordNew;
var searched_text=[];
for(let i=0;i<words.length;i++){
 // if(words[i].charAt(0))
  wordNew=words[i].charAt(0).toUpperCase()+words[i].slice(1);
    searched_text.push({"word":wordNew});
}
}else{
  searched_text=[]
}



var types_selected=[];
for(let i=0;i<this.typeSelected.length;i++){
  if(this.typeSelected[i]!=undefined){
    types_selected.push({"id":this.typeSelected[i]});
  }

}

var modalities_selected=[];
for(let i=0;i<this.modalitySelected.length;i++){
  if(this.modalitySelected[i]!=undefined){
    modalities_selected.push({"id":this.modalitySelected[i]});
  }

}
console.warn(types_selected);
console.warn(modalities_selected);
var searchData={
  "category_id":selectedCategoryId,
  "type":types_selected,
  "modality":modalities_selected,
  "search_text":searched_text
}

console.warn(searchData)

this.categories.searchBySelectedData(searchData).subscribe((res)=>{
  this.allVacancyData=res;
  console.warn(this.allVacancyData)
}
)

}


}
