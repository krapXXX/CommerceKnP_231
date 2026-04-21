import { useContext, useEffect, useState } from 'react';
import SiteButton from '../../features/buttons/SiteButton';
import ButtonTypes from '../../features/buttons/types/ButtonTypes';
import UserDao from '../../entities/user/api/UserDao';
import { AppContext } from '../../features/app_context/AppContext';

export default function Auth() {

    const { user } = useContext(AppContext);
    return user == null ? <AuthForm /> : <Profile />;
}

function AuthForm() {
    const { setUser, setBusy } = useContext(AppContext);

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isFormValid, setFormValid] = useState<boolean>(false);
    const [remember] = useState(true);
    useEffect(() => {
        setFormValid(login.length > 2 && password.length > 2)
    }, [login, password]);



    const onAuthClick = () => {
        setBusy(true);

        UserDao
            .authenticate(login, password)
            .then(res => {
                if (res == null) {
                    alert("Вхід відмовлено");
                } else {
                    // зберігаємо одержану інформацію у постійному сховищі
                    if (remember) {
                        window.localStorage.setItem(
                            "user-231",
                            JSON.stringify(res)
                        );
                    }

                    // змінюємо стан застосунку
                    setUser(res);
                }
            })
            .finally(() => {
                setBusy(false);
            });
    };


    return <>
        <h1 className="display-4 text-center">Authentification</h1>
        <div className="row mt-4">
            <div className="col col-6 offset-3 text-center">

                <div className="input-group mb-3">
                    <span className="input-group-text" id="login-addon"><i className="bi bi-key"></i></span>
                    <input type="text" className="form-control" placeholder="Login"
                        value={login} onChange={(e => setLogin(e.target.value))}
                        aria-label="Login" aria-describedby="login-addon" />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="password-addon"><i className="bi bi-unlock2"></i></span>
                    <input type="password" className="form-control" placeholder="Password"
                        value={password} onChange={(e => setPassword(e.target.value))}
                        aria-label="Password" aria-describedby="password-addon" />
                </div>
               
                    <SiteButton
                        text="Вхід"
                        action={onAuthClick}
                        buttonType={isFormValid ? ButtonTypes.Red : ButtonTypes.White}
                    />


            </div>
        </div>
    </>
}

function Profile() {
    const { user, setUser, request, setBusy, showToast } = useContext(AppContext);
    const [timeLeft, setTimeLeft] = useState<string>("");
const [authTestResult, setAuthTestResult] = useState<string>("");
    const exitAuth = () => {
        window.localStorage.removeItem("user-231");
        setUser(null);
    };
const testToken = (authorizationValue?: string) => {
    setBusy(true);

    const headers: HeadersInit = {};
    if (authorizationValue) {
        headers["Authorization"] = authorizationValue;
    }

    request("https://localhost:7015/User/TestAuth", {
        method: "GET",
        headers
    })
        .then(r => r.json())
        .then(j => {
            const message = `status: ${j.status}; ${j.data}`;
            setAuthTestResult(message);

            if (j.status == 200) {
                showToast({ message: "Токен перевірено успішно" });
            }
            else {
                showToast({ message: "Помилка авторизації: " + j.data });
            }
        })
        .catch(err => {
            setAuthTestResult("Fetch error: " + err);
            showToast({ message: "Помилка запиту до бекенду" });
        })
        .finally(() => {
            setBusy(false);
        });
};
const testValidToken = () => {
    testToken("Bearer " + user?.token);
};

const testTokenWithoutDots = () => {
    testToken("Bearer invalid_token_without_dots");
};

const testTokenWithWrongSignature = () => {
    if (!user?.token) return;

    const parts = user.token.split('.');
    if (parts.length < 3) {
        testToken("Bearer broken.token");
        return;
    }

    parts[2] = parts[2] + "123";
    testToken("Bearer " + parts.join('.'));
};

const testTokenWithWrongScheme = () => {
    testToken("Basic " + user?.token);
};

const testMissingAuthorization = () => {
    setBusy(true);

    fetch("https://localhost:7015/User/TestAuth", {
        method: "GET"
    })
        .then(r => r.json())
        .then(j => {
            const message = `status: ${j.status}; ${j.data}`;
            setAuthTestResult(message);
            showToast({ message: "Відповідь бекенда: " + j.data });
        })
        .catch(err => {
            setAuthTestResult("Fetch error: " + err);
            showToast({ message: "Помилка запиту до бекенду" });
        })
        .finally(() => {
            setBusy(false);
        });
};
    useEffect(() => {
        if (!user) return;

        const updateTimer = () => {
            const nowTicks = Date.now() * 10000;
            const diffTicks = user.exp - nowTicks;

            if (diffTicks <= 0) {
                window.localStorage.removeItem("user-231");
                setUser(null);
                return;
            }

            const diffMs = Math.floor(diffTicks / 10000);
            const totalSeconds = Math.floor(diffMs / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;

            setTimeLeft(
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            );
        };

        updateTimer();
        const intervalId = setInterval(updateTimer, 1000);

        return () => clearInterval(intervalId);
    }, [user, setUser]);

    return <>
        <h1 className="display-4 text-center">Profile page</h1>
        <div className="row">
            <div className="col col-6 offset-3 text-center p-3">
                <div className="row">
                    <div className="col col-4 offset-4">
                        <img src={user?.imageUrl} alt={user?.login} className="w-100 round" />
                    </div>
                </div>

                <h2 className="display-5 mb-4">{user?.name}</h2>

                <div className="row text-start">
                    <div className="col col-3 offset-2">Login</div>
                    <div className="col col-5">{user?.login}</div>
                    <div className="col col-1"><i className="bi bi-pencil"></i></div>
                </div>
                <div className="row text-start">
                    <div className="col col-3 offset-2">Name</div>
                    <div className="col col-5">{user?.name}</div>
                    <div className="col col-1"><i className="bi bi-pencil"></i></div>
                </div>
                <div className="row text-start">
                    <div className="col col-3 offset-2">Email</div>
                    <div className="col col-5">{user?.email}</div>
                    <div className="col col-1"><i className="bi bi-pencil"></i></div>
                </div>
                <div className="row text-start">
                    <div className="col col-3 offset-2">Date of birth</div>
                    <div className="col col-5">{user?.dob}</div>
                    <div className="col col-1"><i className="bi bi-pencil"></i></div>
                </div>
                <div className="row text-start">
                    <div className="col col-3 offset-2">Address</div>
                    <div className="col col-5">{user?.address}</div>
                    <div className="col col-1"><i className="bi bi-pencil"></i></div>
                </div>

                <div className="row text-start mt-3">
                    <div className="col col-3 offset-2">Token time left</div>
                    <div className="col col-5">{timeLeft}</div>
                    <div className="col col-1"><i className="bi bi-clock"></i></div>
                </div>
<div className="row mt-4">
    <div className="col col-10 offset-1">
        <h4 className="text-center mb-3">Перевірка авторизаційних даних</h4>

        <div className="row mb-2">
            <div className="col col-6">
                <SiteButton
                    text="Перевірити правильний токен"
                    buttonType={ButtonTypes.White}
                    action={testValidToken}
                />
            </div>
            <div className="col col-6">
                <SiteButton
                    text="Без Authorization"
                    buttonType={ButtonTypes.White}
                    action={testMissingAuthorization}
                />
            </div>
        </div>

        <div className="row mb-2">
            <div className="col col-6">
                <SiteButton
                    text="Токен без крапок"
                    buttonType={ButtonTypes.White}
                    action={testTokenWithoutDots}
                />
            </div>
            <div className="col col-6">
                <SiteButton
                    text="Неправильна схема"
                    buttonType={ButtonTypes.White}
                    action={testTokenWithWrongScheme}
                />
            </div>
        </div>

        <div className="row mb-3">
            <div className="col col-12">
                <SiteButton
                    text="Пошкоджений підпис"
                    buttonType={ButtonTypes.White}
                    action={testTokenWithWrongSignature}
                />
            </div>
        </div>

        <div className="alert alert-secondary text-start">
            <strong>Відповідь бекенда:</strong><br />
            {authTestResult || "Ще немає відповіді"}
        </div>
    </div>
</div>
                <div className="row mt-5">
                    <div className="col col-4 offset-4">
                        <div className="row">
                            <SiteButton
                                text="Вихід"
                                buttonType={ButtonTypes.Red}
                                action={exitAuth}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}