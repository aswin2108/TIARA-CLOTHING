import styled from 'styled-components';
import { Link } from 'react-router-dom';

export  const HeaderContainer= styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;

    @media screen and (max-width: 800px){
        height: 60px;
        padding: 10px;
        margin-bottom: 20px;
    }
`;

export const NameContainer = styled.div`
    display: flex;
`

export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
    @media screen and (max-width: 800px){
        width: 50px;
        padding:0;
    }
`;

export const SiteNameContainer = styled(Link)`
      margin-left: 5px;
      height: 100%;
      width: 265px;
      font-size: 60px;
      font-weight: 700;
      position: start;
      @media screen and (max-width: 800px){
        display: none;
    }
         
`

export const OptionsContainer=styled.div`
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      @media screen and (max-width: 800px){
        width:80%;
    }
`;

export const OptionLink=styled(Link)`
        padding: 10px 15px;
        cursor: pointer;
`;

