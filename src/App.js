import { useState } from "react";
import { Formik, Form, Field } from "formik";
import "./header.css";
import "./content.css";
import "./article.css"

const App = () => {
  const [photos, setPhotos] = useState([])
  console.log({photos})
  const open = url => window.open(url)
  return (
    
  <div>
    <header>
      <Formik 
      initialValues={{Search:''}}
      onSubmit={async  values =>{
      const response =
       await fetch(`https://api.unsplash.com/search/photos?per_page+40&query=${values.Search}`,
      {headers: {
        'Authorization':'Client-ID kEwE5R_o5zobi4ofGvJ3-AN_ZX0HasvDf2jloMy8P5c'
      }})
      const data = await response.json()
      setPhotos(data.results)
    }}
      >
        

        <Form>
          <Field name="Search"/>
        </Form>
      </Formik>
    </header>
    <div className="container">
      <div className="center">
        {photos.map(photo =>
          <article key={photo.id} onClick={() => open(photo.links.html)}>
            <img src={photo.urls.regular} alt='img'/>
            <p>{[photo.description, photo.alt_description].join('  -  ')}</p>

          </article>)}
      </div>
    </div>
  </div>
  )
}

export default App;
