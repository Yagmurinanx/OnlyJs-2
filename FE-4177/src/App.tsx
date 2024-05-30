import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { nanoid } from "nanoid";
import Modal from "react-modal";
import TaskInput from "./components/TaskInput";
import Button from "./components/Button";
import TaskItem from "./components/TaskItem";
import TaskModal from "./components/TaskModal";

Modal.setAppElement("#root");

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: #f7f9fc;
  min-height: 100vh;
  font-family: "Helvetica Neue", Arial, sans-serif;
`;

const Title = styled.h1`
  margin-bottom: 24px;
  color: #333;
`;

const ListContainer = styled.div`
  padding: 8px;
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AddTaskContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 500px;
  margin-bottom: 16px;
`;

interface Task {
  id: string;
  content: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editTaskContent, setEditTaskContent] = useState("");

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);
  };

  const addTask = () => {
    if (newTask.trim() === "") return;

    setItems([...items, { id: nanoid(), content: newTask }]);
    setNewTask("");
  };

  const deleteTask = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const openEditModal = (id: string, content: string) => {
    setEditTaskId(id);
    setEditTaskContent(content);
  };

  const saveEditTask = () => {
    if (editTaskId) {
      setItems(
        items.map((item) =>
          item.id === editTaskId ? { ...item, content: editTaskContent } : item
        )
      );
      setEditTaskId(null);
      setEditTaskContent("");
    }
  };

  return (
    <Container>
      <Title>Yapılacaklar Listesi</Title>
      <AddTaskContainer>
        <TaskInput
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Yeni iş ekle..."
        />
        <Button onClick={addTask} color="#002379">
          Ekle
        </Button>
      </AddTaskContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <TaskItem
                        content={item.content}
                        onEdit={() => openEditModal(item.id, item.content)}
                        onDelete={() => deleteTask(item.id)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ListContainer>
          )}
        </Droppable>
      </DragDropContext>

      <TaskModal
        isOpen={!!editTaskId}
        onRequestClose={() => setEditTaskId(null)}
        taskContent={editTaskContent}
        setTaskContent={setEditTaskContent}
        onSave={saveEditTask}
      />
    </Container>
  );
};

export default App;
