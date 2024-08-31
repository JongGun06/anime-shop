import React, {useState, useEffect} from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { useUser } from './UserContext';
import { db, auth } from './firebase';


const Form = () => {
    let [text, setText] = useState('')
    let [photos, setPhotos] = useState('')
    let [summ, setSumm] = useState()
    let {user, setUser} = useUser()
    let dbref = collection(db, 'tasks')
    useEffect(() => {
        let checkAuth = () => {
            let unsubscribe = auth.onAuthStateChanged((authUser) => {
                if(authUser) {
                    setUser({name: authUser.displayName, photo: authUser.photoURL, uid: authUser.uid})
                }
                
            })
            return () =>  unsubscribe()
            
        }
        checkAuth()
    }, [setUser])
    async function createTask() {
            await addDoc(dbref, {val: text, userId: user.uid, photo: photos, summa:summ})
            setText('')
            setPhotos('')
            setSumm(0)
    }
    return (
        <div>
            <input placeholder='summ' type="number" value={summ} onChange={(e) => setSumm(e.target.value)} />
             <input placeholder='text' type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <input placeholder='url' type="text" value={photos} onChange={(e) => setPhotos(e.target.value)}/>
            <button onClick={createTask}>add</button>
        </div>
    );
}

export default Form;
