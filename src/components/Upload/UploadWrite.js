import React, { useRef, useState, useEffect } from 'react';
import './uploadWrite.scss';
import TagModal from './UploadWriteTagModal';
import UploadModal from './UploadModal';

function App({
  setTitle,
  setContent,
  setTag,
  setCategory_name,
  setPublic_status,
  startFetch,
  previewImg,
}) {
  const [tagModalState, setTagModalState] = useState(false);
  const [uploadModalState, setuploadModalState] = useState(false);
  const [uploadTagData, setUploadTagData] = useState([]);

  const titleValue = useRef();
  const contentValue = useRef();
  const tagFieldRef = useRef();

  function clickUploadBtn(event) {
    updateTagMockDataFunc();
    setuploadModalState(true);
  }

  function updateTagMockDataFunc(event) {
    const updateTagMockData = [];
    if (tagFieldRef.current) {
      tagFieldRef.current.childNodes.forEach(element => {
        updateTagMockData.push(element.innerText);
      });
    }
    setUploadTagData(updateTagMockData);
  }

  function addTag(event) {
    setTagModalState(!tagModalState);
  }

  function clickPreveiw() {
    document.querySelector('.uploadWriteContent').focus();
  }

  useEffect(() => {
    let temp = '';
    uploadTagData.map(elem => (temp += elem + ','));

    setTitle(titleValue.current.value);
    setContent(contentValue.current.value);
    setTag(temp);
  }, [uploadTagData]);

  return (
    <div>
      <div className="uploadWriteForm">
        <input
          name="title"
          className="uploadWriteTitle"
          placeholder="제목을 입력해 주세요."
          ref={titleValue}
        ></input>
        <div className="divide"></div>

        <img src={previewImg} className="previewImg" onClick={clickPreveiw} />
        <textarea
          ref={contentValue}
          name="content"
          className="uploadWriteContent"
        ></textarea>
        <div className="uploadWriteTag" onClick={addTag}>
          <span className="uploadWriteTagSpan1">태그 </span>
          <span className="uploadWriteTagSpan2">
            # 어울리는 태그를 입력해주세요.(최대 5개)
          </span>
        </div>
        {tagModalState && (
          <TagModal
            updateTagMockDataFunc={updateTagMockDataFunc}
            tagFieldRef={tagFieldRef}
          />
        )}
        {uploadModalState && (
          <UploadModal
            setuploadModalState={setuploadModalState}
            setCategory_name={setCategory_name}
            setPublic_status={setPublic_status}
            startFetch={startFetch}
          />
        )}
        <div className="divide"></div>
        <div className="alertment">
          <span className="alertmentSpan">
            작품 내용과 무관한 일부 태그는 삭제, 수정될 수 있습니다.
          </span>
        </div>
        <button className="uploadBtn" onClick={clickUploadBtn}>
          업로드
        </button>
      </div>
    </div>
  );
}

export default App;
