import React, { useState } from "react";
import "./App.css";

const App = () => {
   const [formValue, setFormValue] = useState("");
   const [todoItems, setTodoItems] = useState([]);
   const [editActive, setEditActive] = useState(false);

   const checkboxChangeHandler = (id) => {
      setTodoItems(
         todoItems.map((item) => {
            if (item.id === id) {
               return { ...item, isCompleted: !item.isCompleted };
            }
            return item;
         })
      );
   };

   const deleteHandler = (id) => {
      setTodoItems(todoItems.filter((item) => item.id !== id));
   };

   const submitHandler = (e) => {
      e.preventDefault();
      setTodoItems([...todoItems, { id: new Date().getTime(), formValue, isCompleted: false }]);
      if (editActive) {
         setEditActive(false);
      }
   };

   const editHandler = (id) => {
      const currentItem = todoItems.find((item) => item.id === id);
      setFormValue(currentItem.formValue);
      setTodoItems(todoItems.filter((item) => item.id !== id));
      setEditActive(true);
   };

   const renderTodoItems = () => {
      return todoItems
         .filter((todoItem) => !todoItem.isCompleted)
         .map((todoItem) => {
            return (
               <div className="todo-item" key={todoItem.id}>
                  <input className="todo-input" onChange={() => checkboxChangeHandler(todoItem.id)} type="checkbox" />
                  <label className="todo-itemname">{todoItem.formValue}</label>
                  <button className="form-button" onClick={() => editHandler(todoItem.id)}>
                     Edit
                  </button>
                  <button className="form-button" onClick={() => deleteHandler(todoItem.id)}>
                     Delete
                  </button>
               </div>
            );
         });
   };

   const renderCompletedItems = () => {
      return todoItems
         .filter((todoItem) => todoItem.isCompleted)
         .map((todoItem) => {
            return (
               <div className="completed-item" key={todoItem.id}>
                  <input onChange={() => checkboxChangeHandler(todoItem.id)} checked className="completed-input" type="checkbox" />
                  <label className="completed-itemname">{todoItem.formValue}</label>
                  <button className="form-button" onClick={() => editHandler(todoItem.id)}>
                     Edit
                  </button>
                  <button className="form-button" onClick={() => deleteHandler(todoItem.id)}>
                     Delete
                  </button>
               </div>
            );
         });
   };

   return (
      <>
         {editActive ? (
            <div className="form">
               <h1 className="form-heading">Add item</h1>
               <form onSubmit={submitHandler}>
                  <input className="form-input" value={formValue} onChange={(e) => setFormValue(e.target.value)} required type="text" />
                  <button className="form-button form-button-edit" type="submit">
                     Update
                  </button>
               </form>
            </div>
         ) : (
            <div className="form">
               <h1 className="form-heading">Add item</h1>
               <form onSubmit={submitHandler}>
                  <input className="form-input" value={formValue} onChange={(e) => setFormValue(e.target.value)} required type="text" />
                  <button className="form-button" type="submit">
                     Add
                  </button>
               </form>
            </div>
         )}

         <div className="todo">
            {" "}
            <h2 className="todo-heading">To Do items</h2>
            {renderTodoItems(todoItems)}
         </div>
         <div className="completed">
            {" "}
            <h2 className="completed-heading">Completed Items</h2>
            {renderCompletedItems()}
         </div>

         <h3 className="github-link">
            {" "}
            <a href="https://github.com/pratyushranjanpadhi/todo-asignment" target="_blank">
               Github link of this project
            </a>{" "}
         </h3>
      </>
   );
};

export default App;
