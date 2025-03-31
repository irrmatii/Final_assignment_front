import React, {useEffect, useState} from 'react';
import PostCard from "../components/PostCard";
import useStore from "../store/main";

const FavoritesPage = () => {

    const {allPosts, favoritesId, favoritePosts, setFavoritePosts} = useStore(state => state);

    useEffect(() => {
        setFavoritePosts(allPosts.filter(post => favoritesId.includes(post._id.toString())));
    }, [allPosts, favoritesId]);


    return (
        <div className=" relative w-full min-h-screen h-full p-10 grid grid-cols-[repeat(auto-fit,minmax(250px,350px))] auto-rows-max-[540px] gap-y-14 gap-x-6 justify-center overflow-y-auto">
            {favoritePosts?.length === 0 ? (
            <h3 className="absolute top-[10%] left-1/2 -translate-x-1/2 text-2xl uppercase text-center text-[#cb7039]">You Don't have favorite posts</h3>
                )  : (
                favoritePosts.map((item, i) => (
                    <div key={i} className="max-h-[515px] overflow-hidden shadow-[0_4px_10px_#cb7039] border border-[#06313f] rounded-lg">
                        <PostCard post={item} shortText={true}/>
                    </div>
                ))
            )}
        </div>
    );
};

export default FavoritesPage;