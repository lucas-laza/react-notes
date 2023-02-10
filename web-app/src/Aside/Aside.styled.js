import styled from "styled-components";


export const CreateLink = styled.div`
  align-self: flex-end;
  justify-self: center;
  min-width: 50px;
  min-height: 25px;
  background-color: #f4b412;
  padding: 12px;
  color: ${({ theme }) => theme.asideBackgroundColor};
`