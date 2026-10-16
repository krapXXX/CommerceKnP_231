import './ui/Back.css'
import { useState } from 'react';


export default function Back() {

    const [json, setJson] = useState<string>("");

    const url = "http://localhost:8080/java231web/gson";


    const btnClick = () => {
        fetch(url + "?x=10&str=GET")
            .then(r => r.text())
            .then(setJson);
    };


    const postClick = () => {
        fetch(url, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                x: 10,
                str: "POST",
                cyr: "ПОСТік",
                b: true,
                date: "2026-09-22 23:20:00"
            })
        })
            .then(r => r.text())
            .then(setJson);
    };


    const putClick = () => {
        fetch(url, {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                x: 20,
                str: "PUT",
                cyr: "ПУТ",
                b: true,
                date: "2026-09-22 23:21:00"
            })
        })
            .then(r => r.text())
            .then(setJson);
    };


    const patchClick = () => {
        fetch(url, {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                x: 30,
                str: "PATCH",
                cyr: "ПАТЧ",
                b: false,
                date: "2026-09-22 23:22:00"
            })
        })
            .then(r => r.text())
            .then(setJson);
    };


    const deleteClick = () => {
        fetch(url, {
            method: "DELETE",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                x: 40,
                str: "DELETE"
            })
        })
            .then(r => r.text())
            .then(setJson);
    };


    const headClick = () => {
        fetch(url, {
            method: "HEAD"
        })
            .then(r => {
                setJson(
                    "HEAD response\n"
                    + "Status: " + r.status + "\n"
                    + "Content-Type: "
                    + r.headers.get("Content-Type")
                );
            });
    };


    const optionsClick = () => {
        fetch(url, {
            method: "OPTIONS"
        })
            .then(r => {
                setJson(
                    "OPTIONS response\n"
                    + "Status: " + r.status + "\n"
                    + "Allowed methods: "
                    + r.headers.get("Access-Control-Allow-Methods")
                );
            });
    };


    return <>
        <h1>HTTP Methods</h1>

        <button onClick={btnClick}>
            GET
        </button>

        <button onClick={postClick}>
            POST
        </button>

        <button onClick={putClick}>
            PUT
        </button>

        <button onClick={patchClick}>
            PATCH
        </button>

        <button onClick={deleteClick}>
            DELETE
        </button>

        <button onClick={headClick}>
            HEAD
        </button>

        <button onClick={optionsClick}>
            OPTIONS
        </button>

        <pre>{json}</pre>
    </>
}