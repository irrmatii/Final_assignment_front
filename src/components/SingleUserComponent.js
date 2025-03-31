import React, {useRef} from 'react';
import Button from "./Button";
import http from "../plugins/http";
import useStore from "../store/main";
import {useParams} from "react-router-dom";

const SingleUserComponent = ({user}) => {

    const {onlineUser} = useStore(state => state);

    const textRef = useRef();
    const params = useParams();

    async function sendMessage () {
        const message = {
            from: onlineUser.username,
            to: params.username,
            message: textRef.current.value,
            image: onlineUser.image,
            date: new Date().toISOString().split('T').join(' ').split('.')[0],
        }

        const data = await http.post('http://localhost:8001/message', message)
        console.log(data)
        textRef.current.value = ""
    }

    return (
        <div className="w-full flex flex-col md:flex-row gap-2">
            <div className="w-full md:w-[30%] flex justify-center">
                <img className="rounded-full border max-h-[100px] md:max-h-[120px] lg:max-h-[200px] aspect-square" src={user.image} alt=""/>
            </div>
            <div className="w-full flex flex-col">
                <div className="w-full text-center">
                    <h3 className="text-lg">Say Hi! to {user.username}</h3>
                </div>
                <div className="w-full h-full flex flex-col md-flex-row items-center justify-between p-4 gap-2">
                        <textarea
                            className="w-full md:w-[80%] h-full p-2 resize-none overflow-y-auto hideScrollContainer bg-[rgba(255,255,255,0.10)] rounded-lg border border-[#fcf2e4]"
                            placeholder="Write your message" ref={textRef}></textarea>
                    <Button className="w-[15%] pb-1" text={"Send"} click={sendMessage}/>
                </div>
            </div>
        </div>
    );
};

export default SingleUserComponent;