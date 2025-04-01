import React, {useState} from 'react';
import {Link} from "react-router-dom";
import http from "../plugins/http";
import useStore from "../store/main";

const PostCard = ({post, shortText}) => {

    const [date, time] = post.time.split(" ")
    const {setFavoritesId, favoritesId, allPosts, setFavoritePosts, onlineUser, setDeletedItem} = useStore(state => state)

    async function addPostToFavorites () {
        const id ={
            id: post._id
        }
        const data = await http.postToken('http://localhost:8001/favoritesPosts',id, localStorage.getItem("token"))
        console.log(data)
        if (data.postId) {
            setFavoritesId(data.postId);
            setFavoritePosts(allPosts.filter(post => favoritesId.includes(post._id.toString())));
        }
    };


    return (
        <div
            className="w-full h-full bg-[rgba(6,49,63,0.6)] shadow-[0_4px_10px_#cb7039] border border-[#06313f] rounded-lg p-5 flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-500 ease-in-out">
            <div className={`w-full ${shortText && 'max-w-[335px]'} aspect-video flex items-center justify-center`}>
                <img className="w-full aspect-video rounded-lg object-cover" src={post.postImage} alt=""/>
            </div>
            <div className="w-full flex justify-center text-center">
                <Link to={`/Posts/${post._id}`} >
                    <h3 className="text-[clamp(20px,1.7vw,25px)] uppercase text-[#cb7039] cursor-pointer hover:drop-shadow-[0px_0px_6px_red] hover:drop-shadow-[0px_0px_12px_red] transition-transform duration-500 ease-in-out">{post.title}</h3>
                </Link>
            </div>
            <div className="w-full flex items-center flex-wrap">
                <p className={`text-[clamp(16px,1.7vw,19px)] text-wrap ${shortText && 'text-ellipsis line-clamp-4'}`}>{post.description}</p>
            </div>
            <div className="w-full h-full mt-4 flex justify-between items-end">
                {post.username === "Admin" || post.username === onlineUser?.username ? (
                    <div className="flex gap-2">
                        <p>{post.username}</p>
                        <img className="w-[30px] aspect-square rounded-full border" src={post.image} alt=""/>
                    </div>
                ): (
                    <Link to={`/Users/${post.username}`}>
                        <div className="flex gap-2 cursor-pointer">
                            <p className="hover:text-[#f38c55] transition-colors duration-500 ease-in-out">{post.username}</p>
                            <img className="w-[30px] aspect-square rounded-full border object-cover" src={post.image} alt=""/>
                        </div>
                    </Link>
                )}
                <div className="flex gap-1 md:gap-2 items-end">
                    <p className="text-center">{shortText ? post.time.split(' ')[0] : `${date} at ${time}`}</p>

                    {onlineUser.username === post.username ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 2048 2048"
                             className={`cursor-pointer fill-[#fcf2e4] hover:drop-shadow-[0px_0px_6px_red] hover:drop-shadow-[0px_0px_12px_red] transition-transform duration-500 ease-in-out`}
                             onClick={() => setDeletedItem({id:post._id, title:post.title})}
                        >
                            <path
                                  d="M1792 384h-128v1472q0 40-15 75t-41 61t-61 41t-75 15H448q-40 0-75-15t-61-41t-41-61t-15-75V384H128V256h512V128q0-27 10-50t27-40t41-28t50-10h384q27 0 50 10t40 27t28 41t10 50v128h512zM768 256h384V128H768zm768 128H384v1472q0 26 19 45t45 19h1024q26 0 45-19t19-45zM768 1664H640V640h128zm256 0H896V640h128zm256 0h-128V640h128z"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 16"
                             className={`cursor-pointer ${favoritesId.includes(post._id) ? 'fill-[#cb7039]' : 'fill-[#fcf2e4]'} hover:drop-shadow-[0px_0px_6px_red] hover:drop-shadow-[0px_0px_12px_red] transition-transform duration-500 ease-in-out`}
                             onClick={addPostToFavorites}
                        >
                            <path
                                d="M5.016 16c-1.066-2.219-.498-3.49.321-4.688c.897-1.312 1.129-2.61 1.129-2.61s.706.917.423 2.352c1.246-1.387 1.482-3.598 1.293-4.445c2.817 1.969 4.021 6.232 2.399 9.392c8.631-4.883 2.147-12.19 1.018-13.013c.376.823.448 2.216-.313 2.893C9.999 1.002 6.818.002 6.818.002c.376 2.516-1.364 5.268-3.042 7.324c-.059-1.003-.122-1.696-.649-2.656c-.118 1.823-1.511 3.309-1.889 5.135c-.511 2.473.383 4.284 3.777 6.197z"/>
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostCard;