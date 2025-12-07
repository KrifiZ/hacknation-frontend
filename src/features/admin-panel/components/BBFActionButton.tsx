interface BBFActionButtonProps {
  onOpenModal: () => void;
}

export const BBFActionButton = ({ onOpenModal }: BBFActionButtonProps) => {
  return (
    <button
      onClick={onOpenModal}
      className="flex items-center justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </button>
  );
};
