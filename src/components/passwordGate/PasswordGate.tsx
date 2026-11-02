import {type ReactNode, type SyntheticEvent, useState} from "react";
import "./PasswordGate.css"


interface PasswordGateProps {
    children: ReactNode
}

const PASSWORD = "Bruiloft_2027";
const STORAGE_KEY = "wedding_authenticated"

export default function PasswordGate({children}: PasswordGateProps) {
    const [authenticated, setAuthenticated] = useState(sessionStorage.getItem(STORAGE_KEY) === "true");

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event: SyntheticEvent<HTMLFormElement>){
        event.preventDefault();

        if(password === PASSWORD){
            sessionStorage.setItem(STORAGE_KEY, "true");
            setAuthenticated(true);
            setError("");
            return;
        }

        setError("Het ingevoerde wachtwoord is onjuist")
        setPassword("")

    }

    if(authenticated) {
        return <>{children}</>
    }

    return (
        <div className={"password-gate"}>
            <form className={"password-gate__form"}
                  onSubmit={handleSubmit}>
                <h1>Welkom!</h1>
                <p>Voer het wachtwoord in om onze website te bekijken</p>

                <input
                type="password"
                placeholder={"Wachtwoord"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={"current-password"}
                autoFocus/>

                {error && <p className={"password-gate__error"}>{error}</p> }

                <button type={"submit"}>
                    Bekijk website
                </button>
            </form>
        </div>
    )
}