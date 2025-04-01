import React, {useEffect, useRef, useState} from 'react';
import Input from "./Input";
import Button from "./Button";
import {Link, useNavigate} from "react-router-dom";
import http from "../plugins/http";
import useStore from "../store/main";
import {socket} from "../socket";

const LogForm = ({logTitle}) => {

    const {setOnlineUser, getActiveUsers} = useStore(state => state);

    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const password2Ref = useRef();

    const navigate = useNavigate()
    const [error, setError] = useState()

    async function register() {

        const user = {
            email: emailRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            password2: password2Ref.current.value,
        }

        const data = await http.post('http://localhost:8001/register', user)
        if (data.error) {
            console.log(data)
            setError(data)
        } else {
            console.log("user registered:", data.message);
            navigate("/");
            setError(null)
            emailRef.current.value = ''
            usernameRef.current.value = ''
            passwordRef.current.value = ''
            password2Ref.current.value = ''
        }
    }

    async function logIn() {

        const user = {
            email: emailRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        }

        const data = await http.post('http://localhost:8001/logIn', user);
        if (data.error) {
            setError(data)
            console.log(data);
        } else {
            console.log("User log in:", data);
            setOnlineUser(data.user);
            localStorage.setItem("token", data.token)

            socket.emit('login', usernameRef.current.value)

            navigate("/Home")
        }
    }

    useEffect(() => {
        socket.on("login", users => {
            getActiveUsers(users)
        })
    }, [])


    return (
        <div className="w-[90%] h-[90%] md:w-[60%] lg:w-[50%] xl:w-[30%] max-w-[650px] xl:h-auto xl:aspect-square pr-3 pl-3 bg-[rgba(6,49,63,0.05)]  backdrop-blur-3xl border-3 border-[#06313f] rounded-3xl shadow-[0_4px_10px_#06313f] flex flex-col items-center justify-center overflow-hidden
         moving_border relative before:bg-gradient-to-r from-[#06313f] via-[#1e6986] to-[#06313f]">
            <div className="w-full min-h-[55px] lg:min-h-[70px] h-auto mb-10 relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-[#06313f] rounded-b-[20px] min-w-[140px] w-[40%] h-full
            before:absolute before:-top-1 before:left-[-35px] before:w-[35px] before:h-[35px] before:rounded-tr-full before:bg-transparent before:shadow-[17px_0_0_0_#06313f]
            after:absolute after:-top-1 after:right-[-35px] after:w-[35px] after:h-[35px] after:rounded-tl-full after:bg-transparent after:shadow-[-17px_0_0_0_#06313f]
            ">
                    <span className="text-2xl font-medium text-shadow blinking_text">{logTitle}</span>
                </div>
            </div>
            <div className="w-full h-full mt-5 mb-8 flex flex-col items-center justify-center gap-3">
                <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                    <div className='w-full h-[50px] flex flex-col items-center'>
                        <Input ref={emailRef} placeholder={"Email"} className={'w-[90%] md:w-[70%]'}
                               error={error?.error === "email" || error?.error === "all" ? error.message : null}/>
                    </div>
                    <div className='w-full h-[50px] flex flex-col items-center'>
                        <Input ref={usernameRef} placeholder={"Username"} className={'w-[90%] md:w-[70%]'}
                               error={error?.error === "username" || error?.error === "all" ? error.message : null}/>
                    </div>
                    <div className='w-full h-[50px] flex flex-col items-center'>
                        <Input ref={passwordRef} placeholder={"Password"} className={'w-[90%] md:w-[70%]'} type={'password'}
                               error={error?.error === "password" ? error.message : null}/>
                    </div>
                    {logTitle === "Register" && (
                        <div className='w-full h-[50px] flex flex-col items-center'>
                            <Input ref={password2Ref} placeholder={"Repeat Password"} className={'w-[90%] md:w-[70%]'} type={'password'}
                                   error={error?.error === "password" ? error.message : null}/>
                        </div>
                    )}
                </div>
                {logTitle === "Register" ? (
                    <div className="w-full pt-4 flex flex-col items-center gap-3">
                        <Button text={"Register"} className={"w-[90%] md:w-[30%] max-w-[250px] pt-1 pb-1 text-lg"} click={register}/>
                        <Link to="/">
                            <p className="text-sm text-center">Already have an account? <span
                                className="hover:text-[#cb7039] transition-colors duration-300">LogIn here</span>
                            </p>
                        </Link>
                    </div>
                ) : (
                    <div className="w-full h-[25%] flex flex-col items-center gap-3">
                        <Button text={"LogIn"} className={"w-[90%] md:w-[30%] max-w-[250px] pt-1 pb-1 text-lg"} click={logIn}/>
                        <Link to="/Register">
                            <p className="text-sm text-center">Don't have an account? <span
                                className="hover:text-[#cb7039] transition-colors duration-300">Click here</span></p>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LogForm;