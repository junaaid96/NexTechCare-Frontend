export default async function filterServicesByCustomer(customer) {
    const res = await fetch(
        `https://nextechcare-backend.onrender.com/services/?customer=${customer}`,
        { cache: "no-store" }
    );
    const data = await res.json();
    return data;
}
