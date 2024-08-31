import React, { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import { useUser } from "./UserContext";
import { db, auth } from "./firebase";
import logo from "./img/sakuralogo.png";
import shopcard from "./img/shopping-cart.png";
import Footer from "./Footer";
const Comment = () => {
  let { user, setUser } = useUser();
  let [tasks, setTasks] = useState([]);
  let [text, setText] = useState("");
  let dbref = collection(db, "comment");

  let navigate = useNavigate();
  useEffect(() => {
    let checkAuth = () => {
      let unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          setUser({
            photo: authUser.photoURL,
            uid: authUser.uid,
            name: authUser.displayName,
          });
        } else {
          navigate("/");
        }
      });
      return () => unsubscribe();
    };
    checkAuth();
  }, [navigate, setUser]);
  function signOut() {
    auth.signOut().then(() => {
      setUser(null);
      navigate("/");
    });
  }

  async function createTask() {
    if (user) {
      let addData = await addDoc(dbref, {
        val: text,
        userPhoto: user.photo,
        userName: user.name,
      });
      setText("");
    }
  }
  async function getTasks() {
    let snapshot = await getDocs(dbref);
    let fetchdata = snapshot.docs.map((e) => ({ id: e.id, ...e.data() }));
    setTasks(fetchdata);
  }
  getTasks();
  return (
    <div>
      <header>
        <img className="sakura-logo" src={logo} alt="" />
        <a href="/todolist">главная</a>
        <a href="/comment">отзывы</a>
        <a href="/basket">
          <img className="shop_card" src={shopcard} alt="" />
        </a>
        <span>
          {user ? (
            <div className="header_user">
              <img className="user_photo" src={user.photo} />
            </div>
          ) : (
            <p>You dont signin</p>
          )}
          <button className="signout" onClick={signOut}>
            SignOut
          </button>
        </span>
      </header>
      <main>
        <div className="container_comment">
          <div className="comment">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              placeholder="Введите свой отзыв"
            />
            <button onClick={createTask}>Отправить</button>
          </div>
          {tasks.map((e) => (
            <div className="blockComment" key={e.id}>
              <span className="userComment">
                <img className="logoComment" src={e.userPhoto} alt="" />
                <h3 className="nameComment" style={{ marginLeft: "1rem" }}>
                  {e.userName}
                </h3>
              </span>
              <p className="textComment ">{e.val}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Comment;
