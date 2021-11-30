import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { loginUser } from "../actions/userActions";
import PageHeader from "../common/pageHeader";
import { StyledButton, StyledForm } from "../common/styled";
import UserInfo from "../common/userInfo";
import { ROUTES } from "../utils";

const Login = function (): JSX.Element {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [userNotFound, setUserNotFound] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  function handleLogin(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch(loginUser({ email, password }, history, setUserNotFound));
  }

  return (
    <StyledLogin>
      <PageHeader pageName="Login" />
      <StyledForm action="" onSubmit={(event) => handleLogin(event)}>
        <UserInfo
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin
        />
        <StyledButton>
          Login <i className="fas fa-sign-in-alt" />
        </StyledButton>
      </StyledForm>

      {userNotFound ? (
        <span className="login--userNotFound">USER NOT FOUND</span>
      ) : null}
      <Link to={ROUTES.SIGNUP} className="login--signupLink">
        Need to create an account? Sign up here!
      </Link>
    </StyledLogin>
  );
};

export default Login;
const StyledLogin = styled.div`
  padding: var(--padding);
  display: flex;
  flex-direction: column;
  .login {
    &--signupLink {
      align-self: center;
      text-decoration: none;
      color: var(--dark-blue);
      margin-top: 50px;
    }
    &--userNotFound {
      color: var(--red);
      margin-top: 40px;
      align-self: center;
    }
  }
`;
