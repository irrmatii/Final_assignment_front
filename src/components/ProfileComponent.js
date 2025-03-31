import React, {useEffect, useRef, useState} from 'react';
import Button from "./Button";
import Input from "./Input";
import http from "../plugins/http";
import useStore from "../store/main";
import {useNavigate} from "react-router-dom";

const ProfileComponent = () => {

    const {onlineUser, setOnlineUser} = useStore(state => state);

    const [changeImage, setChangeImage] = useState(false)
    const [alert, setAlert] = useState({})
    const navigate = useNavigate()

    const usernameRef = useRef();
    const emailRef = useRef();
    const imageRef = useRef();
    const passwordRef = useRef();

    async function updateImage() {
        if (!imageRef) return;
        const image = {image: imageRef.current.value}
        const data = await http.postToken('http://localhost:8001/updateImage', image, localStorage.getItem("token"))
        console.log(data)
        await setAlert({
            message: data.message,
            alert: data.alert
        })
        if (data.alert === 'CorrectImage'){
            localStorage.setItem("token", data.token)
            setOnlineUser(data.updateUser);
        }
    };

    async function updateEmail() {
        const email = { email: emailRef.current.value}
        const data = await http.postToken('http://localhost:8001/updateEmail', email, localStorage.getItem("token"))
        console.log(data)
        setAlert({
            message: data.message,
            alert: data.alert
        })
        if (data.alert === 'CorrectEmail'){
            setOnlineUser(data.updateUser)
        }
    };

    async function updateUsername() {
        const username = { username: usernameRef.current.value}

        console.log("Checking username", username)
        const data = await http.postToken('http://localhost:8001/updateUsername', username, localStorage.getItem("token"))
        console.log(data)
        setAlert({
            message: data.message,
            alert: data.alert
        })

        if (data.alert === 'CorrectUsername'){
            setOnlineUser(data.updateUser)
            localStorage.setItem("token", data.token)
            navigate(`/Users/${data.updateUser.username}`);
        }
    };

    async function confirmPassword() {
        const password = { password: passwordRef.current.value}

        const data = await http.postToken('http://localhost:8001/confirmPassword', password, localStorage.getItem("token"))
        console.log(data)
        setAlert({
            message: data.message,
            alert: data.alert
        })
        passwordRef.current.value = ""
    };

    async function updatePassword() {
        const password = { password: passwordRef.current.value}
        const data = await http.postToken('http://localhost:8001/updatePassword', password, localStorage.getItem("token"))
        console.log(data)
        await setAlert({
            message: data.message,
            alert: data.alert
        })

        passwordRef.current.value = ""
    };




    return (
        <div className="w-full flex flex-col md:flex-row gap-7">
            <div className="w-full md:w-[40%] flex flex-col items-center gap-2">
                <img className="rounded-full border  max-h-[100px] md:max-h-[200px]" src={onlineUser?.image} alt=""/>
                <p onClick={() => setChangeImage(prev => !prev)}
                   className="text-sm cursor-pointer text-center hover:text-[#cb7039] transition-colors duration-300">Click
                    to change profile image</p>

                {changeImage && (
                    <div className="w-full flex flex-col items-center gap-2">
                        <div className="w-full flex flex-col items-center gap-1">
                            <Input ref={imageRef}
                                   error={alert.alert === "Image" ? alert.message : ""}
                                   correct={alert.alert === "CorrectImage" ? alert.message : ""}
                                   info={"Enter new image URL"}
                                   className={'w-full'}
                            />
                        </div>
                        <div className="w-full flex justify-center">
                            <Button text="update" className={"w-[70%] pb-1 text-md"} click={updateImage}/>
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full flex flex-col">
                <div className="w-full flex items-center justify-center gap-5">
                    <div className="w-full max-w-[400px] flex flex-col items-center">
                        <div className="w-full pb-1">
                            <p className="text-lg">Email</p>
                        </div>
                        <Input ref={emailRef}
                               error={alert.alert === "Email" ? alert.message : ""}
                               correct={alert.alert === "CorrectEmail" ? alert.message : ""}
                               className="w-full"
                        />
                    </div>
                    <div className="w-[20%] h-full flex items-center">
                        <Button text="update" className={"w-full pb-1 text-md"} click={updateEmail}/>
                    </div>
                </div>

                <div className="w-full flex items-center justify-center gap-5">
                    <div className="w-full max-w-[400px] flex flex-col items-center">
                        <div className="w-full">
                            <p className="text-lg">Username</p>
                        </div>
                        <Input ref={usernameRef}
                               alert={alert.alert === 'Username' ? alert.message : ""}
                               correct={alert.alert === "CorrectUsername" ? alert.message : ""}
                               className="w-full"
                        />
                    </div>
                    <div className="w-[20%] h-full flex items-center">
                        <Button text="update" className={"w-full pb-1 text-md"} click={updateUsername}/>
                    </div>
                </div>

                <div className="w-full flex items-center justify-center gap-5">
                    <div className="w-full max-w-[400px] flex flex-col items-center">
                        <div className="w-full">
                            <p className=" text-lg">Password</p>
                        </div>
                        <Input ref={passwordRef}
                               type={"password"}
                               alert={alert.alert === "Password" ? alert.message : null}
                               correct={alert.alert === "CorrectPassword" ? alert.message : null}
                               info={alert.alert === "Confirmed" ? "Enter new password" : "Enter your current password"}
                               className="w-full"
                        />
                    </div>
                    <div className="w-[20%] h-full flex items-center">
                        <Button click={alert.alert === 'Confirmed' ? updatePassword : confirmPassword} text="update"
                                className={"w-full pb-1 text-md"}/>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProfileComponent;