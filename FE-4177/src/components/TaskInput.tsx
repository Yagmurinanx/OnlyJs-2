import React, { ChangeEvent } from "react";
import styled from "styled-components";

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-right: 8px;
  font-size: 16px;
`;

interface TaskInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const TaskInput: React.FC<TaskInputProps> = ({ value, onChange, placeholder }) => {
  return <Input type="text" value={value} onChange={onChange} placeholder={placeholder} />;
};

export default TaskInput;
