import React, { useState } from 'react';
import './UploadWriteTagModal.scss';

function App({ updateTagMockDataFunc, tagFieldRef }) {
  const [tagMockData, setTagMockData] = useState([]);

  const removeTag = function (event) {
    event.target.remove();
  };

  const clickTag = function (event) {
    removeTag(event);
    updateTagMockDataFunc(event);
  };

  const enterTagInput = function (event) {
    if (event.keyCode === 13) {
      setTagMockData([...tagMockData, event.target.value]);
      event.target.value = '';
    }
  };

  return (
    <div className="tagModal">
      <input
        className="tagModalInput"
        placeholder="태그를 입력해주세요"
        onKeyDown={enterTagInput}
      ></input>

      <div className="tagField" ref={tagFieldRef}>
        {tagMockData.map((elem, idx) => {
          return (
            <div
              key={idx}
              style={{}}
              onClick={clickTag}
              className="uploadModalTag"
            >
              {elem}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
