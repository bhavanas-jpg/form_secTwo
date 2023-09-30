import { useState } from "react";
import email from "../assets/email.svg";
import back_arrow from "../assets/back_arrow.svg";
import browseFile from "../assets/browseFile.svg";
import uploadFile from "../assets/upload_file.svg";
import validateFile from "../assets/validating_file.svg";
import Modal from "./Modal";

const Form = () => {
  const [jsonContent, setJsonContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setErrorMessage("Please select a JSON file.");
      return;
    }

    const reader = new FileReader();

    setLoading(true);


      reader.onload = (e) => {
        try {
          console.log("helo")
          const jsonData = JSON.parse(e.target.result);
          console.log(jsonData);

          setTimeout(()=>{
            setJsonContent(JSON.stringify(jsonData, null, 2));
            setLoading(false)
           
          },1000)
          setErrorMessage(" ");
         
        
        } catch (error) {
          setJsonContent("");
          setLoading(false);
          setErrorMessage("Invalid JSON file. Please upload a valid JSON file.");
        }
      };

   

    reader.readAsText(file);
  };

const submitHandler =(e)=>{
e.preventDefault();
setShowModal(true)
}


  return (
    <>
      <div className="heading__container">
        <img src={back_arrow} alt="back-arrow" />
        <h3>Submit form</h3>
      </div>

      <form onSubmit={submitHandler}>
        <label> Full Name </label>
        <input type="text" placeholder="Full Name" />
        <label>Email</label>
        <div className="email__sec">
          <input type="email" placeholder="Email" />
          <img src={email} className="email__image" alt="email-icon" />
        </div>

        <label> Upload JSON file</label>
        <div>
        <input type="file"
        className="input__file"
        onChange={handleFileChange} />
       <img src={uploadFile} alt="" />
        </div>
     


        {/* <div className="file__container">
        <img src={browseFile} alt="browse file image" 
        className="upload__file--img"
        />
        <p>Browse file</p>
        </div> */}

        {errorMessage && <div className="error__message">{errorMessage}</div>}

{loading && <p>Loading...</p>}

        <label>File Contents</label>
        <textarea cols="20" rows="8" value={jsonContent} readOnly></textarea>

        <div className="btn__container">
          <button
   
          className="submit__btn"
          // disabled
           type="submit">
            Submit
          </button>
        </div>
      </form>

      {showModal &&  <Modal setShowModal={setShowModal} />}
    </>
  );
};

export default Form;
