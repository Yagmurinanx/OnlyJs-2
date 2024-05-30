import React from "react";
import styled from "styled-components";
import Button from "./Button";

const ListItem = styled.div`
  padding: 16px;
  margin-bottom: 8px;
  background-color: #f1f3f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditButton = styled(Button)`
  margin-left: 8px;
  margin-top: 5px;
`;

const DeleteButton = styled(Button)`
  margin-left: 8px;
  margin-top: 5px;
`;

interface TaskItemProps {
  content: string;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ content, onEdit, onDelete }) => {
  return (
    <ListItem>
      {content}
      <div>
        <EditButton onClick={onEdit} color="#1890ff" hoverColor="#40a9ff">
          Düzenle
        </EditButton>
        <DeleteButton onClick={onDelete} color="#ff4d4f" hoverColor="#ff7875">
          Sil
        </DeleteButton>
      </div>
    </ListItem>
  );
};

export default TaskItem;
