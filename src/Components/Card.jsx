import React from 'react';
import './Card.css';
import { useState, useEffect } from "react";

export default function Card() {
    const [newList , setNewList] = useState([]);
    const [listMember , setListMember] = useState('');

    const addListMemberValue = (event) => {
        setListMember(event.target.value);
        
    };

    async function  addNewToList(event) {
        event.preventDefault();
        const data = {title: listMember}
        console.log(data)
        //llamar a la api para guardar el dato {title: “programar”}
        const response = await fetch("http://localhost:8080/api/tasks", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          });
        console.log(response)

        setNewList([...newList, listMember]);
        setListMember('');
    };
    const DeleteItems = (indexItem) => {
        console.log("index", indexItem)
        console.log("Estado actual", newList )
        const result = newList.filter((item, index) => index !== indexItem )
        console.log("Estado siguiente", result);
        setNewList(result)
      };

  return (
    <main className='container'>
        <section className="header">
            <h1>To-do-list</h1>
        </section>

        <section className="body-ctn">
            <form action="submit">
                <div className="input-ctn">
                    <input type="text" value = {listMember} onChange = {addListMemberValue} />
                    <button id = "" onClick={addNewToList}>+ Agregar</button>
                </div>
            </form>
            <div className="list1">
                <ul className='to-do-list'>
                    {newList.map((item , index)=> 
                    <li key={index}>
                        <p> {index +1} - {item}</p>
                        <button className="add" onClick={() => {
                            alert("Tarea completada");

                        }, disabled }></button>
                        <button className="edit" onClick={() => {
                            
                        }}></button>
                        <button className="delete" onClick={() => DeleteItems(index)}>

                        </button>
                    </li>)}
                    
                </ul>
            </div>

        </section>
    </main>
  )
}
