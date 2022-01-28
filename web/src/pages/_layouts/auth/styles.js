import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)),
    url('https://realinstitutodeoncologia.com.br/wp-content/uploads/2017/07/white-background-image-3.jpg')
      no-repeat center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  max-width: 360px;
  text-align: center;
  width: 350px;
  height: 500px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 5px 20px 50px #000;
  height: 425px;
  padding: 30px 30px;

  img {
    width: 300px;
  }
  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      margin-top: 10px;
      width: 100%;
      background: transparent;
      font-weight: bold;
      border: 1px solid rgba(255, 255, 255, 0.6);
      border-radius: 120px;
      padding: 15px;
      color: #fff;

      &::placeholder {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.6);
      }
    }
    span {
      color: red;
      align-self: flex-start;
      margin: 3px 10px;
      font-weight: bold;
    }
    button {
      margin: 5px 0 0;
      margin-top: 20px;
      height: 44px;
      background: #dc143c;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 20px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.1, '#dc143c')};
      }
    }
    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
`;
