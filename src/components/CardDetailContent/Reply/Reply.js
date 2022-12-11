import { useEffect } from 'react';
import { useState } from 'react';
import './Reply.scss';

const Reply = ({
  kor_name,
  comment,
  created_at,
  user_id,
  id,
  BACK_URI,
  posting_id,
  PORT,
}) => {
  const idCheck = localStorage.getItem('id');
  const [menuBtn, setMenuBtn] = useState(false); //메뉴버튼 클릭 상태

  //메뉴버튼 클릭시 버튼의 상태 변경
  const menuClick = () => {
    if (menuBtn == false) {
      setMenuBtn(true);
    } else {
      setMenuBtn(false);
    }
  };

  const [deletedReply, setDeletedReply] = useState(''); //삭제할 댓글

  //댓글 삭제 fetch
  const deleteReply = () => {
    alert('댓글을 삭제하시겠습니까?');
    fetch('http://' + BACK_URI + ':' + PORT + '/comments', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({ comment_id: id, posting_id: posting_id }),
    })
      .then(res => res.json())
      .then(res => setDeletedReply(res.deleted_comment_id));
  };

  return (
    <>
      {deletedReply !== id && (
        <div className="detail-reply-card">
          <div className="reply-top-wrapper">
            <div>
              <div className="detail-reply-writer">{kor_name}</div>
            </div>
            {idCheck == user_id && (
              <span className="menu" onClick={menuClick} />
            )}
            {menuBtn && (
              <div className="selectMenuWrapper">
                <div className="selectMenu">수정</div>
                <div className="selectMenu" onClick={deleteReply}>
                  삭제
                </div>
              </div>
            )}
          </div>
          <div className="detail-reply-content">{comment}</div>
          <div className="detail-reply-date">{created_at}</div>
        </div>
      )}
    </>
  );
};

export default Reply;
