import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const AddEvents = () => {

    const { register, handleSubmit,  formState: { errors } } = useForm();
    const[imageURL, setImageURL] = useState(null);
    
    const onSubmit = data => {
      const eventData ={
        name:data.name,
        imageURL: imageURL
      };
      const url = `http://localhost:5055/addEvent`;
      // console.log(eventData)
      fetch(url,{
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(eventData)
      })
      .then(res => console.log('server side response'))
    };
    const handleImageUpload = event => {
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', 'a25748b8c4a792ffdba1d9c9c3297d01');
        imageData.append('image', event.target.files[0] );

        axios.post('https://api.imgbb.com/1/upload',
        imageData)
        .then(function (response) {
        setImageURL(response.data.data.display_url);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return (
        <div>
        <h1>Add your images and upload</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue="New exciting event" {...register("name")} />
        <br />
        <input type="file" onChange={handleImageUpload} />
        <br />
        <input type="submit" />
        </form>
        </div>
    );
};

export default AddEvents;