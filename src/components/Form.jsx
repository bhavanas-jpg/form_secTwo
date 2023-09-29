import { useState } from "react";
import email from "../assets/email.svg";
import back_arrow from "../assets/back_arrow.svg";

const Form = () => {
  const [jsonContent, setJsonContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setErrorMessage("Please select a JSON file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        setJsonContent(JSON.stringify(jsonData, null, 2));
        setErrorMessage(" ");
      } catch (error) {
        setJsonContent("");
        setErrorMessage("Invalid JSON file. Please upload a valid JSON file.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      <div className="heading__container">
        <img src={back_arrow} alt="back-arrow" />
        <h3>Submit form</h3>
      </div>

      <form>
        <label> Full Name </label>
        <input type="text" placeholder="Full Name" />
        <label>Email</label>
        <div class="email__sec">
          <input type="email" placeholder="Email" />
          <img src={email} className="email__image" alt="email-icon" />
        </div>

        <label> Upload JSON file</label>
        <input type="file" onChange={handleFileChange} />
        {errorMessage && <div className="error__message">{errorMessage}</div>}
        <label>File Contents</label>
        <textarea cols="20" rows="8" value={jsonContent} readOnly></textarea>

        <div className="btn__container">
          <button
          className="submit__btn"
          disabled type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
