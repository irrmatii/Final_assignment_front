import React from 'react';
import {Link} from "react-router-dom";
import http from "../plugins/http";
import useStore from "../store/main";

const PostCard = ({post, shortText}) => {

    const [date, time] = post.time.split(" ")
    const {setFavoritesId, favoritesId, allPosts, setFavoritePosts, onlineUser} = useStore(state => state)

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
            <div className="w-full h-auto flex items-center">
                <p className={`text-[clamp(16px,1.7vw,19px)] ${shortText && 'text-ellipsis line-clamp-4'}  `}>{post.description}</p>
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

                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 16"
                         className={`cursor-pointer ${favoritesId.includes(post._id) ? 'fill-[#cb7039]' : 'fill-[#fcf2e4]'} hover:drop-shadow-[0px_0px_6px_red] hover:drop-shadow-[0px_0px_12px_red] transition-transform duration-500 ease-in-out`}
                         onClick={addPostToFavorites}
                    >
                        <path d="M5.016 16c-1.066-2.219-.498-3.49.321-4.688c.897-1.312 1.129-2.61 1.129-2.61s.706.917.423 2.352c1.246-1.387 1.482-3.598 1.293-4.445c2.817 1.969 4.021 6.232 2.399 9.392c8.631-4.883 2.147-12.19 1.018-13.013c.376.823.448 2.216-.313 2.893C9.999 1.002 6.818.002 6.818.002c.376 2.516-1.364 5.268-3.042 7.324c-.059-1.003-.122-1.696-.649-2.656c-.118 1.823-1.511 3.309-1.889 5.135c-.511 2.473.383 4.284 3.777 6.197z"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default PostCard;