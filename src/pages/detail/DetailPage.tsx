import React, {useState} from "react"
import {RouteComponentProps} from 'react-router-dom';

interface MatchParams {
    touristRouteId: string
}

// interface cProps {
//     number: number
//     setnum: React.Dispatch<React.SetStateAction<number>>;
// }

// const Chaild:React.FC<cProps> = (props)=>{
//     const { number, setnum } = props;
//     return (
//         <div>
//             {number}
//             <input type="text"  onChange={(e)=>setnum(parseInt((e.target.value) + 1))}/>
//             </div>
//     )
// }

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (props) => {
    // const [num, setnum] = useState(0);
    return (
    <div>detail:ID: {props.match.params.touristRouteId}
     {/* <Chaild number={num} setnum={setnum}/> */}
     </div>)
}