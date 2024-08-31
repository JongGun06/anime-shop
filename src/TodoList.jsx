import React, {useState, useEffect} from 'react';
import { db, auth } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';
import './App.css'
import logo from './img/sakuralogo.png'
import shopcard from './img/shopping-cart.png'
import animetoys1 from './img/animetoys1.png'
import animetoys2 from './img/animetoys2.png'
import block1photo from './img/block1photo.jpeg'
import Footer from './Footer';







const TodoList = () => {
    
    let [tasks, setTasks] = useState([])
    let {user, setUser} = useUser()
    let [basket, setBasket] = useState([])
    let navigate = useNavigate()
    let dbref = collection(db, 'tasks')
    let dbref2 = collection(db, 'basket')

    useEffect(() => {
        let checkAuth = () => {
            let unsubscribe = auth.onAuthStateChanged((authUser) => {
                if(authUser) {
                    setUser({photo: authUser.photoURL, uid: authUser.uid})
                    getTasks()
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
            let snapshot = await getDocs(dbref)
            let fetchdata = snapshot.docs.map(e => ({id: e.id, ...e.data()}))
            setTasks(fetchdata)
    }
     function addcard(id) {
        tasks.map(e => {
        if(e.id == id) {
         addDoc(dbref2, {val: e.val, userId: user.uid, photo: e.photo, summa: e.summa})
            
        }

        
       }) 
    
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
                <div className='block_1'>
                    {/* <h1>Интернет- магазин <br /> японских аниме <br /> фигурок</h1>
                    <img className='animetoys' src={animetoys2} alt="" />
                    <img className='animetoys' src={animetoys1} alt="" /> */}
                    <img className='block1photo' src={block1photo}/>
                </div>
            <div className='block'>
                {tasks.map((task) => (
                    <div className='product-item' key={task.id}>
                        <img className='image' src={task.photo}/>
                        <div className="product-list">
                        <h3>{task.val}</h3>
                        <h3 className='price'>{task.summa} сом</h3>
                        
                         <button className='button' onClick={() => addcard(task.id)}>Добавить в корзину</button>
                        </div>
                    </div>

                ))}
            </div>
            </main>
            <Footer/>
        </div>
    );
}

export default TodoList;
