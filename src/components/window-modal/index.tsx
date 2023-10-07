import "./style.css";
import { useState, useImperativeHandle, forwardRef } from "react";
import { AiFillCloseCircle as CloseIcon } from "react-icons/ai";
import { ModalFrameMethods } from "../../types";

type Props = {
  children: React.ReactNode;
};

export const WindowModalFrame = forwardRef<ModalFrameMethods, Props>(({ children }, ref) => {
  const [display, setDisplay] = useState("none");

  const hide = () => {
    setDisplay("none");
  };

  const show = () => {
    setDisplay("flex");
  };

  useImperativeHandle(ref, () => ({
    show,
  }));

  return (
    <div className="window-modal-frame" style={{ display: display }} onClick={() => hide()}>
      <div className="modal-inner-frame" onClick={(e) => e.stopPropagation()}>
        <CloseIcon size={30} className="close-button" onClick={() => hide()} />
        <div className="children">{children}</div>
      </div>
    </div>
  );
});
