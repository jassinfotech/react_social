import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Addnewpost() {
  const isLogin = localStorage.getItem('Islogin');
  const loginData = JSON.parse(isLogin);
  console.log('isLogin', loginData.name  );
  const name = loginData.name;
  const userid = loginData.id;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleAddPost = (e) => {
    e.preventDefault();

    if (!selectedImage) {
      setError('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('postimage', selectedImage);
    formData.append('title', title); 
    formData.append('userid', userid); 
    formData.append('content', content); 
    formData.append('name', name); 

    axios.post('http://localhost:8000/posts', formData)
      .then((response) => {
        console.log('New post added!', response.data);
        navigate('/Home');
      })
      .catch((error) => {
        console.error('Error adding new post:', error);
        setError('Failed to add new post');
      });
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="post_from">
          <form onSubmit={handleAddPost}>
            <input
              type="text"
              className="from_input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="file"
              className="from_input"
              onChange={handleImageUpload}
            />
            <textarea
              className="from_input"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="add_post_bt" type="submit">
              Add New Post
            </button>
          </form>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Addnewpost;