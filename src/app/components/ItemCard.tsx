import React from "react";
import { Draggable } from "react-beautiful-dnd";

function ItemCard({ index, task }) {
  return (
    <Draggable draggableId={task.id.toString()} key={task.id} index={index}>
      {(provided) => (
        <div
          key={index}
          className="bg-red-100 flex p-3 m-6 justify-center"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.title}
        </div>
      )}
    </Draggable>
  );
}

export default ItemCard;
