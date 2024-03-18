import React, { useState } from 'react';
import { Form, Button} from 'react-bootstrap';

function RecipeAdminForm() {
  const[formData,setFormData]=useState({
    title:'',
    ingredients:'',
    instructions:'',
    image:'',
    imagePreview:'',
    video:''
  });
 
  // const [image, setImage] = useState(null);
  // const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    // const {name,value}=e.target;
    // setFormData({...formData, [name]: value})
    // console.log(formData);
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      // Handle files differently
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,
        imagePreview: URL.createObjectURL(file) // Create and set the preview URL
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }


  };

  

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'imagePreview') { // Exclude imagePreview from the FormData
        dataToSend.append(key, value);
      }
    });

    fetch('http://localhost:8080/File/upload', {
      headers: {
        "Content-Type": "application/json"
    },
      method: "post",
      // body: JSON.stringify(formData),
      body:dataToSend, 
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("failed to feetch data");

      } 
      return response.json()
    })
    .then((formData) => {
      console.log("fetched data",formData);
      setFormData(formData)
      
  })
    .catch(error => {
      console.error("Error detected", error);
    });
  
   
    }

  return (
    <div className='form-container1 w-100 vh-100 d-flex flex-row align-items-center justify-content-center'>
      <div className='d-grid p-5 border bg-success w-50 h-90 rounded-5'>
        <Form onSubmit={handleSubmit} className='row' encType="multipart/form-data">
          <Form.Group controlId="title" className='col-12 col-lg-6'>
            <Form.Label>Title:</Form.Label>
            <Form.Control type="text" name='title' value={formData.title} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="image" className='col-lg-6'>
  <Form.Label>Image:</Form.Label>
  <Form.Control 
    type="file" 
    name='image' 
    accept="image/*"
    onChange={handleChange} 
  />
  {formData.imagePreview && (
    <img 
      src={formData.imagePreview} 
      alt="Uploaded" 
      style={{ marginTop: '10px', maxWidth: '200px' }} 
    />
  )}
</Form.Group>

          {/* <Form.Group controlId="image" className='col-12 col-lg-6'>
            <Form.Label>Image:</Form.Label>
            <Form.Control type="file"name='image' accept="image/*" value={formData.image} onChange={handleChange} />
            {formData.imagePreview && <formData.image src={formData.imagePreview} alt="Uploaded" style={{ marginTop: '10px', maxWidth: '200px' }} />}
          </Form.Group> */}

          <Form.Group controlId="ingredients" className='col-12'>
            <Form.Label>Ingredients:</Form.Label>
            <Form.Control as="textarea" name='ingredients' rows={3} value={formData.ingredients} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="instructions" className='col-12'>
            <Form.Label>Instructions:</Form.Label>
            <Form.Control as="textarea" name='instructions'  rows={3} value={formData.instructions} onChange={handleChange} required />
          </Form.Group>

          <div className='text-center'>
            <Button variant="primary" type="submit" className='mt-3 w-15'>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default RecipeAdminForm;
