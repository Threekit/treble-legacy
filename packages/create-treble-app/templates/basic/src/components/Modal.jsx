import ReactDOM from 'react-dom';
import { RemoveIcon } from '@threekit-tools/treble';

function ModalComponent(props) {
  const { title, children, handleClose } = props;
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-max max-h-min mx-auto p-1 bg-white"
    >
      <div>
        <div>{title}</div>
        <div onClick={handleClose} className="float-right cursor-pointer">
          <RemoveIcon />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function Modal(props) {
  const { title, children, handleClose, show } = props;
  if (!show) return null;
  return ReactDOM.createPortal(
    <div
      onClick={handleClose}
      className="fixed h-screen w-screen inset-0 bg-black z-10 flex flex-col place-content-center"
    >
      <ModalComponent title={title} handleClose={handleClose}>
        {children}
      </ModalComponent>
    </div>,
    document.body
  );
}
