import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {TbSwitch2} from 'react-icons/tb'
import {PiClipboardText} from 'react-icons/pi'
import {TiTick} from 'react-icons/ti'
import '../App.css'
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const Home = () => {

    const languages = ['c','csharp','golang','java','javascript','python','php','ruby','visual basic'];

    const [inLang,setInLang] = useState('python');
    const [outLang,setOutLang] = useState('c');
    const [inCode,setInCode] = useState('');
    const [outCode,setOutCode] = useState('');
    const [copied,setCopied] = useState(false);
    const [loading, setLoading] = useState(false);




    const options = {
        method: 'POST',
        url: 'https://code-converter.p.rapidapi.com/',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
          'X-RapidAPI-Host': 'code-converter.p.rapidapi.com'
        },
        data: {
          from: inLang,
          to: outLang,
          code: inCode
        }
      };
    
    const convert = async() => {
        setLoading(true);
        try {
            const response = await axios.request(options);
            console.log(response.data);
            setLoading(false);
            setOutCode(response.data.code);
        } catch (error) {
            toast.error("An error occurred, please check input code.")
            setLoading(false);
        }
    }

    const copyToClipboard = () => {
        copy(outCode);
        setCopied(true);
    }

    useEffect(()=>{
    },[inLang,outLang])

      
  return (
    <div className='sm:flex justify-center items-center mt-10'>

    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={'dark'}
        />

        <div>
            <div className='flex flex-col'>
                <div className='flex space-x-10 py-5 font-mono'>
                    <h1 className='text-3xl text-white font-light'>Input Code</h1>
                    <select value={inLang} onChange={(e)=>setInLang(e.target.value)} className='border border-black rounded text-2xl p-1'>
                    {languages.map((l)=>(<option key={l} onSelect={(e)=>{setInLang(e.target.value)}}>{l}</option>))}
                    </select>
                </div>
                <div id="bar">
                    <div id="red">
                    </div>
                    <div id="yellow">
                    </div>
                    <div id="green">
                    </div>
                </div>
                    <div id="screen">
                        <p className="font">root@0.0.0.0:~$ paste your code below.</p>
                        <textarea value={inCode} onChange={(e)=>setInCode(e.target.value)} className='bg-transparent w-full h-80 outline-none py-1 text-md font-mono text-green-500'></textarea>
                    </div>
            </div>        
        </div>


        <div>
            <button type='submit' className='border rounded-xl border-black p-5 m-5 sm:flex items-center bg-gradient-to-r from-red-600 to-orange-600 text-lg font-semibold hover:scale-90 transition duration-500' onClick={convert}>Convert <TbSwitch2 size={30} /></button>
        </div>

        <div>
            
            <div className='flex space-x-10 py-5 font-mono'>
                <h1 className='text-3xl text-white font-light'>Output Code</h1>
                    <select value={outLang} onChange={(e)=>setOutLang(e.target.value)} className='border border-black rounded text-2xl p-1'>
                        {languages.map((l)=>(<option onSelect={(e)=>{setOutLang(e.target.value)}} key={l}>{l}</option>))}
                    </select>
                <div className={`absolute right-10 p-1 rounded-2xl ${copied ? "border-0" : "hover:scale-90 transition duration-500 cursor-pointer border border-white"}`} onClick={copyToClipboard}>
                    {copied ? <TiTick size={40} color='green' /> : <PiClipboardText size={40} color='white' />}
                </div>
            </div>

            <div id="bar">
                    <div id="red">
                    </div>
                    <div id="yellow">
                    </div>
                    <div id="green">
                    </div>
            </div>
            <div id="screen">
                <p className="font">root@0.0.0.0:~$ the converted code is here.</p>
                <textarea defaultValue={loading ? "Loading..." : outCode} readOnly className='bg-transparent w-full h-80 outline-none py-1 text-md font-mono text-green-500'></textarea>
            </div>


        </div>

    </div>
  )
}
