import './Reply.scss';

const Reply = ({ user_id, kor_name, comment, created_at }) => {
  return (
    <>
      <div className="detail-reply-card">
        <div className="detail-reply-writer">{kor_name}</div>
        <div className="detail-reply-content">{comment}</div>
        <div className="detail-reply-date">{created_at}</div>
      </div>
    </>
  );
};

export default Reply;
