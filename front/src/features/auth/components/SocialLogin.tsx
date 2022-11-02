import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  .social {
    padding: 0.6em 1em;
    border-radius: 0.25em;
    border: none;
    font-size: 1rem;
    margin-top: 0.7em;
    display: flex;
    width: 60%;
    height: 3rem;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    box-shadow: var(--shadow-1);
    @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
      box-shadow: 2px 2px 2px #4646466b;
    }
    color: #ffffff;
    margin: 0 auto;
    cursor: pointer;
  }
  .sociallogo {
    height: 2.5rem;
    width: auto;
  }
`;

interface socialProps {
  social: string;
  style: object;
}

const SocialLogin = ({ social, style }: socialProps) => {
  const redirectURI = 'http://localhost:3000//oauth2/redirect';
  // const redirectURI = 'https://k7e104.p.ssafy.io/oauth2/redirect';
  // const AUTH_URL = `http://localhost:8080/api/oauth2/authorize/${social}?redirect_uri=${redirectURI}`;
  const AUTH_URL = `https://k7e104.p.ssafy.io:8081/api/oauth2/authorize/${social}?redirect_uri=${redirectURI}`;
  const loginWithSocial = () => {
    window.location.href = AUTH_URL;
  };

  return (
    <Wrapper>
      <button onClick={loginWithSocial} className="social" style={style}>
        <img
          src={`/img/login/${social}.png`}
          alt={social}
          className="sociallogo"
        />
        Login with {social}
      </button>
    </Wrapper>
  );
};

export default SocialLogin;