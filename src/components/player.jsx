import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [changeName, setChangeName] = useState(name);

  function handleEdit() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangName(symbol, changeName);
    }
  }

  function handleChangeName(event) {
    setChangeName(event.target.value);
  }

  let playerTag = <span className="player-name">{changeName}</span>;
  let buttonTitle = "Edit";

  if (isEditing) {
    playerTag = (
      <input type="text" value={changeName} onChange={handleChangeName} />
    );
    buttonTitle = "Save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerTag}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{buttonTitle}</button>
    </li>
  );
}
