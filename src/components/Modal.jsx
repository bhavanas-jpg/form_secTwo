import successImg from "../assets/success_img.svg";

const Modal = ({ setShowModal }) => {
  return (
    <div className="modal__container">
      <div className="overlay" onClick={() => setShowModal(false)}>
        <div className="modal">
          <img src={successImg} alt="success image" />
          <p>524 entries successfully uploaded</p>
          <button className="entry__btn">Go to My Entries</button>
          <button className="cancel__btn" onClick={() => setShowModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
