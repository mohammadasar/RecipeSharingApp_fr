// function Home(){
//     return(
//         <>
//         <h1>Home page</h1>
        
//         </>
//     )
// }
// export default Home;
import { useState } from 'react';
import { useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Home() {

   const [render,setRender]=useState([]);

   useEffect( () => {
    fetch('http://localhost:8080/File/render')
    .then((response) => response.json())
    .then((data) => {
        setRender(data);
    })
    .catch((err) => {
        console.error(err)
    })
   },[]);

  return (
    <div className='container '>
       <div className=' row '>
        {
            Array.isArray(render) && render.slice(0,100).map((a,index)=>(
   
    <div key={a} className='col-lg-4 col-12'>
    <Card style={{ width: '18rem' }} >
      <Card.Img variant="top" src={"http://localhost:8080/Uploads/" +a.image} />
      <Card.Body>
        <Card.Title>{a.title}</Card.Title>
        <Card.Text>
          {a.ingredients}
        </Card.Text>
        <Card.Text>
          {a.instructions}
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
    </div>
 
            ))
}
</div>
    </div>
  );
}

export default Home;