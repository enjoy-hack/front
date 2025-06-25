const CommonSquare = ({ children }) => {
    return (
        <div className="w-full bg-[#0259DD] rounded-bl-lg rounded-br-lg p-6 flex flex-col items-center -mt-1 z-0 relative">
            {children}
        </div>
    );
};

export default CommonSquare;
