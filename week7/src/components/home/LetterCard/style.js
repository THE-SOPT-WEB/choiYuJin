import styled from "styled-components";

export const Cards = styled.section`
  ul {
    font-family: "Unilab";
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 2rem 0;
    gap: 2rem;
    font-size: 2.5rem;
  }

  li {
    height: 18rem;
    width: 24rem;
    border: gray solid;
    border-radius: 10px;
    background-color: rgb(252, 251, 234);
    padding: 1.5rem;
    position: relative;
    cursor: pointer;
  }

  img {
    height: 2.5rem;
    width: 2.5rem;
    margin-left: 0.3rem;
    border-radius: 50%;
  }
`;

export const WriterInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const PasswordModal = styled.div`
  font-family: "SUIT-Medium";
  width: 400px;
  height: 220px;

  color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  position: fixed;
  transform: translate(-50%, -50%);
  background-color: rgb(40, 91, 127);
  border-radius: 15px;

  h1 {
    font-size: 25px;
    text-align: center;
    margin: 15px 15px;
  }

  //힌트.
  h2 {
    font-size: 16px;
    text-align: center;
    margin: 10px 10px;
  }

  input {
    font-family: "SUIT-Medium";
    width: 80%;
    margin: 10px 10%;
    border-style: none;
    height: 40px;
    border-radius: 10px;
    padding-left: 10px;
  }

  button {
    border-style: none;
    margin: 10px 10px;
    padding: 10px 20px;
    height: 36px;
    border-radius: 25px;

    :hover {
      background-color: rgb(186, 184, 184);
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const EditButton = styled.button`
  height: 35px;
  font-family: "GangwonEdu_OTFBoldA";
  font-size: 18px;
  border-style: none;
  border-radius: 15px;
  margin-top: 20px;
  background-color: rgb(255, 235, 150);

  :hover {
    background-color: rgb(255, 208, 0);
  }
`;
