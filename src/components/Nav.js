import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import useStore from "../store/main";
import {socket} from "../socket";

const Nav = () => {
    const {onlineUser, getActiveUsers} = useStore(state => state);

    const [open, setOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        socket.on("disconnected", deletedUser => {
            getActiveUsers(deletedUser)
        })
    }, [getActiveUsers]);

    function logOut() {
        socket.emit("disconnected")
        navigate("/")
    }

    if (location.pathname === "/" || location.pathname === "/Register") {
        return null;
    }

    return (
        <div
            className={`sticky top-0 h-screen pb-8 pt-1 pr-2 pl-2  bg-[rgba(6,49,63,0.35) backdrop-blur-3xl shadow-[10px_0px_40px_-5px_#06313f] flex flex-col items-center
             ${open ? "w-[20%] min-w-[200px] bg-[rgba(6,49,63,0.35) " : "w-[30px] bg-[#06313f]"} transition-all duration-500 ease-in-out`}>
                {open ? (
                    <svg onClick={() => setOpen(!open)}
                         className="stroke-[#cb7039] hover:stroke-[#fcf2e4] transition-colors duration-300 absolute right-0 pr-2 cursor-pointer "
                         xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                        <path fill="none" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"
                              d="m11 17l-5-5l5-5m7 10l-5-5l5-5"/>
                    </svg>
                ) : (
                    <svg onClick={() => setOpen(!open)}
                         className="stroke-[#cb7039] hover:stroke-[#fcf2e4] transition-colors duration-300 absolute -right-2 pr-2 cursor-pointer"
                         xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                        <path fill="none" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"
                              d="m6 17l5-5l-5-5m7 10l5-5l-5-5"/>
                    </svg>
                )}

            <div
                className={`w-full h-full flex flex-col items-center transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className='w-full mt-10 flex flex-col items-center gap-2'>
                    <img src={onlineUser?.image || 'https://cdn.pfps.gg/pfps/3352-christmas-cat.png'} alt=""
                         className='rounded-full w-[80px] aspect-square border'
                    />
                    <h1 className='text-[#cb7039]'>Welcome {onlineUser?.username}</h1>
                </div>

                <div className="w-[90%] h-[2px] bg-[#06313f] mt-4 mb-10"></div>

                <ul className="flex flex-col gap-2 text-[clamp(20px,1.7vw,25px)]">
                    <Link to="/Home">
                        <li className="flex gap-1 group hover:text-[#cb7039] hover:scale-105 transition-all duration-500 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="stroke-[#fcf2e4] group-hover:stroke-[#cb7039] transition-all duration-300 w-[clamp(20px,2vw,27px)]">
                                <path fill="none" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="3"
                                      d="M41.13 22.25L24 4.5L6.87 22.25"/>
                                <path fill="none" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="3"
                                      d="M41.13 30.54L24 12.79L6.87 30.54"/>
                                <path fill="none" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="3"
                                      d="M13.73 30.37V43.5h20.54V30.37"/>
                            </svg>
                           HOME
                        </li>
                    </Link>

                    <Link to={onlineUser?.username ? `/Users/${onlineUser.username}` : "#"}>
                        <li className="flex gap-2 items-center mt-2 group hover:text-[#cb7039] hover:scale-105 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 1024 1025"
                                 className="fill-[#fcf2e4] group-hover:fill-[#cb7039] transition-all duration-300 w-[clamp(18px,2vw,23px)]">
                                <path
                                      d="M1024 958q0 12-13.5 22T969 996.5t-57.5 12t-75.5 8.5t-80 4.5t-87.5 2.5t-81 1h-151l-81-1l-87.5-2.5l-80-4.5l-75.5-8.5l-57.5-12L13.5 980L0 958q2-88 110-155.5T384 713v-33q-52-23-90-65t-59.5-98.5t-32-121T192 257q0-65 25-115t69-80.5t101-46T512 0t125 15.5t101 46t69 80.5t25 115q0 349-192 426v30q166 22 274 89.5T1024 958M768 274q0-104-71.5-157T512 64t-184.5 53T256 274q0 68 10 125t32 106.5t60 82.5t90 46v138q-60 5-117 20.5t-98 34t-73 38t-48 34.5t-16 22q0 14 38 23t114 12t127 4t137 1t137-1t127-4t114-12t38-23q0-7-16-22t-48-34.5t-72.5-38t-98-34T576 772V634q192-41 192-360"/>
                            </svg>
                           PROFILE
                        </li>
                    </Link>

                    <Link to="/Messages" >
                        <li className="flex gap-1 mt-3 group hover:text-[#cb7039] hover:scale-105 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
                                 className="fill-[#fcf2e4] group-hover:fill-[#cb7039] transition-all duration-300 w-[clamp(20px,2vw,27px)]">
                                <path
                                      d="M216 80h-32V48a16 16 0 0 0-16-16H40a16 16 0 0 0-16 16v128a8 8 0 0 0 13 6.22L72 154v30a16 16 0 0 0 16 16h93.59L219 230.22a8 8 0 0 0 5 1.78a8 8 0 0 0 8-8V96a16 16 0 0 0-16-16M66.55 137.78L40 159.25V48h128v88H71.58a8 8 0 0 0-5.03 1.78M216 207.25l-26.55-21.47a8 8 0 0 0-5-1.78H88v-32h80a16 16 0 0 0 16-16V96h32Z"/>
                            </svg>
                            MESSAGES
                        </li>
                    </Link>

                    <Link to="/Favorites">
                        <li className="flex gap-1 items-center mt-7 group hover:text-[#cb7039] hover:scale-105 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200"
                                 className="fill-[#fcf2e4] group-hover:fill-[#cb7039] transition-all duration-300 w-[clamp(20px,2vw,27px)]">
                                <path
                                      d="m605.847 26.888l-37.454 107.02l-112.955 322.836l-342.008-1.483L0 454.727l90.281 68.734l272.087 207.211l-107.137 324.737l-35.495 107.73l93.249-64.58l281.11-194.747l275.827 202.228l91.468 67.072l-32.646-108.622l-98.412-327.586l277.607-199.792l92.061-66.3l-113.37-2.493l-341.949-7.717l-104.23-325.686zm-3.205 239.145l77.936 243.538l8.25 25.818l27.065.595l255.646 5.697l-207.509 149.4l-22.021 15.788l7.835 25.938l73.542 244.903l-206.202-151.18l-21.844-16.026l-22.259 15.433l-210.179 145.602l80.13-242.825l8.429-25.701l-21.546-16.44l-203.354-154.86l255.646 1.128l27.066.119l8.962-25.583z"/>
                            </svg>
                            Favorites
                        </li>
                    </Link>

                    <Link to="/CreatePost">
                        <li className="flex gap-1 items-center group hover:text-[#cb7039] hover:scale-105 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                 className="stroke-[#fcf2e4] group-hover:stroke-[#cb7039] transition-all duration-300 w-[clamp(20px,2vw,27px)]">
                                <path fill="none" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="32"
                                      d="M384 224v184a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V168a40 40 0 0 1 40-40h167.48"/>
                                <path fill="#ffffff"
                                      d="M459.94 53.25a16.06 16.06 0 0 0-23.22-.56L424.35 65a8 8 0 0 0 0 11.31l11.34 11.32a8 8 0 0 0 11.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38M399.34 90L218.82 270.2a9 9 0 0 0-2.31 3.93L208.16 299a3.91 3.91 0 0 0 4.86 4.86l24.85-8.35a9 9 0 0 0 3.93-2.31L422 112.66a9 9 0 0 0 0-12.66l-9.95-10a9 9 0 0 0-12.71 0"/>
                            </svg>
                           Create Post
                        </li>
                    </Link>

                </ul>
                <div className="w-full h-full flex items-end justify-center">
                    <div onClick={logOut}
                        className="w-auto flex items-center gap-1 group hover:scale-105 transition-all duration-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                             className="stroke-[#fcf2e4] group-hover:stroke-[#cb7039] transition-all duration-300 w-[clamp(20px,2vw,27px)]">>
                            <path fill="none" stroke-linecap="round" stroke-linejoin="round"
                                  stroke-width="2" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5l-5-5m5 5H9"/>
                        </svg>
                        <span
                            className="text-xl group-hover:text-[#cb7039] transition-all duration-300">Log Out</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Nav;