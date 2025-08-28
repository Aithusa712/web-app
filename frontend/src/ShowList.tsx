import "./ShowList.css";
import { useRef } from "react";
import { BiSolidTrash } from "react-icons/bi";

type Summary = { id: string; name: string; item_count: number };

type Props = {
  listSummaries: Summary[] | null;
  handleSelectList: (id: string) => void;
  handleNewList: (name: string) => void;
  handleDeleteList: (id: string) => void;
};

export default function ShowList({
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
    return <div className="ShowList loading">Loading to-do lists ...</div>;
  }

  return (
    <div className="ShowList">
      <h1>All To-Do Lists</h1>

      <div className="box">
        <label>
          New To-Do List:&nbsp;
          <input ref={inputRef} type="text" />
        </label>
        <button onClick={create}>New</button>
      </div>

      {listSummaries.length === 0 ? (
        <p>There are no to-do lists!</p>
      ) : (
        listSummaries.map((summary) => (
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
        ))
      )}
    </div>
  );
}

