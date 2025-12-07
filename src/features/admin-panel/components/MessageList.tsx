import { STAGES, type Message, type StageKey } from "../types";
import { AttachmentLink } from "./AttachmentLink";

interface MessageListProps {
  messages: Message[];
  stageFilter: StageKey | "all";
  isTyping?: boolean;
}

export const MessageList = ({ messages, stageFilter, isTyping }: MessageListProps) => {
  if (messages.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <p className="font-medium">Brak wiadomości</p>
        <p className="text-sm">
          {stageFilter !== "all"
            ? `Brak wiadomości dla stage'a ${STAGES[stageFilter].pl}`
            : "Ta komórka nie ma jeszcze żadnych wiadomości"}
        </p>
      </div>
    );
  }

  return (
    <>
      {messages.map((msg, idx) => {
        const isKomorka = msg.from === "komorka";
        const prevMsg = messages[idx - 1];
        const showStageHeader = idx === 0 || prevMsg?.stage !== msg.stage;

        return (
          <div key={msg.id}>
            {showStageHeader && (
              <div className="flex items-center gap-2 my-3">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-xs font-medium text-gray-500 px-2 py-1 bg-gray-100 rounded">
                  {STAGES[msg.stage].pl}
                </span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
            )}
            <div
              className={`p-3 rounded-lg ${
                isKomorka
                  ? "bg-gray-50 border border-gray-200 mr-12"
                  : msg.isLimitSheet
                  ? "bg-purple-50 border border-purple-200 ml-12"
                  : "bg-blue-50 border border-blue-200 ml-12"
              } ${msg.isDeadlineExtension ? "ring-2 ring-amber-200" : ""}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`text-xs font-medium ${
                    isKomorka ? "text-gray-600" : msg.isLimitSheet ? "text-purple-600" : "text-blue-600"
                  }`}
                >
                  {isKomorka ? "Komórka" : "BBF"}
                  {msg.isDeadlineExtension && (
                    <span className="ml-2 px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">
                      Przedłużenie terminu
                    </span>
                  )}
                  {msg.isLimitSheet && (
                    <span className="ml-2 px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                      Nowe limity MF
                    </span>
                  )}
                </span>
                <span className="text-xs text-gray-400">{msg.timestamp}</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">{msg.content}</p>

              {/* Attachments */}
              {msg.attachments && msg.attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-gray-200">
                  {msg.attachments.map((att, i) => (
                    <AttachmentLink key={i} attachment={att} />
                  ))}
                </div>
              )}

              {/* Deadline for BBF messages */}
              {!isKomorka && msg.deadline && !msg.isDeadlineExtension && (
                <div className="mt-2 pt-2 border-t border-blue-200">
                  <span className="text-xs text-blue-600">
                    Termin odpowiedzi: <span className="font-medium">{msg.deadline}</span>
                  </span>
                </div>
              )}
              {msg.isDeadlineExtension && msg.deadline && (
                <div className="mt-2 pt-2 border-t border-amber-200">
                  <span className="text-xs text-amber-600">
                    Nowy deadline: <span className="font-medium">{msg.deadline}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Typing indicator */}
      {isTyping && (
        <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 mr-12">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-600">Komórka</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-400">pisze</span>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-[bounce_1s_infinite]" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-[bounce_1s_infinite]" style={{ animationDelay: '200ms' }}></span>
                <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-[bounce_1s_infinite]" style={{ animationDelay: '400ms' }}></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
