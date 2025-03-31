import React from 'react';
import LogForm from "../components/LogForm";

const RegistrationPage = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center p-10">
            <LogForm logTitle={"Register"}/>
        </div>
    );
};

export default RegistrationPage;