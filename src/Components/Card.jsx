import React from 'react';
import './Card.css';
import { useState, useEffect } from "react";

import editIcon from '../Resources/edit.svg';
import deleteIcon from '../Resources/delete.svg';
import plusIcon from '../Resources/plus.svg';
import submitIcon from '../Resources/submit.svg';
import checkIcon from '../Resources/check.svg';

export default function Card() {
    const [newList , setNewList] = useState([]);
    const [listMember , setListMember] = useState('');
    const addListMemberValue = (event) => {
        setListMember(event.target.value);  
    };
    useEffect(() => {
        fetch("http://localhost:8080/api/tasks")
          .then(response => response.json())
          .then(json => {//map
            // Tomamos lo que retorna la base de datos que es un array de objetos [{title: "value"}] y extraemos el value con . que se guarda en la variable list
            setNewList([...json])     
          });
      }, []);


    async function addNewToList(event) {
        event.preventDefault();
        const data = {title: listMember}
        //llamar a la api para guardar el dato {title: “programar”}
        const response = await fetch("http://localhost:8080/api/tasks", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          }).then(response => response.json()
          ).then(json => setNewList([...newList, json]))   
        setListMember('');
    };
    const DeleteItems = (indexItem) => {
            let text = "Press a button!\n¿Are you sure to delete this item? OK or Cancel.";
            if (window.confirm(text) === true) {
                const result = newList.filter((item, index) => item.id !== indexItem )
                setNewList([...result])       
                fetch(`http://localhost:8080/api/tasks/${indexItem} `, {
                    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin           
                });    
                
            } 
      };
    
    const completeTask = (indexItem) =>{ // COMPLETE TASK BUTTON
        alert("Tarea completada");
        const findObject = newList.find((task) => task.id === indexItem)
        const resInput = `${findObject.title}  (Task completed)`;
        const data = {title: resInput}
        const updatedTask = {...findObject, title: resInput}
        const indexObj = newList.findIndex(item => item.id === updatedTask.id)
        newList[indexObj] = updatedTask;
        setNewList([...newList]);

    //////////////////////
    const response = fetch(`http://localhost:8080/api/tasks/${indexItem}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then(response => response.json()
    ).then(json => setNewList([...newList]))     
    }

    const EditItems = (indexItem) => {
        const findObject = newList.find((task) => task.id === indexItem)
        const resInput = window.prompt("Ingrese la tarea por la que desea cambiar");
        if (resInput) {
            const data = {title: resInput}
            const updatedTask = {...findObject, title: resInput}
            const indexObj = newList.findIndex(item => item.id === updatedTask.id)
            newList[indexObj] = updatedTask;
            setNewList([...newList]);
            const response = fetch(`http://localhost:8080/api/tasks/${indexItem}`, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                  'Content-Type': 'application/json'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },    
                body: JSON.stringify(data) // body data type must match "Content-Type" header          
              }).then(response => response.json()
              ).then(json => setNewList([...newList])) 
        } 

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
                    <button id = "" disabled={!listMember} onClick={addNewToList}><img src={plusIcon}  alt="" /> Agregar</button>
                </div>
            </form>
            <div className="list1">
                <ul className='to-do-list'>
                    {newList.map((item , index)=> {
                        return(
                            <li key={index}>
                                <p> {item.id} - {item.title}</p>
                                <button className="add" id = "addBtn" onClick={() => {completeTask(item.id)}}><img src={checkIcon}  alt="" /></button>
                                <button className="edit" onClick={() => {EditItems(item.id)}}><img src={editIcon}  alt="" /></button>
                                <button className="delete" onClick={ () => DeleteItems(item.id)}><img src={deleteIcon}  alt="" /></button>
                            </li>
                            )}
                        )}
                </ul>
            </div>

        </section>
    </main>
  )
}
