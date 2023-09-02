
export class Quiz{
    constructor(Questions){
        this.question=Questions;
        this.numberOfQuestions=Questions.length;
        document.getElementById("totalAmount").innerHTML=this.numberOfQuestions;

        this.currentQuest=0;
        this.score=0;

        this.nextBtn=document.getElementById('next');
        this.nextBtn.addEventListener("click",this.checkAnswer.bind(this));
        this.showData()
    }
    checkAnswer(){
        let correctAnswer=this.question[this.currentQuest].correct_answer;
        let allAnswers =Array.from(document.getElementsByName('answers'));
        let userAnswer=allAnswers.filter((ele)=>{return ele.checked==true})[0].value;
        if(userAnswer==correctAnswer){
            $('#inCorrect').fadeOut(10);
            $('#Correct').fadeIn(1000);
            this.score++;
            let tryBtn=document.getElementById('tryBtn');
            tryBtn.addEventListener('click',function(){
                location.reload();
            })
        }else{
            $('#inCorrect').fadeIn(10);
            $('#Correct').fadeOut(1000);
        }
        this.currentQuest++;
        if(this.currentQuest>=this.numberOfQuestions){
            $('#quiz').fadeOut(10);
            $('#finish').fadeIn(1000);
            $('#score').html(this.score);
        }else{
            this.showData();
        }
    }
    showData(){
        document.getElementById('question').innerHTML=this.question[this.currentQuest].question
        document.getElementById("current").innerHTML=this.currentQuest+1;
        this.AllAnswer=[this.question[this.currentQuest].correct_answer,...this.question[this.currentQuest].incorrect_answers];
        console.log(this.AllAnswer);
        console.log(this.shuffl(this.AllAnswer))
        let container=``;
        for(var i=0;i<this.AllAnswer.length;i++){
            container+=`
            <div class="form-check">
                <input type="radio" name="answers" value="${this.AllAnswer[i]}" class="form-check-label">
                <label for="" class="form-check-label">${this.AllAnswer[i]}</label>
            </div>
            `
        }
        document.getElementById('rowAnswer').innerHTML=container;
        
    }
    shuffl(array){
        let currentIndex=array.length,randomIndex;
        while(currentIndex!=0){
            randomIndex=Math.floor(Math.random()*currentIndex);
            currentIndex--;
            [array[currentIndex],array[randomIndex]]=[
                array[randomIndex],array[currentIndex]
            ]
        }
        return array;
    }
}