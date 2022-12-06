import { useRef, useState } from "react";

import { client } from "../App";
import { IShopItem } from "../types";
import { CheckBox } from "./Checkbox";

const itemData: IShopItem = {
  id: 0,
  username: "Vovan",
  completed: false,
  title: "",
};

interface AddItemProps {
  onAdd: (item: IShopItem) => void;
}

export function AddItem({ onAdd }: AddItemProps) {
  const [value, setValue] = useState("");
  const [add, setAdd] = useState(false);

  const scrollRef: any = useRef(null);
  const executeScroll = () =>
    scrollRef.current.scrollIntoView({ behavior: "smooth" });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    executeScroll();
    if (value.trim().length === 0) {
      setAdd(false);
      return;
    }
    itemData.title = value;
    itemData.id = new Date().getTime();
    const response = await client.post<IShopItem>("", itemData);
    setAdd(false);
    setValue("");
    onAdd(response.data);
  };

  return (
    <>
      {!add ? (
        <button
          className="py-3 w-full h-14"
          onClick={() => {
            setAdd(true);
          }}
        ></button>
      ) : (
        <div className="flex w-full px-4 items-center">
          <CheckBox isCompleted={false} onChangeCheckBox={() => {}} />
          <div className="fixed top-0 right-0 left-0 bottom-0" />

          <div className="w-full py-1 mb-0 bg-white relative" ref={scrollRef}>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                className="w-full ml-2 p-2 text-xl select-text outline-none"
                onBlur={submitHandler}
                autoFocus
                value={value}
                onChange={changeHandler}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
