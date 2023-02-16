import React from 'react';
import './Card.css';
import { useState, useEffect } from "react";

export default function Card() {
    const [newList , setNewList] = useState([]);
    const [listMember , setListMember] = useState('');

    const addListMemberValue = (event) => {
        setListMember(event.target.value);
    };

    const addNewToList = (event) => {
        event.preventDefault();
        setNewList([...newList, listMember]);
        setListMember('');
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
                    {newList.map((item , index)=> <li>
                        <p> {index +1} - {item}</p>
                        <button className="add">+</button>
                        <button className="edit">E</button>
                        <button className="delete">X</button>
                    </li>)}
                    
                </ul>
            </div>

        </section>
    </main>
  )
}
