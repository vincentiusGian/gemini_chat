"use client"
import { Send, Bot, User2, Loader2 } from "lucide-react";
import { useChat } from 'ai/react'
import Markdown from "./components/markdown";


export default function Home() {
const {messages, input, handleInputChange, handleSubmit, isLoading, stop} = useChat({
  api: 'api/genai'
});

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {RenderForm()}
      {RenderMessages()}
      {/* {RenderMessages()} */}
    </main>
  );

  function RenderMessages(){
    return <div className="flex flex-col-reverse w-full text-left mt-4 gap-4 whitespace-pre-wrap"> 
        {messages.map((m, index)=> {
          return (<div className={`p-4 shadow-md rounded-md ml-10 relative ${m.role === 'user' ? "bg-stone-300": ""}`}>
            <Markdown text={m.content}/>
            {m.role === 'user' ? <User2 className="absolute top-2 -left-10 border rounded-full p-1 shadow-lg"/> : 
            <Bot className={`absolute top-2 -left-10 border rounded-full p-1 shadow-lg ${
              isLoading && index-1 === messages.length-1 ? 'animate-bounce' : ""
            }`}/>}
          </div>);
        })}
    </div>
  }

  function RenderForm(){
    return <form onSubmit={(event) => {
      event.preventDefault();
      handleSubmit(event, {
        data: {
          prompt: input
        }
      })
    }}
    className="w-full flex flex-row gap-2 items-center h-full">
      <input onChange={handleInputChange} type="text" placeholder={isLoading ? "Replying . . ." : "Ask Vin . . ."} disabled={isLoading} value={input} 
      className="border-b border-dashed outline-none w-full px-4 py-2 text-right focus:placeholder-transparent disabled:bg-transparent"/>
      <button type="submit" className="rounded-full shadow-md border flex flex-row">
        {isLoading ? <Loader2 onClick={stop} className="rounded-full shadow-md border flex flex-row animate-spin"/> : <Send className="p-3 h-10 w-10 stroke-stone-500"/>}
        
        </button>
    </form>
  }

}

