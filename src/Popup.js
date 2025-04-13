import "./Popup.css";

const Popup = ({ message, oc }) => {
  return (
    <div className="popup-overlay">
      <div
        className="popup-box"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>{message}</h2>
        <button onClick={oc}>Ok</button>
      </div>
    </div>
  );
};

export default Popup;
