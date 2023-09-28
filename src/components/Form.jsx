import { useState } from "react";

const Form =()=>{
 
    const [jsonContent, setJsonContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

   const handleFileChange = (event) =>{
    const file = event.target.files[0];

    if(!file){
        setErrorMessage("Please select a JSON file.");
        return;
    }
    
    const reader = new FileReader();

    reader.onload = (e) =>{
        try{
       const jsonData = JSON.parse(e.target.result);
       setJsonContent(JSON.stringify(jsonData, null, 2));
       setErrorMessage(" ");
        }catch(error){
        setJsonContent('');
        setErrorMessage('Invalid JSON file. Please upload a valid JSON file.');
        }
    }

    reader.readAsText(file);
   }

return(
    <>
    <h3>Submit form</h3>
    <form>
        <label>
            Full Name
            <input type="text" placeholder="Full Name"  />
        </label>
        <label>
            Email
            <input type="email"  placeholder="Email"/>
        </label>
        <label>
            Upload JSON file
            <input type="file"  onChange={handleFileChange}/>
        </label>
        <label>
            File Contents
            <textarea cols="30" rows="10" 
            value={jsonContent}
            readOnly
            >
            </textarea>
        </label>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <button type="submit">Submit</button>
    </form>
    </>
)
}

export default Form;