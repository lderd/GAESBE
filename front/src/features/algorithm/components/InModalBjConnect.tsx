import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { BjConnectCodeRequest } from '../../../api/algoApi';
import { algoActions } from '../algorithmSlice';

import LoadingSpinner from './LoadingSpinner';
import styled from 'styled-components';
import '../../../components/Common/retroBtn.css';

const Wrapper = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img {
    left: 30rem;
    position: absolute;
  }
  .modal-title {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
    img {
      margin-left: 2%;
      width: 30px;
    }
  }
  .info {
    position: absolute;
    border: 3px solid #000;
    border-radius: 10px;
    top: 55%;
    left: 75%;
    width: 55%;
    background-color: #ffc02d;
    font-size: 15px;
    padding: 10px;
  }
  .info > div:nth-child(1) {
    margin: 5%;
    padding-bottom: 5px;
    border-bottom: 3px solid #000;
    font-size: 1.1rem;
  }

  .info > div:nth-child(2) {
    margin: auto;
    width: 90%;
    text-align: left;
    padding: 3% 0 0 0;
    line-height: 17px;
  }

  .modal-content {
    background-color: #fff;
    border-radius: 10px;
    border: 5px solid #000;
    height: 80%;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .connect-msg {
      margin: auto;
      height: 50%;
      font-size: 1.3rem;
      /* border: 1px solid #000; */
      display: flex;
      span {
        margin: auto;
      }
    }
    .bjFrom {
      height: 50%;
      margin: auto;
      /* border: 1px solid #000; */
      display: flex;
      flex-direction: column;
      justify-content: center;
      input[type='text'] {
        font-size: 1.3rem;
        height: 25px;
        background-color: gray;
        border: 3px solid #000;
        color: #fff;
      }
    }

    .code-content {
      margin: auto 0;
      h3 {
        text-align: center;
      }
    }
    button {
      margin-top: 10%;
    }
    .copy {
      padding: 10px;
      border-bottom: 5px solid #000;
    }
    .copy:hover {
      padding: 10px;
    }
  }
`;

interface Props {
  handleModal: () => void;
}
function InModalBjConnect({ handleModal }: Props) {
  // function InModalBjConnect() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: any) => state.auth);
  const { loadingMsg } = useSelector((state: any) => state.algo);

  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [bjIdForm, setBjIdForm] = useState<string>('');
  const [connectCode, setConnectCode] = useState<string>('');
  useEffect(() => {
    setBjIdForm(userInfo.bjId);
  }, []);
  const handleCodeRequest = async () => {
    try {
      const res = await BjConnectCodeRequest();
      if (res.status === 200) {
        setConnectCode(res.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const handleCheckBjConnect = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      bjId: { value: string };
    };
    const bjId = target.bjId.value;
    if (bjId) {
      dispatch(algoActions.bjConnectRequestStart(bjId));
    } else {
      Swal.fire({ icon: 'error', text: '?????? ???????????? ??????????????????' });
    }
  };

  const handleCopyCode = (value: string) => {
    const tmp = document.createElement('input');
    document.body.appendChild(tmp);
    tmp.value = value;
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
    Swal.fire({
      icon: 'success',
      text: '?????????????????????',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBjIdForm(e.currentTarget.value);
  };

  const handleOpenInfo = () => {
    setOpenInfo(!openInfo);
  };

  return (
    <Wrapper>
      <div className="modal-title">
        ?????? ????????????
        <img
          onMouseEnter={handleOpenInfo}
          onMouseLeave={handleOpenInfo}
          src="/img/questionMark-gray.png"
        ></img>
        <br />
        <br />
        <img
          className="img"
          onClick={handleModal}
          src="/img/close.png"
          alt=""
        />
        <div className="info" style={{ display: openInfo ? '' : 'none' }}>
          <div> ?????? ?????? </div>
          <div>
            1. ?????? ????????? ?????????
            <br />
            <br />
            2. ????????? ?????? [??????] ????????? &nbsp; &nbsp; &nbsp;?????? ????????????
            ???????????????
            <br />
            &nbsp; &nbsp;?????? [??????] ?????? ???! <br />
            <br />
            3. ???????????? ?????? ????????? ?????? <br />
            <br />
            4. [????????????] ????????? ?????? ???,
            <br />
            &nbsp; &nbsp;????????? ???????????? ??????! <br />
            <br />
          </div>
        </div>
      </div>

      <div className="modal-content">
        {userInfo.bjId && (
          <div className="connect-msg">
            <span>?????? ???????????? ???????????? ????????????.</span>
          </div>
        )}
        {loadingMsg === 'BJCONNECT' && (
          <LoadingSpinner loadingMsg={'?????? ??????????????????'} />
        )}
        {!userInfo.bjId && (
          <button
            className="eightbit-btn eightbit-btn--proceed"
            onClick={handleCodeRequest}
          >
            ???????????? ??????
          </button>
        )}
        {!userInfo.bjId && connectCode && (
          <div className="code-content">
            <h3>{connectCode}</h3>
            <button
              className="copy"
              onClick={() => {
                handleCopyCode(connectCode);
              }}
            >
              ??????????????????
            </button>
          </div>
        )}
        <form className="bjFrom" onSubmit={handleCheckBjConnect}>
          <label htmlFor="bjId">?????? ???????????????</label>
          <br />
          <input
            disabled={userInfo.bjId ? true : false}
            type="text"
            name="bjId"
            id="bjId"
            value={bjIdForm}
            onChange={handleInputChange}
          />
          {!userInfo.bjId && (
            <button className="eightbit-btn eightbit-btn--proceed">
              ????????????
            </button>
          )}
        </form>
      </div>
    </Wrapper>
  );
}
export default InModalBjConnect;
