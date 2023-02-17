import React from 'react';
import './Card.css';
import { useState, useEffect } from "react";
import checkIcon from '../Resources/check.svg';
import editIcon from '../Resources/edit.svg';
import deleteIcon from '../Resources/delete.svg';
import plusIcon from '../Resources/plus.svg';

export default function Card() {
    const [newList , setNewList] = useState([]);
    const [listMember , setListMember] = useState('');
    const addListMemberValue = (event) => {
        setListMember(event.target.value);
    
    };
    useEffect(() => {
        fetch("http://localhost:8080/api/tasks")
          .then(response => response.json())
          .then(json => {
            // Tomamos lo que retorna la base de datos que es un array de objetos [{title: "value"}] y extraemos el value con .map que se guarda en la variable list
            console.log(json)
            //const list = json.map(element => element.title)
            setNewList([...json])
            
          });
      }, []);


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
          }).then(response => response.json()
          ).then(json => setNewList([...newList, json]))
        console.log(response)

        
        setListMember('');
    };
    const DeleteItems = (indexItem) => {
        console.log("index", indexItem)
            let text = "Press a button!\n¿Are you sure to delete this item? OK or Cancel.";
            if (window.confirm(text) === true) {
                console.log("Estado actual", newList )
                const result = newList.filter((item, index) => item.id !== indexItem )
                console.log("Estado siguiente", result);
                setNewList([...result])
                
                fetch(`http://localhost:8080/api/tasks/${indexItem} `, {
                    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                        
                });    
                
            } 
      };


    const EditItems = (indexItem) => {
        
        newList[indexItem] = window.prompt("muahahahahaha");
        console.log(newList)
        setNewList([...newList]);
        console.log(newList)
        
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
                    {newList.map((item , index)=> 
                    <li key={item.id}>
                        <p> {item.id} - {item.title}</p>
                        <button className="add" onClick={() => {
                            alert("Tarea completada");

                        }}><img src={checkIcon}  alt="" /></button>
                        <button className="edit" onClick={() => {EditItems(item.id)}}

                        ><img src={editIcon}  alt="" /></button>
                        <button className="delete" onClick={ () => DeleteItems(item.id)} >
                        
                        <img src={deleteIcon}  alt="" /></button>
                    </li>)}

                    
                </ul>
            </div>

        </section>
    </main>
  )
}
