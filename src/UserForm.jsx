import { useState } from "react";

function UserForm(){
 const [formsData,setFormsData] = useState({
    title:'',
    ingredients:'',
    instructions:'',
    image:''

 });

 
 const handleChange = (event) => {
    const { name, value } = event.target;
    setFormsData({...formsData, [name]: value });
    console.log(name,value);
};
const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formsData);

    fetch('http://localhost:8080/File/setDatas', {
        headers: {
            "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify(formsData)
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        return response.json();
    })
    .then((data) => {
        console.log("fetched data", data);
        setFormsData(data);
        // console.log(setFormData)
    })
    .catch((error) => {
        console.error("Error detected", error);
    });

};
 const [selectedImage,setSelectedImage] = useState(null);
      const handleFile= () => {
        console.log("hi")
        const formData = new FormData();
        formData.append("image",selectedImage);

        fetch("http://localhost:8080/File/upload",{
            method: "POST",
            body: formData,
            dataType: "jsonp"
        })
        .then(response => response.text())
        .then(text => {
            formsData.image=text;
            console.log(text)
        })
         .catch((error) => {
        console.error("Error detected", error);
    });

      }

  return (
    <div className="form-contain1  vh-100 d-flex flex-column justify-content-center align-items-center" >
            
            <form className="form1 w-50  h-50 " onSubmit={handleSubmit}>
                <div className="form-box1 h-100 row border ">
                <div className="col-lg-6 col-12 p-2 d-flex flex-column justify-content-center align-items-start" >
                    <label htmlFor="Title">Title</label>
                    <input type="text" name="title" value={formsData.title} onChange={handleChange} className="border p-2 rounded text-dark w-100"></input>
                </div>
                <div className="col-lg-6  p-2 d-flex flex-column justify-content-center align-items-center">
                {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
          <button onClick={ handleFile()}>Upload</button>
        </div>
      )}
      {/* <br />
      <br /> */}
      
      <input
        type="file"
        name="image"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
                    
                </div>
                <div className="col-12 col-lg-6 p-2 d-flex flex-column justify-content-center align-items-start" >
                    <label htmlFor="Ingredients">Ingredients</label>
                    <input type="text" name="ingredients" value={formsData.ingredients} onChange={handleChange} className="border w-100 p-2 rounded"></input>
                </div>
                <div className="col-12 col-lg-6 p-2 d-flex flex-column justify-content-center align-items-start">
                    <label htmlFor="Instructions">Instructions</label>
                    <input type="text" name="instructions" value={formsData.instructions} onChange={handleChange} className="border w-100 p-2 rounded"></input>
                </div>

                <div className="col-12 d-flex flex-column justify-content-center align-items-center">
                <input type="submit" value="Submit" className="submit w-50 rounded"></input>
                </div>
                </div>
            </form>
        </div>
  );
}
export default UserForm;