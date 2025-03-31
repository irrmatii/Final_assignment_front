import React from 'react';
import useStore from "../store/main";

const MessageBox = ({message}) => {

    const {onlineUser} = useStore(state => state)
    // const [date, time] = message.date.split(" ")

    return (
        <div className="w-full h-auto flex gap-3"
             style={{justifyContent: message.from === onlineUser.username ? "end" : "start"}}>
            {message.from !== onlineUser.username &&
                <img className="w-[30px] h-[30px] md:w-[38px] md:h-[38px] xl:w-[45px] xl:h-[45px] rounded-full border border-[#fff8f0]"
                     src={message.image} alt=""/>
            }
            <div
                className="max-w-[70%] w-auto h-auto pb-1 pt-1 pr-2 pl-2 bg-[rgba(255,255,255,0.10)] border border-[#8d4d1d] rounded-lg flex flex-col items-center gap-1">
                <p className="text-[clamp(14px,1.5vw,20px)]">{message.message}</p>
                {/*<p className="text-gray-500 text-xs">{date} at <span className="text-gray-500 text-xs">{time}</span></p>*/}
            </div>
            {message.from === onlineUser.username &&
                <img className="w-[30px] h-[30px] md:w-[38px] md:h-[38px] xl:w-[45px] xl:h-[45px] rounded-full border border-[#fff8f0]"
                     src={message.image} alt=""/>
            }
        </div>
    );
};

export default MessageBox;