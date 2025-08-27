import "./ShowList.css";
import { useRef } from "react";
import { BiSolidTrash } from "react-icons/bi";

function ShowList({
  listSummaries,
  handleSelectList,
  handleNewList,
  handleDeleteList,
}) {
  const labelRef = useRef();

  if (listSummaries === null) {
    return <div className="ShowList loading">Loading to-do lists ...</div>;
  } else if (listSummaries.length === 0) {
    return (
      <div className="ShowList">
        <div className="box">
        <label>
          New To-Do List:&nbsp;
          <input id={labelRef} type="text" />
        </label>
        <button
          onClick={() =>
            handleNewList(document.getElementById(labelRef).value)
          }
        >
          New
        </button>
        </div>
        <p>There are no to-do lists!</p>
      </div>
    );
  }
  return (
    <div className="ShowList">
      <h1>All To-Do Lists</h1>
      <div className="box">
        <label>
          New To-Do List:&nbsp;
          <input id={labelRef} type="text" />
        </label>
        <button
          onClick={() =>
            handleNewList(document.getElementById(labelRef).value)
          }
        >
          New
        </button>
      </div>
      {listSummaries.map((summary) => {
        return (
          <div
            key={summary.id}
            className="summary"
            onClick={() => handleSelectList(summary.id)}
          >
            <span className="name">{summary.name} </span>
            <span className="count">({summary.item_count} items)</span>
            <span className="flex"></span>
            <span
              className="trash"
              onClick={(evt) => {
                evt.stopPropagation();
                handleDeleteList(summary.id);
              }}
            >
              <BiSolidTrash />
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default ShowList;
