import './App.css';
import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import Game from './components/Game.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Stage from './components/Stage';
import HintButtons from './Ui/HintsButtons';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Confetti from 'react-confetti';
import Music from 'react-howler';
import sound1 from './music/Sound1.mp3';
import soundCall from './music/SoundCall.mp3';
import { Button, Card } from 'reactstrap';

function App() {
  const [data, setData] = useState([]);
  const [stage, setStage] = useState(15);
  const [joker, setJoker] = useState(false);
  const [modalObject, setModalObject] = useState({ modal: false });
  const [win, setWin] = useState(false);
  const [exit, setExit] = useState(false);
  const [sound, setSound] = useState(sound1);
  const [callHint, setCallHint] = useState(false);
  const [music, setMusic] = useState(true);
  const [play, setPlay] = useState(false);

  const fetchDataHandler = useCallback(async () => {
    try {
      const response = await fetch(
        'https://opentdb.com/api.php?amount=15&type=multiple&encode=url3986'
      );
      const data = await response.json();
      const sortMap = {
        easy: 1,
        medium: 2,
        hard: 3,
      };
      const transformedData = data.results
        .sort((a, b) => sortMap[a.difficulty] - sortMap[b.difficulty])
        .map((result) => {
          return {
            question: result.question,
            answers: [
              { text: result.correct_answer, isCorrect: true },
              { text: result.incorrect_answers[0], isCorrect: false },
              { text: result.incorrect_answers[1], isCorrect: false },
              { text: result.incorrect_answers[2], isCorrect: false },
            ],
          };
        });
      setData(transformedData);
    } catch (error) {}
  }, []);
  useEffect(() => {
    if (stage === 0) {
      setWin(true);
    }
  }, [stage]);
  const handleModalClose = () => {
    setModalObject({ modal: false, label: '', text: '' });
    setExit(false);
    setCallHint(false);
    setMusic(true);
  };

  const newGame = () => {
    window.location.reload(false);
  };
  const startGame = () => {
    setPlay(true);
  };

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  const callFriendJokerHandler = (event) => {
    setCallHint(true);
    setMusic(false);
    event.target.disabled = true;
    let correctAnswer = data[15 - stage].answers.filter((correct) => correct.isCorrect);
    let wrongAnswers = data[15 - stage].answers.filter((correct) => !correct.isCorrect);
    let arrayText = [
      `The right answer is: ${decodeURIComponent(correctAnswer[0].text)}`,
      `I think the right answer is : ${decodeURIComponent(correctAnswer[0].text)}`,
      `You can go ahead and mark : ${decodeURIComponent(correctAnswer[0].text)}`,
      `I'am not sure, but i think it's : ${decodeURIComponent(wrongAnswers[0].text)}`,
      "I'am sorry, but i don't know...",
    ];
    let randomIndex = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
    setModalObject({
      modal: true,
      label: 'Call a friend!',
      text: arrayText[randomIndex],
      click: handleModalClose,
    });
  };

  const fiftyFiftyJokerHandler = () => {
    const question = data[15 - stage];

    while (question.answers.length > 2) {
      const correctIndex = question.answers.findIndex((object) => {
        return object.isCorrect;
      });
      const randomIndex = Math.floor(Math.random() * 3);
      if (randomIndex !== correctIndex) {
        question.answers.splice(randomIndex, 1);
      }
    }

    setJoker(true);
  };
  const askTheAudience = (event) => {
    event.target.disabled = true;
    const question = data[15 - stage].answers;
    question.forEach((answer) => {
      if (question.length > 2) {
        if (answer.isCorrect) {
          answer.audience = 30;
        } else {
          answer.audience = 0;
        }
      } else {
        if (answer.isCorrect) {
          answer.audience = 40;
        } else {
          answer.audience = 0;
        }
      }
    });
    setModalObject({
      modal: true,
      label: 'Ask the audience!',
      text: question,
      click: handleModalClose,
    });
  };

  if (data.length > 0) {
    return (
      <React.Fragment>
        <div className="start" style={{ display: play ? 'none' : '' }}>
          <Card style={{ backgroundColor: '#cfe2ff' }} className="container">
            Who Wants To Be A Milionare
          </Card>
          <Button
            className="button"
            style={{ fontSize: '50px', color: 'orange' }}
            color="primary"
            onClick={startGame}
          >
            PLAY NOW
          </Button>
        </div>
        {win && <Confetti style={{ width: '100%' }} />}
        <Music loop={true} src={sound} playing={music} />
        <Music loop={true} src={soundCall} playing={callHint} />
        <div className="game" style={{ display: !play ? 'none' : '' }}>
          {!win && (
            <HintButtons
              joker={joker}
              fiftyfifty={fiftyFiftyJokerHandler}
              callFriend={callFriendJokerHandler}
              audience={askTheAudience}
            />
          )}
          {!win && (
            <Stage
              stage={stage}
              setModalObject={setModalObject}
              newGame={newGame}
              handleModalClose={handleModalClose}
              setExit={setExit}
            />
          )}
        </div>
        <div style={{ display: !play ? 'none' : '' }}>
          <Game
            data={data}
            stage={stage}
            setStage={setStage}
            modalObject={modalObject}
            setModalObject={setModalObject}
            handleModalClose={handleModalClose}
            newGame={newGame}
            win={win}
            exit={exit}
            setSound={setSound}
            sound={sound}
            setMusic={setMusic}
            music={music}
          />
        </div>
      </React.Fragment>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }}>
      <CircularProgress size={150} />
    </Box>
  );
}

export default App;
