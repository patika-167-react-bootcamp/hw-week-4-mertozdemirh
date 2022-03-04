import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Filter from '../../components/Filter/Filter'
import Modals from '../../components/modal/Modals'
import TodoItem from '../../components/todoitem/Todoitem'
import TodoList from '../../components/todolist/Todolist'
import BasicSelectCategory from '../../selectitems/BasicSelectCategory'
import BasicSelectStatus from '../../selectitems/BasicSelectStatus'
import "./Home.css"

interface Home {
  id: number;
  text: string;
  category: Category;
}

interface Category {
  id: number;
  name: string;
  status?: Status;
}

interface Status {
  id: number;
  name: string;
}
interface Statu {
  title: string;
  categoryId: number;
  color: string;
}


function Home() {
  const [addedCategory, setAddedCategory] = useState<any>({});
  const [addedStatu, setAddedStatu] = useState<any>({});
  const [open, setOpen] = React.useState(false);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [statuList, setStatuList] = useState<Status[]>([]);
  const [categorySelect, setCategorySelect] = useState("");
  const [status, setStatus] = useState("");
  const [todoList, setTodoList] = useState<Home[]>([]);
  const [todoText, setTodoText] = useState<string>("");
  const [categoryText, setCategoryText] = useState<string>("");
  const [statuText, setStatuText] = useState<string>("");
  

  function handleSubmit(event:React.SyntheticEvent){
    event.preventDefault();
    setTodoList([
      ...todoList,
      {
        id: Math.round(Math.random() * 1000),
        text: todoText,
        category: {
          id: Math.round(Math.random() * 1000),
          name: categorySelect,
          status: {
            id: Math.round(Math.random() * 1000),
            name: status,
          },
        },
      },
    ]);
  }

  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(";").shift();
  }

  function getAllCategories(){
    const tokenTemp = getCookie("token");
    axios
      .get("http://localhost:80/category", {
        headers: {
          Authorization: "Bearer " + tokenTemp,
        },
      })
      .then((response) => {
        setCategoryList(response.data);
      });
  }

  useEffect(() => {
    getAllCategories();    
  }, [categoryList,]);




  function getAllStatus(id:any){
    const tokenTemp = getCookie("token");
    let responselist: Status[] = [];

    axios
      .get(`http://localhost:80/status?categoryId=${id}`, {
        headers: {
          Authorization: "Bearer " + tokenTemp,
        },
      })
      .then((response) => {
        response.data.map((item: any) => {
          responselist.push(item);
        });
      })
      .finally(() => setStatuList(responselist));
  }

  function handleCategoryAdded(){
    const tokenTemp = getCookie("token");
    axios
      .post(
        "http://localhost:80/category",
        { title: categoryText },
        {
          headers: {
            Authorization: "Bearer " + tokenTemp,
          },
        }
      )
      .then((response) => {
        setAddedCategory({
          id: response.data.id,
          name: response.data.title,
        });
        getAllCategories();
      });
  }

  function handleStatusAdded(statuAdd: any){
    const tokenTemp = getCookie("token");

    axios
      .post("http://localhost:80/status", statuAdd, {
        headers: {
          Authorization: "Bearer " + tokenTemp,
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  }

  
  function clearStatus(){
    console.log("SİL")
  }  

  function handleClose(){
    setOpen(false);
  }

  function handleOpen(){
    setOpen(true);
  }

  return (
    <div className="main">
        <div className="filter">
        <Filter
          categoryList={categoryList}
          statuList={statuList}
          categoryName={"category"}
          statuName={"statu"}
          getAllStatuses={getAllStatus}
        />
        </div>
         <div>
         <TodoList
            todoText={todoText}
            setTodoText={setTodoText}
            categoryList={categoryList}
            statuList={statuList}
            categoryName={"category"}
            statuName={"statu"}
            handleSubmit={handleSubmit}
            addedCategory={addedCategory}
            getAllStatus={getAllStatus}
          />
          </div>
          <div>
            <TodoItem
                todoList={todoList}
                categoryList={categoryList}
                statuList={statuList}
                categoryName={"category"}
                statuName={"statu"}
            />
         </div>
         <div>
            <Modals
                handleOpen={handleOpen}
                handleClose={handleClose}
                open={open}
                categoryText={categoryText}
                setCategoryText={setCategoryText}
                categoryList={categoryList}
                statuList={statuList}
                setStatu={setStatuList}
                statuText={statuText}
                setStatuText={setStatuText}
                handleCategoryAdded={handleCategoryAdded}
                handleStatusAdded={handleStatusAdded}
            />
        </div>

  </div>
  )
}

export default Home