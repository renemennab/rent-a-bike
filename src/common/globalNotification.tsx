import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface IProps {
  message: string;
  type: GlobalNotificationType;
}
const GlobalNotification = function ({ message, type }: IProps): JSX.Element {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) setShow(true);
    const timer1 = setTimeout(() => setShow(false), 2 * 1000);

    return () => {
      clearTimeout(timer1);
    };
  }, [message, type]);

  return (
    <StyledGlobalNotification
      className={`globalNotification ${show ? "" : "hide"} ${type}`}
    >
      {show ? message : ""}
      <button type="button" onClick={() => setShow(false)}>
        X
      </button>
    </StyledGlobalNotification>
  );
};

export default GlobalNotification;

const StyledGlobalNotification = styled.div`
  background: #78b440;
  width: 80%;
  padding: 20px 55px;
  font-size: 20px;
  font-weight: 600;
  color: white;
  display: flex;
  justify-content: center;
  align-items: ceter;
  text-transform: capitalize;
  position: absolute;
  z-index: 1000;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  transition: 0.5s all ease-in-out;
  border-radius: 5px;
  min-height: 60px;
  button {
    background: transparent;
    border: none;
    font-size: 20px;
    font-weight: 400;
    color: white;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
  &.hide {
    transform: translate(-50%, -100vh);
    button {
      display: none;
    }
  }
  &.error {
    background: #d85055;
  }
`;
