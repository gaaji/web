import {faHeart} from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import theme from "../../../theme";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {compareLocalDateTimeToNow} from "../../../util/LocalDateTimeConverter";
import {faBox} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {READ_ARTICLE} from "../../../util/Url";

const UsedItemWrapper = styled.div`
  display: flex;
  margin: 20px 0px;
  justify-content: space-between;
  align-items: center;
`
const UsedItemImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  border: 1px solid ${theme.color.gray};
  margin-right: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.1);

`
const UsedItemImage = styled.img`
  object-fit: fill;
  width: 100%;
`
const UsedItemContent = styled.div`
  width: calc(100% - 100px);
  font-family: ${theme.font.kor};
`
const UsedItemTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`
const UsedItemSub = styled.div`
  font-size: 12px;
  color: gray;
  margin-bottom: 10px;
`
const UsedItemPrice = styled.div`
  font-weight: bold;
`
const UsedItemInterestWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  color: gray;
  align-items: center;
`
const UsedItemInterestIcon = styled(FontAwesomeIcon)`
  margin-right: 3px;
  font-size: 15px;
  top: 1px;
  :hover{
    cursor: pointer;
  }
`

const Divider = styled.hr`
  opacity: 1;
  background-color: ${theme.color.gray};
`

const BlankImage = styled(FontAwesomeIcon)`
  font-size: 40px;
  color: rgba(0,0,0,0.6);
`

interface UsedItemProps {
    postId: string;
    imgUrl: string;
    title: string;
    address: string;
    createdAt: string;
    price: number;
    interestCount: number;
}

function UsedItem({postId, imgUrl, title,address, createdAt, price, interestCount}: UsedItemProps) {

    const navigate = useNavigate();

    const usedItemMove = () => {
        navigate(READ_ARTICLE,
            {replace:true,
            state : {
                id : postId
            }})
    }

    return (
        <>
            <UsedItemWrapper onClick={usedItemMove}>
                <UsedItemImageWrapper>
                    {imgUrl !== null ? <UsedItemImage src={imgUrl} alt={"haha"}/> :
                        <>
                        <BlankImage icon={faBox}/>
                        </>
                    }
                </UsedItemImageWrapper>
                <UsedItemContent>
                    <UsedItemTitle>{title.length > 24 ? `${title.substring(0,24)}...` : title}</UsedItemTitle>
                    <UsedItemSub>{address} · {compareLocalDateTimeToNow(createdAt)}</UsedItemSub>
                    <UsedItemPrice>{price.toLocaleString()}원</UsedItemPrice>
                    <UsedItemInterestWrapper>
                        {/*TODO 관심 등록 기능 추가*/}
                        <UsedItemInterestIcon icon={faHeart}/>
                        <span>{interestCount}</span>
                    </UsedItemInterestWrapper>
                </UsedItemContent>
            </UsedItemWrapper>
            <Divider/>
        </>
    )
}

export default UsedItem;