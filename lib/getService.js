export default async function getService({ id }) {
    const res = await fetch(
        `https://nextechcare-backend.onrender.com/services/${id}/`,
        { cache: "no-store" }
    );
    return res.json();
}
