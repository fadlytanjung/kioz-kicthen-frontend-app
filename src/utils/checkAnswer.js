const checkAnswer = (answer, correctAnswer) => {
  let result;
  if (Array.isArray(correctAnswer)) {
    result = (correctAnswer.find(correct => answer.toLowerCase() === correct.toLowerCase()))
      ? true : false;
  } else {
    result = (answer.toLowerCase() === correctAnswer.toLowerCase())
      ? true : false;
  }
  return result;
};

export default checkAnswer;
