import * as React from "react";

interface ViewChangerProps {
  changeView: (view: "list" | "card") => void;
}

const ViewChanger: React.FC<ViewChangerProps> = ({ changeView }) => {
  return (
    <div className="flex gap-2">
      <i
        onClick={() => changeView("list")}
        className="custom-target-icon pi pi-server responsive__icon"
        style={{ cursor: "pointer" }}
      ></i>

      <i
        onClick={() => changeView("card")}
        className="pi pi-th-large responsive__icon"
        style={{ cursor: "pointer" }}
      ></i>
    </div>
  );
};

export default ViewChanger;
