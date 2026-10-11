export function AreaChart({ data, height = 160 }) {
    if (!data?.length) return null;
    const max = Math.max(1, ...data.map((d) => d.value));
    const w = 600;
    const pts = data.map((d, i) => [(i / (data.length - 1 || 1)) * w, height - 12 - (d.value / max) * (height - 28)]);
    const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
    return (
        <svg viewBox={`0 0 ${w} ${height}`} className="h-40 w-full" preserveAspectRatio="none" role="img" aria-label="Bookings trend">
            <defs>
                <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--brand)" stopOpacity="0.35" />
                    <stop offset="1" stopColor="var(--brand)" stopOpacity="0" />
                </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((f) => (
                <line key={f} x1="0" x2={w} y1={height * f} y2={height * f} stroke="var(--line)" strokeDasharray="4 6" />
            ))}
            <path d={`${line} L${w},${height} L0,${height} Z`} fill="url(#area)" />
            <path d={line} fill="none" stroke="var(--brand)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        </svg>
    );
}

export function BarList({ items }) {
    const max = Math.max(1, ...items.map((i) => i.value));
    return (
        <ul className="space-y-2.5">
            {items.map((i) => (
                <li key={i.label} className="text-sm">
                    <div className="mb-1 flex justify-between">
                        <span className="text-muted">{i.label}</span>
                        <span className="font-medium tabular-nums">{i.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-surface-2">
                        <div className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2" style={{ width: `${(i.value / max) * 100}%` }} />
                    </div>
                </li>
            ))}
        </ul>
    );
}
