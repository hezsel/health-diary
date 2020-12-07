import styled from 'styled-components';

export const Button = styled.div`
  padding: 40px;
`

export const Page = styled.div`
  padding-Top: 5vh;
  padding-Left: 7vw;
  padding-Right: 7vw;
  padding-Bottom: 5vh;
`

export const CardShadow = styled.div`
  box-Shadow: 4px 3px 15px -4px #636363; 
`

export const RightCard = styled.div`
  width: 55%;
  display: inline-block;
  height: 90vh;
  padding-Left: 20px;
  @media (max-width: 960px) {
    display: none;
  }
`

export const LeftCard = styled.div`
  background: linear-gradient(to top,rgba(105,102,246,1),rgba(105,102,246,0.75));
  width: 40%;
  height: 90vh;
  display: block;
  float: left;
  @media (max-width: 960px) {
    width: 100%;
    box-Shadow: 4px 3px 15px -4px #636363;
  }
`

export const Title = styled.div`
  color: white;
  font-Weight: bold;
  font-Size: 40px;
  display: flex;
  padding-Top: 20vh;
  margin-Bottom: 10vh;
  align-Items: center;
  justify-Content: center;
  @media (max-width: 960px) {
    padding-Top: 10vh;
    margin-Bottom: 10vh;
  }
`

export const Fields = styled.div`
  padding: 30px;
  @media (max-width: 960px) {
    padding: 10px;
  }
`

export const ActionArea = styled.div`
  display: flex;
  padding-Top: 40px;
  align-Items: center;
  justify-Content: center;
`
