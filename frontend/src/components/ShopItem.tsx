import { useState } from "react";
import { client } from "../App";
import { IShopItem } from "../types";
import { CheckBox } from "./Checkbox";
import { ItemEdit } from "./ItemEdit";
import { ItemTitle } from "./ItemTitle";

interface ShopItemProps {
  item: IShopItem;
  onChange: () => void;
  onDelete: () => void;
}

export function ShopItem({ item, onChange, onDelete }: ShopItemProps) {
  const [edit, setEdit] = useState(false);

  async function toggleCompleted() {
    item.completed = item.completed ? false : true;
    const response = await client.put<IShopItem>(`/${item.id}`, item);
    onChange();
  }

  return (
    <div className="flex flex-col items-start px-4 border-b">
      <div className="flex items-center w-full">
        <CheckBox
          isCompleted={item.completed}
          onChangeCheckBox={() => {
            toggleCompleted();
          }}
        />
        {edit ? (
          <ItemEdit
            item={item}
            editHandler={() => {
              setEdit(false);
              onChange();
            }}
            delHandler={() => {
              onDelete();
            }}
          />
        ) : (
          <ItemTitle
            item={item}
            editHandler={() => {
              setEdit(true);
            }}
          />
        )}
      </div>
    </div>
  );
}
