import React from 'react';
import { Button } from 'reactstrap';
import classes from './Answers.module.css';

function Answers({ question, color, disabled, clickHandle }) {
  return (
    <React.Fragment>
      {question?.answers?.map((answer, index) => {
        let letters = ['A:', 'B:', 'C:', 'D:'];
        return (
          <Button
            className={classes.button}
            style={{
              pointerEvents: disabled ? 'none' : '',
              backgroundColor: answer.correct ? 'green' : '',
              border: answer.correct ? '1px solid green' : '',
              fontSize: '25px',
            }}
            color={!answer.active ? 'primary' : color}
            onClick={() => clickHandle(answer)}
            key={index.toString()}
          >
            <div className={classes.content}>
              <div className={classes.letters}>{letters[index]}</div>
              <div className={classes.answer}>{decodeURIComponent(answer.text)}</div>
            </div>
          </Button>
        );
      })}
    </React.Fragment>
  );
}

export default Answers;
