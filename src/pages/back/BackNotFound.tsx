import { Link } from "react-router-dom";

export default function BackNotFound() {
    return (
        <div className="text-center mt-5">
            <h1 className="display-1">404</h1>

            <h2>Сторінку не знайдено</h2>

            <p>
                Такого маршруту в адміністративній частині не існує.
            </p>

            <Link to="/back" className="btn btn-primary mt-3">
                До адміністративної сторінки
            </Link>
        </div>
    );
}