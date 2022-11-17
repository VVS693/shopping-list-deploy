import { IShopItem } from "../types";

interface ShopItemProps {
  item: IShopItem;
  editHandler: () => void;
}

export function ItemTitle({ item, editHandler }: ShopItemProps) {
  return (
    <button
      onClick={editHandler}
      className="pl-4 py-3 w-full text-left text-xl select-none"
    >
      {item.title}
    </button>
  );
}
