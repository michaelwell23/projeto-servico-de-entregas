import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.6);
  padding: 0 30px;
  overflow: hidden;
  box-shadow: 5px 20px 50px #00000033;
  color: #fff;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 10px;
      padding-right: 10px;
      border-right: 1px solid #aaa;
      width: 100%;
      max-width: 220px;
    }
  }

  aside {
    @media only screen and (max-width: 860px) {
      display: none;
    }

    display: flex;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
      font-weight: bold;
      text-transform: capitalize;
      align-items: flex-end;

      strong {
        font-size: 14px;
        color: #fff;
        font-weight: bold;
      }
    }
  }
`;

export const Tab = styled.div`
  @media only screen and (max-width: 860px) {
    display: ${props => (props.show ? 'flex' : 'none')};
  }

  span {
    @media only screen and (max-width: 860px) {
      margin: 0;
    }

    font-size: 15px;
    color: #fff;
    font-weight: bold;
    margin-right: 15px;

    &:hover {
      color: ${darken(0.2, '#fff')};
      cursor: pointer;
    }
  }
`;

export const ButtonToggle = styled.button`
  display: none;
  background: '#dc143c';
  border: none;
  height: 28px;
  margin: auto 0;

  @media only screen and (max-width: 860px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MenuContainer = styled.div`
  display: none;

  @media only screen and (max-width: 860px) {
    display: ${props => (props.show ? 'flex' : 'none')};
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 180px;
    background: rgba(0, 0, 0, 0.3);
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.03);
  }
`;
export const Logoff = styled.p`
  @media only screen and (max-width: 860px) {
    margin: 0;
    font-size: 15px;
  }

  margin-top: 5px;
  font-weight: bold;
  color: #de3b3b;

  &:hover {
    cursor: pointer;
    color: ${darken(0, 'red')};
  }
`;
