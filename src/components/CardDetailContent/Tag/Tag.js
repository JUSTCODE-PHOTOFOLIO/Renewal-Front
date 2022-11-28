import './Tag.scss';

const Tag = ({ tag_name }) => {
  return (
    <>
      <span className="detail-tag">#{tag_name}</span>
    </>
  );
};

export default Tag;
