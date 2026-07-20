"use client";

import { chatMessage } from "@/lib/core/actions/action";
import { useEffect, useRef, useState } from "react";

export default function FloatingChatWidget({ title = "CoxGo AI Assistant" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! How can I help you?",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    const userMessage = message.trim();

    if (!userMessage || loading) return;

    const updatedMessages = [
      ...messages,
      {
        role: "user",
        content: userMessage,
      },
    ];

    setMessages(updatedMessages);
    setMessage("");
    setLoading(true);

    try {
      const response = await chatMessage({
        message: userMessage,
        messages: updatedMessages,
      });

      if (!response || !response.success) {
      throw new Error("Failed to get response");
    }

      const assistantReply =
        response.reply ||
        response.message ||
        response.text ||
        response.response ||
        "Sorry, I could not generate a response.";

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content: assistantReply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-4 z-[9999] flex h-[460px] w-[calc(100%-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 sm:right-6 ${
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-5 scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-slate-600 px-4 py-3 text-white">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-semibold">
              CG
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-950 bg-green-400" />
            </div>

            <div>
              <h3 className="text-sm font-semibold">{title}</h3>

              <p className="flex items-center gap-1.5 text-xs text-gray-300">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Online
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/10"
            aria-label="Close chat"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4">
          {messages.map((chatMessage, index) => {
            const isUser = chatMessage.role === "user";

            return (
              <div
                key={index}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap break-words px-4 py-2.5 text-sm leading-6 ${
                    isUser
                      ? "rounded-2xl rounded-br-sm bg-accent text-white"
                      : "rounded-2xl rounded-bl-sm border border-gray-200 bg-white text-gray-700 shadow-sm"
                  }`}
                >
                  {chatMessage.content}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-gray-200 bg-white px-4 py-4 shadow-sm">
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 bg-white p-3">
          <div className="flex items-end gap-2 rounded-2xl border border-gray-300 p-2 focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-200">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write a message..."
              rows={1}
              disabled={loading}
              className="max-h-28 min-h-11 flex-1 resize-none bg-transparent px-2 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />

            <button
              type="button"
              onClick={sendMessage}
              disabled={!message.trim() || loading}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-gray-300"
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Floating button */}
      <button
        type="button"
        onClick={() => setIsOpen((previousState) => !previousState)}
        className="fixed bottom-5 right-4 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 text-white shadow-xl transition hover:scale-105 hover:bg-slate-800 sm:bottom-6 sm:right-6"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}

        {!isOpen && (
          <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400" />
        )}
      </button>
    </>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
      <path
        d="M7.5 18.5 3.5 21v-5.7A8.5 8.5 0 1 1 7.5 18.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M8 10h8M8 14h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="m21 3-7.5 18-4.3-8.2L1 8.6 21 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="m9.2 12.8 4.6-4.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
