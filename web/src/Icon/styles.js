import styled from 'styled-components'
import {MdDelete} from 'react-icons/md'

export const MdDestroy = styled(MdDelete)`
    margin-left: 100px;
    opacity: 0.4;
    transition: all 0.25s;
    color: '#bbbb';
   
   &.clickable{
    cursor: pointer;
   } 

   &:hover {
    fill: #f44;
    opacity: 0.7;
   }
`