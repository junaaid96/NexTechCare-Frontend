export default async function getAllContactTexts(token) {
    const res = await fetch(
        "https://nextechcare-backend.onrender.com/contacts/",
        { 
            cache: "no-store",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
    return res.json();
}