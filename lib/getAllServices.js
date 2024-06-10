export default async function getAllServices() {
    const res = await fetch(
        "https://nextechcare-backend.onrender.com/services/",
        { cache: "no-store" }
    );
    return res.json();
}
