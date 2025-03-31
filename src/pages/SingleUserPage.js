import React, {useEffect, useState} from 'react';
import http from "../plugins/http";
import {useParams} from "react-router-dom";
import PostCard from "../components/PostCard";
import useStore from "../store/main";
import SingleUserComponent from "../components/SingleUserComponent";
import ProfileComponent from "../components/ProfileComponent";

const SingleUserPage = () => {

    const {onlineUser} = useStore(state => state);

    const params = useParams();
    const [user, setUser] = useState({})
    const [userPosts, setUserPosts] = useState([])


    useEffect(() => {
        http.getToken(`http://localhost:8001/users/${params.username}`, localStorage.getItem("token"))
            .then(data => {
                console.log(data)
                setUser(data)
            })

        const username = {
            username: params.username
        }
        http.post(`http://localhost:8001/userPosts`, username)
            .then(data => {
                console.log(data)
                setUserPosts(data)
            })

    }, [params.username]);

    return (
        <div className="w-full min-h-screen pb-10 pt-10 pr-4 pl-4 md:p-10 flex flex-col gap-5 md:gap-14">
            {params.username !== onlineUser?.username ? (
                <SingleUserComponent user={user}/>
            ) : (
                <ProfileComponent/>
            )}

            <div
                className="w-full h-full p-5 md:p-10 grid grid-cols-[repeat(auto-fit,minmax(250px,350px))] auto-rows-auto gap-y-14 gap-x-6 justify-center overflow-y-auto">
                {userPosts?.length === 0 ? (
                    <h3 className="uppercase text-center text-2xl text-[#cb7039]">You Don't have posts yet</h3>
                )  : (
                    userPosts.map((post, i) => (
                        <div key={i}
                             className="max-h-[515px] overflow-hidden shadow-[0_4px_10px_#cb7039] border border-[#06313f] rounded-lg">
                            <PostCard post={post} shortText={true}/>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SingleUserPage;