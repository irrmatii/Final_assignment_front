import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import http from "../plugins/http";
import PostCard from "../components/PostCard";
import CommentBox from "../components/CommentBox";
import Button from "../components/Button";
import {socket} from "../socket";

const SinglePostPage = () => {

    const params = useParams();
    const textRef = useRef();
    const [singlePost, setSinglePost] = useState()
    const [allComments, setAllComments] = useState()


    useEffect(() => {
        http.get(`http://localhost:8001/posts/${params.id}`)
            .then(data => {
                setSinglePost(data.findPost)
                if (data.allComments) {
                    setAllComments(data.allComments.comments)
                    console.log("Comments from backend", data.allComments.comments)
                }
            })

    }, [params.id]);

    async function addComment () {
        const comment = {
            message: textRef.current.value,
            postId: params.id,
            date: new Date().toISOString().split('T').join(' ').split('.')[0],
        }

        const data = await http.postToken('http://localhost:8001/addComment', comment, localStorage.getItem("token"))
        console.log(data)
        textRef.current.value = ""
    }

    useEffect(() => {
        socket.on("newComment", (allComments) => {
            if (allComments){
                setAllComments(allComments.comments)
            }
        })
        return () => {
            socket.off('newComment');
        };
    }, [allComments]);


    if (!singlePost) {
        return <div>Loading...</div>;  // Return loading if singlePost is not yet set
    }

    return (
        <div className="w-full min-h-screen p-10 flex flex-col md:flex-row gap-14">
            <div className="w-full md:w-[40%] flex flex-col">
                <PostCard post={singlePost}/>
            </div>
            <div className="w-full md:w-[60%] h-full flex flex-col gap-5">
                <div className="w-full h-[80%] max-h-[300px] md:max-h-none p-5 bg-[rgba(6,49,63,0.6)] shadow-[0_2px_10px_#cb7039] border border-[#06313f] rounded-lg overflow-y-auto hideScrollContainer flex flex-col gap-4">
                    {!allComments ? (
                        <h3 className="text-xl uppercase text-center text-[#cb7039]">No comments yet</h3>
                    ) : (
                        allComments.map((item, i) => (
                        <CommentBox key={i} comment={item}/>
                ))
                )}

                </div>
                <div
                    className="w-full h-auto md:h-[20%] bg-[rgba(6,49,63,0.6)] shadow-[0_2px_10px_#cb7039] border border-[#06313f] rounded-lg flex flex-col md:flex-row items-center justify-between p-4 gap-2">
                    <textarea
                        className="w-full md:w-[90%] h-full p-2 resize-none overflow-y-auto hideScrollContainer bg-[rgba(255,255,255,0.10)] rounded-lg border border-[#fcf2e4]"
                        placeholder="Write your comment" ref={textRef}></textarea>
                    <Button text={"Send"} click={addComment}/>
                </div>
            </div>
        </div>
    );
};

export default SinglePostPage;