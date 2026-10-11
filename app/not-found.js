import { Button } from "@/components/ui";
import { Logo } from "@/components/Brand";

export default function NotFound() {
    return (
        <div className="grid min-h-dvh place-items-center px-6 text-center">
            <div>
                <Logo />
                <p className="mt-6 font-display text-6xl font-extrabold text-gradient">404</p>
                <p className="mt-2 text-muted">This page went offline. Let&apos;s get you back.</p>
                <Button href="/" className="mt-6">Back to home</Button>
            </div>
        </div>
    );
}
