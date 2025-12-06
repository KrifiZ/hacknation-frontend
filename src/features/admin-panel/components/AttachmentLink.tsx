import type { Attachment } from "../types";

interface AttachmentLinkProps {
  attachment: Attachment;
}

export const AttachmentLink = ({ attachment }: AttachmentLinkProps) => {
  const styles = {
    budget_sheet: "bg-green-50 text-green-700 border-green-200",
    limit_sheet: "bg-purple-50 text-purple-700 border-purple-200",
    document: "bg-blue-50 text-blue-700 border-blue-200",
    other: "bg-gray-50 text-gray-700 border-gray-200"
  };
  
  return (
    <a
      href={attachment.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded border transition hover:opacity-80 ${styles[attachment.type]}`}
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {attachment.type === "budget_sheet" ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        ) : attachment.type === "limit_sheet" ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        )}
      </svg>
      {attachment.name}
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
};
