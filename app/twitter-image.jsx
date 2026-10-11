import { ImageResponse } from "next/og";

export const alt = "NexTechCare: technology support, triaged by AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
    return new ImageResponse(
        (
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#060a13", color: "#e8edf6" }}>
                <div style={{ display: "flex", fontSize: 96, fontWeight: 800, letterSpacing: -3 }}>
                    NexTech
                    <span style={{ backgroundImage: "linear-gradient(100deg,#4f8cff,#22d3ee)", backgroundClip: "text", color: "transparent" }}>Care</span>
                </div>
                <div style={{ marginTop: 24, fontSize: 40, color: "#8b97ab" }}>Tech problems, diagnosed in seconds. Fixed by people you can trust.</div>
            </div>
        ),
        size
    );
}
