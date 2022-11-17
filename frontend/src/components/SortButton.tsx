interface ShopItemProps {
  onSort: () => void;
}

export function SortButton({ onSort }: ShopItemProps) {
  return (
    <button
      className="flex items-center fixed bottom-1 left-1/6 rounded border border-slate-800 bg-slate-300 text-xl px-4 py-1 m-3 active:bg-slate-400"
      onClick={onSort}
    >
      Sort
    </button>
  );
}
