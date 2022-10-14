import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Progress } from 'reactstrap';
import ReactDOM from 'react-dom';
import classes from './GameModal.module.css';

const ModalPop = ({ data, gameOver, exit }) => {
  const [randomNumbers, setRandomNumbers] = useState([]);
  let letters = ['A:', 'B:', 'C:', 'D:'];
  let numbers = [16, 14, 19, 21];
  let fiftyfiftyNumbers = [34, 26];

  useEffect(() => {
    if (data?.text?.length > 2) {
      setRandomNumbers(numbers.sort((b, a) => 0.5 - Math.random()));
    } else {
      setRandomNumbers(fiftyfiftyNumbers.sort((b, a) => 0.5 - Math.random()));
    }
  }, [data]);
  return (
    <Modal isOpen={data.modal}>
      <ModalHeader style={{ fontSize: '50px' }}>{data.label}</ModalHeader>
      <ModalBody className={classes['modal-body']}>
        {!Array.isArray(data.text)
          ? decodeURIComponent(data.text)
          : data.text.map((element, index) => {
              return (
                <div className={classes['progress-container']} key={index}>
                  <div>
                    <Progress
                      className={classes.progress}
                      value={element.audience + randomNumbers[index]}
                    />{' '}
                  </div>
                  <div>
                    {letters[index]} {element.audience + randomNumbers[index]}%{' '}
                  </div>
                </div>
              );
            })}
      </ModalBody>
      <ModalFooter>
        <Button
          style={{ fontSize: '30px' }}
          onClick={exit ? data.click[1] : data.click}
          color="primary"
        >
          {gameOver ? 'New Game' : 'Continue'}
        </Button>{' '}
        {exit && (
          <Button style={{ fontSize: '30px' }} color="danger" onClick={data.click[0]}>
            Leave
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};
function GameModal({ data, modal, gameOver, exit }) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <ModalPop data={data} modal={modal} gameOver={gameOver} exit={exit} />,
        document.getElementById('modal-root')
      )}
    </React.Fragment>
  );
}
export default GameModal;
