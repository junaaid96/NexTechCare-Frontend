// All admin approved services only

export default async function getAllServices() {
    const res = await fetch(
        "https://nextechcare-backend.onrender.com/services/?admin_approved=True",
        { cache: "no-store" }
    );
    return res.json();
}

// All pending services only
export async function getAllPendingServices() {
    const res = await fetch(
        "https://nextechcare-backend.onrender.com/services/?admin_approved=False",
        { cache: "no-store" }
    );
    return res.json();
}
