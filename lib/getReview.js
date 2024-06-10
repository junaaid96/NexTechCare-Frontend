export default async function getReview({ id }) {
    const res = await fetch(
        `https://nextechcare-backend.onrender.com/reviews/${id}/`,
        { cache: "no-store" }
    );
    return res.json();
}
