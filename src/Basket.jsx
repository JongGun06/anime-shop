import React, {useState, useEffect} from 'react';
import './App.css'
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

import { useUser } from './UserContext';
import { db, auth } from './firebase';
import logo from './img/sakuralogo.png'
import shopcard from './img/shopping-cart.png'
import Footer from './Footer';




const Basket = () => {
    let {user, setUser} = useUser()
    let [tasks, setTasks] = useState([])
    let dbref2 = collection(db, 'basket')


    let navigate = useNavigate()
    useEffect(() => {
        let checkAuth = () => {
            let unsubscribe = auth.onAuthStateChanged((authUser) => {
                if(authUser) {
                    setUser({photo: authUser.photoURL, uid: authUser.uid})
                }else {
                    navigate('/')
                }
                
            })
            return () =>  unsubscribe()
            
        }
        checkAuth()
    }, [navigate, setUser])
    function signOut() {
        auth.signOut().then(() => {
            setUser(null)
            navigate('/')

        })
    }
    async function getTasks() {
        if(user && user.uid) {
            let q = query(dbref2, where('userId', '==', user.uid))
            let querySnapshot = await getDocs(q)
            let taskData = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            setTasks(taskData)
        }
    }

    async function deleteTask(id) {
        let taskDoc = doc(dbref2, id)
        await deleteDoc(taskDoc)
        getTasks()
    }
  
    getTasks()
    return (
        <div>
            <header>
                <img className='sakura-logo' src={logo} alt="" />
                <a href="/todolist">главная</a>
                <a href="/comment">отзывы</a>
                <a  href="/basket"><img className='shop_card' src={shopcard} alt="" /></a>
            <span>
            {user ? (<div className='header_user'>
                <img className='user_photo' src={user.photo}/>
            </div>):(<p>You dont signin</p>)}
            <button className='signout' onClick={signOut}>SignOut</button>
            </span>
            </header>
            <main>
            <div className="cart-container">
            <h1>Корзина</h1>
            {tasks.map(e => (
                <div key={e.id} className="cart-item">
                <img src={e.photo} alt="Товар" className="cart-item-image" />
                <div className="cart-item-details">
                    <h3>{e.val}</h3>
                    <p>{e.summa} сом</p>
                    <button onClick={() => deleteTask(e.id)} className="remove-item">Удалить</button>
                </div>
            </div>
            
            ))}
            <div className="cart-total">
                <button className="checkout-button">Оформить заказ</button>
            </div>
            
        </div>
            </main>
        </div>
    );
}

export default Basket;
