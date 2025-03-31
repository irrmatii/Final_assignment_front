import React from 'react';
import useStore from "../store/main";

const MessageUserCard = ({user, selectChat, newMsg}) => {

    const { activeUsers } = useStore(state => state)
    const findOnline = activeUsers.find((item) => item.username === user.username);

    return (
        <div onClick={() => selectChat(user.image, user.username)}
             className={`w-full h-auto pt-2 pb-2 pr-2 pl-2 md:pr-4 md:pl-4 flex flex-col md:flex-row items-center justify-between cursor-pointer group hover:scale-105 transition-transform duration-500 ease-in-out
             ${newMsg === user.username ? 'border border-green-600 rounded-lg' : 'border-b border-[#fcf2e4]'}`}
        >
            <div className="w-[25%] xl:w-[15%] min-w-[40px] aspect-square relative">
                <img className="w-[90%] md:w-full aspect-square rounded-full border"
                     src={user.image} alt=""/>
                <div className={`w-[15px] h-[15px] rounded-full border absolute bottom-0 right-0 
                ${findOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>

            <h3 className="text-[clamp(15px,1.8vw,25px)] text-[#fff8f0] group-hover:text-[#f38c55] group-hover:drop-shadow-[0px_0px_6px_red] group-hover:drop-shadow-[0px_0px_12px_red] transition-all duration-500 ease-in-out">
                {user.username}</h3>
        </div>
    );
};

export default MessageUserCard;