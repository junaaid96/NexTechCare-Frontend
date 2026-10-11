import {
    AppWindow, Cpu, Lightbulb, HardDriveDownload, Wifi, ShieldCheck,
    CloudUpload, MonitorSmartphone, House, Headset,
} from "lucide-react";

export const CATEGORIES = [
    { key: "software", label: "Software Support", icon: AppWindow, blurb: "Crashes, installs, updates, licensing", hue: "from-sky-500/20 to-sky-500/0 text-sky-400" },
    { key: "hardware", label: "Hardware Repair", icon: Cpu, blurb: "Laptops, desktops, printers, parts", hue: "from-orange-500/20 to-orange-500/0 text-orange-400" },
    { key: "consultancy", label: "IT Consultancy", icon: Lightbulb, blurb: "Planning, audits, buying advice", hue: "from-amber-500/20 to-amber-500/0 text-amber-400" },
    { key: "data_recovery", label: "Data Recovery", icon: HardDriveDownload, blurb: "Lost files, failed drives, RAID", hue: "from-rose-500/20 to-rose-500/0 text-rose-400" },
    { key: "networking", label: "Networking & Wi-Fi", icon: Wifi, blurb: "Routers, mesh, VPN, slow internet", hue: "from-cyan-500/20 to-cyan-500/0 text-cyan-400" },
    { key: "cybersecurity", label: "Cybersecurity", icon: ShieldCheck, blurb: "Malware, hacked accounts, hardening", hue: "from-emerald-500/20 to-emerald-500/0 text-emerald-400" },
    { key: "cloud_backup", label: "Cloud & Backup", icon: CloudUpload, blurb: "Migrations, sync, backup plans", hue: "from-indigo-500/20 to-indigo-500/0 text-indigo-400" },
    { key: "device_setup", label: "Device Setup", icon: MonitorSmartphone, blurb: "New devices, data transfer, setup", hue: "from-violet-500/20 to-violet-500/0 text-violet-400" },
    { key: "smart_home", label: "Smart Home & IoT", icon: House, blurb: "CCTV, smart TV, assistants, IoT", hue: "from-lime-500/20 to-lime-500/0 text-lime-400" },
    { key: "remote_support", label: "Remote Support", icon: Headset, blurb: "Fast fixes over a secure session", hue: "from-fuchsia-500/20 to-fuchsia-500/0 text-fuchsia-400" },
];

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));
export const categoryOf = (key) => CATEGORY_MAP[key] || CATEGORY_MAP.software;
