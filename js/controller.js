import '../style.css';
import * as model from './model';
import { wait } from './helpers';
import cardView from './views/cardView';
import formView from './views/formView';
import gameInfoView from './views/gameInfoView';

const controlCard = async function () {
  // Load country
  await model.loadCountry();

  // Render Country
  cardView.render(model.state.currentCountry);
};
controlCard();

const controlSubmitAnswer = async function (data) {
  try {
    // If answer is correct
    if (model.checkAnswer(data)) {
      formView.clear();
      gameInfoView.showAnswerIcon(true);

      await wait(2);
      controlCard();
      gameInfoView.hideAnswerIcon();
    }

    // If answer is incorrect
    if (!model.checkAnswer(data)) {
      formView.clear();
      gameInfoView.showAnswerIcon(false);

      await wait(2);
      controlCard();
      gameInfoView.hideAnswerIcon();
    }
  } catch (error) {
    console.error(error);
  }
};

const init = function () {
  formView.submitAnswerHandler(controlSubmitAnswer);
};

init();
