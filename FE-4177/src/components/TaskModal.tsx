import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import Button from "./Button";
import TaskInput from "./TaskInput";

const ModalHeader = styled.h2`
  margin-bottom: 16px;
`;

interface TaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  taskContent: string;
  setTaskContent: (value: string) => void;
  onSave: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onRequestClose,
  taskContent,
  setTaskContent,
  onSave,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Düzenle"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          borderRadius: "8px",
          width: "300px",
        },
      }}
    >
      <ModalHeader>İşi Düzenle</ModalHeader>
      <TaskInput value={taskContent} onChange={(e) => setTaskContent(e.target.value)} placeholder="" />
      <Button onClick={onSave} color="#002379" hoverColor="#002379">
        Kaydet
      </Button>
      <Button onClick={onRequestClose} color="#ff4d4f" hoverColor="#ff7875" style={{ marginLeft: "8px", marginTop: "5px" }}>
        İptal
      </Button>
    </Modal>
  );
};

export default TaskModal;
