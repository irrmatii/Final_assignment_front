import React from 'react';

const Button = ({text, className, click}) => {
    return (
        <button onClick={() => click()} className={`rounded-lg border border-[#fcf2e4] min-w-[65px] bg-[rgb(1,14,17)] hover:border-[#cb7039] hover:text-[#cb7039] hover:text-shadow transition-all duration-300 ${className}`}>
            {text}
        </button>
    );
};

export default Button;