import { FiLoader } from "react-icons/fi";
import styled from "styled-components";

const INPUT_PADDING = 8;

export const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const Title = styled.input`
  height: 40px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.asideBackgroundColor};
  padding: ${INPUT_PADDING}px;
  font-size: 20px;
  color: inherit;
  background: transparent;
`;

export const Content = styled.textarea`
  padding: ${INPUT_PADDING}px;
  flex: 1;
  border: none;
  font-family: inherit;
  color: inherit;
  background: transparent;
`;

export const SaveAndStatus = styled.div`
  height: 60px;
  padding: ${INPUT_PADDING}px;
  border-top: 1px solid ${({ theme }) => theme.asideBackgroundColor};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SaveButton = styled.button`
  height: 40px;
  border: 1px solid ${({ theme }) => theme.asideBackgroundColor};
  font-size: inherit;
  color: inherit;
  background-color: ${({ theme }) => theme.asideBackgroundColor};
`;


export const Loader = styled(FiLoader)`
  -webkit-animation: icon-spin 2s infinite linear;
  animation: icon-spin 2s infinite linear;
  @-webkit-keyframes icon-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }
  @keyframes icon-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.errorColor};
`;

export const Del = styled.div`
  display:grid;
  /* display: inline-block; */
  min-width:30px;
  min-height:30px;
  text-align: center;
  background-color:red;
  position: absolute;
  top:0;
  right:0;
  
  svg {
    display: block;
      align-self:center;
      justify-self:center;
  }
`