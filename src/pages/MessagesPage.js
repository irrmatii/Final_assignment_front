import React, {useEffect, useRef, useState} from 'react';
import MessageUserCard from "../components/MessageUserCard";
import Button from "../components/Button";
import MessageBox from "../components/MessageBox";
import http from "../plugins/http";
import useStore from "../store/main";
import {socket} from "../socket";

const MessagesPage = () => {

    const {onlineUser, getAllUsers, allUsers, activeUsers, getAllMessages, Messages} = useStore(state => state);

    const [selectedUser, setSelectedUser] = useState(null)
    const textRef = useRef()
    const [chat, setChat] = useState(null)
    const [newMsg, setNewMsg] = useState("")

    const findOnline = activeUsers.find((item) => item.username === selectedUser?.username);


    useEffect(() => {
        http.get('http://localhost:8001/allUsers')
            .then(data => {
                console.log(data)
                const filteredUsers = data.filter(user => user.username !== onlineUser.username )
                getAllUsers(filteredUsers)
            })
    }, []);

    function selectChat(image, username) {
        const user = {
            username: username,
            image: image,
        }

        const findMessages = Messages?.chats.find(item => item.username === username)
        if (!findMessages) {
            setChat(null)
        } else {
            setChat(findMessages.messages)
        }

        setSelectedUser(user)
        console.log(user)
        setNewMsg("")
    }

    async function sendMessage () {
        const message = {
            from: onlineUser.username,
            to: selectedUser.username,
            message: textRef.current.value,
            image: onlineUser.image,
            date: new Date().toISOString().split('T').join(' ').split('.')[0],
        }

        const data = await http.post('http://localhost:8001/message', message)
        console.log(data)
        textRef.current.value = ""
        console.log("user was selecetd", selectedUser)
    }

    useEffect(() => {
        socket.on("newMessage", ({msg, newMsg}) => {

            if (!msg || !msg.chats) {
                console.error("Error: msg or msg.chats is undefined/null", msg);
                return;
            }
            getAllMessages(msg)
            const findMessages = msg.chats.find(item => item.username === selectedUser.username)
            setChat(findMessages.messages)
            console.log("newMSG is here")
            setNewMsg(newMsg)
            console.log(selectedUser)
        })

        return () => {
            socket.off('newMessage');
        };
    }, [selectedUser]);



    useEffect(() => {
        http.getToken('http://localhost:8001/message', localStorage.getItem("token"))
            .then(data => {
                console.log(data)
                if (data){
                    getAllMessages(data)
                }
            })
    }, []);




    return (
        <div className="w-full h-screen pr-3 pl-3 pt-10 pb-10  md:p-10 flex justify-center">
            <div
                className="w-full md:w-[80%] h-full p-4  md:p-8 bg-[rgb(1,14,17)] shadow-[0_4px_20px_#cb7039] border border-[#06313f] rounded-lg flex gap-4 md:gap-8">
                <div className="w-[35%] h-full p-2  bg-[rgba(6,49,63,0.3)]  backdrop-blur-3xl rounded-lg border border-[#8d4d1d] shadow-[0_4px_10px_#cb7039] flex flex-col gap-2 overflow-y-auto hideScrollContainer">
                    {allUsers.map((user, i) => (
                        <MessageUserCard key={i} user={user} selectChat={selectChat} newMsg={newMsg}/>
                    ))}
                </div>

                <div
                    className="w-[65%] h-full pr-3 pl-3 bg-[rgba(6,49,63,0.3)] backdrop-blur-3xl rounded-lg border border-[#8d4d1d] shadow-[0_4px_10px_#cb7039] flex flex-col">
                    <div
                        className="w-full h-[10%] p-3 border-b border-[#fcf2e4] flex items-center justify-center gap-4">
                        {selectedUser &&
                            <>
                                <img className="h-full aspect-square rounded-full border border-[#fcf2e4]"
                                     src={selectedUser.image} alt=""/>
                                <h3 className="text-[clamp(15px,1.5vw,25px)] text-[#fff8f0]">{selectedUser.username}</h3>
                                <div className={`w-[12px] h-[12px] rounded-full border ${findOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            </>
                        }
                    </div>

                    <div
                        className="w-full h-[70%] p-4 border-b border-[#fcf2e4] overflow-y-auto hideScrollContainer flex flex-col gap-4">
                        {chat?.map((message, i) => (
                            <MessageBox key={i} message={message}/>
                        ))}
                    </div>

                    <div className="w-full h-[20%] flex flex-col md:flex-row items-center justify-between p-4 gap-2">
                        <textarea
                            className="w-full md:w-[80%] h-full p-2 text-[clamp(15px,1vw,20px)] resize-none overflow-y-auto hideScrollContainer bg-[rgba(255,255,255,0.10)] rounded-lg border border-[#fcf2e4]"
                            placeholder="Write your message" ref={textRef}></textarea>
                        <Button click={sendMessage} text={"Send"} className="text-[clamp(15px,1.5vw,20px)] w-auto pr-2 pl-2"/>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MessagesPage;