const TypingIndicator = () => (
  <div className="flex space-x-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg max-w-[80px]">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_1s_infinite_0ms]"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_1s_infinite_200ms]"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_1s_infinite_400ms]"></div>
  </div>
);

export default TypingIndicator;