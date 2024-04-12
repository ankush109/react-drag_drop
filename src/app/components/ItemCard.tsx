import React from "react";
import { Draggable } from "react-beautiful-dnd";

function ItemCard({ columnName, sendDataToParent, index, task }) {
  const columnClassMap = {
    toDo: "bg-blue-200 hover:bg-blue-500",
    doing: "bg-red-200 hover:bg-red-500",
    done: "bg-green-200 hover:bg-green-500 ",
  };
  const columnClass = columnClassMap[columnName];
  return (
    <Draggable draggableId={task.id.toString()} key={task.id} index={index}>
      {(provided) => (
        <div className="flex ">
          <div
            key={index}
            className={`flex p-3 w-full m-6 rounded-xl justify-between ${columnClass} `}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div>{task.title}</div>
            <div>
              <button
                className="bg-red-500 p-1 rounded-lg text-white"
                onClick={() => {
                  sendDataToParent(task.id);
                }}
              >
                delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default ItemCard;
