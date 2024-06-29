import React, {useState, useEffect} from 'react';
import { db } from '../firebase/firebase';
import {ref, onValue, push} from 'firebase/database';

const Registration = () => {
    
    const [credentials, setCredentials] = useState({
        Name: '',
        Username: '',
        Password: '',
    });

    const [loginCredentials, setLoginCredentials] = useState({
        Username: '',
        Password: "",
    });

    const [allUser, setAllUser] = useState([]);
    const [isRegister, setIsRegister] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        
        const taskRef = ref(db, 'registration');
        const unsubscribe = onValue(taskRef, (snapShot) => {
            const user =[];
            snapShot.forEach(childSnapShot => {

                user.push({id:childSnapShot.key, ...childSnapShot.val()});

            });

            setAllUser(user);

        });
        return () => unsubscribe();

    },[]);

    const handleChangeRegister = (e) => {

        const {name, value} = e.target;
        setCredentials(prevState => ({

            ...prevState,
            [name] : value
        }));
    }

    const handleChangeLogin = (e) => {
        const {name, value} = e.target;
        setLoginCredentials(prevState => ({
            ...prevState,
            [name] : value
        }));
    };

    const handleRegisterSubmit = (e) => {

        const taskRef = ref(db, 'registration');
        const {Name, Username, Password} = credentials;
        push(taskRef, {
            Name,
            Username,
            Password,
        }).then(() => {
            setCredentials({
                Name: '',
                Username: '',
                Password: ''
            })
        }).catch(error => {
            console.log("Error pushing Credentials", error);
        })
        alert("Register Succesful!");
    };
 
    return(
        <>
        <div className='container'>
            <div className='card'>
                <div className='register'>
                    <form onSubmit={handleRegisterSubmit}>
                    <input
                    type='text'
                    name='Name'
                    value={credentials.Name}
                    placeholder='Input your name'
                    required 
                    onChange={handleChangeRegister}
                    />
                    
                    <input 
                    type='text'
                    name='Username'
                    value={credentials.Username}
                    placeholder='Input Your username'
                    required
                    onChange={handleChangeRegister}
                    />

                    <input
                    type='password'
                    name='Password'
                    value={credentials.Password}
                    placeholder='Input your password'
                    required
                    onChange={handleChangeRegister}
                    />

                    <button type='submit'>Submit</button>
                    </form>

                </div>
            </div>
        </div>
        </>
    )


}

export default Registration;