import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useChatGPTQuery } from "@/hooks/useChatGPTQuery";
import { Scrollbars } from "react-custom-scrollbars-2";
import Tooltip from "@/components/Tooltip";

interface SidebarProps {
  handleFocusTrue: () => void;
}

const CopilotChat = ({ handleFocusTrue }: SidebarProps) => {
  // State management
  const [prompt, setPrompt] = React.useState<string>("");
  const [query, setQuery] = useState(""); // State to hold user's query
  const { data, isLoading } = useChatGPTQuery(prompt);

  // State to manage conversation
  const [conversation, setConversation] = React.useState<ChatMessage[]>([]);
  const scrollRef = useRef<Scrollbars | null>(null); 

  // Function to scroll to the bottom of conversation
  const scrollToBottom = () => {
    // if (scrollRef && scrollRef.current) {
    //   const scrollbars = scrollRef.current;
    //   scrollbars.scrollToBottom();
    // }
  };

  const [tooltip , setTooltip] = useState("Copy");

  // Effect to scroll to bottom on conversation change
  // useEffect(() => {
  //   scrollToBottom();
  // }, [conversation]);

  // Handles user input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  // Handles form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setPrompt(query);
      setQuery("");
      setConversation((prevConversation) => [
        ...prevConversation,
        { message: query, role: "user" ,},
      ]);
    },

    [query]
  );

  // Effect to update conversation when data changes
  useEffect(() => {
    if (data) {
      setConversation((prevConversation: ChatMessage[]) => [
        ...prevConversation,
        { message: data as string, role: "gpt" },
      ]);
    }
  }, [data]);

  // Components for user and GPT messages
  const UserChatMessage = ({ message }: { message: string }) => {
    return (
      <div className="p-4 my-3 text-black text-[14px] bg-[#F1F2FB] rounded-[16px]">
        {message}
      </div>
    );
  };

  const copyToClipboard = (message:string) => {
    navigator.clipboard.writeText(message);
    setTooltip("Copied");
    setTimeout(() => {
      setTooltip("Copy");
    }, 1000);
    // You might want to show a notification or perform some action after copying.
  };
  const ChatGptMessage = ({ message }: { message: string }) => {
    // ChatGptMessage component with nested Image components
    return (
      <div className="text-[14px] my-3 text-black bg-[#FBF2E9] p-4  rounded-[16px]">
        <p>{message}</p>
        <div className="justify-between flex mt-2">
          {/* Image components */}
          <div className="flex gap-2 items-center">
            {/* Image components */}
            {/* Add alternative text for accessibility */}
            <Image
              src="/images/Like.svg"
              alt="Like"
              width={160}
              height={160}
              className="w-4 h-4"
            />
            <Image
              src="/images/Dislike.png"
              alt="Dislike"
              width={260}
              height={260}
              className="w-4 h-4"
            />
            <Image
              src="/images/setting.png"
              alt="Setting"
              width={306}
              height={360}
              className="w-4 h-4"
            />
          </div>
          
          <div className="w-4 h-4">
          <Tooltip text={tooltip}>
            <button onClick={()=>copyToClipboard(message)}>
              <Image src="/images/Copy.svg" alt="Copy" width={16} height={16} />
            </button>
          </Tooltip>
          </div>
        </div>
      </div>
    );
  };

  // Rendering chat interface
  return (
    <div className="flex chat-height w-58 mt-2 w-[20rem] bg-white border border-gray-200 rounded-[1.1rem] shadow-3xl z-10">
      {/* Chat container */}
      <div className="bg-[#ffffff] relative overflow-x-auto w-full max-w-[330px] box-shadow backdrop-filter">
        <div>
          <div className="p-4 flex-col justify-between space-y-2">
            {/* Chat header */}
            <div className="flex justify-between items-center">
              <h2 className="text-[20px] text-black py-2 font-semibold">
                Financial Copilot Chat
              </h2>
              <Image
                src="/images/cross.svg"
                alt="cross"
                width={24}
                height={24}
                onClick={handleFocusTrue}
                className="cursor-pointer"
              />
            </div>
            <Scrollbars className="scroll-height" ref={scrollRef}>
              {/* Render conversation */}
              {conversation.map((message, index) =>
                message.role === "user" ? (
                  <UserChatMessage
                    key={index}
                    message={message.message}
                  ></UserChatMessage>
                ) : (
                  <ChatGptMessage
                    key={index}
                    message={message.message}
                  ></ChatGptMessage>
                )
              )}
              {/* Loading indicator */}
              {isLoading && <div className="text-black">Typing...</div>}
            </Scrollbars>
          </div>
          {/* User input form */}
          <div className="px-4 absolute bottom-2">
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                value={query}
                onChange={(e) => handleChange(e)}
                className="w-full text-black bg-[#F7F8FB] px-[30px] rounded-[40px] text-[16px] py-4 font-normal placeholder:text-[#787878] placeholder:text-sm placeholder:font-normal focus:outline-none"
                placeholder="Enter a prompt"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Memoize the component to avoid unnecessary re-renders
export default React.memo(CopilotChat);

// Interface for chat message
interface ChatMessage {
  message: string;
  role: string;
}
