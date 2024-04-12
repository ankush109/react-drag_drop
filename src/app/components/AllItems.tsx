import React from "react";
import { Droppable } from "react-beautiful-dnd";
import ItemCard from "./ItemCard";

function AllItems({ setTodoItems, setDone, setDoing, toDoItems, doing, done }) {
  const deleteToDoItems = (data) => {
    console.log(data, "data delted");
    const filterdata = toDoItems?.filter((x) => x.id != data);
    setTodoItems(filterdata);
  };
  const deleteDoingItem = (data) => {
    console.log(data, "data delted");
    const filterdata = doing?.filter((x) => x.id != data);
    setDoing(filterdata);
  };
  const deleteDoneItem = (data) => {
    console.log(data, "data delted");
    const filterdata = done?.filter((x) => x.id != data);
    setDone(filterdata);
  };
  return (
    <>
      <Droppable droppableId="toDoItems">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-blue-400 h-[60vh] w-1/2 overflow-hidden overflow-y-scroll"
          >
            <h1 className="bg-blue-600 text-white font-semibold p-3 flex items-center sticky top-0 justify-center">
              TO DO ITEMS
            </h1>
            {toDoItems?.map((todo, index) => (
              <ItemCard
                columnName={"toDo"}
                sendDataToParent={deleteToDoItems}
                task={todo}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="doingItems">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-red-400 w-1/2   h-[60vh]  overflow-hidden overflow-y-scroll "
          >
            <h1 className="bg-red-600 p-3 text-white font-semibold  flex items-center sticky top-0 justify-center">
              Doing
            </h1>

            {doing?.map((doing, index) => (
              <ItemCard
                columnName={"doing"}
                sendDataToParent={deleteDoingItem}
                task={doing}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="doneItems">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-green-400 w-1/2  h-[60vh]   overflow-hidden overflow-y-scroll "
          >
            <h1 className="bg-green-600 text-white   font-semibold p-3 flex items-center sticky top-0 justify-center">
              Done
            </h1>
            {done?.map((done, index) => (
              <ItemCard
                columnName={"done"}
                sendDataToParent={deleteDoneItem}
                task={done}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
}

export default AllItems;
