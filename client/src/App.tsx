import React, { useEffect, useRef, useState } from 'react';
import { ShopItem } from './components/ShopItem';
// import { items } from "./data/items"
import axios, { AxiosError } from "axios"
import { IShopItem } from './types';
import { AddItem } from './components/AddItem';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import { SortButton } from './components/SortButton';


export const client = axios.create({
    baseURL: "https://elated-warp-parrotfish.glitch.me/items" 
    // baseURL: "https://sl.vvs693.ru:4000/items"
});

function App() {

  const [items, setItems] = useState<IShopItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const scrollRef: any = useRef(null) 
  const executeScroll = () => scrollRef.current.scrollIntoView({behavior: "smooth"})

  async function fetchItems() {
    try {
      executeScroll()
      setLoading(true)
      const response = await client.get<IShopItem[]>("") 
      const el = response.data
      const dataSorted = [...el.filter(el => el.completed == false), ...el.filter(el => el.completed == true)]
      setItems(dataSorted)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const onAddHandler = (item: IShopItem) => {
    setItems([...items, item])
  }
  const onChangeHandler = () => {
    setItems([...items])
  }
  const onDeleteHandler = (index: number) => {
    setItems([...items.slice(0, index), ...items.slice(index + 1)])
  }

  // const onSortHandler = () => {
  //   const itemsSorted = [...items.filter(el => el.completed == false), ...items.filter(el => el.completed == true)]
  //   setItems(itemsSorted)
  //   fetchItems()
  // }
  
  return (
    <div className="container mx-auto max-w-sm pb-16">
      <div className=" flex justify-between w-full p-2 px-6 border-b">
        <h1 className="text-left font-bold text-2xl  select-none" ref={scrollRef}>
          Shopping List
        </h1>
        {loading && <Loader/>}
      </div>
      {error && <ErrorMessage error={error}/>}
      {items.map((el, index) => (
        <ShopItem item={el} key={el.id} onChange={onChangeHandler} onDelete={() => onDeleteHandler(index)}/>
      ))}
        <AddItem onAdd={onAddHandler}/>
        <SortButton onSort={() => fetchItems()}/>
    </div>
  );
}

export default App;
