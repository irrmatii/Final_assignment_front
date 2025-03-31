import React, {useRef, useState} from 'react';
import Input from "../components/Input";
import Button from "../components/Button";
import http from "../plugins/http";

const CreatePostPage = () => {

    const titleRef = useRef()
    const imageRef = useRef()
    const descriptionRef = useRef()
    const [alert, setAlert] = useState({})

    async function createPost() {
        const postInfo = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            postImage: imageRef.current.value,
            time: new Date().toISOString().split('T').join(' ').split('.')[0],
    }

        const data = await http.postToken('http://localhost:8001/createPost', postInfo, localStorage.getItem("token"))
        console.log(data)
        setAlert({
            message: data.message,
            alert: data.alert
        })

        if (data.alert === 'CorrectPost'){
            titleRef.current.value = "";
            descriptionRef.current.value = "";
            imageRef.current.value = "";
        }
    }


    return (
        <div className="w-full h-screen p-10 flex justify-center items-center">
            <div
                className="relative w-[90%] md:w-[60%] lg:w-[60%] xl:w-[60%] max-w-[750px] h-[90%] pr-3 pl-3 pb-3 md:pr-10 md:pl-10 md:pb-5 bg-[rgba(6,49,63,0.05)]  backdrop-blur-3xl border border-[#8d4d1d] shadow-[0_4px_20px_#cb7039] rounded-3xl flex flex-col items-center overflow-hidden">
                <div className="w-full min-h-[55px] h-auto mb-10">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-[#8d4d1d] shadow-[0_4px_10px_#cb7039] rounded-b-[20px] min-w-[180px] w-[40%] min-h-[55px] h-auto xl:h-[70px] pt-2 pb-2
            before:absolute before:-top-1 before:left-[-35px] before:w-[35px] before:h-[35px] before:rounded-tr-full before:bg-transparent before:shadow-[17px_0_0_0_#8d4d1d]
            after:absolute after:-top-1 after:right-[-35px] after:w-[35px] after:h-[35px] after:rounded-tl-full after:bg-transparent after:shadow-[-17px_0_0_0_#8d4d1d]">
                        <span className="text-lg md:text-2xl font-medium text-shadow text-wrap z-10 text-center">CREATE POST</span>
                    </div>
                </div>

                <div className="w-full h-full flex flex-col items-center justify-around">
                    <div className="w-full flex flex-col items-center gap-1">
                        <Input ref={titleRef}
                               placeholder={'Enter Title'}
                               error={alert.alert === "Title" || alert.alert === "All" ? alert.message : ""}
                               correct={alert.alert === "CorrectTitle" ? alert.message : ""}
                               className={'w-[90%] lg:w-[70%]'}
                        />
                    </div>

                    <div className="w-full flex flex-col items-center gap-1">
                        <Input ref={imageRef}
                               placeholder={'Enter Image'}
                               error={alert.alert === "Image" || alert.alert === "All" ? alert.message : ""}
                               correct={alert.alert === "CorrectImage" ? alert.message : ""}
                               className={'w-[90%] lg:w-[70%]'}
                        />
                    </div>

                    <div className="w-full h-[30%] flex flex-col items-center">
                        <textarea className="w-[90%] lg:w-[70%] h-full p-2 text-[clamp(15px,1vw,20px)] resize-none overflow-y-auto hideScrollContainer bg-[rgba(255,255,255,0.10)] rounded-lg border border-[#fcf2e4]"
                                  placeholder="Write description"
                            ref={descriptionRef}></textarea>
                        <div className="w-[70%] min-h-[20px] text-center">
                            {(alert.alert === "Description" || alert.alert === "All") && <p className='text-sm text-red-400'>{alert.message}</p>}
                            {alert.alert === "CorrectDescription" && <p className='text-sm text-green-600'>{alert.message}</p>}
                        </div>
                    </div>

                    <div className="w-full flex flex-col items-center min-h-[60px]">
                        <Button text="Create Post" className="w-full max-w-[200px] pb-1 text-lg" click={createPost}/>
                        <p className='text-sm text-green-600'>{alert.alert === "CorrectPost" ? alert.message : ""}</p>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default CreatePostPage;