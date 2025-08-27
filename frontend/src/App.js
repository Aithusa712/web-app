import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ShowLists from "./ShowList";
import List from "./List";

function App() {
  const [listSummaries, setListSummaries] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    reloadData().catch(console.error);
  }, []);

  async function reloadData() {
    const response = await axios.get("/api/lists");
    const data = await response.data;
    setListSummaries(data);
  }

  function handleNewList(newName) {
    const updateData = async () => {
      const newListData = {
        name: newName,
      };

      await axios.post(`/api/lists`, newListData);
      reloadData().catch(console.error);
    };
    updateData();
  }

  function handleDeleteList(id) {
    const updateData = async () => {
      await axios.delete(`/api/lists/${id}`);
      reloadData().catch(console.error);
    };
    updateData();
  }

  function handleSelectList(id) {
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
        <List listId={selectedItem} handleBackButton={backToList} />
      </div>
    );
  }
}

export default App;
