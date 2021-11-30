import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { handleGoBack } from "./utils";

interface IProps {
  pageName: string;
}

const PageHeader = function ({ pageName }: IProps): JSX.Element {
  const history = useHistory();

  return (
    <StyledBackArrow>
      <button type="button" onClick={() => handleGoBack(history)}>
        <i className="fa fa-arrow-left" />
      </button>
      <h1>{pageName}</h1>
    </StyledBackArrow>
  );
};

export default PageHeader;
const StyledBackArrow = styled.header`
  button {
    color: var(--red);
    border: none;
    background: transparent;
    font-size: 20px;
  }
`;
