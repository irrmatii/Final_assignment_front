import React, {useEffect, useState} from 'react';
import PostCard from "../components/PostCard";
import http from "../plugins/http";
import useStore from "../store/main";
import Button from "../components/Button";

const HomePage = () => {

    const {setAllPosts, allPosts, setFavoritesId, setDeletedItem, deletedItem} = useStore(state => state);


    useEffect(() => {
        http.get('http://localhost:8001/AllPosts')
            .then(data => {
                console.log(data)
                setAllPosts(data)
            })

        http.getToken('http://localhost:8001/favoritesPosts', localStorage.getItem("token"))
                .then(data => {
                    console.log(data)
                    setFavoritesId(data.postId || [])
                })
    }, []);

    async function deletePost () {
        const id = {
            id: deletedItem.id
        }

        const data = await http.postToken('http://localhost:8001/deletePost', id, localStorage.getItem("token"))
        console.log(data)
        setAllPosts(data.updatedPost)
        setDeletedItem(null)
    };


    return (
        <div className="w-full min-h-screen h-full p-10 grid grid-cols-[repeat(auto-fit,minmax(250px,350px))] auto-rows-auto gap-y-14 gap-x-10 justify-center overflow-y-auto relative">
            {allPosts.map ((post, i) => (
                <PostCard key={i} post={post} shortText={true}/>
            ))}
            {(deletedItem && deletedItem.length > 0) &&
                <div className="w-full h-full absolute bg-[rgba(1,14,17,0.6)]">
                    <div
                        className="w-[90%] max-w-[335px] md:w-[30%] md:max-w-none p-5 aspect-video bg-[rgba(6,49,63,0.95)] fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-[0_4px_10px_#cb7039] border border-[#06313f] rounded-lg flex flex-col items-center justify-around gap-4">
                        <p className="text-[clamp(16px,1.7vw,19px)] text-center">Do you really want to delete post
                            ${deletedItem.title}?</p>
                        <div className="w-full flex justify-around">
                            <Button text={"Delete"} className="text-[clamp(15px,1.5vw,20px)] w-[30%] pr-2 pl-2" click={deletePost}/>
                            <Button text={"Cancel"} className="text-[clamp(15px,1.5vw,20px)] w-[30%] pr-2 pl-2" click={() => setDeletedItem(null)}/>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default HomePage;