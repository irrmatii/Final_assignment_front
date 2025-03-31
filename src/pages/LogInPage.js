import React from 'react';
import LogForm from "../components/LogForm";

const LogInPage = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center p-10">
            <LogForm logTitle={"LogIn"}/>
        </div>
    );
};

export default LogInPage;