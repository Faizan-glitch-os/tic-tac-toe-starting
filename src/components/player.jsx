import { useState } from "react";

export default function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false);

  function editHandler() {
    setIsEditing((editing) => !editing);
  }

  let playerTag = <span className="player-name">{name}</span>;
  let buttonTitle = "Edit";

  if (isEditing) {
    playerTag = <input type="text" value={name} />;
    buttonTitle = "Save";
  }

  return (
    <li>
      <span className="player">
        {playerTag}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={editHandler}>{buttonTitle}</button>
    </li>
  );
}
