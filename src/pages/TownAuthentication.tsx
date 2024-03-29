import Header from "../component/content/Header";
import {townApi} from "../api/townApi";
import TownAuthContent from "../component/townauth/TownAuthContent";
import {getCookie} from "../util/Cookie";
import {MyTown} from "../model/town";
import {useEffect, useState} from "react";

export function findSameTown(datas:MyTown[]|undefined , town:string|undefined){
    if(!town || !datas)
        return;

    for (const data of datas) {
        if (data.address2 === town) {
            return data;
        }
    }
    return null;
}

export default function TownAuthentication(){

    const query = townApi.useGetMyTownQuery();

    const [selectedTown,setSelectedTown]= useState<MyTown|null|undefined>();
    const [towns,setTowns]=useState<MyTown[]>();
    let town:string|undefined = getCookie("selected_town");
    useEffect(() => {
        if (query.isSuccess) {
            const findSameTown1 = findSameTown(query.data, town);
            setSelectedTown(findSameTown1);
            setTowns(query.data);
        }
    },[query.isSuccess, selectedTown, town])



    return (
        <>
            <Header myTown={towns}/>
            <TownAuthContent towns={towns} setSelectedTown={setSelectedTown} selectedTown={selectedTown}/>
        </>
    )
}