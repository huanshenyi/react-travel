import React, {useState} from "react"
import {RouteComponentProps, useParams} from 'react-router-dom';
import axios from "axios";

interface MatchParams {
    touristRouteId: string
}

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (props) => {

    const { touristRouteId } = useParams<MatchParams>()
    return (
    <div>detail:ID: {props.match.params.touristRouteId}</div>)
}