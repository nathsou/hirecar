import React from "react";
import { Link } from 'react-router-dom';

export default function Logo() {
    return (
        <Link to="/">
            <span className="logo">
                Hire<span className="logo-light">Car</span>
            </span>
        </Link>

    );
}