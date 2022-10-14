import React from 'react';
import { Button } from 'reactstrap';
import classes from './Stage.module.css';
const prices = [
  '100 000',
  '50 000',
  '30 000',
  '20 000',
  '10 000',
  '5 000',
  '3 000',
  '2 000',
  '1 500',
  '1 000',
  '500',
  '400',
  '300',
  '200',
  '100',
];
function Stage({ stage, setModalObject, newGame, handleModalClose, setExit }) {
  const OnExitHandler = () => {
    setModalObject({
      modal: true,
      label: 'Exit the game',
      text: `Are you sure leaving the game? You can continue playing or leave with: $${
        prices[stage] === undefined ? '0' : prices[stage]
      }`,
      click: [newGame, handleModalClose],
    });
    setExit(true);
  };

  return (
    <div style={{ margin: 'auto' }}>
      <Button className={classes.exit} onClick={OnExitHandler} color="danger">
        Exit
      </Button>
      {prices.map((price, index) => {
        return (
          <div
            className={classes.list}
            key={index + 10}
            style={{
              backgroundColor: (stage === 1 + index && 'orange') || 'blue',
              opacity: stage <= index ? '0.5' : '',
              color:
                index === 5
                  ? 'black'
                  : '' || index === 0
                  ? 'black'
                  : '' || index === 10
                  ? 'black'
                  : '',
            }}
          >
            <div className={classes.stage}>{Math.abs(index - 15)}.</div>
            <div className={classes.price}>${price}</div>
          </div>
        );
      })}
    </div>
  );
}
export default Stage;
