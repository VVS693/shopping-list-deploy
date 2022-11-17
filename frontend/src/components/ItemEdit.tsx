import { useEffect, useRef, useState } from "react";
import { client } from "../App";
import { IShopItem } from "../types";

interface ShopItemProps {
  item: IShopItem;
  editHandler: () => void;
  delHandler: () => void;
}

export function ItemEdit({ item, editHandler, delHandler }: ShopItemProps) {
  const [value, setValue] = useState(item.title);
  let isDel = false;
  const itemData: IShopItem = item;

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isDel) {
      itemData.title = value;
      editHandler();
      await client.put<IShopItem>(`/${item.id}`, itemData);
    }
  };
  async function delItem() {
    isDel = true;
    delHandler();
    await client.delete<IShopItem>(`/${item.id}`);
    isDel = false;
  }

  const inputReference: any = useRef(null);
  useEffect(() => {
    inputReference.current.focus();
  }, []);

  return (
    <>
      <div className="fixed top-0 right-0 left-0 bottom-0" />
      <div className="w-full py-1 bg-white relative flex flex-nowrap justify-between">
        <form onSubmit={submitHandler} className="w-full pr-2">
          <input
            type="text"
            ref={inputReference}
            className="w-full ml-2 pl-2 pr-12 pb-2 pt-2 text-xl select-text outline-none"
            onBlur={(el) => {
              setTimeout(() => {
                submitHandler(el);
              }, 0);
            }}
            value={value}
            onChange={changeHandler}
          />
        </form>
        <button
          className="absolute top-0 bottom-0 right-0"
          onFocus={delItem}
          onClick={delItem}
        >
          {/* <svg
              id="delButton"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-7 h-7 bg-slate-100"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
            </svg> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
