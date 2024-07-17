'use client';
import ReactStars from "react-rating-stars-component";
export default function Rating({ rating }: { rating: Number; }) {
    return (
        <ReactStars
            value={rating}
            size={24}
            edit={false}
            activeColor="#ffd700"
        />
    );
}
