
import {Quiz} from "./Quiz.js";

export class settings{
    constructor(){
        this.categoryElement=document.getElementById("category");
        this.difficulty=document.getElementsByName("difficulty");
        this.numOfQuestions=document.getElementById("numOfQuestions");
        this.startBtn=document.getElementById("startBtn");
        this.startBtn.addEventListener("click",this.getData.bind(this));
        
    }
    async getData(){
        if(this.numOfQuestions.value >0 && this.numOfQuestions != ""){
            let categoryElemVal=this.categoryElement.value;
            
            let NumberofQuestVal=this.numOfQuestions.value;
            let difficultyVal=[...this.difficulty].filter((ele)=>{return ele.checked==true})[0].value;
            let myUrl=`https://opentdb.com/api.php?amount=${NumberofQuestVal}&category=${categoryElemVal}&difficulty=${difficultyVal}`;
            let data=await this.getApi(myUrl);
            console.log(data)
            $("#setting").fadeOut(100,function(){
                $("#quiz").fadeIn(1000)
                let myQuiz=new Quiz(data);
            })
        }else{
            $('#formAlert').fadeIn(1000)
        }
    }
    async getApi(url){
        let dataApi=await fetch(url);
        let myResponse=await dataApi.json();
        return myResponse.results;
    }
}