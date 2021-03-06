import React, { useEffect, useState } from "react";
import { storageService, dbService } from "fbase";

const Detail = ({ match }) => {
  const { no } = match.params;
  let loc, ti, co, im, ph;

  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    dbService
      .collection("nweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArray);
      });
  }, []);

  nweets.map((index) => {
    if (index.id == `${no}`) {
      loc = index.location;
      ti = index.title;
      co = index.content;
      im = index.attachmentUrl;
      ph = index.phone;
    }
  });
  const onClick2 = () => {
    alert(ph);
  };

  return (
    <>
      <div className="post-view-wrapper">
        <>
          <h2 align="center">게시글 상세정보</h2>

          <div className="post-view-row">
            <label>장소</label>
            <label>{loc}</label>
          </div>
          <div className="post-view-row">
            <label>제목</label>
            <label>{ti}</label>
          </div>
          <div className="post-view-row">
            <label>내용</label>
            <label>{co}</label>
          </div>
          {im != "" && <img src={im} width="200" height="200" />}
          <button onClick={onClick2} name="github" className="authBtn">
            연락하기
          </button>
        </>
      </div>
    </>
  );
};
export default Detail;
