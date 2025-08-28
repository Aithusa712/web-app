import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ShowLists from "./ShowList";
import List from "./List";

function App() {

  type Summary = { id: string; name: string; item_count: number };


  const [listSummaries, setListSummaries] = useState<Summary[] | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // useEffect(() => {
  //   reloadData().catch(console.error);
  // }, []);
  //
  useEffect(() => {
    reloadData();
  }, []);

  async function reloadData() {
    const response = await axios.get("/api/lists");
    const data = await response.data;
    setListSummaries(data);
  }

  function handleNewList(newName: string) {
    const updateData = async () => {
      const newListData = {
        name: newName,
      };

      await axios.post(`/api/lists`, newListData);
      reloadData().catch(console.error);
    };
    updateData();
  }

  function handleDeleteList(id: string) {
    const updateData = async () => {
      await axios.delete(`/api/lists/${id}`);
      reloadData().catch(console.error);
    };
    updateData();
  }

  function handleSelectList(id: string) {
    console.log("Selecting item", id);
    setSelectedItem(id);
  }

  function backToList() {
    setSelectedItem(null);
    reloadData().catch(console.error);
  }

  if (selectedItem === null) {
    return (
      <div className="App">
        <h1>hello</h1>
        <ShowLists
          listSummaries={listSummaries}
          handleSelectList={handleSelectList}
          handleNewList={handleNewList}
          handleDeleteList={handleDeleteList}
        />
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>hello</h1>
        <List listId={selectedItem} handleBackButton={backToList} />
      </div>
    );
  }
}

export default App;
