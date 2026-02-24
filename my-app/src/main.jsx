import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

/* ─── Glass utility ─── */
const glass = (a = 0.09, b = 28) => ({
    background: `rgba(255,255,255,${a})`,
    backdropFilter: `blur(${b}px) saturate(160%)`,
    WebkitBackdropFilter: `blur(${b}px) saturate(160%)`,
    border: "1px solid rgba(255,255,255,0.18)",
    boxShadow: "0 4px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.28)",
});

/* ─── Background — monochrome grid + white orb ─── */
const Background = () => (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, background: "#080809" }} />
        <div
            style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
            }}
        />
        <div
            style={{
                position: "absolute",
                width: 900,
                height: 600,
                top: "-20%",
                left: "50%",
                transform: "translateX(-50%)",
                borderRadius: "50%",
                background:
                    "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.07) 0%, transparent 65%)",
                filter: "blur(40px)",
                animation: "breathe 10s ease-in-out infinite",
            }}
        />
        <div
            style={{
                position: "absolute",
                width: "100%",
                height: 200,
                bottom: 0,
                background: "linear-gradient(to top, rgba(255,255,255,0.025), transparent)",
            }}
        />
        <style>{`@keyframes breathe { 0%,100%{opacity:0.6;transform:translateX(-50%) scale(1)} 50%{opacity:1;transform:translateX(-50%) scale(1.08)} }`}</style>
    </div>
);

/* ─── Floating particles ─── */
const Particles = () => {
    const pts = Array.from({ length: 20 }, (_, i) => ({
        x: (i * 37 + 11) % 100,
        y: (i * 53 + 7) % 100,
        s: 0.6 + (i % 3) * 0.7,
        dur: 9 + (i % 5) * 3,
        del: -(i * 2.3),
        k: i % 4,
    }));
    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
                overflow: "hidden",
            }}
        >
            {pts.map((p, i) => (
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.s,
                        height: p.s,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.45)",
                        animation: `pd${p.k} ${p.dur}s ${p.del}s ease-in-out infinite`,
                    }}
                />
            ))}
            <style>{`
        @keyframes pd0{0%,100%{transform:translate(0,0);opacity:.6}50%{transform:translate(18px,-38px);opacity:.15}}
        @keyframes pd1{0%,100%{transform:translate(0,0);opacity:.5}50%{transform:translate(-28px,-48px);opacity:.1}}
        @keyframes pd2{0%,100%{transform:translate(0,0);opacity:.7}50%{transform:translate(14px,-32px);opacity:.2}}
        @keyframes pd3{0%,100%{transform:translate(0,0);opacity:.4}50%{transform:translate(-22px,-42px);opacity:.08}}
      `}</style>
        </div>
    );
};

/* ─── Glass Card ─── */
const GlassCard = ({ children, style = {}, hover = true, onClick }) => {
    const [h, setH] = useState(false);
    return (
        <div
            onClick={onClick}
            onMouseEnter={() => hover && setH(true)}
            onMouseLeave={() => hover && setH(false)}
            style={{
                ...glass(h ? 0.14 : 0.08, h ? 32 : 24),
                borderRadius: 20,
                transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                transform: h ? "translateY(-3px)" : "translateY(0)",
                cursor: hover ? "pointer" : "default",
                position: "relative",
                ...style,
            }}
        >
            {children}
        </div>
    );
};

/* ─── Nav pill ─── */
const Nav = ({ active, setActive }) => {
    const items = ["News", "About", "Projects", "Support"];
    return (
        <nav
            style={{
                position: "fixed",
                top: 26,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1000,
                display: "flex",
                gap: 2,
                padding: "5px 6px",
                borderRadius: 100,
                ...glass(0.12, 40),
            }}
        >
            {items.map((item) => (
                <button
                    key={item}
                    onClick={() => setActive(item)}
                    style={{
                        background: active === item ? "rgba(255,255,255,0.18)" : "transparent",
                        border: "none",
                        outline:
                            active === item
                                ? "1px solid rgba(255,255,255,0.22)"
                                : "1px solid transparent",
                        color: active === item ? "#fff" : "rgba(255,255,255,0.48)",
                        borderRadius: 100,
                        padding: "9px 22px",
                        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        cursor: "pointer",
                        letterSpacing: "0.01em",
                        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                        boxShadow:
                            active === item
                                ? "inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 12px rgba(0,0,0,0.3)"
                                : "none",
                    }}
                >
                    {item}
                </button>
            ))}
        </nav>
    );
};

/* ─── Marquee ticker ─── */
const Marquee = () => {
    const seg = [
        "✦ multidisciplinary creator",
        "⬡ clean visuals",
        "◈ functional design",
        "✦ digital experiences",
        "⬡ chlvk.com",
        "◈ open to work",
    ];
    const txt = [...seg, ...seg].join("   —   ");
    return (
        <div
            style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                padding: "10px 0",
                marginBottom: 40,
            }}
        >
            <span
                style={{
                    display: "inline-block",
                    animation: "marquee 24s linear infinite",
                    fontFamily: "-apple-system, sans-serif",
                    fontSize: "0.74rem",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.28)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                }}
            >
                {txt}
            </span>
            <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
        </div>
    );
};

/* ─── NEWS ─── */
const NewsSection = () => {
    return (
        <section style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 4 }}>
                <h2
                    style={{
                        fontFamily: "-apple-system, sans-serif",
                        fontSize: "clamp(1.8rem,4vw,2.6rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.03em",
                        color: "#fff",
                        margin: 0,
                    }}
                >
                    Latest News
                </h2>
            </div>

            <GlassCard hover={false} style={{ padding: "22px 26px" }}>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 1,
                        background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)",
                        borderRadius: "20px 20px 0 0",
                    }}
                />
                <div
                    style={{
                        paddingTop: 10,
                    }}
                >
                    <p
                        style={{
                            color: "rgba(255,255,255,0.52)",
                            fontSize: "0.9rem",
                            lineHeight: 1.7,
                            margin: 0,
                        }}
                    >
                        No public updates just yet. New launches, tools, and experiments will appear
                        here as they go live.
                    </p>
                </div>
            </GlassCard>
        </section>
    );
};

/* ─── ABOUT ─── */
const AboutSection = () => {
    const [hovSocial, setHovSocial] = useState(null);
    const socials = [
        {
            name: "X",
            href: "https://x.com/shvde12",
            style: { background: "#0f0f0f", border: "2px solid rgba(255,255,255,0.25)" },
        },
        {
            name: "Instagram",
            href: "https://instagram.com/chelovekart",
            style: {
                background: "linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)",
                border: "2px solid transparent",
            },
        },
        {
            name: "Telegram",
            href: "https://t.me/srytn",
            style: { background: "#0088cc", border: "2px solid transparent" },
        },
        {
            name: "GitHub",
            href: "https://github.com/chelovekeo",
            style: { background: "#1a1a1a", border: "2px solid rgba(255,255,255,0.15)" },
        },
    ];
    const stats = [
        { label: "Projects", val: "2+" },
        { label: "Repos", val: "4+" },
        { label: "Since", val: "2025" },
    ];
    return (
        <section>
            <h2
                style={{
                    fontFamily: "-apple-system, sans-serif",
                    fontSize: "clamp(1.8rem,4vw,2.6rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: "#fff",
                    marginBottom: 20,
                }}
            >
                About Me
            </h2>
            <GlassCard hover={false} style={{ padding: "28px 30px", marginBottom: 16 }}>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 1,
                        background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
                        borderRadius: "20px 20px 0 0",
                    }}
                />
                <p
                    style={{
                        color: "rgba(255,255,255,0.58)",
                        fontSize: "1.02rem",
                        lineHeight: 1.75,
                        margin: "0 0 24px",
                        maxWidth: 520,
                    }}
                >
                    Independent engineer and designer building lean digital products, interfaces,
                    and tools. I care about clear systems, fast performance, and details that make
                    products feel trustworthy. Currently exploring small utilities, automation, and
                    visual experiments around productivity.
                </p>
                <div
                    style={{
                        display: "flex",
                        gap: 0,
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        paddingTop: 20,
                    }}
                >
                    {stats.map((s, i) => (
                        <div
                            key={i}
                            style={{
                                flex: 1,
                                textAlign: "center",
                                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "-apple-system, sans-serif",
                                    fontSize: "1.6rem",
                                    fontWeight: 700,
                                    color: "#fff",
                                    letterSpacing: "-0.03em",
                                }}
                            >
                                {s.val}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.7rem",
                                    color: "rgba(255,255,255,0.32)",
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    marginTop: 3,
                                }}
                            >
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </GlassCard>

            {/* Original-style social pill buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                {socials.map((s, i) => (
                    <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        onMouseEnter={() => setHovSocial(i)}
                        onMouseLeave={() => setHovSocial(null)}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 130,
                            height: 45,
                            borderRadius: 25,
                            color: "#fff",
                            fontWeight: 500,
                            fontFamily: "-apple-system, sans-serif",
                            fontSize: "0.9rem",
                            textDecoration: "none",
                            ...s.style,
                            transition:
                                "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease, filter 0.28s ease",
                            transform: hovSocial === i ? "scale(1.1) translateY(-2px)" : "scale(1)",
                            boxShadow: hovSocial === i ? "0 8px 24px rgba(0,0,0,0.5)" : "none",
                            filter: hovSocial === i ? "brightness(1.15)" : "brightness(1)",
                        }}
                    >
                        {s.name}
                    </a>
                ))}
            </div>
        </section>
    );
};

/* ─── PROJECTS ─── */
const ProjectsSection = () => {
    const projects = [
        {
            title: "Mentor AI",
            desc: "Similarity-based mentor AI — evaluates question-answer relevance with lightweight NLP.",
            date: "Oct 20, 2025",
            href: "https://github.com/shvde12/MENTOR-AI",
            tags: ["NLP", "Python", "AI"],
            num: "01",
        },
        {
            title: "chlvk.com",
            desc: "The portfolio you're currently exploring — minimal, fast, design-focused.",
            date: "Oct 15, 2025",
            href: null,
            tags: ["React", "Design", "Web"],
            num: "02",
        },
        {
            title: "Taskflow",
            desc: "Telegram bot for structuring and tracking tasks in compact flows.",
            date: "Jan 2, 2026",
            href: null,
            tags: ["Telegram bot", "Productivity"],
            num: "03",
        },
    ];
    return (
        <section>
            <h2
                style={{
                    fontFamily: "-apple-system, sans-serif",
                    fontSize: "clamp(1.8rem,4vw,2.6rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: "#fff",
                    marginBottom: 20,
                }}
            >
                Projects
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {projects.map((p) => {
                    const card = (
                        <GlassCard style={{ padding: "22px 26px 20px" }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
                                <span
                                    style={{
                                        fontFamily: "-apple-system, sans-serif",
                                        fontSize: "0.68rem",
                                        fontWeight: 700,
                                        color: "rgba(255,255,255,0.18)",
                                        letterSpacing: "0.1em",
                                        marginTop: 4,
                                        flexShrink: 0,
                                        width: 22,
                                    }}
                                >
                                    {p.num}
                                </span>
                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            marginBottom: 8,
                                            flexWrap: "wrap",
                                            gap: 8,
                                        }}
                                    >
                                        <h3
                                            style={{
                                                fontFamily: "-apple-system, sans-serif",
                                                fontSize: "1.12rem",
                                                fontWeight: 700,
                                                color: "#fff",
                                                margin: 0,
                                                letterSpacing: "-0.02em",
                                            }}
                                        >
                                            {p.title}
                                        </h3>
                                        <span
                                            style={{
                                                color: "rgba(255,255,255,0.2)",
                                                fontSize: "0.75rem",
                                            }}
                                        >
                                            {p.date}
                                        </span>
                                    </div>
                                    <p
                                        style={{
                                            color: "rgba(255,255,255,0.48)",
                                            fontSize: "0.875rem",
                                            lineHeight: 1.6,
                                            margin: "0 0 14px",
                                        }}
                                    >
                                        {p.desc}
                                    </p>
                                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                        {p.tags.map((t) => (
                                            <span
                                                key={t}
                                                style={{
                                                    ...glass(0.1, 10),
                                                    borderRadius: 100,
                                                    padding: "3px 11px",
                                                    fontSize: "0.68rem",
                                                    fontWeight: 600,
                                                    color: "rgba(255,255,255,0.5)",
                                                    letterSpacing: "0.04em",
                                                }}
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {p.href && (
                                    <span
                                        style={{
                                            color: "rgba(255,255,255,0.22)",
                                            fontSize: "1.1rem",
                                            flexShrink: 0,
                                            marginTop: 2,
                                        }}
                                    >
                                        ↗
                                    </span>
                                )}
                            </div>
                        </GlassCard>
                    );
                    return p.href ? (
                        <a
                            key={p.num}
                            href={p.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            style={{ textDecoration: "none" }}
                        >
                            {card}
                        </a>
                    ) : (
                        <div key={p.num}>{card}</div>
                    );
                })}
            </div>
        </section>
    );
};

/* ─── SUPPORT ─── */
const SupportSection = () => {
    const [copied, setCopied] = useState(null);
    const wallets = [
        { name: "USDT", network: "TRC-20", address: "TXNjL6StxNgazhvmMBAx7Am2DFg2MM6aC4" },
        { name: "SOL", network: "Solana", address: "8U6yGSRHgKyAMk9cj5Eo8uPFySTucHecJF7Mu8oUgXmP" },
        {
            name: "MATIC",
            network: "Polygon",
            address: "0x9BfC91F305ef73Ccf0626e86FA71353337bC11d1",
        },
    ];
    const copy = async (addr, i) => {
        try {
            await navigator.clipboard.writeText(addr);
            setCopied(i);
            setTimeout(() => setCopied(null), 2000);
        } catch {
            setCopied({ error: i });
            setTimeout(() => setCopied(null), 2000);
        }
    };
    return (
        <section>
            <h2
                style={{
                    fontFamily: "-apple-system, sans-serif",
                    fontSize: "clamp(1.8rem,4vw,2.6rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: "#fff",
                    marginBottom: 8,
                }}
            >
                Support
            </h2>
            <p
                style={{
                    color: "rgba(255,255,255,0.38)",
                    fontSize: "0.95rem",
                    marginBottom: 22,
                    lineHeight: 1.65,
                }}
            >
                Every contribution fuels new ideas, tools, and visuals.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {wallets.map((w, i) => (
                    <GlassCard
                        key={w.address}
                        onClick={() => copy(w.address, i)}
                        style={{ padding: "18px 22px" }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 16,
                                flexWrap: "wrap",
                            }}
                        >
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        marginBottom: 5,
                                    }}
                                >
                                    <span
                                        style={{
                                            fontFamily: "-apple-system, sans-serif",
                                            fontWeight: 700,
                                            color: "#fff",
                                            fontSize: "0.95rem",
                                        }}
                                    >
                                        {w.name}
                                    </span>
                                    <span
                                        style={{
                                            ...glass(0.1, 10),
                                            borderRadius: 100,
                                            padding: "2px 9px",
                                            fontSize: "0.66rem",
                                            fontWeight: 600,
                                            color: "rgba(255,255,255,0.4)",
                                            letterSpacing: "0.07em",
                                        }}
                                    >
                                        {w.network}
                                    </span>
                                </div>
                                <span
                                    style={{
                                        fontFamily: "ui-monospace, 'SF Mono', monospace",
                                        fontSize: "0.74rem",
                                        color: "rgba(255,255,255,0.3)",
                                        wordBreak: "break-all",
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {w.address}
                                </span>
                            </div>
                            <div
                                style={{
                                    flexShrink: 0,
                                    background:
                                        copied === i || copied?.error === i
                                            ? "rgba(255,255,255,0.15)"
                                            : "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    borderRadius: 10,
                                    padding: "8px 16px",
                                    fontFamily: "-apple-system, sans-serif",
                                    fontSize: "0.8rem",
                                    color: copied === i || copied?.error === i ? "#fff" : "rgba(255,255,255,0.4)",
                                    transition: "all 0.3s ease",
                                    minWidth: 70,
                                    textAlign: "center",
                                }}
                            >
                                {copied === i ? "✓ Copied" : copied?.error === i ? "Unavailable" : "Copy"}
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </section>
    );
};

/* ─── APP ─── */
export default function App() {
    const [active, setActive] = useState("News");
    const [mounted, setMounted] = useState(false);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        setTimeout(() => setMounted(true), 80);
    }, []);

    const switchTab = (tab) => {
        if (tab === active) return;
        setFading(true);
        setTimeout(() => {
            setActive(tab);
            setFading(false);
        }, 200);
    };

    const sections = {
        News: <NewsSection />,
        About: <AboutSection />,
        Projects: <ProjectsSection />,
        Support: <SupportSection />,
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
            }}
        >
            <Background />
            <Particles />
            <Nav active={active} setActive={switchTab} />

            <main
                style={{
                    position: "relative",
                    zIndex: 1,
                    maxWidth: 680,
                    margin: "0 auto",
                    padding: "102px 20px 72px",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Hero */}
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: 48,
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "none" : "translateY(24px)",
                        transition:
                            "opacity 0.9s ease, transform 0.9s cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                >
                    <div
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            ...glass(0.12, 30),
                            margin: "0 auto 18px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.8rem",
                            animation: "avatarGlow 5s ease-in-out infinite",
                        }}
                    >
                        ✦
                    </div>
                    <h1
                        style={{
                            fontSize: "clamp(3rem,9vw,5.5rem)",
                            fontWeight: 800,
                            letterSpacing: "-0.045em",
                            color: "#fff",
                            margin: "0 0 10px",
                            lineHeight: 0.95,
                            textShadow: "0 0 60px rgba(255,255,255,0.1)",
                        }}
                    >
                        @chlvk
                    </h1>
                    <p
                        style={{
                            color: "rgba(255,255,255,0.32)",
                            fontSize: "0.87rem",
                            letterSpacing: "0.2em",
                            fontWeight: 400,
                            textTransform: "uppercase",
                        }}
                    >
                        Creator · Developer · Designer
                    </p>
                </div>

                {/* Marquee */}
                <div style={{ opacity: mounted ? 1 : 0, transition: "opacity 1s ease 0.3s" }}>
                    <Marquee />
                </div>

                {/* Content */}
                <div
                    style={{
                        flex: 1,
                        opacity: mounted && !fading ? 1 : 0,
                        transform: fading ? "translateY(6px)" : "translateY(0)",
                        transition: "opacity 0.25s ease, transform 0.25s ease",
                    }}
                >
                    {sections[active]}
                </div>

            </main>

            <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{margin:0;background:#080809;scroll-behavior:smooth}
        @keyframes avatarGlow{
          0%,100%{box-shadow:0 0 40px rgba(255,255,255,0.08),inset 0 1px 0 rgba(255,255,255,0.3)}
          50%{box-shadow:0 0 60px rgba(255,255,255,0.14),inset 0 1px 0 rgba(255,255,255,0.4)}
        }
      `}</style>
        </div>
    );
}

const el = document.getElementById("root");
if (el) {
    const root = createRoot(el);
    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    );
}
