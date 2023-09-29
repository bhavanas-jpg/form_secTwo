
import successImg from "../assets/success_img.svg"

const Modal =()=>{
return(
    <div className="modal__container">
     <img src={successImg} alt="" />
    <p >524 entries successfully uploaded</p>
    <button
    className="entry__btn"
    >Go to My Entries</button>
    <button
    className="cancel__btn"
    >Cancel</button>
    </div>
)
}

export default Modal;