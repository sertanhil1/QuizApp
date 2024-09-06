const questions = [
  {
    question: "Which is largest animal in the world?",
    answers: [
      { text: "Shark", correct: false }, 
      { text: "Blue whale", correct: true }, 
      { text: "Elephant", correct: false }, 
      { text: "Giraffe", correct: false }, 
    ]
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Vatican City", correct: true }, 
      { text: "Bhutan", correct: false }, 
      { text: "Nepal", correct: false }, 
      { text: "Shri Lanka", correct: false }, 
    ]
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Kalahar", correct: false }, 
      { text: "Gobi", correct: false }, 
      { text: "Sahara", correct: false }, 
      { text: "Antartica", correct: true }, 
    ]
  },
  {
    question: "Which is smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false }, 
      { text: "Astralia", correct: true }, 
      { text: "Arctic", correct: false }, 
      { text: "Africa", correct: false }, 
    ]
  }
];

const questionsElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0; // Quiz başladığında ilk sorudan (0. indeks) başlandığı anlamına gelir.

let score = 0; // Değeri 0 olarak ayarlandığı için, quiz başladığında kullanıcının başlangıç puanı 0 olur.

function startQuiz(){ // quiz (test) uygulamasının başlatılmasından sorumludur.

  currentQuestionIndex = 0; //Bu, quiz başladığında ilk sorudan başlamanızı sağlar.

  score = 0; // Quiz başladığında puan 0'dan başlar.

  nextButton.innerHTML = "Next"; // Bir sonraki soruya geçebilmesi için düğmenin işlevini belirler.

  showQuestion(); // Geçerli soruyu ve cevap seçeneklerini kullanıcıya göstermek için kullanılır.
}

function showQuestion(){ // Bu fonksiyonun amacı, belirli bir soruyu ekrana getirmektir
  resetState();
  let currentQuestion = questions[currentQuestionIndex]; 
  // Bu satırda, 'currentQuestion' adında bir değişken tanımlanıyor ve bu değişkene questions dizisinin şu anki indeksine karşılık gelen soru atanıyor.

  // currentQuestionIndex: Mevcut sorunun dizideki sırasını belirten bir indeks numarasıdır. Örneğin, currentQuestionIndex 0 ise, dizideki ilk soru seçilir.

  let questionNo = currentQuestionIndex + 1; // questionNo adında bir değişken tanımlanıyor ve bu değişkene currentQuestionIndex'e 1 eklenerek bulunmuş olan soru numarası atanıyor. Bu, genellikle kullanıcıya 1'den başlayarak numaralandırılmış sorular göstermek için yapılır

  questionsElement.innerHTML = questionNo + ". " + currentQuestion.
  // questionsElement adında bir HTML öğesinin içeriği (innerHTML) güncelleniyor.
  // questionNo değişkenine bir nokta ve boşluk eklenerek ("1. ", "2. " gibi) sorunun numarası oluşturuluyor.
  // currentQuestion.question ifadesi kullanılarak seçilen sorunun metni bu numaraya ekleniyor.
  // Sonuç olarak, HTML öğesi içinde "1. [soru metni]" şeklinde bir içerik görüntülenir.

  question;
  // showQuestion() fonksiyonu, mevcut sorunun diziden alınıp numaralandırılarak HTML öğesine eklenmesini sağlar. Bu fonksiyon her çağrıldığında, ekrana yeni bir soru gösterilir.

  currentQuestion.answers.forEach(answer =>{ // currentQuestion.answers dizisi içindeki her bir öğe (answer) için bir döngü başlatır. forEach metodu, dizi içinde kaç tane öğe varsa o kadar kez çalışır ve her seferinde answer değişkeniyle döngü içerisinde yer alır.

    const button = document.createElement("button"); // Her answer için yeni bir buton elementi oluşturur.

    button.innerHTML = answer.text; // Butonun içeriğini (innerHTML) answer.text ile doldurur. Bu, answer nesnesinin text özelliğini butonun üzerinde görüntülenen metin olarak ayarlar.

    button.classList.add("btn"); // Oluşturulan butona "btn" adında bir CSS sınıfı ekler. Bu, butonun stilini belirlemek için kullanılan bir sınıf olabilir

    answerButtons.appendChild(button); // Son olarak, answerButton adındaki bir HTML elementine (muhtemelen daha önce tanımlanmış bir div veya section gibi) bu yeni oluşturulan butonu (button) ekler. Bu, butonun sayfada görünmesini sağlar.

    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer)
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}


function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  
  Array.from(answerButtons.children).forEach(button =>{
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}


function showScore(){
  resetState();
  questionsElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}


function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click",() =>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
})

startQuiz();