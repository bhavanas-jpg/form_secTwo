import { useRef, useState } from "react";
import email from "../assets/email.svg";
import back_arrow from "../assets/back_arrow.svg";
import uploadFile from "../assets/upload_file.svg";
import loader from "../assets/validating_file.svg";

import Modal from "./Modal";

const Form = () => {
  const [jsonContent, setJsonContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef();

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
       
        const jsonData = JSON.parse(e.target.result);
        setTimeout(() => {
          setJsonContent(JSON.stringify(jsonData, null, 2));
          setLoading(false);
        }, 1000);
        setErrorMessage(" ");
      } catch (error) {
        setJsonContent("");
        setLoading(false);
        setErrorMessage("Invalid JSON file. Please upload a valid JSON file.");
      }
    };

    reader.readAsText(file);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

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
        <div className="file__container">
          <input
            type="file"
            ref={inputRef}
            className="input__file"
            onChange={handleFileChange}
          />

         
          {loading ?  <img className="loader__image" src={loader} />
        :    <img
        src={uploadFile}
        alt="upload file"
        onClick={() => inputRef.current.click()}
      />
        }
        </div>

        {errorMessage && <div className="error__message">{errorMessage}</div>}

        <label>File Contents</label>
        <textarea cols="20" rows="8" value={jsonContent} readOnly></textarea>

        <div className="btn__container">
          <button
            className="submit__btn"
            disabled={!jsonContent}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>

      {showModal && <Modal setShowModal={setShowModal} />}
    </>
  );
};

export default Form;
