'use strict';

{
  const quizSet = [
    {q: '海賊王ゴール・D・ロジャーの右腕は？', c: ['レイリー', 'カタクリ', 'ギャバン', '黄猿']},
    {q: '元白ヒゲ海賊団3番隊隊長は？', c: ['ジョズ', 'マルコ', 'エース', 'サッチ']},
    {q: '黒ひげの笑い方は？', c: ['ゼハハハハハ', 'フフフフフ', 'キシシシシ', 'うじゅじゅじゅ']},
    {q: '麦わら一味が壊滅した島は？', c: ['シャボンディ諸島', '空島', 'ドレスローザ', 'アラバスタ']},
    {q: '黒ひげの名言は？', c: ['人の夢は終わらねェ', '戸惑いこそが人生だよ', 'バカな息子をそれでも愛そう', '勝者だけが正義だ']},
  ];

  const question = document.getElementById('question');
  const result = document.getElementById('result');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const scoreLabel = document.querySelector('#result > p');


  let currentNumber = 0;
  let isAnswered;
  let score = 0;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[j], array[i]] = [array[i], array[j]];
    }
    return array;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNumber].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }
    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNumber].q;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNumber].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;

      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNumber === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled'); 
    if (currentNumber === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.add('show');
    } else {
      currentNumber++;
      setQuiz();
    }
  });
}
