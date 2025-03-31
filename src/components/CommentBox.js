import React from 'react';

const CommentBox = ({comment}) => {

    const [date, time] = comment.date.split(" ")

    return (
        <div className="w-full h-auto flex gap-3">
            <img className="w-[30px] h-[30px] md:w-[38px] md:h-[38px] rounded-full border border-[#fff8f0] object-cover"
                 src={comment.image} alt=""/>
            <div
                className="w-full h-auto pb-1 pt-1 pr-2 pl-2 bg-[rgba(255,255,255,0.10)] border border-[#8d4d1d] rounded-lg flex flex-col gap-1">
                <p className="text-[clamp(15px,1.5vw,19px)]">{comment.message}</p>
                <div className="w-full flex items-center gap-2">
                    <p className="text-gray-500 text-[clamp(10px,1.5vw,14px)]">{comment.username}</p>
                    <p className="text-gray-500 text-[clamp(10px,1.5vw,14px)]">{date} at <span className="text-gray-500 text-[clamp(10px,1.5vw,14px)]">{time}</span></p>
                </div>
            </div>
        </div>
    );
};

export default CommentBox;