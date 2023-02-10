import styled, { css } from "styled-components";

const SIDE_WIDTH = 240;

export const Side = styled.aside`
  position: fixed;
  width: ${SIDE_WIDTH}px;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.asideBackgroundColor};
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

export const Main = styled.main`
  height: 100vh;
  margin-inline-start: ${SIDE_WIDTH}px;
`;

const CENTERED = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullHeightAndWidthCentered = styled.div`
  height: 100%;
  ${CENTERED}
`;

export const LoaderWrapper = styled.div`
  height: 60px;
  ${CENTERED}
`;

export const ModeChanger = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  /* background-color: #454545; */
  background-color: ${({ theme }) => theme.asideBackgroundColor};
  opacity: 0.8;
  width: fit-content;
  height: fit-content;
  padding: 5px 12px;
  display: grid;
  align-items: center;
  justify-content: center;

  label {
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
` 

export const SearchBar = styled.div`
  /* background-color: red; */
  filter: brightness(0.8);
  background-color: ${({ theme }) => theme.asideBackgroundColor};

  height: fit-content;
  padding: 10px;
  input[type=text] {
    font-family: sans-serif;
    color: ${({ theme }) => theme.mainTextColor};
    font-size: 0.8rem;
    font-weight: bold;
    border-radius: 5px;
    padding: 3px;
    width: 100%;
    filter: brightness(3);
    background-color: ${({ theme }) => theme.asideBackgroundColor};
    border: none;

    &:focus {
      outline: #111 2px solid;
    }

    &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: ${({ theme }) => theme.mainTextColor};
      font-weight: normal;
      opacity: 1; /* Firefox */
    }

  }
`