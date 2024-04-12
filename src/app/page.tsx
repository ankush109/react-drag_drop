"use client";
import React, { useEffect, useState } from "react";

import ItemCard from "./components/ItemCard";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

function Page() {
  const [toDoItems, setTodoItems] = useState([
    {
      title: "item 1",
      id: "1",
    },
    {
      title: "item 2",
      id: "2",
    },
    {
      title: "item 3",
      id: "3",
    },
  ]);
  const [todo, setTodo] = useState("");
  const [doing, setDoing] = useState([]);
  const [done, SetDone] = useState([]);
  useEffect(() => {
    console.log(toDoItems);
  }, [toDoItems]);
  const onDragEnd = (res: DropResult) => {
    console.log(res);
    const { source, destination } = res;
    if (!destination) return null;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return null;
    let add,
      active = toDoItems;
    let doneItems = done;
    let completed = doing;
    if (source.droppableId === "toDoItems") {
      console.log(source.index, "picked");
      add = active[source.index];

      active.splice(source.index, 1);
    }
    if (source.droppableId === "doneItems") {
      console.log(source.index, "picked");
      add = doneItems[source.index];

      doneItems.splice(source.index, 1);
    }
    if (source.droppableId === "doingItems") {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }
    if (destination.droppableId === "toDoItems") {
      console.log(destination);
      active.splice(destination.index, 0, add);
    }
    if (destination.droppableId === "doingItems") {
      completed.splice(destination.index, 0, add);
    }
    if (destination.droppableId === "doneItems") {
      doneItems.splice(destination.index, 0, add);
    }
    setTodoItems(active);
    setDoing(completed);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div className="flex justify-center my-20">
          <input
            className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-blue-500"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            onClick={() =>
              setTodoItems([
                ...toDoItems,
                {
                  title: todo,
                  id: (toDoItems.length + 1).toString(),
                },
              ])
            }
          >
            add
          </button>
        </div>
        <div className="flex gap-10 mx-10 justify-evenly my-32">
          <Droppable droppableId="toDoItems">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-green-600 h-[60vh] w-1/2 overflow-hidden overflow-y-scroll"
              >
                <h1 className="bg-yellow-400 p-3 flex items-center sticky top-0 justify-center">
                  TO DO ITEMS
                </h1>
                {toDoItems?.map((todo, index) => (
                  <ItemCard task={todo} index={index} />
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
                className="bg-green-600 w-1/2   h-[60vh]  overflow-hidden overflow-y-scroll "
              >
                <h1 className="bg-yellow-400 p-3  flex items-center sticky top-0 justify-center">
                  Doing
                </h1>
                {/* {doing?.map((doing, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-red-100 flex p-3 m-6 justify-center"
                    >
                      {doing.title}
                    </div>
                  );
                })} */}
                {doing?.map((doing, index) => (
                  <ItemCard task={doing} index={index} />
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
                className="bg-green-600 w-1/2"
              >
                <h1 className="bg-yellow-400 p-3 flex items-center sticky top-0 justify-center">
                  Done
                </h1>
                {done?.map((done, index) => (
                  <ItemCard task={done} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}

export default Page;
