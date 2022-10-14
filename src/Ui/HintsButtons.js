import { Button } from 'reactstrap';
import React from 'react';
import Groups2Icon from '@mui/icons-material/Groups2';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

function HintsButtons({ joker, fiftyfifty, callFriend, audience, disabled }) {
  return (
    <>
      <div className="joker">
        <Button disabled={joker} onClick={fiftyfifty} color="primary">
          50/50
        </Button>
        <Button onClick={audience} color="primary">
          {<Groups2Icon fontSize="large" />}
        </Button>
        <Button onClick={callFriend} color="primary">
          {<LocalPhoneIcon fontSize="large" />}
        </Button>
      </div>
    </>
  );
}
export default HintsButtons;
