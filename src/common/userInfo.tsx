import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { StyledInput, StyledLabel } from "./styled";

interface IProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  newPassword?: boolean;
  isLogin?: boolean;
}

const UserInfo = function ({
  email,
  setEmail,
  password,
  setPassword,
  newPassword,
  isLogin,
}: IProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <StyledLabel className="column">
        Email
        <StyledInput
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </StyledLabel>
      <StyledLabel className="column">
        {newPassword ? "New" : ""} Password{" "}
        {isLogin ? "" : "(8 characters minimum)"}
        <PasswordContainer>
          <StyledInput
            required={!newPassword}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            <i className={`fas fa-eye${showPassword ? "-slash" : ""}`} />
          </button>
        </PasswordContainer>
      </StyledLabel>
    </>
  );
};

UserInfo.defaultProps = {
  newPassword: false,
  isLogin: false,
};
export default UserInfo;

const PasswordContainer = styled.div`
  position: relative;
  input {
    width: 100%;
  }
  button {
    position: absolute;
    top: 60%;
    right: 10px;
    border: none;
    background: transparent;
    font-size: 20px;
    color: var(--dark-gray);
    transform: translateY(-50%);
  }
`;
