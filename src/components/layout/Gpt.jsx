import React, { useEffect, useState, useRef } from 'react';
import { BsFillGrid1X2Fill } from 'react-icons/bs';
import { FaLocationArrow } from "react-icons/fa6";
import { IoIosCopy } from "react-icons/io";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { CiCircleMinus } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Icon from "../../images/icon.svg";

const Gpt = ({ showsidebarclick, hidesidebar }) => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [copytextIndex, setCopytextIndex] = useState(null);
    const chatRef = useRef(null);
    const apiUrl = process.env.REACT_APP_GEMINI_API_KEY;

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (inputValue.trim() === '') return;

        const userMessage = inputValue.trim();
        setMessages([...messages, { type: 'user', content: userMessage }]);
        setInputValue('');
        setLoading(true);

        fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiUrl}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: userMessage,
                                },
                            ],
                        },
                    ],
                })
            }
        )
            .then((res) => res.json())
            .then((data) => {
                const responseText = data?.candidates[0]?.content?.parts[0]?.text || "Sorry, I couldn't generate a response.";
                setMessages((prevMessages) => [...prevMessages, { type: 'bot', content: responseText }]);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setMessages((prevMessages) => [...prevMessages, { type: 'bot', content: "Sorry, there was an error processing your request." }]);
                setLoading(false);
            });
    };

    const copytextfunction = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopytextIndex(index);
        setTimeout(() => {
            setCopytextIndex(null);
        }, 2000);
    };

    const clear = () => {
        setMessages([]);
        setInputValue('');
        setLoading(false);
    };

    return (
        <div className='w-[100%] h-[100vh] bg-[#212121] flex flex-col justify-between'>
            {/* GPT header */}
            <div className='w-full h-[60px] flex justify-between pr-4 pl-4 items-center'>
                <div className='w-auto h-auto flex items-center gap-3 justify-center'>
                    {!hidesidebar && (
                        <div onClick={showsidebarclick} className='w-[40px] h-[40px] bg-gray-600 rounded-full flex justify-center items-center cursor-pointer'>
                            <BsFillGrid1X2Fill className='text-gray-200' />
                        </div>
                    )}
                    <h1 className='text-xl font-bold text-gray-200'>Chartify</h1>
                    <div onClick={clear} className={messages.length !== 0 ? 'w-[35px] h-[35px] bg-green-600 rounded-full flex justify-center items-center cursor-pointer' : 'w-[35px] h-[35px] bg-gray-600 rounded-full flex justify-center items-center cursor-pointer'} title='Clear Chat'>
                        <CiCircleMinus className='text-gray-200 text-2xl font-bold' />
                    </div>
                </div>
                <div className='w-[40px] h-[40px] rounded-full bg-gray-700 overflow-hidden cursor-pointer flex justify-center items-center'>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>

            {/* GPT chat */}
            <div ref={chatRef} className='w-full h-[100%] flex justify-center overflow-auto scrollbar mb-2'>
                <div className='xl:w-[60%] lg:w-[80%] md:w-[80%] w-[95%] h-auto flex flex-col gap-4 p-4'>
                    {messages.length === 0 ? (
                        <div className='w-full h-[100%] flex flex-col items-center p-4 gap-4'>
                            <img className='w-[100px] h-[100px] object-cover' src={Icon} alt='icon.svg' />
                            <p className='text-white text-center'>Hello, I'm Chatify. How can I help you today?</p>
                            <div className='w-full h-auto flex flex-wrap justify-center gap-4'>
                                {["What are the major causes of climate change?", "How can I support mental health in my community?", "How can I contribute to social justice initiatives?", "What are some strategies for achieving financial literacy?", "How can I improve my cybersecurity practices?", "What are some ways to promote sustainable living?"].map((text, index) => (
                                    <div key={index} onClick={() => setInputValue(text)} className='p-1 w-[200px] h-auto rounded-lg border cursor-pointer flex justify-center items-center hover:bg-[#2F2F2F] duration-150'>
                                        <p className='text-white'>{text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        messages.map((message, index) => (
                            <div key={index} className={`w-full h-auto flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start xl:flex-row lg:flex-row md:flex-row  flex-col'}`}>
                                {message.type === 'bot' && (
                                    <div className='w-[40px] h-[40px] bg-[#2F2F2F] rounded-full flex justify-center items-center overflow-hidden'>
                                        <img className='w-[40px] h-[40px] object-cover' src={Icon} alt='icon.svg' />
                                    </div>
                                )}
                                <div className={`h-auto p-2 ${message.type === 'user' ? 'w-[60%] bg-[#1E1E1E] rounded-xl' : 'w-full bg-[#2F2F2F] rounded-xl'}`}>
                                    <pre style={{ whiteSpace: 'pre-wrap' }}>
                                        <p className='text-white' style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{message.content}</p>
                                    </pre>
                                    {message.type === 'bot' && (
                                        <div className='w-full h-auto flex gap-1 items-center'>
                                            <IoIosCopy
                                                onClick={() => copytextfunction(message?.content, index)}
                                                className='text-white text-xl cursor-pointer'
                                                title='Copy text'
                                            />
                                            {copytextIndex === index && <p className='text-white'>copied!</p>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Input send GPT */}
            <div className='w-full h-[80px] flex justify-center'>
                <div className='xl:w-[60%] lg:w-[80%] md:w-[80%] w-[95%] h-[50px] rounded-3xl bg-[#2F2F2F] flex justify-around items-center'>
                    <input
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        className='xl:w-[90%] lg:w-[90%] md:w-[70%] w-[80%] h-[50px] bg-transparent outline-0 text-white pl-4'
                        placeholder='message Chartify'
                    />
                    <div
                        onClick={handleSend}
                        className={inputValue ? `w-[40px] h-[40px] rounded-full bg-white flex justify-center items-center duration-75 cursor-pointer` : "w-[40px] h-[40px] rounded-full bg-gray-600 flex justify-center items-center duration-75 cursor-pointer"}
                    >
                        {loading ? <AiOutlineLoading3Quarters className='text-xl text-white animate-spin' /> : <FaLocationArrow className='text-xl' />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Gpt;
