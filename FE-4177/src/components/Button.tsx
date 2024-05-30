import styled from "styled-components";

interface ButtonProps {
  color: string;
  hoverColor?: string;
}

const Button = styled.button<ButtonProps>`
  padding: 12px;
  background-color: ${(props) => props.color};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${(props) => props.hoverColor || props.color};
  }
`;

export default Button;
