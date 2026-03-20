import { useState, useEffect, useRef } from "react";

// ─── Router (hash-based, no library needed) ─────────────────────────────────
function useRoute() {
  const [route, setRoute] = useState(window.location.hash || "#/");
  useEffect(() => {
    const handler = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return route;
}
function navigate(path) {
  window.location.hash = path;
}

// ─── Design Tokens ──────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --blue: #2563eb;
    --blue-dark: #1d4ed8;
    --blue-light: #eff6ff;
    --blue-mid: #bfdbfe;
    --blue-600: #1e40af;
    --green: #10b981;
    --green-light: #ecfdf5;
    --amber: #f59e0b;
    --amber-light: #fffbeb;
    --red: #ef4444;
    --red-light: #fef2f2;
    --gray-50: #f8fafc;
    --gray-100: #f1f5f9;
    --gray-200: #e2e8f0;
    --gray-400: #94a3b8;
    --gray-500: #64748b;
    --gray-700: #334155;
    --gray-900: #0f172a;
    --white: #ffffff;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: var(--gray-50);
    color: var(--gray-900);
    min-height: 100vh;
  }

  h1,h2,h3,h4,h5 { font-family: 'Poppins', sans-serif; }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* NAV */
  .nav {
    background: var(--white);
    border-bottom: 1px solid var(--gray-200);
    padding: 0 1.5rem;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 8px rgba(37,99,235,0.07);
  }
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    text-decoration: none;
  }
  .nav-logo-icon {
    width: 36px; height: 36px;
    background: var(--blue);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    color: white;
    font-size: 18px;
  }
  .nav-logo-text {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 1.2rem;
    color: var(--blue);
  }
  .nav-logo-text span { color: var(--gray-700); font-weight: 400; font-size: 0.75rem; display: block; line-height: 1; }
  .nav-links { display: flex; gap: 0.25rem; align-items: center; }
  .nav-link {
    padding: 0.4rem 0.9rem;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--gray-500);
    cursor: pointer;
    transition: all 0.18s;
    border: none; background: none;
    font-family: 'Inter', sans-serif;
  }
  .nav-link:hover { background: var(--blue-light); color: var(--blue); }
  .nav-link.active { background: var(--blue-light); color: var(--blue); font-weight: 600; }
  .nav-cta {
    background: var(--blue);
    color: white !important;
    padding: 0.4rem 1rem !important;
  }
  .nav-cta:hover { background: var(--blue-dark) !important; color: white !important; }

  /* MAIN */
  .main { flex: 1; }

  /* HERO */
  .hero {
    background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #2563eb 100%);
    color: white;
    padding: 5rem 1.5rem 4rem;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  .hero-inner { max-width: 900px; margin: 0 auto; position: relative; text-align: center; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    padding: 0.35rem 1rem;
    border-radius: 100px;
    font-size: 0.78rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
    backdrop-filter: blur(8px);
  }
  .hero-badge .dot { width: 6px; height: 6px; background: #4ade80; border-radius: 50%; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .hero h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }
  .hero h1 .accent { color: #60a5fa; }
  .hero p {
    font-size: 1.1rem;
    color: rgba(255,255,255,0.75);
    max-width: 560px;
    margin: 0 auto 2.5rem;
    line-height: 1.7;
  }
  .hero-btns { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
  .btn-primary {
    background: white; color: var(--blue);
    padding: 0.8rem 1.75rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.95rem;
    border: none; cursor: pointer;
    font-family: 'Poppins', sans-serif;
    transition: all 0.18s;
    box-shadow: 0 4px 14px rgba(0,0,0,0.2);
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.25); }
  .btn-outline {
    background: transparent; color: white;
    padding: 0.8rem 1.75rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.95rem;
    border: 1.5px solid rgba(255,255,255,0.4);
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    transition: all 0.18s;
  }
  .btn-outline:hover { border-color: white; background: rgba(255,255,255,0.08); }

  /* FEATURES STRIP */
  .features-strip {
    background: white;
    padding: 3.5rem 1.5rem;
    border-bottom: 1px solid var(--gray-100);
  }
  .features-strip h2 { text-align: center; font-size: 1.6rem; font-weight: 700; color: var(--gray-900); margin-bottom: 0.5rem; }
  .features-strip .sub { text-align: center; color: var(--gray-500); font-size: 0.95rem; margin-bottom: 2.5rem; }
  .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; max-width: 900px; margin: 0 auto; }
  .feature-card {
    background: var(--blue-light);
    border: 1px solid var(--blue-mid);
    border-radius: 16px;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.2s;
  }
  .feature-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(37,99,235,0.12); }
  .feature-icon {
    width: 52px; height: 52px;
    background: var(--blue);
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
    margin: 0 auto 1rem;
  }
  .feature-card h3 { font-size: 1rem; font-weight: 600; color: var(--gray-900); margin-bottom: 0.3rem; }
  .feature-card p { font-size: 0.83rem; color: var(--gray-500); line-height: 1.5; }

  /* HOW IT WORKS */
  .how { background: var(--gray-50); padding: 3.5rem 1.5rem; }
  .how h2 { text-align: center; font-size: 1.6rem; font-weight: 700; margin-bottom: 0.5rem; }
  .how .sub { text-align: center; color: var(--gray-500); font-size: 0.95rem; margin-bottom: 2.5rem; }
  .steps { display: flex; flex-wrap: wrap; gap: 0 1rem; justify-content: center; max-width: 800px; margin: 0 auto; position: relative; }
  .step { flex: 1 1 160px; max-width: 200px; text-align: center; padding: 1rem; }
  .step-num {
    width: 44px; height: 44px; background: var(--blue); color: white;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 1.1rem; margin: 0 auto 0.75rem;
    font-family: 'Poppins', sans-serif;
  }
  .step h4 { font-size: 0.9rem; font-weight: 600; margin-bottom: 0.3rem; }
  .step p { font-size: 0.78rem; color: var(--gray-500); }

  /* SECTION */
  .section { max-width: 960px; margin: 0 auto; padding: 2.5rem 1.25rem; }
  .section-title { font-size: 1.4rem; font-weight: 700; color: var(--gray-900); margin-bottom: 0.3rem; }
  .section-sub { font-size: 0.88rem; color: var(--gray-500); margin-bottom: 1.75rem; }

  /* CARD */
  .card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06);
    border: 1px solid var(--gray-100);
  }

  /* FORM */
  .form { display: flex; flex-direction: column; gap: 1rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  @media(max-width:540px) { .form-row { grid-template-columns: 1fr; } }
  .form-group { display: flex; flex-direction: column; gap: 0.35rem; }
  .form-label { font-size: 0.82rem; font-weight: 600; color: var(--gray-700); }
  .form-input {
    padding: 0.65rem 0.9rem;
    border-radius: 10px;
    border: 1.5px solid var(--gray-200);
    font-size: 0.88rem;
    font-family: 'Inter', sans-serif;
    color: var(--gray-900);
    transition: border-color 0.15s;
    background: white;
    outline: none;
  }
  .form-input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,0.08); }
  .form-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.75rem center; padding-right: 2rem; }

  .btn-blue {
    background: var(--blue); color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 12px; border: none;
    font-weight: 600; font-size: 0.9rem;
    font-family: 'Poppins', sans-serif;
    cursor: pointer; transition: all 0.18s;
    width: 100%;
  }
  .btn-blue:hover { background: var(--blue-dark); transform: translateY(-1px); }

  .btn-green {
    background: var(--green); color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 12px; border: none;
    font-weight: 600; font-size: 0.9rem;
    font-family: 'Poppins', sans-serif;
    cursor: pointer; transition: all 0.18s;
  }
  .btn-green:hover { background: #059669; }

  /* SCORE RING */
  .score-ring-wrap { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
  .score-label { font-size: 0.8rem; font-weight: 600; color: var(--gray-500); text-transform: uppercase; letter-spacing: 0.05em; }
  .score-value { font-family: 'Poppins', sans-serif; font-size: 3rem; font-weight: 800; color: var(--blue); line-height: 1; }
  .score-desc { font-size: 0.85rem; color: var(--gray-500); text-align: center; }

  /* BADGE */
  .badge {
    display: inline-flex; align-items: center; gap: 0.3rem;
    padding: 0.2rem 0.65rem; border-radius: 100px;
    font-size: 0.75rem; font-weight: 600;
  }
  .badge-blue { background: var(--blue-light); color: var(--blue); }
  .badge-green { background: var(--green-light); color: #065f46; }
  .badge-amber { background: var(--amber-light); color: #92400e; }
  .badge-red { background: var(--red-light); color: #991b1b; }

  /* PLANS */
  .plans-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; }
  .plan-card {
    background: white; border-radius: 20px; padding: 1.75rem;
    border: 2px solid var(--gray-100);
    position: relative; transition: all 0.2s;
    box-shadow: 0 1px 6px rgba(0,0,0,0.05);
  }
  .plan-card:hover { border-color: var(--blue); box-shadow: 0 8px 32px rgba(37,99,235,0.1); transform: translateY(-3px); }
  .plan-card.featured { border-color: var(--blue); box-shadow: 0 8px 32px rgba(37,99,235,0.15); }
  .plan-featured-badge {
    position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
    background: var(--blue); color: white;
    font-size: 0.72rem; font-weight: 700; padding: 0.2rem 0.85rem;
    border-radius: 100px; font-family: 'Poppins', sans-serif;
  }
  .plan-name { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.25rem; }
  .plan-price { font-size: 2rem; font-weight: 800; color: var(--blue); font-family: 'Poppins', sans-serif; }
  .plan-price span { font-size: 0.85rem; color: var(--gray-400); font-weight: 400; }
  .plan-coverage { font-size: 0.8rem; color: var(--gray-500); margin-bottom: 1rem; }
  .plan-features { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.25rem; }
  .plan-feature { display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.83rem; color: var(--gray-700); }
  .plan-feature .check { color: var(--green); font-size: 0.9rem; flex-shrink: 0; margin-top: 1px; }
  .plan-disclaimer { font-size: 0.72rem; color: var(--gray-400); text-align: center; margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--gray-100); }

  /* DASHBOARD */
  .dash-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
  @media(max-width:640px) { .dash-grid { grid-template-columns: 1fr; } }
  .dash-stat {
    background: white; border-radius: 16px; padding: 1.25rem 1.5rem;
    border: 1px solid var(--gray-100);
    box-shadow: 0 1px 6px rgba(0,0,0,0.05);
  }
  .dash-stat-label { font-size: 0.78rem; color: var(--gray-500); font-weight: 500; margin-bottom: 0.25rem; }
  .dash-stat-value { font-size: 1.6rem; font-weight: 800; font-family: 'Poppins', sans-serif; color: var(--gray-900); }
  .dash-stat-sub { font-size: 0.75rem; color: var(--gray-400); margin-top: 0.15rem; }

  /* STATUS CARD */
  .status-card {
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
    color: white; border-radius: 20px; padding: 1.75rem;
    position: relative; overflow: hidden;
  }
  .status-card::after {
    content: '🛡️';
    position: absolute; right: 1.25rem; top: 50%; transform: translateY(-50%);
    font-size: 4rem; opacity: 0.15;
  }
  .status-card-label { font-size: 0.78rem; font-weight: 600; opacity: 0.75; text-transform: uppercase; letter-spacing: 0.05em; }
  .status-card-title { font-size: 1.25rem; font-weight: 700; margin: 0.25rem 0; }
  .status-card-meta { font-size: 0.82rem; opacity: 0.8; }

  /* ALERT */
  .alert {
    display: flex; align-items: flex-start; gap: 0.75rem;
    padding: 1rem 1.25rem; border-radius: 12px;
    border: 1px solid; animation: slideIn 0.3s ease;
  }
  @keyframes slideIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
  .alert-rain { background: #eff6ff; border-color: #bfdbfe; }
  .alert-payout { background: var(--green-light); border-color: #a7f3d0; }
  .alert-icon { font-size: 1.3rem; flex-shrink: 0; }
  .alert-title { font-weight: 700; font-size: 0.9rem; margin-bottom: 0.15rem; }
  .alert-sub { font-size: 0.8rem; color: var(--gray-500); }
  .alert-payout .alert-title { color: #065f46; }

  /* TABLE */
  .table-wrap { overflow-x: auto; border-radius: 12px; border: 1px solid var(--gray-100); }
  table { width: 100%; border-collapse: collapse; font-size: 0.83rem; }
  th { background: var(--gray-50); padding: 0.65rem 1rem; text-align: left; font-weight: 600; color: var(--gray-500); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em; border-bottom: 1px solid var(--gray-100); }
  td { padding: 0.75rem 1rem; border-bottom: 1px solid var(--gray-50); color: var(--gray-700); vertical-align: middle; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: var(--gray-50); }

  /* ADMIN CHART BAR */
  .bar-chart { display: flex; flex-direction: column; gap: 0.75rem; }
  .bar-row { display: flex; align-items: center; gap: 0.75rem; }
  .bar-label { font-size: 0.78rem; color: var(--gray-600); width: 80px; flex-shrink: 0; }
  .bar-track { flex: 1; background: var(--blue-light); border-radius: 100px; height: 10px; overflow: hidden; }
  .bar-fill { height: 100%; background: var(--blue); border-radius: 100px; transition: width 1s ease; }
  .bar-val { font-size: 0.78rem; font-weight: 600; color: var(--gray-700); width: 36px; text-align: right; }

  /* TOAST */
  .toast-wrap { position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 999; display: flex; flex-direction: column; gap: 0.5rem; }
  .toast {
    background: var(--gray-900); color: white;
    padding: 0.75rem 1.25rem; border-radius: 12px;
    font-size: 0.85rem; font-weight: 500;
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    animation: slideIn 0.3s ease;
    display: flex; align-items: center; gap: 0.5rem;
  }

  /* MOBILE NAV */
  .mobile-nav {
    position: fixed; bottom: 0; left: 0; right: 0;
    background: white; border-top: 1px solid var(--gray-100);
    display: none; padding: 0.5rem 0.5rem;
    z-index: 100;
    box-shadow: 0 -4px 16px rgba(0,0,0,0.08);
  }
  .mobile-nav-inner { display: flex; justify-content: space-around; }
  .mobile-nav-item {
    display: flex; flex-direction: column; align-items: center; gap: 0.15rem;
    padding: 0.4rem 0.6rem; border-radius: 10px;
    color: var(--gray-400); cursor: pointer; transition: all 0.15s;
    border: none; background: none; font-family: 'Inter', sans-serif;
  }
  .mobile-nav-item.active { color: var(--blue); background: var(--blue-light); }
  .mobile-nav-item .icon { font-size: 1.2rem; }
  .mobile-nav-item .label { font-size: 0.62rem; font-weight: 500; }

  @media(max-width: 640px) {
    .mobile-nav { display: flex; }
    .desktop-nav { display: none !important; }
    .main { padding-bottom: 70px; }
  }

  /* PILL TABS */
  .pill-tabs { display: flex; gap: 0.5rem; background: var(--gray-100); padding: 0.25rem; border-radius: 12px; margin-bottom: 1.5rem; }
  .pill-tab {
    flex: 1; padding: 0.5rem 1rem; border-radius: 9px; border: none;
    font-size: 0.82rem; font-weight: 600; cursor: pointer;
    font-family: 'Inter', sans-serif; color: var(--gray-500);
    background: transparent; transition: all 0.18s;
  }
  .pill-tab.active { background: white; color: var(--blue); box-shadow: 0 1px 4px rgba(0,0,0,0.1); }

  /* RISK METER */
  .risk-meter-track {
    height: 12px; background: linear-gradient(to right, #10b981, #f59e0b, #ef4444);
    border-radius: 100px; position: relative;
  }
  .risk-meter-thumb {
    position: absolute; top: 50%; transform: translate(-50%, -50%);
    width: 20px; height: 20px; background: white;
    border: 3px solid var(--blue); border-radius: 50%;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    transition: left 1s ease;
  }

  /* RESPONSIVE */
  @media(max-width: 640px) {
    .hero { padding: 3.5rem 1.25rem 3rem; }
    .hero h1 { font-size: 1.9rem; }
  }
  .page-pad { padding: 2rem 1.25rem; max-width: 960px; margin: 0 auto; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
  @media(max-width: 640px) { .grid-2 { grid-template-columns: 1fr; } }
`;

// ─── STATIC DATA ─────────────────────────────────────────────────────────────
const PAYOUT_HISTORY = [
  { id: "PAY-001", date: "Jun 9, 2025", trigger: "Heavy Rainfall >50mm", amount: "₹350", status: "Paid", days: 2 },
  { id: "PAY-002", date: "Jun 2, 2025", trigger: "Pollution AQI >300", amount: "₹175", status: "Paid", days: 1 },
  { id: "PAY-003", date: "May 26, 2025", trigger: "Curfew (Night)", amount: "₹350", status: "Paid", days: 2 },
  { id: "PAY-004", date: "May 18, 2025", trigger: "Heavy Rainfall >50mm", amount: "₹525", status: "Paid", days: 3 },
];

const ADMIN_STATS = {
  users: 2847,
  activePolicies: 1923,
  totalPaid: "₹14.2L",
  claimsRate: "18.4%",
  weather7d: [
    { day: "Mon", claims: 42 }, { day: "Tue", claims: 18 }, { day: "Wed", claims: 67 },
    { day: "Thu", claims: 29 }, { day: "Fri", claims: 85 }, { day: "Sat", claims: 55 }, { day: "Sun", claims: 91 },
  ],
  topCities: [
    { city: "Chennai", users: 912, pct: 78 },
    { city: "Bengaluru", users: 654, pct: 58 },
    { city: "Mumbai", users: 601, pct: 52 },
    { city: "Hyderabad", users: 412, pct: 36 },
    { city: "Delhi NCR", users: 268, pct: 23 },
  ],
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
function Nav({ route }) {
  const links = [
    { hash: "#/", label: "Home" },
    { hash: "#/assessment", label: "Risk AI" },
    { hash: "#/plans", label: "Plans" },
    { hash: "#/dashboard", label: "Dashboard" },
    { hash: "#/admin", label: "Admin" },
  ];
  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => navigate("/")}>
        <div className="nav-logo-icon">🛡️</div>
        <div>
          <div className="nav-logo-text">GigGuards</div>
          <span style={{fontSize:"0.7rem",color:"var(--gray-400)",fontFamily:"Inter"}}>AI Parametric Insurance</span>
        </div>
      </div>
      <div className="nav-links desktop-nav">
        {links.map(l => (
          <button key={l.hash} className={`nav-link ${route === l.hash ? "active" : ""}`}
            onClick={() => navigate(l.hash.slice(1))}>{l.label}</button>
        ))}
        <button className="nav-link nav-cta" onClick={() => navigate("/signup")}>Get Started</button>
      </div>
    </nav>
  );
}

function MobileNav({ route }) {
  const items = [
    { hash: "#/", icon: "🏠", label: "Home" },
    { hash: "#/assessment", icon: "📊", label: "Risk" },
    { hash: "#/plans", icon: "📋", label: "Plans" },
    { hash: "#/dashboard", icon: "💼", label: "Dashboard" },
    { hash: "#/admin", icon: "⚙️", label: "Admin" },
  ];
  return (
    <div className="mobile-nav">
      <div className="mobile-nav-inner">
        {items.map(i => (
          <button key={i.hash} className={`mobile-nav-item ${route === i.hash ? "active" : ""}`}
            onClick={() => navigate(i.hash.slice(1))}>
            <span className="icon">{i.icon}</span>
            <span className="label">{i.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── PAGES ───────────────────────────────────────────────────────────────────
function Landing() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="dot" /> AI-Powered · Parametric · Instant Payouts
          </div>
          <h1>Insurance Built for<br /><span className="accent">Gig Workers</span></h1>
          <p>
            When rain, pollution, or curfews stop your deliveries — GigGuards pays you automatically.
            No claims. No paperwork. Just protection.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => navigate("/signup")}>Start for Free →</button>
            <button className="btn-outline" onClick={() => navigate("/assessment")}>Check My Risk Score</button>
          </div>
        </div>
      </section>

      {/* COVERAGE HIGHLIGHTS */}
      <section className="features-strip">
        <h2>What Triggers Your Payout?</h2>
        <p className="sub">Objective, real-time data — no human verification needed</p>
        <div className="features-grid">
          {[
            { icon: "🌧️", title: "Heavy Rainfall", desc: "Payout triggered when rainfall exceeds 50mm in your zone. Data from IMD sensors." },
            { icon: "😷", title: "Air Pollution Surge", desc: "AQI crossing 300 in your city triggers an automatic income protection payout." },
            { icon: "🚧", title: "Curfew / Lockdown", desc: "Government-declared curfews blocking your work hours? You're covered automatically." },
            { icon: "⚡", title: "Extreme Weather Alert", desc: "Cyclone warnings, heatwaves above 44°C — GigGuards monitors it all in real time." },
          ].map(f => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how">
        <h2>How SafeGig Works</h2>
        <p className="sub">From signup to payout in under 5 minutes</p>
        <div className="steps">
          {[
            { n: "1", t: "Sign Up", p: "Create your profile as a Zomato / Swiggy partner" },
            { n: "2", t: "AI Risk Score", p: "Our AI evaluates your location-based weather risk" },
            { n: "3", t: "Pick a Plan", p: "Choose a weekly plan that fits your risk level" },
            { n: "4", t: "Instant Payout", p: "When a trigger event hits, ₹ lands in your account" },
          ].map(s => (
            <div className="step" key={s.n}>
              <div className="step-num">{s.n}</div>
              <h4>{s.t}</h4>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ background: "white", padding: "2.5rem 1.5rem", borderTop: "1px solid var(--gray-100)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.8rem", color: "var(--gray-400)", fontWeight: 500, marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Trusted by delivery partners across</p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.5rem 2.5rem" }}>
            {["🏙️ Chennai", "🌆 Bengaluru", "🌇 Mumbai", "🌃 Hyderabad", "🌉 Delhi NCR"].map(c => (
              <span key={c} style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--gray-700)" }}>{c}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Signup() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", platform: "Zomato", city: "Chennai", zone: "", aadhaar: "", bank: "", ifsc: "", years: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  if (step === 3) return (
    <div className="page-pad">
      <div className="card" style={{ maxWidth: 480, margin: "0 auto", textAlign: "center", padding: "3rem 2rem" }}>
        <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🎉</div>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.5rem" }}>You're all set, {form.name || "Partner"}!</h2>
        <p style={{ color: "var(--gray-500)", fontSize: "0.9rem", marginBottom: "2rem" }}>Your profile is created. Let's check your AI risk score now.</p>
        <button className="btn-blue" onClick={() => navigate("/assessment")}>Check My AI Risk Score →</button>
      </div>
    </div>
  );

  return (
    <div className="page-pad">
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        {/* Progress */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
          {[1, 2].map(i => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 100, background: i <= step ? "var(--blue)" : "var(--gray-200)", transition: "background 0.3s" }} />
          ))}
        </div>
        <div style={{ marginBottom: "1.75rem" }}>
          <div className="badge badge-blue" style={{ marginBottom: "0.5rem" }}>🛵 Delivery Partner Onboarding</div>
          <h2 className="section-title">{step === 1 ? "Your Profile" : "Bank & Payout Details"}</h2>
          <p className="section-sub">{step === 1 ? "Tell us about yourself so we can personalize your coverage" : "We need these to instantly transfer your payouts"}</p>
        </div>

        <div className="card">
          {step === 1 ? (
            <div className="form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" placeholder="Ravi Kumar" value={form.name} onChange={e => set("name", e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input className="form-input" placeholder="+91 98765 43210" value={form.phone} onChange={e => set("phone", e.target.value)} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Delivery Platform</label>
                  <select className="form-input form-select" value={form.platform} onChange={e => set("platform", e.target.value)}>
                    <option>Zomato</option><option>Swiggy</option><option>Blinkit</option><option>Zepto</option><option>Others</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <select className="form-input form-select" value={form.city} onChange={e => set("city", e.target.value)}>
                    {["Chennai", "Bengaluru", "Mumbai", "Hyderabad", "Delhi NCR", "Pune", "Kolkata"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Delivery Zone / Area</label>
                  <input className="form-input" placeholder="e.g. Anna Nagar, T Nagar" value={form.zone} onChange={e => set("zone", e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Years Active</label>
                  <select className="form-input form-select" value={form.years} onChange={e => set("years", e.target.value)}>
                    <option value="">Select</option>
                    {["< 1 year", "1-2 years", "2-3 years", "3+ years"].map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
              </div>
              <button className="btn-blue" onClick={() => setStep(2)}>Continue →</button>
            </div>
          ) : (
            <div className="form">
              <div className="form-group">
                <label className="form-label">Aadhaar Number</label>
                <input className="form-input" placeholder="XXXX XXXX XXXX" value={form.aadhaar} onChange={e => set("aadhaar", e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Bank Account Number</label>
                <input className="form-input" placeholder="Account number" value={form.bank} onChange={e => set("bank", e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">IFSC Code</label>
                <input className="form-input" placeholder="e.g. SBIN0001234" value={form.ifsc} onChange={e => set("ifsc", e.target.value)} />
              </div>
              <div style={{ background: "var(--blue-light)", borderRadius: 10, padding: "0.75rem 1rem", fontSize: "0.8rem", color: "var(--blue)", display: "flex", gap: "0.5rem" }}>
                🔒 Your data is encrypted and used only for instant payouts. We do not share it with anyone.
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                               <button className="btn-blue" onClick={() => setStep(1)} style={{ flex: 1, background: "var(--gray-200)", color: "var(--gray-700)", padding: "0.75rem", borderRadius: 12, border: "none", fontWeight: 600, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>← Back</button>
                <button className="btn-blue" onClick={() => setStep(3)} style={{ flex: 2 }}>Create My Account ✓</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Assessment() {
  const [city, setCity] = useState("Chennai");
  const [loaded, setLoaded] = useState(false);
  const [score, setScore] = useState(0);

  const cityScores = { Chennai: 72, Bengaluru: 58, Mumbai: 81, Hyderabad: 64, "Delhi NCR": 69, Pune: 55, Kolkata: 77 };
  const cityPremiums = { Chennai: 149, Bengaluru: 119, Mumbai: 179, Hyderabad: 129, "Delhi NCR": 139, Pune: 109, Kolkata: 159 };

  useEffect(() => {
    setLoaded(false); setScore(0);
    const timer = setTimeout(() => {
      setLoaded(true);
      let s = 0;
      const target = cityScores[city] || 65;
      const iv = setInterval(() => {
        s += 2;
        if (s >= target) { setScore(target); clearInterval(iv); }
        else setScore(s);
      }, 20);
    }, 900);
    return () => clearTimeout(timer);
  }, [city]);

  const scoreColor = score < 40 ? "var(--green)" : score < 70 ? "var(--amber)" : "var(--red)";
  const scoreLabel = score < 40 ? "Low Risk" : score < 70 ? "Moderate Risk" : "High Risk";
  const premium = cityPremiums[city] || 129;

  return (
    <div className="page-pad">
      <div style={{ marginBottom: "1.75rem" }}>
        <div className="badge badge-blue" style={{ marginBottom: "0.5rem" }}>🤖 AI Risk Engine</div>
        <h2 className="section-title">Your Risk Assessment</h2>
        <p className="section-sub">Our AI analyzes real-time weather history, AQI trends, and disruption patterns for your location</p>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label className="form-label" style={{ display: "block", marginBottom: "0.4rem" }}>Select Your City</label>
        <select className="form-input form-select" style={{ maxWidth: 280 }} value={city} onChange={e => setCity(e.target.value)}>
          {Object.keys(cityScores).map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid-2" style={{ marginBottom: "1.25rem" }}>
        {/* Score Card */}
        <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
          {!loaded ? (
            <div style={{ padding: "1rem 0" }}>
              <div style={{ fontSize: "0.9rem", color: "var(--gray-400)", marginBottom: "1rem" }}>🔍 Analyzing {city} data...</div>
              <div style={{ height: 8, background: "var(--gray-100)", borderRadius: 100, overflow: "hidden" }}>
                <div style={{ height: "100%", background: "var(--blue)", borderRadius: 100, width: "60%", animation: "pulse 1s infinite" }} />
              </div>
            </div>
          ) : (
            <>
              <p className="score-label" style={{ marginBottom: "0.75rem" }}>AI Risk Score</p>
              <div style={{ position: "relative", marginBottom: "1rem" }}>
                <svg width="140" height="140" viewBox="0 0 140 140" style={{ margin: "0 auto", display: "block" }}>
                  <circle cx="70" cy="70" r="56" fill="none" stroke="var(--gray-100)" strokeWidth="12" />
                  <circle cx="70" cy="70" r="56" fill="none" stroke={scoreColor} strokeWidth="12"
                    strokeDasharray={`${2 * Math.PI * 56 * score / 100} ${2 * Math.PI * 56 * (1 - score / 100)}`}
                    strokeLinecap="round" transform="rotate(-90 70 70)" style={{ transition: "stroke-dasharray 1s ease" }} />
                  <text x="70" y="65" textAnchor="middle" fontFamily="Poppins" fontWeight="800" fontSize="28" fill="var(--gray-900)">{score}</text>
                  <text x="70" y="84" textAnchor="middle" fontFamily="Inter" fontSize="11" fill="var(--gray-400)">/100</text>
                </svg>
              </div>
              <span className={`badge ${score < 40 ? "badge-green" : score < 70 ? "badge-amber" : "badge-red"}`} style={{ marginBottom: "0.5rem" }}>
                {score < 40 ? "🟢" : score < 70 ? "🟡" : "🔴"} {scoreLabel}
              </span>
              <p style={{ fontSize: "0.8rem", color: "var(--gray-500)", marginTop: "0.5rem" }}>Based on 24-month disruption history for {city}</p>
            </>
          )}
        </div>

        {/* Premium & Factors */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="card" style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)", border: "1px solid #bfdbfe" }}>
            <p style={{ fontSize: "0.78rem", color: "var(--blue)", fontWeight: 600, marginBottom: "0.25rem" }}>Recommended Weekly Premium</p>
            <div style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "Poppins", color: "var(--blue)" }}>₹{premium}</div>
            <p style={{ fontSize: "0.78rem", color: "var(--gray-500)" }}>for Income Loss Coverage only</p>
          </div>
          <div className="card">
            <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--gray-700)", marginBottom: "0.75rem" }}>Risk Factors Analyzed</p>
            {[
              { label: "Rainfall Risk", val: Math.round(score * 0.9), color: "#2563eb" },
              { label: "AQI / Pollution", val: Math.round(score * 0.6), color: "#f59e0b" },
              { label: "Curfew History", val: Math.round(score * 0.4), color: "#8b5cf6" },
              { label: "Cyclone Exposure", val: Math.round(score * 0.5), color: "#ef4444" },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: "0.6rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.77rem", marginBottom: "0.25rem" }}>
                  <span style={{ color: "var(--gray-600)" }}>{f.label}</span>
                  <span style={{ fontWeight: 600 }}>{f.val}/100</span>
                </div>
                <div style={{ height: 6, background: "var(--gray-100)", borderRadius: 100, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${f.val}%`, background: f.color, borderRadius: 100, transition: "width 1.2s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {loaded && (
        <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: "0.95rem" }}>Ready to get covered?</p>
            <p style={{ fontSize: "0.82rem", color: "var(--gray-500)" }}>Based on your score, we recommend the {score > 65 ? "High-Risk" : score > 40 ? "Standard" : "Basic"} plan.</p>
          </div>
          <button className="btn-blue" style={{ width: "auto", whiteSpace: "nowrap" }} onClick={() => navigate("/plans")}>View Plans →</button>
        </div>
      )}
    </div>
  );
}

function Plans() {
  const [billing] = useState("weekly");
  const plans = [
    {
      name: "Basic",
      price: 79,
      coverage: "₹175/day income protection",
      color: "var(--gray-700)",
      features: [
        "Rainfall trigger: >60mm/day",
        "AQI trigger: >350",
        "Payout within 2 hours",
        "Up to ₹525/week max payout",
        "SMS + app notifications",
      ],
    },
    {
      name: "Standard",
      price: 129,
      coverage: "₹350/day income protection",
      color: "var(--blue)",
      featured: true,
      features: [
        "Rainfall trigger: >50mm/day",
        "AQI trigger: >300",
        "Curfew coverage included",
        "Payout within 1 hour",
        "Up to ₹1,050/week max payout",
        "Dedicated support helpline",
      ],
    },
    {
      name: "High-Risk",
      price: 199,
      coverage: "₹525/day income protection",
      color: "#dc2626",
      features: [
        "Rainfall trigger: >35mm/day",
        "AQI trigger: >250",
        "Curfew + cyclone coverage",
        "Payout within 30 minutes",
        "Up to ₹2,100/week max payout",
        "Priority onboarding & support",
        "Weather alerts (SMS + WhatsApp)",
      ],
    },
  ];

  return (
    <div className="page-pad">
      <div style={{ marginBottom: "1.75rem" }}>
        <div className="badge badge-blue" style={{ marginBottom: "0.5rem" }}>📋 Weekly Plans</div>
        <h2 className="section-title">Choose Your Coverage</h2>
        <p className="section-sub">All plans cover <strong>income loss only</strong> — not health or vehicle repair. Pay weekly, cancel anytime.</p>
      </div>

      {/* IMPORTANT NOTICE */}
      <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: "0.85rem 1.1rem", marginBottom: "1.5rem", display: "flex", gap: "0.6rem", alignItems: "flex-start", fontSize: "0.82rem" }}>
        <span>⚠️</span>
        <div>
          <strong>Coverage Scope:</strong> GigGuards pays for <strong>lost delivery income only</strong> due to parametric triggers. We do not cover medical expenses, vehicle damage, or third-party liability.
        </div>
      </div>

      <div className="plans-grid">
        {plans.map(p => (
          <div className={`plan-card ${p.featured ? "featured" : ""}`} key={p.name}>
            {p.featured && <div className="plan-featured-badge">Most Popular</div>}
            <div style={{ marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1.3rem" }}>{p.name === "Basic" ? "🟢" : p.name === "Standard" ? "🔵" : "🔴"}</span>
              <span className="plan-name" style={{ color: p.color }}>{p.name}</span>
            </div>
            <div className="plan-price">₹{p.price}<span>/week</span></div>
            <p className="plan-coverage">{p.coverage}</p>
            <ul className="plan-features">
              {p.features.map(f => (
                <li className="plan-feature" key={f}>
                  <span className="check">✓</span>{f}
                </li>
              ))}
            </ul>
            <button className="btn-blue" style={{ background: p.color }} onClick={() => navigate("/dashboard")}>
              Get {p.name} Plan
            </button>
            <p className="plan-disclaimer">⚠️ Income Loss Only · No Health/Vehicle Cover</p>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: "1.5rem", background: "var(--blue-light)", border: "1px solid var(--blue-mid)" }}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "space-around", textAlign: "center" }}>
          {[
            { icon: "⚡", title: "Instant Payouts", sub: "No claim filing required" },
            { icon: "📊", title: "Real Data Triggers", sub: "IMD + CPCB verified" },
            { icon: "🔄", title: "Cancel Anytime", sub: "No long-term lock-in" },
            { icon: "💳", title: "UPI Payouts", sub: "Direct to your bank" },
          ].map(f => (
            <div key={f.title} style={{ minWidth: 120 }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--gray-900)" }}>{f.title}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--gray-500)" }}>{f.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [simulating, setSimulating] = useState(false);
  const [rainAlert, setRainAlert] = useState(false);
  const [payoutApproved, setPayoutApproved] = useState(false);
  const [tab, setTab] = useState("overview");

  const simulate = () => {
    setSimulating(true);
    setTimeout(() => { setRainAlert(true); setSimulating(false); }, 1200);
    setTimeout(() => setPayoutApproved(true), 3000);
  };

  const reset = () => { setRainAlert(false); setPayoutApproved(false); };

  return (
    <div className="page-pad">
      <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <div className="badge badge-green" style={{ marginBottom: "0.35rem" }}>● Policy Active</div>
          <h2 className="section-title">My Dashboard</h2>
          <p className="section-sub">Welcome back, Ravi · Standard Plan · Week of Jun 9–15</p>
        </div>
        <button className="btn-blue" style={{ width: "auto", background: rainAlert ? "var(--gray-400)" : "var(--blue)" }} onClick={rainAlert ? reset : simulate} disabled={simulating}>
          {simulating ? "⏳ Checking weather..." : rainAlert ? "↩ Reset Simulation" : "⚡ Simulate Disruption"}
        </button>
      </div>

      {/* Alerts */}
      {rainAlert && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
          <div className="alert alert-rain">
            <span className="alert-icon">🌧️</span>
            <div>
              <div className="alert-title" style={{ color: "var(--blue)" }}>Rainstorm Detected — Chennai Zone 4</div>
              <div className="alert-sub">Rainfall: 68mm/hr · Trigger threshold crossed (50mm) · 3:42 PM IST · IMD Verified</div>
            </div>
          </div>
          {payoutApproved && (
            <div className="alert alert-payout">
              <span className="alert-icon">✅</span>
              <div>
                <div className="alert-title">Instant Payout Approved — ₹350</div>
                <div className="alert-sub">Transferred to SBI ****4521 · Reference: PAY-{Date.now().toString().slice(-6)} · Processing in 30 mins</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TABS */}
      <div className="pill-tabs">
        {["overview", "history", "coverage"].map(t => (
          <button key={t} className={`pill-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t === "overview" ? "Overview" : t === "history" ? "Payout History" : "My Coverage"}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <>
          {/* Status Card */}
          <div className="status-card" style={{ marginBottom: "1.25rem" }}>
            <div className="status-card-label">Active Weekly Coverage</div>
            <div className="status-card-title">Standard Plan · Income Loss Protection</div>
            <div className="status-card-meta">Jun 9 – Jun 15, 2025 · ₹350/day · Max ₹1,050/week</div>
            <div style={{ marginTop: "1rem", display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: "0.72rem", opacity: 0.7 }}>Premium Paid</div>
                <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>₹129</div>
              </div>
              <div>
                <div style={{ fontSize: "0.72rem", opacity: 0.7 }}>Days Remaining</div>
                <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>4 days</div>
              </div>
              <div>
                <div style={{ fontSize: "0.72rem", opacity: 0.7 }}>Payouts This Week</div>
                <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>₹{payoutApproved ? "700" : "350"}</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="dash-grid" style={{ marginBottom: "1.25rem" }}>
            {[
              { label: "Total Earned (Payouts)", value: payoutApproved ? "₹2,275" : "₹1,925", sub: "Since Jun 2024", color: "var(--green)" },
              { label: "Days Covered", value: "12", sub: "This policy year", color: "var(--blue)" },
              { label: "Triggers Activated", value: payoutApproved ? "6" : "5", sub: "Rain · AQI · Curfew", color: "var(--amber)" },
              { label: "Risk Score", value: "72", sub: "Moderate-High · Chennai", color: "var(--red)" },
            ].map(s => (
              <div className="dash-stat" key={s.label}>
                <div className="dash-stat-label">{s.label}</div>
                <div className="dash-stat-value" style={{ color: s.color }}>{s.value}</div>
                <div className="dash-stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "history" && (
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--gray-100)" }}>
            <h3 style={{ fontWeight: 700, fontSize: "0.95rem" }}>Payout History</h3>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Payout ID</th>
                  <th>Date</th>
                  <th>Trigger Event</th>
                  <th>Days</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {(payoutApproved ? [{ id: `PAY-${Date.now().toString().slice(-6)}`, date: "Jun 14, 2025", trigger: "Heavy Rainfall >50mm", amount: "₹350", status: "Processing", days: 1 }, ...PAYOUT_HISTORY] : PAYOUT_HISTORY).map(p => (
                  <tr key={p.id}>
                    <td style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "var(--blue)" }}>{p.id}</td>
                    <td>{p.date}</td>
                    <td>{p.trigger}</td>
                    <td style={{ textAlign: "center" }}>{p.days}</td>
                    <td style={{ fontWeight: 700 }}>{p.amount}</td>
                    <td>
                      <span className={`badge ${p.status === "Paid" ? "badge-green" : "badge-amber"}`}>
                        {p.status === "Paid" ? "✓" : "⏳"} {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "coverage" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="card">
            <h3 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "1rem" }}>Coverage Details · Standard Plan</h3>
            {[
              { icon: "🌧️", title: "Heavy Rainfall", detail: "Triggers when >50mm/day in your zone. Source: IMD real-time sensors." },
              { icon: "😷", title: "Air Pollution (AQI)", detail: "Triggers when AQI exceeds 300 in your city. Source: CPCB live data." },
              { icon: "🚧", title: "Curfew / Section 144", detail: "Any government declared movement restriction of 4+ hours. Source: State govt notifications." },
            ].map(c => (
              <div key={c.title} style={{ display: "flex", gap: "0.75rem", padding: "0.75rem 0", borderBottom: "1px solid var(--gray-50)" }}>
                <span style={{ fontSize: "1.5rem" }}>{c.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.88rem", marginBottom: "0.2rem" }}>{c.title}</div>
                  <div style={{ fontSize: "0.79rem", color: "var(--gray-500)" }}>{c.detail}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "0.75rem", padding: "0.75rem", background: "var(--red-light)", borderRadius: 10, fontSize: "0.78rem", color: "#991b1b" }}>
              ⚠️ <strong>Not Covered:</strong> Medical expenses · Vehicle damage · Third-party claims · Non-trigger weather
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Admin() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="page-pad">
      <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <div className="badge badge-blue" style={{ marginBottom: "0.35rem" }}>⚙️ Company Dashboard</div>
          <h2 className="section-title">GigGuards Admin</h2>
          <p className="section-sub">Real-time analytics </p>
        </div>
        <span className="badge badge-green">● Live Data</span>
      </div>

      {/* KPI CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        {[
          { label: "Total Users Insured", value: "2,847", icon: "👥", color: "var(--blue)", change: "+12% WoW" },
          { label: "Active Policies", value: "1,923", icon: "📋", color: "var(--green)", change: "+8.4% WoW" },
          { label: "Total Paid Out", value: "₹14.2L", icon: "💸", color: "var(--amber)", change: "+31% MoM" },
          { label: "Avg Claim Rate", value: "18.4%", icon: "📊", color: "#8b5cf6", change: "–2.1% vs last wk" },
        ].map(k => (
          <div className="card" key={k.label}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "1.4rem" }}>{k.icon}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--green)", fontWeight: 600 }}>{k.change}</span>
            </div>
            <div style={{ fontSize: "1.7rem", fontWeight: 800, fontFamily: "Poppins", color: k.color }}>{k.value}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--gray-500)" }}>{k.label}</div>
          </div>
        ))}
      </div>

      <div className="pill-tabs">
        {["overview", "claims", "forecast"].map(t => (
          <button key={t} className={`pill-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t === "overview" ? "City Breakdown" : t === "claims" ? "Weekly Claims" : "🔮 Predictive Forecast"}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="card">
          <h3 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "1.25rem" }}>Users by City</h3>
          <div className="bar-chart">
            {ADMIN_STATS.topCities.map(c => (
              <div className="bar-row" key={c.city}>
                <span className="bar-label">{c.city}</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${c.pct}%` }} /></div>
                <span className="bar-val">{c.users}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "claims" && (
        <div className="card">
          <h3 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "1.25rem" }}>Claims This Week by Day</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "0.6rem", height: 140 }}>
            {ADMIN_STATS.weather7d.map(d => {
              const h = Math.round((d.claims / 100) * 120);
              return (
                <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--gray-700)" }}>{d.claims}</span>
                  <div style={{ width: "100%", height: h, background: d.claims > 70 ? "var(--red)" : d.claims > 40 ? "var(--amber)" : "var(--blue)", borderRadius: "6px 6px 0 0", transition: "height 1s ease" }} />
                  <span style={{ fontSize: "0.72rem", color: "var(--gray-400)" }}>{d.day}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: "1rem", marginTop: "0.75rem", fontSize: "0.75rem", color: "var(--gray-500)" }}>
            <span>🔵 Normal &lt;40</span><span>🟡 Elevated 40-70</span><span>🔴 High &gt;70</span>
          </div>
        </div>
      )}

      {tab === "forecast" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="card" style={{ background: "linear-gradient(135deg, #1e3a8a, #2563eb)", color: "white" }}>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "1.3rem" }}>🔮</span>
              <h3 style={{ fontWeight: 700 }}>Predictive Weather Claims — Next 7 Days</h3>
            </div>
            <p style={{ fontSize: "0.85rem", opacity: 0.85, marginBottom: "1.25rem" }}>AI forecast based on IMD seasonal patterns, historical AQI trends, and urban heat models</p>
            {[
              { city: "Chennai", risk: "Very High", claims: 120, trigger: "Monsoon onset expected Jun 15-17", color: "#ef4444" },
              { city: "Mumbai", risk: "High", claims: 98, trigger: "Pre-monsoon heavy showers forecast", color: "#f59e0b" },
              { city: "Kolkata", risk: "High", claims: 87, trigger: "Cyclonic circulation tracking NE coast", color: "#f59e0b" },
              { city: "Delhi NCR", risk: "Moderate", claims: 54, trigger: "AQI spike likely due to dust storms", color: "#60a5fa" },
              { city: "Bengaluru", risk: "Low", claims: 31, trigger: "Mild showers, below trigger threshold", color: "#4ade80" },
            ].map(f => (
              <div key={f.city} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{f.city}</div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.75 }}>{f.trigger}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 800, fontSize: "1rem" }}>{f.claims}</div>
                  <div style={{ fontSize: "0.7rem", color: f.color, fontWeight: 600 }}>{f.risk}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: "0.85rem 1.1rem", fontSize: "0.8rem", color: "#92400e" }}>
            ⚠️ Predicted claims are estimates based on historical data. Actual triggers depend on real-time IMD and CPCB readings.
          </div>
        </div>
      )}
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const route = useRoute();

  const pages = {
    "#/": <Landing />,
    "#/signup": <Signup />,
    "#/assessment": <Assessment />,
    "#/plans": <Plans />,
    "#/dashboard": <Dashboard />,
    "#/admin": <Admin />,
  };

  const page = pages[route] || <Landing />;

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <Nav route={route} />
        <main className="main">{page}</main>
        <MobileNav route={route} />
      </div>
    </>
  );
}
