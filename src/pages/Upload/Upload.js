import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import UploadMain from '../../components/Upload/UploadMain';
import UploadWrite from '../../components/Upload/UploadWrite';
import Footer from '../../components/Footer/Footer';

function App() {
  const [uploadCheck, setUploadCheck] = useState(true);

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [tag, setTag] = useState(null);
  const [category_name, setCategory_name] = useState(null);
  const [public_status, setPublic_status] = useState(null);

  const [cardData, setCardData] = useState(null);
  const URI = process.env.REACT_APP_BASE_URL;
  const PORT = process.env.REACT_APP_BACK_DEFAULT_PORT;

  const [previewImg, setPreviewImg] = useState(null);

  function onImgChange(event) {
    setFile([...event.target.files]);
    setUploadCheck(false);

    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setPreviewImg(reader.result);
    };
    reader.readAsDataURL(file);
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

    setCardData(formdata);
  }

  useEffect(() => {
    if (cardData !== null) {
      fetch('http://' + URI + ':' + PORT + '/upload/form', {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        body: cardData,
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.message === '업로드 성공') {
            window.location.href = 'http://' + URI + ':3000/feeds';
          }
        });
    }
  }, [cardData]);

  return (
    <>
      <Header URI={URI} PORT={PORT} />
      {uploadCheck && <UploadMain onImgChange={onImgChange} />}
      {!uploadCheck && (
        <UploadWrite
          setTitle={setTitle}
          setContent={setContent}
          setTag={setTag}
          setCategory_name={setCategory_name}
          setPublic_status={setPublic_status}
          startFetch={startFetch}
          previewImg={previewImg}
        />
      )}
      <Footer />
    </>
  );
}

export default App;
