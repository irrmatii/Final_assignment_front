import React, {useEffect} from 'react';
import PostCard from "../components/PostCard";
import http from "../plugins/http";
import useStore from "../store/main";

const HomePage = () => {

    const {setAllPosts, allPosts, setFavoritesId} = useStore(state => state);

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

    return (
        <div className="w-full min-h-screen h-full p-10 grid grid-cols-[repeat(auto-fit,minmax(250px,350px))] auto-rows-auto gap-y-14 gap-x-10 justify-center overflow-y-auto">
            {allPosts.map ((post, i) => (
                <PostCard key={i} post={post} shortText={true}/>
            ))}
        </div>
    );
};

export default HomePage;