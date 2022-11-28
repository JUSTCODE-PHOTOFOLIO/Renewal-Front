import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import UploadMain from './UploadMain';
import UploadWrite from './UploadWrite';
import Footer from '../../components/Footer/Footer';

function App() {
  const [uploadCheck, setUploadCheck] = useState(true);

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [tag, setTag] = useState(null);
  const [category_name, setCategory_name] = useState(null);
  const [public_status, setPublic_status] = useState(null);

  const [cardData, setCardData] = useState();

  function uploadImageClick(event) {
    event.preventDefault();
  }

  function onImgChange(event) {
    console.log(event.target.files);
    setFile([...event.target.files]);
    setUploadCheck(false);
  }

  function startFetch(event) {
    event.preventDefault();
    const formdata = new FormData();

    file.map(elem => {
      formdata.append('file', elem);
    });

    formdata.append('title', title);
    formdata.append('content', content);
    formdata.append('tag', tag);
    formdata.append('category_name', category_name);
    formdata.append('public_status', public_status);

    for (let item of formdata.values()) {
      console.log(item);
    }
    for (let item of formdata.keys()) {
      console.log(item);
    }

    setCardData(formdata);

    console.log({
      file: file,
      title: title,
      content: content,
      tag: tag,
      category_name: category_name,
      public_status: public_status,
    });
  }

  useEffect(() => {
    fetch('http://43.201.0.95:8000/upload/form', {
      method: 'POST',
      headers: {
        token: localStorage.getItem('token'),
      },
      body: cardData,
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.message === '업로드 성공') {
          window.location.href = 'http://43.201.0.95:3000/feeds';
        }
      });
  }, [cardData]);

  return (
    <>
      <Header />
      {uploadCheck && <UploadMain onImgChange={onImgChange} />}
      {!uploadCheck && (
        <UploadWrite
          setTitle={setTitle}
          setContent={setContent}
          setTag={setTag}
          setCategory_name={setCategory_name}
          setPublic_status={setPublic_status}
          startFetch={startFetch}
        />
      )}
      <Footer />
    </>
  );
}

export default App;
