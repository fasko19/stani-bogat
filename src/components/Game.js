import { Card, CardBody, CardText } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import classes from './Game.module.css';
import GameModal from '../Ui/GameModal';
import Answers from './Answers';
import sound2 from '../music/Sound2.mp3';
import sound3 from '../music/Sound3.mp3';
import sound4 from '../music/Sound4.mp3';
import soundWin from '../music/SoundWin.mp3';
import soundCorrect from '../music/SoundCorrect.mp3';
import soundSelected from '../music/SoundSelected.mp3';
import soundWrong from '../music/SoundWrong.mp3';

function Game({
  data,
  stage,
  setStage,
  modalObject,
  setModalObject,
  newGame,
  handleModalClose,
  win,
  exit,
  setSound,
  sound,
}) {
  const [question, setQuestion] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [color, setColor] = useState('warning');
  const [profit, setProfit] = useState('0');
  const [gameOver, setGameOver] = useState(false);
  const [currentSound, setCurrentSound] = useState(sound);

  useEffect(() => {
    if (stage === 10) {
      setModalObject({
        modal: true,
        label: 'Congrats!',
        text: 'You have reached $500',
        click: handleModalClose,
      });
      setCurrentSound(sound2);
      setProfit('500');
    } else if (stage === 5) {
      setModalObject({
        modal: true,
        label: 'Congrats!',
        text: 'You have reached $5 000',
        click: handleModalClose,
      });
      setCurrentSound(sound3);
      setProfit('5 000');
    } else if (stage === 1) {
      setCurrentSound(sound4);
    } else if (stage === 0) {
      setModalObject({
        modal: true,
        label: 'Congrats!',
        text: 'You won the $100 000',
        click: newGame,
      });
      setCurrentSound(soundWin);
      setGameOver(true);
      setProfit('100 000');
    }
  }, [stage]);

  useEffect(() => {
    const stageQuestion = data[15 - stage];
    stageQuestion?.answers?.sort((b, a) => 0.5 - Math.random());
    setQuestion(stageQuestion);
    setSound(currentSound);
  }, [data, stage, currentSound]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };
  const clickHandle = (answer) => {
    setDisabled(true);
    answer.active = true;
    setSound(soundSelected);

    delay(3000, () => {
      setColor(answer.isCorrect ? 'success' : 'danger');
      if (!answer.isCorrect) {
        question?.answers.forEach((el) => {
          if (el.isCorrect) {
            el.correct = true;
          } else {
          }
        });
      }
    });
    delay(6500, () => {
      if (answer.isCorrect === true) {
        setStage((curr) => curr - 1);
      } else {
        setModalObject({
          modal: true,
          label: 'You lost!',
          text: `You are leaving with $${profit}`,
          click: newGame,
        });
        setGameOver(true);

        setSound(currentSound);
        throw new Error('Game over');
      }
      setDisabled(false);
      answer.active = false;
    });
    setColor('warning');
    delay(2800, () => {
      if (answer.isCorrect) setSound(soundCorrect);
      else setSound(soundWrong);
    });
  };
  return (
    <React.Fragment>
      <GameModal data={modalObject} gameOver={gameOver} exit={exit} />
      <div className={classes.container}>
        {!win && (
          <div>
            <Card
              className={classes.card}
              inverse
              style={{
                background: '#cfe2ff',
                textAlign: 'center',
              }}
            >
              <CardBody>
                <CardText style={{ color: 'black' }}>
                  {decodeURIComponent(question?.question)}
                </CardText>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
      <div className={classes['button-container']}>
        <Answers question={question} color={color} disabled={disabled} clickHandle={clickHandle} />
      </div>
    </React.Fragment>
  );
}

export default Game;
