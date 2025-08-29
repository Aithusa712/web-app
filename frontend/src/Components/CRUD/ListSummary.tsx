import "./ListSummary.css";
import { useRef } from "react";
import { BiSolidTrash } from "react-icons/bi";

type Summary = { id: string; name: string; item_count: number };

type Props = {
  listSummaries: Summary[] | null;
  handleSelectList: (id: string) => void;
  handleNewList: (name: string) => void;
  handleDeleteList: (id: string) => void;
};

type handleType = {
  handleSelectList: (id: string) => void;
  handleDeleteList: (id: string) => void;
}

function renderListSummary(listSummaries: Summary[], {handleSelectList, handleDeleteList}: handleType){
  if (listSummaries.length === 0) {
  return <p>There are no lists!</p>;
}

return listSummaries.map((summary) => (
  <div
    key={summary.id}
    className="summary"
    onClick={() => handleSelectList(summary.id)}
  >
    <span className="name">{summary.name} </span>
    <span className="count">({summary.item_count} items)</span>
    <span className="flex" />
    <span
      className="trash"
      onClick={(e) => {
        e.stopPropagation();
        handleDeleteList(summary.id);
      }}
    >
      <BiSolidTrash />
    </span>
  </div>
));
}

function ShowList({
  listSummaries,
  handleSelectList,
  handleNewList,
  handleDeleteList,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const create = () => {
    const val = inputRef.current?.value.trim() ?? "";
    if (!val) return;
    handleNewList(val);
    if (inputRef.current) inputRef.current.value = "";
  };

  if (listSummaries === null) {
    return <div className="ShowList loading">Loading ...</div>;
  }

  return (
    <div className="ShowList">
      <h1>CRUD List Summary</h1>

      <div className="box">
        <label>
          New List:&nbsp;
          <input ref={inputRef} type="text" />
        </label>
        <button onClick={create}>New</button>
      </div>

      {renderListSummary(listSummaries ?? [], { handleSelectList, handleDeleteList })}
    </div>
  );
}
export default ShowList;
