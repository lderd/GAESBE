import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const Unity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  background-color: #232323;
  background-image: url(/img/MyOffice/level2.png);
  background-repeat: no-repeat;
  background-size: 90%;
  /* background-size: 70%; */
  background-position-y: 50%;
`;
const MyComputer = styled.img`
  width: 7%;
  height: 15%;
  position: absolute;
  bottom: 39vh;
  right: 36vw;
  :hover {
    transform: scale(1.3);
    transition: 0.4s ease-in-out;
  }
`;
const Coin = styled.img`
  width: 10%;
  height: 10%;
  position: absolute;
  bottom: 20vh;
  left: 30vw;
  :hover {
    transform: scale(1.3);
    transition: 0.4s ease-in-out;
  }
`;
const Note = styled.img`
  width: 5%;
  height: 7%;
  position: absolute;
  bottom: 20vh;
  left: 43vw;
  :hover {
    transform: scale(1.3);
    transition: 0.4s ease-in-out;
  }
`;
const Calender = styled.img`
  width: 5%;
  height: 12%;
  position: absolute;
  bottom: 43vh;
  right: 41vw;
  :hover {
    transform: scale(1.3);
    transition: 0.4s ease-in-out;
  }
`;
const Level2 = () => {
  const handleAlert = () => {
    alert('마이페이지로');
  };
  const navigate = useNavigate();
  const handleCoin = () => {
    navigate('/game/casino');
  };
  return (
    <Unity>
      <MyComputer
        onClick={handleAlert}
        src="/img/MyOffice/level2computer.png"
        alt="내 컴퓨터"
      />
      <Coin onClick={handleCoin} src="/img/coin/coin.png" />
      <Note src="/img/MyOffice/note.png" />
      <Calender src="/img/MyOffice/calender.png" />
    </Unity>
  );
};

export default Level2;