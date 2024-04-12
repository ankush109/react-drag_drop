"use client";
import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import AllItems from "./components/AllItems";

function Page() {
  const [toDoItems, setTodoItems] = useState([]);
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
    SetDone(doneItems);
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
                  id: (Math.random() * toDoItems.length).toString(),
                },
              ])
            }
          >
            add
          </button>
        </div>
        <div className="flex gap-10 mx-10 justify-evenly my-32">
          <AllItems
            setTodoItems={setTodoItems}
            setDone={SetDone}
            setDoing={setDoing}
            toDoItems={toDoItems}
            done={done}
            doing={doing}
          />
        </div>
      </div>
    </DragDropContext>
  );
}

export default Page;
