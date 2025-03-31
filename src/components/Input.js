import React from 'react';
import { forwardRef } from "react";

const Input = forwardRef(({placeholder, error, correct, type, info, className}, ref) => {

    return (
        <>
            <input
                className={`bg-transparent text-[#cb7039] text-xl border-b ${className} ${error ? 'border-b-red-500' : 'border-b-[#fcf2e4]'} outline-none focus:border-b-2 focus:border-b-[#cb7039] placeholder-gray-400`}
                type={type ? type : 'text'} ref={ref} placeholder={placeholder}/>
            <div className="w-[70%] min-h-[20px] text-center">
                {(!error && !correct) && <p className='text-sm text-gray-500'>{info}</p>}
                {error && <p className='text-sm text-red-400'>{error}</p>}
                {correct && <p className='text-sm text-green-600'>{correct}</p>}
            </div>

        </>
    );
});

export default Input;