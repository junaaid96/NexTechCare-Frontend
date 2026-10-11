import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", weight: ["600", "700", "800"], display: "swap" });

export const metadata = {
    metadataBase: new URL("https://nextechcare.netlify.app"),
    title: { default: "NexTechCare — Technology support, triaged by AI", template: "%s · NexTechCare" },
    description:
        "Describe your tech problem, get instant AI triage, and book a verified engineer for software, hardware, networking, cybersecurity, data recovery and more. Live SLA tracking on every job.",
    authors: [{ name: "CodeJBorg", url: "https://junaidul.pro.bd/codejborg" }],
    creator: "CodeJBorg",
    openGraph: { title: "NexTechCare", siteName: "NexTechCare", description: "Technology support marketplace with AI triage and live SLA tracking.", type: "website" },
};

export const viewport = { themeColor: "#060a13" };

const themeScript = `try{var t=localStorage.getItem('ntc_theme');if(t!=='light')document.documentElement.classList.add('dark')}catch(e){document.documentElement.classList.add('dark')}`;

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} ${jakarta.variable}`} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body className="min-h-dvh font-sans">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
