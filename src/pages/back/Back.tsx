import './ui/Back.css'
import { useState } from 'react';


export default function Back()
{
    const[json,setJson] = useState<string>("");

    const btnClick = ()=>{
fetch ("http://localhost:8080/java231web/gson")
.then (r => r.text())
.then(setJson);
    };

    return<>
    <button onClick = {btnClick}>Get JSON</button>
    <p>{json}</p>
    </>
}