import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountInfo.scss';
import DeleteModal from './DeleteModal/DeleteModal';

const AccountInfo = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [accountInfo, setAccountInfo] = useState({
    login_id: '',
    kor_name: '',
    eng_name: '',
    email: '',
    nickname: '',
    profile_image: '',
  });

  //accountInfo에 변화가 생겼을 때(수정)
  const onChange = e => {
    const { name, value } = e.target;
    setAccountInfo({
      ...accountInfo,
      [name]: value,
    });
  };

  //계정정보 fetch
  useEffect(() => {
    fetch('http://43.201.0.95:8000/user/accountInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(result => setAccountInfo(result.data));
  }, []);

  // 삭제 모달창 노출
  const showModal = e => {
    e.preventDefault();
    setModalOpen(true);
  };

  //수정된 계정정보 서버로 저장
  const saveAccountInfo = e => {
    e.preventDefault();
    fetch('http://43.201.0.95:8000/user/accountInfo', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
      body: JSON.stringify(accountInfo),
    }).then(res => res.json());
  };

  return (
    <div>
      <div className="account-out-wrapper">
        <div className="account-header-wrapper">
          <div className="account-header">계정정보</div>
        </div>
        <div className="account-info-wrapper">
          <div className="account-info-form-wrapper">
            <form className="account-info-form">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div className="account-info-title special">로그인ID</div>
                      <div name="login_id" className="account-info-id">
                        {accountInfo.login_id}
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>
                      <div className="account-info-not-null">*</div>
                      <div className="account-info-title">이름</div>
                      <input
                        name="kor_name"
                        type="text"
                        onChange={onChange}
                        defaultValue={accountInfo?.kor_name}
                        placeholder="이름을 입력해주세요."
                      />
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>
                      <div className="account-info-not-null">*</div>
                      <div className="account-info-title ">영문이름</div>
                      <input
                        name="eng_name"
                        type="text"
                        onChange={onChange}
                        defaultValue={accountInfo?.eng_name}
                        placeholder="영문 이름을 입력해주세요."
                      />
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>
                      <div className="account-info-not-null">*</div>
                      <div className="account-info-title">이메일</div>
                      <input
                        name="email"
                        type="text"
                        onChange={onChange}
                        defaultValue={accountInfo?.email}
                        placeholder="포토폴리오 소식을 받을 이메일을 입력해주세요."
                      />
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>
                      <div className="account-info-not-null">*</div>
                      <div className="account-info-title">닉네임</div>
                      <input
                        name="nickname"
                        type="text"
                        onChange={onChange}
                        defaultValue={accountInfo?.nickname}
                        placeholder="닉네임을 입력해주세요."
                      />
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td className="account-info-img-part-wrapper">
                      <div className="account-info-title special">
                        프로필 이미지
                      </div>
                      <div className="account-info-img-wrapper">
                        {accountInfo.profile_image ? (
                          <img
                            name="profile_image"
                            src={accountInfo.profile_image || ''}
                            alt=""
                          />
                        ) : (
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                            alt=""
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <div className="account-info-contract">
                이용자는 개인정보 수집 및 이용 동의를 거부할 권리가 있으나, 거부
                시 채널 정보 등록이 불가능합니다. <br />
                입력하신 정보(필수 - 이름, 영문이름, 프로필 이미지, 기본 이메일,
                선택 - 국가, 외부공개 이메일)는 그라폴리오 서비스 제공을
                목적으로 수집하며,
                <b> 네이버 회원 탈퇴 혹은 직접 삭제 전까지 보관됩니다.</b>
              </div>
              <div className="account-info-btn-wrapper">
                <button
                  className="btn account-info-save-btn"
                  onClick={saveAccountInfo}
                >
                  동의 및 저장
                </button>
                <button
                  className="btn account-info-reset-btn"
                  onClick={() => navigate('/works')}
                >
                  취소
                </button>
                <div>
                  <button
                    className="btn account-info-wdraw-btn"
                    onClick={showModal}
                  >
                    채널삭제
                  </button>
                  {modalOpen && <DeleteModal setModalOpen={setModalOpen} />}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
