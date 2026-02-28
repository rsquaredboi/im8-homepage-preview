const { useState, useEffect } = React;

const IM8Homepage = () => {
  const [activeOrgan, setActiveOrgan] = useState(0);
  const [activeFlavour, setActiveFlavour] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [showAllUpgrades, setShowAllUpgrades] = useState(false);
  const [activeFaq, setActiveFaq] = useState(-1);
  const [hoveredCostRow, setHoveredCostRow] = useState(-1);
  const [essentialsOpen, setEssentialsOpen] = useState(false);
  const [longevityOpen, setLongevityOpen] = useState(false);

  /* Cost module data */
  const essentialsCostItems = [
    { name: "Multivitamins, Minerals & Antioxidants", price: 35 },
    { name: "Superfoods, Greens & Fruits", price: 50 },
    { name: "Immunity (Vit C, Zinc, D3, Elderberry)", price: 20 },
    { name: "Electrolytes & Hydration", price: 40 },
    { name: "Adaptogens & Super Mushrooms", price: 30 },
    { name: "Prebiotics, Probiotics & Postbiotics", price: 40 },
    { name: "CoQ10 (Heart Vitality)", price: 30 },
    { name: "MSM (Joint & Muscle Vitality)", price: 25 },
    { name: "Essential Amino Acids", price: 20 },
  ];
  const longevityCostItems = [
    { name: "NMN NAD+ Energy Booster (NMN 300mg + PQQ)", price: 62 },
    { name: "Cellular Protection Activator (Resveratrol, Quercetin, Fisetin)", price: 50 },
    { name: "Metabolic AMPK/SIRT1 Activator (Berberine + Astaxanthin)", price: 25 },
    { name: "Cellular Foundation Builder (Glycine + Taurine)", price: 16 },
    { name: "Cellular Renewal Activator (Spermidine — Autophagy)", price: 12 },
  ];
  const essentialsSubtotal = essentialsCostItems.reduce((s, i) => s + i.price, 0);
  const longevitySubtotal = longevityCostItems.reduce((s, i) => s + i.price, 0);
  const costGrandTotal = essentialsSubtotal + longevitySubtotal;
  const stackPrice = 156.60;
  const stackDailyCost = (stackPrice / 30).toFixed(2);
  const costMonthlySavings = costGrandTotal - stackPrice;
  const costAnnualSavings = Math.round(costMonthlySavings * 12);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date(now.getFullYear(), 2, 31, 23, 59, 59);
      const diff = end - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          mins: Math.floor((diff % 3600000) / 60000),
          secs: Math.floor((diff % 60000) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setVisibleSections((p) => new Set([...p, e.target.id])); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const vis = (id) => visibleSections.has(id);

  const flavours = [
    { name: "Açaí + Mixed Berries", color: "#6B1D5E", accent: "#D4468E", desc: "Earthy undertones. Hint of chocolate. Smooth berry finish.", tag: "ORIGINAL", emoji: "🫐" },
    { name: "Lemon + Orange", color: "#CC8400", accent: "#F5C842", desc: "Bright citrus fusion. Refreshing zest. Clean, uplifting finish.", tag: "NEW", emoji: "🍋" },
    { name: "Mango + Passion Fruit", color: "#C75B12", accent: "#F59E42", desc: "Tropical sweetness. Lively passionfruit kick. Sun-kissed.", tag: "NEW", emoji: "🥭" },
  ];

  const organs = [
    { name: "Digestive", icon: "🫁", detail: "Complete 4-tier system: Prebiotics, Probiotics (10B CFU), Postbiotics (FloraSMART®), and Digestive Enzymes. 89% of trial participants experienced better digestion." },
    { name: "Immune", icon: "🛡️", detail: "Vitamin C (1,000% DV), Zinc (136% DV), D3 (250% DV), Selenium (127% DV), Elderberry, and Reishi + Chaga mushroom complex." },
    { name: "Heart", icon: "❤️", detail: "100mg CoQ10 for cellular heart energy. Natural beetroot nitrates for blood flow. Potassium for healthy blood pressure." },
    { name: "Muscular", icon: "💪", detail: "1,580mg Amino Complex (+36% in PRO). 1,500mg clinical MSM for joint comfort. Full-spectrum electrolyte recovery." },
    { name: "Skeletal", icon: "🦴", detail: "Bioavailable Calcium + 50mcg Vegan D3 (Lichen) + 100mcg K2 (MK-7). K2 directs calcium into bones, away from arteries." },
    { name: "Skin & Hair", icon: "✨", detail: "MSM for collagen. Vitamin C (1000% DV), Biotin, Vitamin E. Your skin, hair, and nails are built from the inside out." },
    { name: "Brain", icon: "🧠", detail: "200mcg Methylcobalamin B12 (733% increase). NEW 30mg Saffron for mood + focus. Lion's Mane + Ginkgo for cognitive performance." },
    { name: "Endocrine", icon: "⚡", detail: "Ashwagandha + Rhodiola + American Ginseng adaptogens. Chromium for metabolic function. D3 for hormonal balance." },
    { name: "Hydration", icon: "💧", detail: "2,500mg Hydra Electrolytes: Potassium (10% DV), Magnesium Bisglycinate (15% DV), Calcium (12% DV). Precision hydration." },
  ];

  const proUpgrades = [
    { ingredient: "Vitamin B12", from: "24mcg", to: "200mcg", boost: "+733%", benefit: "Sustained energy without the crash", color: "#C12B2B" },
    { ingredient: "CRT8™ Complex", from: "25mg", to: "100mg", boost: "+300%", benefit: "Accelerated cellular renewal", color: "#C12B2B" },
    { ingredient: "Vitamin K2 (MK-7)", from: "40mcg", to: "100mcg", boost: "+150%", benefit: "Calcium into bones, out of arteries", color: "#16803C" },
    { ingredient: "Vitamin D3", from: "30mcg", to: "50mcg", boost: "+67%", benefit: "Immune resilience + mood support", color: "#16803C" },
    { ingredient: "Magnesium", from: "65mg", to: "100mg", boost: "+54%", benefit: "Deeper recovery. Better sleep.", color: "#16803C" },
    { ingredient: "MSM (Joint Support)", from: "1,000mg", to: "1,500mg", boost: "+50%", benefit: "Clinical-grade joint mobility", color: "#16803C" },
    { ingredient: "Saffron Extract", from: "—", to: "30mg", boost: "NEW", benefit: "Sharper focus. Emotional balance.", color: "#2563EB" },
    { ingredient: "Vitamin B6 → P5P", from: "HCl", to: "Pyridoxal 5-P", boost: "UPGRADE", benefit: "Bioactive — no liver conversion needed", color: "#2563EB" },
  ];

  return (
    <div style={{ fontFamily: "'Helvetica Neue', sans-serif", color: "#0A0A0A", background: "#FAFAF8", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .fade-up { opacity: 0; transform: translateY(32px); transition: all 0.85s cubic-bezier(0.16, 1, 0.3, 1); }
        .fade-up.visible { opacity: 1; transform: translateY(0); }

        .marquee-track { display: flex; animation: marquee 35s linear infinite; width: max-content; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        @keyframes pulse { 0%,100% { box-shadow: 0 0 16px rgba(193,43,43,0.1); } 50% { box-shadow: 0 0 40px rgba(193,43,43,0.22); } }
        .pulse { animation: pulse 3s ease-in-out infinite; }

        @keyframes glow { from { box-shadow: 0 0 8px rgba(185,28,28,0.15); } to { box-shadow: 0 0 24px rgba(185,28,28,0.3); } }
        .pulse-badge { animation: glow 2.5s ease-in-out infinite alternate; }
        @keyframes rowFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .row-anim { animation: rowFadeIn 0.35s ease-out both; }
        @media (max-width: 820px) { .cost-grid { grid-template-columns: 1fr !important; } .cost-sticky { position: static !important; } }

        @keyframes liveDot { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        .live-dot { animation: liveDot 1.5s ease-in-out infinite; }

        .cd { font-family: 'JetBrains Mono'; font-size: 28px; font-weight: 600; background: linear-gradient(145deg,#111,#1E1E1E); color: #fff; padding: 11px 15px; border-radius: 10px; min-width: 54px; text-align: center; line-height: 1; border: 1px solid rgba(255,255,255,0.05); }

        .card-hover { transition: all 0.4s cubic-bezier(0.16,1,0.3,1); cursor: pointer; }
        .card-hover:hover { transform: translateY(-5px); box-shadow: 0 24px 64px rgba(0,0,0,0.1); }

        .fl-card { cursor: pointer; transition: all 0.4s cubic-bezier(0.16,1,0.3,1); border: 2px solid transparent; }
        .fl-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.07); }

        .organ-pill { cursor: pointer; transition: all 0.25s ease; border: none; background: transparent; padding: 9px 16px; border-radius: 100px; font-size: 12.5px; font-family: 'DM Sans'; font-weight: 500; white-space: nowrap; color: #777; }
        .organ-pill:hover { background: #F0EBE3; color: #333; }
        .organ-pill.active { background: #111; color: white; }

        .btn-primary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 17px 42px; background: #C12B2B; color: white; font-family: 'DM Sans'; font-weight: 700; font-size: 14px; letter-spacing: 0.8px; border: none; border-radius: 8px; cursor: pointer; transition: all 0.3s ease; text-transform: uppercase; }
        .btn-primary:hover { background: #A01F1F; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(193,43,43,0.28); }

        .upgrade-row { transition: background 0.2s ease; }
        .upgrade-row:hover { background: #F5F0EA !important; }

        .slabel { font-family: 'JetBrains Mono'; font-size: 10.5px; letter-spacing: 3px; text-transform: uppercase; color: #AAA; margin-bottom: 12px; display: block; }

        .strike-row { position: relative; }
        .strike-row::before { content: ''; position: absolute; left: 0; top: 50%; width: 100%; height: 1px; background: #C12B2B; opacity: 0.5; }

        @media (max-width: 768px) {
          .hero-flex { flex-direction: column !important; }
          .offer-grid { grid-template-columns: 1fr !important; }
          .cd { font-size: 21px; padding: 8px 11px; min-width: 42px; }
          .stat-big { font-size: 38px !important; }
        }
      `}</style>

      {/* ===== STICKY BAR ===== */}
      <div style={{ background: "linear-gradient(90deg, #080808, #140C0C, #080808)", padding: "10px 20px", textAlign: "center", position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid rgba(193,43,43,0.15)" }}>
        <span style={{ fontFamily: "'DM Sans'", fontSize: 12.5, color: "rgba(255,255,255,0.65)" }}>
          <span style={{ color: "#F5C842", fontWeight: 700, letterSpacing: 1.5, fontSize: 11 }}>THE PRO LAUNCH EVENT</span>
          <span style={{ margin: "0 8px", color: "rgba(255,255,255,0.15)" }}>|</span>
          Up to 40% off the Beckham Stack · March only
          <span style={{ margin: "0 8px", color: "rgba(255,255,255,0.15)" }}>|</span>
          <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 11.5 }}>{timeLeft.days}d {timeLeft.hours}h {timeLeft.mins}m</span>
          <span style={{ margin: "0 8px", color: "rgba(255,255,255,0.15)" }}>|</span>
          <span style={{ textDecoration: "underline", cursor: "pointer", fontWeight: 700, color: "white" }}>Shop Now →</span>
        </span>
      </div>

      {/* ===== HERO ===== */}
      <section style={{ background: "linear-gradient(170deg, #050505 0%, #0E0E0E 30%, #150D0D 60%, #050505 100%)", minHeight: "93vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        {/* Ambient glow */}
        <div style={{ position: "absolute", top: "20%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(193,43,43,0.06), transparent 65%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,200,66,0.03), transparent 65%)", filter: "blur(60px)" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px 80px", position: "relative", zIndex: 1 }}>

          {/* Launch pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(193,43,43,0.08)", border: "1px solid rgba(193,43,43,0.15)", borderRadius: 100, padding: "5px 14px 5px 10px", marginBottom: 28 }}>
            <span className="live-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#C12B2B" }} />
            <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 10.5, letterSpacing: 2.5, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>NEW — ESSENTIALS PRO + TWO NEW FLAVOURS</span>
          </div>

          {/* === THE HEADLINE === */}
          {/* 
            Strategy: Universal audience = lead with FEELING, not behavior.
            - Person taking 0 supplements: "I want that feeling"
            - Person taking 5 supplements: "I want that feeling AND simplicity"  
            - Person taking 20 supplements: "I want that feeling AND to stop this madness"
            - Beckham fan: "Oh, that's what David built"
            
            "One drink" is the mechanism. "You'll feel it" is the promise.
            The clinical proof (87% energy) makes it credible, not aspirational.
          */}
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px, 5.8vw, 70px)", color: "white", lineHeight: 1.05, maxWidth: 720, fontWeight: 400, marginBottom: 20 }}>
            One drink.
            <br />
            <span style={{ fontWeight: 800, fontStyle: "italic" }}>And you'll actually feel it.</span>
          </h1>

          {/* Subhead — layers in the specifics: WHAT it is → WHO made it → WHAT'S new */}
          <p style={{ fontFamily: "'DM Sans'", fontSize: "clamp(15px, 1.7vw, 18px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: 560, marginBottom: 10 }}>
            92 clinically-dosed ingredients in one daily supplement. Co-founded by <strong style={{ color: "white" }}>David Beckham</strong> with experts from <strong style={{ color: "white" }}>Mayo Clinic</strong> and <strong style={{ color: "white" }}>NASA</strong>. Now upgraded — more potency, bioactive forms, and <strong style={{ color: "white" }}>three delicious flavours</strong>.
          </p>

          {/* Proof line — makes the headline credible, not just aspirational */}
          <p style={{ fontFamily: "'DM Sans'", fontSize: 13.5, color: "rgba(255,255,255,0.35)", marginBottom: 28, lineHeight: 1.5 }}>
            87% reported more energy. 89% better digestion. In a 12-week clinical trial.
            <br />
            <span style={{ fontSize: 12, opacity: 0.7 }}>Trusted by World No. 1 Aryna Sabalenka & F1 driver Ollie Bearman.</span>
          </p>

          {/* CTA pair — Primary = Stack (conversion goal), Secondary = Essentials Pro (entry) */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 12 }}>
            <button className="btn-primary pulse">Get The Beckham Stack — 40% Off <span style={{ fontSize: 17 }}>→</span></button>
            <button style={{ padding: "17px 32px", background: "transparent", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 14, border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, cursor: "pointer", transition: "all 0.3s ease", letterSpacing: 0.5 }}>
              Or start with Essentials Pro
            </button>
          </div>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 12.5, color: "rgba(255,255,255,0.22)", marginBottom: 36, fontStyle: "italic" }}>
            The Beckham Stack is David's complete daily ritual — Essentials Pro + Longevity. March pricing: $5.22/day.
          </p>

          {/* Trust row — Guarantee badge elevated per visual guide */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {/* Elevated guarantee badge */}
            <div className="pulse-badge" style={{
              position: "relative", display: "flex", alignItems: "center", gap: 6,
              background: "rgba(185,28,28,0.15)", border: "2px solid #B91C1C",
              borderRadius: 8, padding: "8px 14px",
            }}>
              <span style={{ color: "#22c55e", fontSize: 14 }}>✓</span>
              <span style={{ color: "white", fontSize: 11.5, fontWeight: 600 }}>Up to 90-Day Money Back Guarantee</span>
              <span style={{
                position: "absolute", top: -8, right: -8,
                background: "#B91C1C", color: "white",
                fontSize: 8, fontWeight: 700, padding: "2px 6px",
                borderRadius: 4, textTransform: "uppercase", letterSpacing: 0.5,
              }}>Updated</span>
            </div>
            {/* Standard trust badges */}
            {["NSF Certified for Sport", "Third-Party Tested", "11,825 Five-Star Reviews"].map((t, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "8px 14px" }}>
                <span style={{ color: "#22c55e", fontSize: 14 }}>✓</span>
                <span style={{ fontFamily: "'DM Sans'", fontSize: 11.5, color: "rgba(255,255,255,0.5)" }}>{t}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRESS MARQUEE ===== */}
      <section style={{ background: "#0A0A0A", padding: "13px 0", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, d) => (
            <div key={d} style={{ display: "flex", gap: 36, paddingRight: 36 }}>
              {["\\"Replace All Your Supplements\\" — Forbes", "300,000+ Customers", "6M+ Servings", "\\"Science-backed\\" — Athletech News", "Featured: NBC Today · Fortune · Fast Company", "Clinically Proven in 12-Week Trial"].map((s, j) => (
                <span key={j} style={{ fontFamily: "'DM Sans'", fontSize: 11.5, color: "rgba(255,255,255,0.28)", whiteSpace: "nowrap" }}>{s}<span style={{ margin: "0 18px", color: "#C12B2B", fontSize: 7 }}>●</span></span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ===== TRUSTED BY THE WORLD'S BEST — Authority + Social Proof ===== */}
      <section id="trusted" data-animate style={{ padding: "80px 24px", background: "white" }}>
        <div className={`fade-up ${vis("trusted") ? "visible" : ""}`} style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="slabel">TRUSTED BY THE WORLD'S BEST</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.8vw, 40px)", marginBottom: 6 }}>
              Athletes. Doctors. 300,000+ customers.<br /><em>They all drink IM8.</em>
            </h2>
          </div>

          {/* Three authority cards — Aryna, Ollie, Dr. Dawn */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 48 }}>
            {/* Aryna Sabalenka */}
            <div style={{ background: "linear-gradient(155deg, #111, #1A1212)", borderRadius: 16, padding: "28px 24px", color: "white", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #C12B2B, #FF6B6B)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #C12B2B33, #C12B2B11)", border: "2px solid rgba(193,43,43,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>🎾</div>
                <div>
                  <div style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 16 }}>Aryna Sabalenka</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 11.5, color: "rgba(255,255,255,0.4)" }}>World No. 1 Tennis Player</div>
                </div>
              </div>
              <p style={{ fontFamily: "'Playfair Display'", fontSize: 16, fontStyle: "italic", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, marginBottom: 12 }}>
                "IM8 has become part of my daily routine. When you compete at the highest level, nutrition isn't optional — it's everything. I trust IM8 because the science is real."
              </p>
              <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,0.2)" }}>NSF CERTIFIED FOR SPORT — WADA COMPLIANT</div>
            </div>

            {/* Ollie Bearman */}
            <div style={{ background: "linear-gradient(155deg, #111, #0D1518)", borderRadius: 16, padding: "28px 24px", color: "white", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #2563EB, #60A5FA)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #2563EB33, #2563EB11)", border: "2px solid rgba(37,99,235,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>🏎️</div>
                <div>
                  <div style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 16 }}>Ollie Bearman</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 11.5, color: "rgba(255,255,255,0.4)" }}>Formula 1 Driver · Global Ambassador & Shareholder</div>
                </div>
              </div>
              <p style={{ fontFamily: "'Playfair Display'", fontSize: 16, fontStyle: "italic", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, marginBottom: 12 }}>
                "As the youngest British F1 driver, I need every edge. IM8 gives me the daily nutrition foundation so I can focus on what matters — performance on race day."
              </p>
              <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,0.2)" }}>YOUNGEST EVER BRITISH F1 DRIVER</div>
            </div>

            {/* Dr. Dawn Mussallem */}
            <div style={{ background: "linear-gradient(155deg, #111, #18150D)", borderRadius: 16, padding: "28px 24px", color: "white", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #F5C842, #E8A838)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #F5C84233, #F5C84211)", border: "2px solid rgba(245,200,66,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>🩺</div>
                <div>
                  <div style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 16 }}>Dr. Dawn Mussallem</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 11.5, color: "rgba(255,255,255,0.4)" }}>CMO, Fountain Life · Integrative Oncologist, Mayo Clinic</div>
                </div>
              </div>
              <p style={{ fontFamily: "'Playfair Display'", fontSize: 16, fontStyle: "italic", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, marginBottom: 12 }}>
                "The PRO formulation is a significant leap forward. By upgrading to bioactive forms and clinical dosages, we're delivering cellular support rarely seen in a single product. This is clinical-grade nutrition."
              </p>
              <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,0.2)" }}>IM8 SCIENTIFIC ADVISORY BOARD</div>
            </div>
          </div>

          {/* Customer social proof wall */}
          <div style={{ marginBottom: 0 }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px, 2.5vw, 28px)" }}>
                11,825 verified reviews. 4.8 out of 5.
              </h3>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#999", marginTop: 4 }}>
                Over 300,000 customer purchases — more than 6 million servings worldwide.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
              {[
                { name: "Lisa T.", text: "I've felt great, energetic, and sleeping better since starting a month ago. I hope this replaces most of my vitamins.", tag: "MORE ENERGY" },
                { name: "Charlie W.", text: "After about 2 weeks, my wife said 'What's got into you, would you slow down!' That tells you everything.", tag: "FAMILY NOTICED" },
                { name: "Tim B.", text: "I spent $300+/month on 20+ supplements. IM8 saves me thousands and my annual bloodwork shows better numbers across the board.", tag: "SAVED $3,000+/YR" },
                { name: "Jennifer D.", text: "Both my partner and I feel more energy, brain clarity, and improved well-being. We tell all our friends.", tag: "COUPLE'S RITUAL" },
                { name: "Erika F.", text: "I absolutely love IM8. I see a difference with my gut health and immune system. I have been spreading the word about this great product.", tag: "GUT HEALTH" },
                { name: "Trina F.", text: "The taste is so delicious. I tried AG1 but had terrible stomach upset and had to stop. IM8 works beautifully for me.", tag: "SWITCHED FROM AG1" },
              ].map((r, i) => (
                <div key={i} className="card-hover" style={{ background: "#FAFAF8", borderRadius: 12, padding: "20px 16px", border: "1px solid #E8E3DB" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ color: "#E8A838", fontSize: 12, letterSpacing: 1 }}>★★★★★</span>
                    <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 8, letterSpacing: 1.5, color: "#BBB", fontWeight: 600 }}>{r.tag}</span>
                  </div>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#444", lineHeight: 1.55, marginBottom: 10 }}>"{r.text}"</p>
                  <div style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 11, color: "#BBB" }}>— {r.name}, Verified Customer</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE PRO LAUNCH EVENT ===== */}
      <section id="event" data-animate style={{ padding: "80px 24px", background: "#F5F0EA" }}>
        <div className={`fade-up ${vis("event") ? "visible" : ""}`} style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span className="slabel">LIMITED TIME — MARCH ONLY</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.8vw, 42px)", marginBottom: 6 }}>The Pro Launch Event</h2>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 14.5, color: "#888", maxWidth: 440, margin: "0 auto 24px" }}>
              New formula. New flavours. Spring launch pricing to celebrate the reset. When March ends, full price resumes.
            </p>
            <div style={{ display: "inline-flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              {[{ val: timeLeft.days, l: "DAYS" }, { val: timeLeft.hours, l: "HRS" }, { val: timeLeft.mins, l: "MIN" }, { val: timeLeft.secs, l: "SEC" }].map((t, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div className="cd">{String(t.val).padStart(2, "0")}</div>
                  <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 8.5, letterSpacing: 2, color: "#AAA", marginTop: 4 }}>{t.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* === HERO OFFER: THE BECKHAM STACK (full-width, dominant) === */}
          <div className="card-hover" style={{
            background: "linear-gradient(150deg, #111, #1A0F0F)", color: "white",
            borderRadius: 16, padding: "32px 28px", border: "1px solid rgba(193,43,43,0.15)", marginBottom: 14,
            display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 28, alignItems: "center",
          }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 2.5, color: "#F5C842", marginBottom: 14, fontWeight: 600 }}>
                🏆 BEST VALUE — DAVID'S DAILY RITUAL
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 28, marginBottom: 4, lineHeight: 1.15 }}>The Beckham Stack</h3>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 14, opacity: 0.5, marginBottom: 16, lineHeight: 1.5 }}>
                Essentials Pro + Daily Ultimate Longevity. The complete daily ritual David takes every morning. Core nutrition + cellular science in two drinks.
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                <span style={{ fontFamily: "'Playfair Display'", fontSize: 40, fontWeight: 700 }}>$156.60</span>
                <span style={{ fontFamily: "'DM Sans'", fontSize: 16, textDecoration: "line-through", opacity: 0.3 }}>$261</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 12, fontWeight: 700, background: "rgba(193,43,43,0.2)", color: "#FF6B6B", padding: "3px 12px", borderRadius: 4 }}>40% OFF</span>
                <span style={{ fontFamily: "'DM Sans'", fontSize: 13, opacity: 0.35 }}>= $5.22/day for total body + longevity</span>
              </div>
              <button className="btn-primary" style={{ width: "100%", padding: "16px" }}>ADD THE BECKHAM STACK TO CART</button>
              <div style={{ textAlign: "center", marginTop: 10, fontFamily: "'DM Sans'", fontSize: 10.5, opacity: 0.3 }}>Free shipping · Cancel anytime</div>
              {/* Guarantee badges */}
              <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "center" }}>
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", textAlign: "center", flex: 1 }}>
                  <div style={{ fontFamily: "'Playfair Display'", fontSize: 18, fontWeight: 700, color: "#F5C842" }}>90</div>
                  <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 8, letterSpacing: 1.5, color: "rgba(255,255,255,0.3)" }}>DAY GUARANTEE</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 9, color: "rgba(255,255,255,0.2)", marginTop: 1 }}>Quarterly plan</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", textAlign: "center", flex: 1 }}>
                  <div style={{ fontFamily: "'Playfair Display'", fontSize: 18, fontWeight: 700, color: "white" }}>30</div>
                  <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 8, letterSpacing: 1.5, color: "rgba(255,255,255,0.3)" }}>DAY GUARANTEE</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 9, color: "rgba(255,255,255,0.2)", marginTop: 1 }}>Monthly plan</div>
                </div>
              </div>
            </div>
            <div>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "24px 20px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,0.3)", marginBottom: 14 }}>WHY THE STACK WINS</div>
                {[
                  ["92 ingredients", "for daily core nutrition (Essentials Pro)"],
                  ["12 hallmarks of aging", "targeted (Longevity)"],
                  ["NMN 300mg + Spermidine", "for cellular renewal"],
                  ["40% off", "— biggest discount, March only"],
                  ["Save more", "vs buying both separately at 35%"],
                ].map(([bold, rest], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: i < 4 ? 10 : 0 }}>
                    <span style={{ color: "#C12B2B", fontSize: 13, marginTop: 1, flexShrink: 0 }}>✓</span>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>
                      <strong style={{ color: "white" }}>{bold}</strong> {rest}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "10px 0" }}>
            <div style={{ flex: 1, height: 1, background: "#DDD5C8" }} />
            <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 2.5, color: "#BBB" }}>OR START WITH ONE</span>
            <div style={{ flex: 1, height: 1, background: "#DDD5C8" }} />
          </div>

          {/* Secondary: Individual products */}
          <div className="offer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 6 }}>
            {[
              { name: "Essentials Pro", sub: "92 ingredients · 3 flavours · Enhanced formula", pct: "35", orig: "$89", sale: "$57.85", daily: "$1.93", tag: "JUST LAUNCHED — NEW FORMULA" },
              { name: "Daily Ultimate Longevity", sub: "NMN, Spermidine, Resveratrol — 12 hallmarks of aging", pct: "35", orig: "$119", sale: "$77.35", daily: "$2.58", tag: "ADVANCED CELLULAR SCIENCE" },
            ].map((o, i) => (
              <div key={i} className="card-hover" style={{ background: "white", color: "#111", borderRadius: 14, padding: "22px 20px", border: "1px solid #E5DFD5" }}>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 2, color: "#AAA", marginBottom: 12, fontWeight: 600 }}>{o.tag}</div>
                <h3 style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 16, marginBottom: 3 }}>{o.name}</h3>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 12, opacity: 0.5, marginBottom: 14, lineHeight: 1.4 }}>{o.sub}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginBottom: 3 }}>
                  <span style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 700 }}>{o.sale}</span>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 13, textDecoration: "line-through", opacity: 0.3 }}>{o.orig}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, fontWeight: 600, background: "#FFF0F0", color: "#C12B2B", padding: "2px 8px", borderRadius: 4 }}>{o.pct}% OFF</span>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 11, opacity: 0.35 }}>= {o.daily}/day</span>
                </div>
                <button style={{ width: "100%", padding: "11px", background: "#111", color: "white", border: "none", borderRadius: 7, fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>ADD TO CART</button>
                <p style={{ textAlign: "center", marginTop: 8, fontFamily: "'DM Sans'", fontSize: 10, color: "#BBB" }}>
                  90-day guarantee (quarterly) · 30-day (monthly) · <span style={{ textDecoration: "underline", cursor: "pointer" }}>Get both in the Beckham Stack →</span>
                </p>
              </div>
            ))}
          </div>

          {/* === AWARENESS FORK (Schwartz) — both paths lead to Stack === */}
          <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ background: "white", borderRadius: 12, padding: "20px 18px", border: "1px solid #E5DFD5", textAlign: "center" }}>
              <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 2, color: "#AAA", marginBottom: 8 }}>NEW TO IM8?</div>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 13.5, color: "#555", lineHeight: 1.5, marginBottom: 12 }}>
                This spring, replace your cabinet of bottles with one daily ritual. The Beckham Stack gives you <strong>everything</strong> — core nutrition + longevity — at the steepest discount.
              </p>
              <button style={{ padding: "10px 24px", background: "#C12B2B", color: "white", border: "none", borderRadius: 6, fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>GET THE FULL STACK — 40% OFF →</button>
            </div>
            <div style={{ background: "white", borderRadius: 12, padding: "20px 18px", border: "1px solid #E5DFD5", textAlign: "center" }}>
              <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 2, color: "#AAA", marginBottom: 8 }}>ALREADY TAKING ESSENTIALS?</div>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 13.5, color: "#555", lineHeight: 1.5, marginBottom: 12 }}>
                You've been auto-upgraded to PRO — same price, better formula. Ready for the next level? Add Longevity and complete the Beckham Stack at <strong>40% off</strong>.
              </p>
              <button style={{ padding: "10px 24px", background: "transparent", color: "#111", border: "2px solid #111", borderRadius: 6, fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>UPGRADE TO THE STACK →</button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* BECKHAM STACK COST MODULE */}
      {/* ============================== */}
      <section id="the-math" data-animate style={{ background: "#FAFAF8", padding: "80px 24px" }}>
        <div className={`fade-up ${vis("the-math") ? "visible" : ""}`} style={{ maxWidth: 1000, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="slabel">THE REAL COST OF HEALTH</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4.2vw, 46px)", color: "#111", lineHeight: 1.12, marginBottom: 10 }}>
              The Beckham Stack Replaces<br /><em style={{ fontWeight: 400 }}>20+ Supplements</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: "#999", maxWidth: 520, margin: "0 auto" }}>
              One drink. One morning ritual. Core nutrition + advanced longevity science. Here's what you'd pay to buy it all separately.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="cost-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.7fr", gap: 48, alignItems: "start" }}>

            {/* LEFT: Savings circle + CTA */}
            <div className="cost-sticky" style={{ position: "sticky", top: 40 }}>
              <div style={{
                width: 195, height: 195, borderRadius: "50%",
                background: "linear-gradient(145deg, #1A0A0A, #2A1515)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                margin: "0 auto", boxShadow: "0 16px 48px rgba(0,0,0,0.15)",
              }}>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 8.5, letterSpacing: 2.5, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 5 }}>Annual Savings</div>
                <div style={{ fontFamily: "'Playfair Display'", fontSize: 28, fontWeight: 700, color: "#F5C842", lineHeight: 1.1 }}>${costAnnualSavings.toLocaleString()}+</div>
                <div style={{ fontFamily: "'Playfair Display'", fontSize: 15, color: "rgba(255,255,255,0.65)" }}>per year</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 9.5, color: "rgba(255,255,255,0.3)", marginTop: 5, textAlign: "center", lineHeight: 1.3 }}>when switching to the<br />Beckham Stack</div>
              </div>
              <div style={{ textAlign: "center", marginTop: 22 }}>
                <button className="pulse" style={{ padding: "14px 30px", background: "#C12B2B", color: "white", border: "none", borderRadius: 8, fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 12.5, letterSpacing: 0.5, cursor: "pointer", textTransform: "uppercase", boxShadow: "0 8px 24px rgba(193,43,43,0.25)" }}>
                  Get The Beckham Stack — 40% Off →
                </button>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 10.5, color: "#BBB", marginTop: 8, cursor: "pointer", textDecoration: "underline" }}>View full supplement facts</div>
              </div>
            </div>

            {/* RIGHT: Monthly Breakdown */}
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#111", marginBottom: 24 }}>Monthly breakdown</h3>

              {/* Essentials Pro — collapsible */}
              <div style={{ marginBottom: 10 }}>
                <button onClick={() => setEssentialsOpen(!essentialsOpen)} style={{
                  width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "14px 16px", background: essentialsOpen ? "rgba(193,43,43,0.03)" : "white",
                  border: "1.5px solid #E5DFD5", borderRadius: essentialsOpen ? "12px 12px 0 0" : 12, cursor: "pointer", transition: "all 0.2s ease",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#C12B2B", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 700, color: "#111" }}>Essentials Pro</span>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#999" }}>92 ingredients · 9 categories</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                    <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 15, fontWeight: 700, color: "#C12B2B" }}>${essentialsSubtotal}/mo</span>
                    <span style={{ fontSize: 14, color: "#AAA", transition: "transform 0.2s ease", transform: essentialsOpen ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}>▾</span>
                  </div>
                </button>
                {essentialsOpen && (
                  <div style={{ border: "1.5px solid #E5DFD5", borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden" }}>
                    {essentialsCostItems.map((item, i) => (
                      <div key={`e-${i}`} className="row-anim" onMouseEnter={() => setHoveredCostRow(i)} onMouseLeave={() => setHoveredCostRow(-1)} style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "10px 16px 10px 28px",
                        borderBottom: i < essentialsCostItems.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none",
                        background: hoveredCostRow === i ? "rgba(193,43,43,0.03)" : "white",
                        transition: "background 0.15s ease", animationDelay: `${i * 0.03}s`, position: "relative",
                      }}>
                        <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
                          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#C12B2B", opacity: 0.4 }} />
                        </div>
                        <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#555", fontWeight: 500 }}>{item.name}</span>
                        <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 13, color: "#999", fontWeight: 500, whiteSpace: "nowrap", marginLeft: 16 }}>${item.price} <span style={{ fontSize: 10.5, color: "#BBB" }}>USD</span></span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Plus divider */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "6px 0" }}>
                <div style={{ flex: 1, height: 1, background: "#E5DFD5" }} />
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#111", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display'", fontSize: 15, fontWeight: 700 }}>+</div>
                <div style={{ flex: 1, height: 1, background: "#E5DFD5" }} />
              </div>

              {/* Longevity — collapsible */}
              <div style={{ marginBottom: 4 }}>
                <button onClick={() => setLongevityOpen(!longevityOpen)} style={{
                  width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "14px 16px", background: longevityOpen ? "rgba(245,200,66,0.04)" : "white",
                  border: "1.5px solid #E5DFD5", borderRadius: longevityOpen ? "12px 12px 0 0" : 12, cursor: "pointer", transition: "all 0.2s ease",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F5C842", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 700, color: "#111" }}>Daily Ultimate Longevity</span>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#999" }}>5 complexes · 10 compounds</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                    <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 15, fontWeight: 700, color: "#B8960A" }}>${longevitySubtotal}/mo</span>
                    <span style={{ fontSize: 14, color: "#AAA", transition: "transform 0.2s ease", transform: longevityOpen ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}>▾</span>
                  </div>
                </button>
                {longevityOpen && (
                  <div style={{ border: "1.5px solid #E5DFD5", borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden" }}>
                    {longevityCostItems.map((item, i) => {
                      const gi = essentialsCostItems.length + i;
                      return (
                        <div key={`l-${i}`} className="row-anim" onMouseEnter={() => setHoveredCostRow(gi)} onMouseLeave={() => setHoveredCostRow(-1)} style={{
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                          padding: "10px 16px 10px 28px",
                          borderBottom: i < longevityCostItems.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none",
                          background: hoveredCostRow === gi ? "rgba(245,200,66,0.05)" : "white",
                          transition: "background 0.15s ease", animationDelay: `${i * 0.03}s`, position: "relative",
                        }}>
                          <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
                            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#F5C842", opacity: 0.5 }} />
                          </div>
                          <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#555", fontWeight: 500 }}>{item.name}</span>
                          <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 13, color: "#999", fontWeight: 500, whiteSpace: "nowrap", marginLeft: 16 }}>${item.price} <span style={{ fontSize: 10.5, color: "#BBB" }}>USD</span></span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Total comparison box */}
              <div style={{ marginTop: 20, borderRadius: 14, overflow: "hidden", border: "1.5px solid #E5DFD5" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "#FAFAF8", borderBottom: "1.5px solid #E5DFD5" }}>
                  <div>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: 14.5, color: "#777" }}>Your Traditional Supplements</span>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: 10.5, color: "#BBB", marginTop: 1 }}>20+ individual products</div>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 18, color: "#C12B2B", fontWeight: 700, textDecoration: "line-through", textDecorationColor: "rgba(193,43,43,0.4)" }}>
                    ${costGrandTotal} <span style={{ fontSize: 12, fontWeight: 500, color: "#999", textDecoration: "none" }}>USD/mo</span>
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "white" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: 14.5, fontWeight: 700, color: "#111" }}>The Beckham Stack</span>
                    <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, background: "#FFF0F0", color: "#C12B2B", fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>40% OFF</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 18, color: "#111", fontWeight: 700 }}>${stackPrice.toFixed(2)} <span style={{ fontSize: 12, fontWeight: 500, color: "#999" }}>USD/mo</span></span>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: 10.5, color: "#AAA", marginTop: 1 }}>= ${stackDailyCost}/day · Quarterly subscription</div>
                  </div>
                </div>
                <div style={{ background: "linear-gradient(90deg, #111, #1A0F0F)", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "rgba(255,255,255,0.55)" }}>You save every month</span>
                  <span style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 700, color: "#F5C842" }}>${Math.round(costMonthlySavings)}+</span>
                </div>
              </div>

              <p style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#BBB", marginTop: 14, lineHeight: 1.55 }}>
                Prices based on average retail cost of individual branded supplements at comparable dosages (Amazon, iHerb, brand direct — Feb 2026).
                The Beckham Stack price reflects the March Pro Launch Event 40% off quarterly subscription rate.
                Both Essentials Pro and Daily Ultimate Longevity are combined into one drink as part of a single daily morning ritual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRO UPGRADE TABLE ===== */}
      <section id="upgrades" data-animate style={{ padding: "88px 24px", background: "white" }}>
        <div className={`fade-up ${vis("upgrades") ? "visible" : ""}`} style={{ maxWidth: 920, margin: "0 auto" }}>
          <span className="slabel">WHAT CHANGED IN ESSENTIALS PRO</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3.5vw, 38px)", marginBottom: 6 }}>
            Every ingredient re-engineered.<br /><em>Here's the evidence.</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 14.5, color: "#888", marginBottom: 36, maxWidth: 480 }}>
            Not just "more." Bioactive forms your cells use immediately — no conversion step, no waste. Verified by our Scientific Advisory Board.
          </p>

          <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #E5DFD5" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr 1fr 1fr 2fr", padding: "11px 18px", background: "#111", gap: 6 }}>
              {["INGREDIENT", "BEFORE", "PRO", "CHANGE", "WHY IT MATTERS TO YOU"].map((h, i) => (
                <span key={i} style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,0.35)" }}>{h}</span>
              ))}
            </div>
            {proUpgrades.map((row, i) => (
              <div key={i} className="upgrade-row" style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr 1fr 1fr 2fr", padding: "13px 18px", background: i % 2 === 0 ? "#FAFAF8" : "white", gap: 6, alignItems: "center" }}>
                <span style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 12.5 }}>{row.ingredient}</span>
                <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 11.5, color: "#BBB" }}>{row.from}</span>
                <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 11.5, fontWeight: 600, color: "#111" }}>{row.to}</span>
                <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 10.5, fontWeight: 600, color: row.color, background: row.color === "#C12B2B" ? "#FFF0F0" : row.color === "#2563EB" ? "#EFF6FF" : "#F0FFF4", padding: "2px 8px", borderRadius: 4, display: "inline-block", width: "fit-content" }}>{row.boost}</span>
                <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#666", lineHeight: 1.35 }}>{row.benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE STACK ESCALATION — "You've seen the foundation. Here's the full picture." ===== */}
      <section id="stack-why" data-animate style={{ padding: "72px 24px", background: "#F5F0EA" }}>
        <div className={`fade-up ${vis("stack-why") ? "visible" : ""}`} style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span className="slabel">THE COMPLETE DAILY RITUAL</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3.5vw, 36px)", marginBottom: 6 }}>
              Essentials Pro feeds your body today.<br /><em>Longevity protects it for decades.</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#888", maxWidth: 460, margin: "0 auto" }}>
              David takes both every morning. Together, they're called the Beckham Stack — and in March, it's 40% off.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16, alignItems: "stretch" }}>
            {/* Essentials Pro card */}
            <div style={{ background: "white", borderRadius: 14, padding: "24px 20px", border: "1px solid #E5DFD5" }}>
              <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 2, color: "#AAA", marginBottom: 10 }}>MORNING DRINK ONE</div>
              <h3 style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Essentials Pro</h3>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 12.5, color: "#777", lineHeight: 1.5, marginBottom: 12 }}>
                92 ingredients. 9 organ systems. Core vitamins, minerals, probiotics, superfoods, adaptogens, electrolytes, and more.
              </p>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#555" }}>
                {["Energy + focus", "Gut health", "Immune defense", "Joint + muscle", "Skin + hair"].map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <span style={{ color: "#16803C", fontSize: 11 }}>✓</span> {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Plus sign */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#1A1A1A", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 700 }}>+</div>
            </div>

            {/* Longevity card */}
            <div style={{ background: "white", borderRadius: 14, padding: "24px 20px", border: "1px solid #E5DFD5" }}>
              <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 2, color: "#AAA", marginBottom: 10 }}>MORNING DRINK TWO</div>
              <h3 style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Daily Ultimate Longevity</h3>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 12.5, color: "#777", lineHeight: 1.5, marginBottom: 12 }}>
                The world's first supplement targeting all 12 hallmarks of aging. NMN, Spermidine, Resveratrol, Fisetin, and more.
              </p>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#555" }}>
                {["Cellular renewal (autophagy)", "NAD+ energy (NMN 300mg)", "Senolytic protection", "Telomere support", "Metabolic optimization"].map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <span style={{ color: "#2563EB", fontSize: 11 }}>✓</span> {b}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stack CTA */}
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <div style={{ display: "inline-flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#777" }}>Separate:</span>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 16, textDecoration: "line-through", color: "#999" }}>$208/mo</span>
              <span style={{ fontFamily: "'Playfair Display'", fontSize: 14, color: "#777" }}>→</span>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#777" }}>The Beckham Stack:</span>
              <span style={{ fontFamily: "'Playfair Display'", fontSize: 24, fontWeight: 700, color: "#111" }}>$156.60/mo</span>
              <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, fontWeight: 600, background: "#FFF0F0", color: "#C12B2B", padding: "2px 10px", borderRadius: 4 }}>40% OFF</span>
            </div>
            <div>
              <button className="btn-primary" style={{ padding: "15px 40px" }}>GET THE BECKHAM STACK →</button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FLAVOURS ===== */}
      <section id="flavours" data-animate style={{ padding: "88px 24px", background: "#FAFAF8" }}>
        <div className={`fade-up ${vis("flavours") ? "visible" : ""}`} style={{ maxWidth: 1000, margin: "0 auto" }}>
          <span className="slabel">ONE FORMULA — THREE WAYS</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3.5vw, 38px)", marginBottom: 6 }}>Pick your morning ritual.</h2>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 14.5, color: "#888", marginBottom: 36, maxWidth: 440 }}>Every flavour delivers all 92 clinically-dosed ingredients. The only question is taste.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 14 }}>
            {flavours.map((f, i) => (
              <div key={i} className="fl-card" onClick={() => setActiveFlavour(i)} style={{ background: "white", borderRadius: 16, padding: "26px 20px", borderColor: activeFlavour === i ? f.color : "transparent", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${f.color}, ${f.accent})` }} />
                {f.tag === "NEW" && <span style={{ position: "absolute", top: 14, right: 14, fontFamily: "'JetBrains Mono'", fontSize: 8.5, letterSpacing: 2, color: "#C12B2B", fontWeight: 700, background: "#FFF0F0", padding: "2px 9px", borderRadius: 100 }}>NEW</span>}
                <div style={{ width: 56, height: 56, borderRadius: 14, background: `linear-gradient(135deg, ${f.color}12, ${f.accent}18)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 14 }}>{f.emoji}</div>
                <h3 style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 16, marginBottom: 5 }}>{f.name}</h3>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 12.5, color: "#888", lineHeight: 1.5, marginBottom: 18 }}>{f.desc}</p>
                <button style={{ width: "100%", padding: "11px", background: f.color, color: "white", border: "none", borderRadius: 7, fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 11.5, cursor: "pointer", letterSpacing: 0.5, textTransform: "uppercase" }}>Shop {f.name}</button>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 16, fontFamily: "'DM Sans'", fontSize: 12.5, color: "#AAA" }}>Can't decide? The <strong style={{ color: "#555" }}>Variety Pack</strong> gives you 10 sachets of each.</p>
        </div>
      </section>

      {/* ===== CLINICAL PROOF ===== */}
      <section id="clinical" data-animate style={{ background: "#0A0A0A", padding: "88px 24px", color: "white" }}>
        <div className={`fade-up ${vis("clinical") ? "visible" : ""}`} style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <span className="slabel" style={{ color: "rgba(255,255,255,0.2)" }}>12-WEEK RANDOMIZED CLINICAL TRIAL</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3.5vw, 38px)", marginBottom: 44 }}>
            "You'll actually feel it."<br /><em>Here's the proof.</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 28 }}>
            {[{ p: "87%", l: "More Energy", s: "Noticeable daily boost" }, { p: "89%", l: "Better Digestion", s: "Less bloating" }, { p: "83%", l: "Better Sleep", s: "Improved rest quality" }, { p: "85%", l: "Sharper Focus", s: "Enhanced clarity" }].map((s, i) => (
              <div key={i}>
                <div className="stat-big" style={{ fontFamily: "'Playfair Display'", fontSize: 52, fontWeight: 700, color: "#C12B2B", lineHeight: 1 }}>{s.p}</div>
                <div style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 14, marginTop: 7 }}>{s.l}</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 11.5, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>{s.s}</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "rgba(255,255,255,0.15)", marginTop: 28 }}>San Francisco Research Institute · ClinicalTrials.gov: NCT06655597</p>
        </div>
      </section>

      {/* ===== 9 ORGANS ===== */}

      {/* ===== COMPETITOR COMPARISON (Guarantee Touchpoint 5) ===== */}
      <section id="compare" data-animate style={{ padding: "80px 24px", background: "#FAFAF8" }}>
        <div className={`fade-up ${vis("compare") ? "visible" : ""}`} style={{ maxWidth: 800, margin: "0 auto" }}>
          <span className="slabel">HOW IM8 COMPARES</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3.5vw, 36px)", marginBottom: 6 }}>
            More ingredients. Better guarantee.<br /><em>Lower price.</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#888", marginBottom: 28, maxWidth: 420 }}>
            We let the numbers do the talking.
          </p>

          <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #E5DFD5" }}>
            {/* Header row */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1.3fr 1fr 1fr", padding: "12px 18px", background: "#111", gap: 6 }}>
              {["", "IM8 ESSENTIALS PRO", "AG1", "OTHERS (AVG)"].map((h, i) => (
                <span key={i} style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 1.5, color: i === 1 ? "#F5C842" : "rgba(255,255,255,0.35)", fontWeight: i === 1 ? 700 : 500 }}>{h}</span>
              ))}
            </div>
            {/* Data rows */}
            {[
              { label: "Ingredients", im8: "92", ag1: "75", other: "30–50", highlight: false },
              { label: "Money-Back Guarantee", im8: "90 Days", ag1: "60 Days", other: "30 Days", highlight: true },
              { label: "Registered Clinical Trial", im8: "✓", ag1: "✗", other: "✗", highlight: false },
              { label: "NSF Certified for Sport", im8: "✓", ag1: "✓", other: "Varies", highlight: false },
              { label: "Price per Day", im8: "$1.93", ag1: "$2.63", other: "$1.50–$3.00", highlight: false },
              { label: "Flavour Options", im8: "3", ag1: "1", other: "1–2", highlight: false },
            ].map((row, i) => (
              <div key={i} className="upgrade-row" style={{
                display: "grid", gridTemplateColumns: "2fr 1.3fr 1fr 1fr",
                padding: "13px 18px", gap: 6, alignItems: "center",
                background: row.highlight ? "#FFF8F0" : (i % 2 === 0 ? "#FAFAF8" : "white"),
                borderLeft: row.highlight ? "3px solid #F5C842" : "3px solid transparent",
              }}>
                <span style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 12.5 }}>{row.label}</span>
                <span style={{
                  fontFamily: "'JetBrains Mono'", fontSize: 12, fontWeight: 700,
                  color: row.im8 === "✓" ? "#16803C" : "#111",
                }}>{row.im8}</span>
                <span style={{
                  fontFamily: "'JetBrains Mono'", fontSize: 11.5,
                  color: row.ag1 === "✗" ? "#C12B2B" : "#888",
                }}>{row.ag1}</span>
                <span style={{
                  fontFamily: "'JetBrains Mono'", fontSize: 11.5,
                  color: row.other === "✗" ? "#C12B2B" : "#888",
                }}>{row.other}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9 ORGANS ===== */}
      <section id="organs" data-animate style={{ padding: "88px 24px", background: "white" }}>
        <div className={`fade-up ${vis("organs") ? "visible" : ""}`} style={{ maxWidth: 900, margin: "0 auto" }}>
          <span className="slabel">COMPREHENSIVE BODY SUPPORT</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3.5vw, 38px)", marginBottom: 6 }}>
            One serving. Nine organ systems.<br /><em>Every base covered.</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 14.5, color: "#888", marginBottom: 24, maxWidth: 460 }}>Most people patch their health together with guesswork and half-measures. One serving of Essentials Pro gives your entire body what it needs:</p>

          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 18 }}>
            {organs.map((o, i) => <button key={i} className={`organ-pill ${activeOrgan === i ? "active" : ""}`} onClick={() => setActiveOrgan(i)}>{o.icon} {o.name}</button>)}
          </div>
          <div style={{ background: "#FAFAF8", borderRadius: 14, padding: "24px 22px", border: "1px solid #E5DFD5", minHeight: 90 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 26 }}>{organs[activeOrgan].icon}</span>
              <h3 style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 18 }}>{organs[activeOrgan].name} Support</h3>
            </div>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 13.5, color: "#555", lineHeight: 1.6 }}>{organs[activeOrgan].detail}</p>
          </div>
        </div>
      </section>

      {/* ===== BECKHAM QUOTE ===== */}
      <section style={{ background: "#080808", padding: "72px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Playfair Display'", fontSize: 68, color: "rgba(193,43,43,0.25)", lineHeight: 0.8, marginBottom: 6 }}>"</div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(17px, 2.3vw, 24px)", color: "white", lineHeight: 1.6, fontStyle: "italic", marginBottom: 20 }}>
            I wanted to create a one-stop shop — one product that actually does it all. Since taking IM8 daily, I've felt more energy, better focus, and a stronger sense of wellness.
          </p>
          <div style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 12, color: "white", letterSpacing: 1.5 }}>DAVID BECKHAM</div>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 10.5, color: "rgba(255,255,255,0.25)", marginTop: 3 }}>Co-Founding Partner, IM8 Health</div>
        </div>
      </section>

      {/* ===== SCIENCE — DR. DAWN-LED + FULL ADVISORY BOARD ===== */}
      <section id="sab" data-animate style={{ padding: "80px 24px", background: "#FAFAF8" }}>
        <div className={`fade-up ${vis("sab") ? "visible" : ""}`} style={{ maxWidth: 960, margin: "0 auto" }}>
          <span className="slabel">WORLD-CLASS SCIENTIFIC EXPERTISE</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3vw, 36px)", marginBottom: 32, textAlign: "center" }}>
            Developed with experts from<br />Mayo Clinic · NASA · Cedars-Sinai
          </h2>

          {/* Dr. Dawn featured quote */}
          <div style={{ background: "white", borderRadius: 16, padding: "32px 28px", border: "1px solid #E5DFD5", marginBottom: 28, display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #E8E3DB, #D4CCBE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 8px" }}>🩺</div>
              <div style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 13 }}>Dr. Dawn Mussallem</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "#999", lineHeight: 1.3, marginTop: 2 }}>CMO, Fountain Life<br />Integrative Oncologist,<br />Mayo Clinic</div>
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: 28, color: "#C12B2B", lineHeight: 0.8, marginBottom: 8 }}>"</div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontStyle: "italic", color: "#333", lineHeight: 1.6, marginBottom: 10 }}>
                The PRO formulation is a significant leap forward in daily nutrition. By upgrading to bioactive forms like P5P and significantly increasing dosages like B12 and Vitamin D, we are delivering cellular support rarely seen in a single product.
              </p>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#777", lineHeight: 1.5 }}>
                A stage IV cancer survivor and heart transplant recipient, Dr. Mussallem became the first person to complete a marathon after heart transplantation. She brings over 20 years at Mayo Clinic to the IM8 Scientific Advisory Board.
              </p>
            </div>
          </div>

          {/* Rest of advisory board */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20 }}>
            {[
              { n: "Prof. Suzanne Devkota", t: "Director, Cedars-Sinai Microbiome Institute", spec: "Gut microbiome" },
              { n: "Dr. James L. Green", t: "Former Chief Scientist, NASA (42 yrs)", spec: "Space & longevity" },
              { n: "Dr. James DiNicolantonio", t: "Cardiovascular Scientist · 300+ papers", spec: "Heart health" },
              { n: "Dr. Amy Shah", t: "Double-Board Certified Physician", spec: "Gut & hormones" },
              { n: "Dr. Jeremy London", t: "Board Certified Cardiovascular Surgeon", spec: "Heart surgery" },
              { n: "Dr. Ara Suppiah", t: "Sports Physician · Head of Medical, LIV Golf", spec: "Performance" },
              { n: "Dr. Darshan Shah", t: "Founder, Next Health · Board Certified Surgeon", spec: "Longevity" },
              { n: "Simon Hill", t: "MSc Nutritionist · Host of The Proof podcast", spec: "Nutrition science" },
            ].map((d, i) => (
              <div key={i} style={{ width: 120, textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #E8E3DB, #D4CCBE)", margin: "0 auto 6px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display'", fontSize: 16, fontWeight: 700, color: "#888" }}>{d.n.split(" ").pop()[0]}</div>
                <div style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 10.5 }}>{d.n}</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 9, color: "#AAA", marginTop: 1 }}>{d.t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GUARANTEE — STANDALONE TRUST BLOCK ===== */}
      <section id="guarantee" data-animate style={{ padding: "72px 24px", background: "white" }}>
        <div className={`fade-up ${vis("guarantee") ? "visible" : ""}`} style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ background: "linear-gradient(155deg, #0A0A0A, #151010)", borderRadius: 20, padding: "48px 36px", color: "white", textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display'", fontSize: 48, fontWeight: 700, color: "#F5C842", marginBottom: 4 }}>Risk-Free</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 3vw, 32px)", marginBottom: 20 }}>
              Feel it, or get your money back.
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 480, margin: "0 auto 24px" }}>
              {/* 90-day */}
              <div style={{ background: "rgba(245,200,66,0.08)", border: "1px solid rgba(245,200,66,0.2)", borderRadius: 14, padding: "24px 16px" }}>
                <div style={{ fontFamily: "'Playfair Display'", fontSize: 42, fontWeight: 700, color: "#F5C842", lineHeight: 1 }}>90</div>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>DAY GUARANTEE</div>
                <div style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 14, marginTop: 8 }}>Quarterly Plan</div>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 6, lineHeight: 1.4 }}>
                  Three full months to experience the difference. If you don't feel it — complete refund, no questions.
                </p>
              </div>
              {/* 30-day */}
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "24px 16px" }}>
                <div style={{ fontFamily: "'Playfair Display'", fontSize: 42, fontWeight: 700, color: "white", lineHeight: 1 }}>30</div>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>DAY GUARANTEE</div>
                <div style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 14, marginTop: 8 }}>Monthly Plan</div>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 6, lineHeight: 1.4 }}>
                  A full month to feel the energy, the clarity, and the difference. Not convinced? Full refund.
                </p>
              </div>
            </div>

            <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "rgba(255,255,255,0.35)", maxWidth: 440, margin: "0 auto", lineHeight: 1.5 }}>
              Over 300,000 customers. 4.8/5 average rating. We're confident enough to bet on your experience — because 87% of clinical trial participants felt a noticeable difference.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAQ (Guarantee Touchpoint 6) ===== */}
      <section id="faq" data-animate style={{ padding: "72px 24px", background: "#FAFAF8" }}>
        <div className={`fade-up ${vis("faq") ? "visible" : ""}`} style={{ maxWidth: 700, margin: "0 auto" }}>
          <span className="slabel">FREQUENTLY ASKED QUESTIONS</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 3vw, 32px)", marginBottom: 28 }}>
            Everything you need to know.
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 0, borderRadius: 14, overflow: "hidden", border: "1px solid #E5DFD5" }}>
            {[
              {
                q: "What is your money-back guarantee policy?",
                a: "We stand behind our products with a generous satisfaction guarantee. For quarterly (90-day) subscriptions, you have a full 90 days to try IM8 risk-free. For monthly subscriptions and one-time purchases, you have 30 days. Email care@im8health.com and we'll process a full refund. No questions asked."
              },
              {
                q: "How does the subscription work?",
                a: "Choose your plan — quarterly (best value, 90-day supply) or monthly. Your subscription auto-renews at the same price. Cancel anytime with one click — no penalties, no hoops. Quarterly subscribers also get our extended 90-day money-back guarantee."
              },
              {
                q: "What changed in Essentials Pro?",
                a: "The PRO formula includes significant upgrades: 733% more B12 (200mcg), a new 30mg Saffron Extract for focus, bioactive Vitamin B6 (P5P instead of HCl), increased Vitamin D3, K2, Magnesium, and MSM, plus 300% more of our CRT8™ Complex. Same price — better formula."
              },
              {
                q: "What's in the Beckham Stack?",
                a: "The Beckham Stack is David Beckham's personal daily ritual — Essentials Pro (92 ingredients for core nutrition) plus Daily Ultimate Longevity (targeting all 12 hallmarks of aging with NMN, Spermidine, Resveratrol, and more). Together they provide total body support plus advanced cellular science."
              },
              {
                q: "Is IM8 third-party tested?",
                a: "Yes. IM8 is NSF Certified for Sport (the gold standard for athletic supplements) and independently third-party tested for purity, potency, and banned substances. It's trusted by World No. 1 Aryna Sabalenka and F1 driver Ollie Bearman, both subject to rigorous anti-doping protocols."
              },
              {
                q: "How does it taste?",
                a: "IM8 comes in three flavours: Açaí + Mixed Berries (the original — earthy, hint of chocolate, berry finish), Lemon + Orange (bright citrus, refreshing), and Mango + Passion Fruit (tropical, sun-kissed). All three are naturally flavoured. Can't decide? The Variety Pack includes 10 sachets of each."
              },
            ].map((item, i) => (
              <div key={i} style={{ borderBottom: i < 5 ? "1px solid #E5DFD5" : "none" }}>
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? -1 : i)}
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "16px 20px", background: activeFaq === i ? "white" : "#FAFAF8",
                    border: "none", cursor: "pointer",
                    borderLeft: activeFaq === i ? "3px solid #C12B2B" : "3px solid transparent",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 600, color: "#111", textAlign: "left" }}>{item.q}</span>
                  <span style={{ fontFamily: "'Playfair Display'", fontSize: 20, color: "#C12B2B", flexShrink: 0, marginLeft: 12 }}>{activeFaq === i ? "−" : "+"}</span>
                </button>
                {activeFaq === i && (
                  <div style={{ padding: "0 20px 16px 23px", background: "white", borderLeft: "3px solid #C12B2B" }}>
                    <p style={{ fontFamily: "'DM Sans'", fontSize: 13.5, color: "#666", lineHeight: 1.65 }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section style={{ background: "linear-gradient(160deg, #060606, #150D0D, #060606)", padding: "88px 24px", textAlign: "center", color: "white" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 10.5, letterSpacing: 3, color: "#C12B2B", fontWeight: 600 }}>PRO LAUNCH EVENT — ENDS MARCH 31</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 42px)", lineHeight: 1.1, margin: "16px 0 10px" }}>
            One drink changed how<br />300,000 people feel every morning.
            <br /><em style={{ color: "#C12B2B" }}>Your turn.</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 14.5, color: "rgba(255,255,255,0.4)", marginBottom: 28, lineHeight: 1.6 }}>
            40% off the Beckham Stack. 35% off individual products. Three flavours. 90-day guarantee on quarterly plans. Your cabinet of bottles is ready to retire.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary pulse" style={{ fontSize: 15, padding: "18px 48px" }}>GET THE BECKHAM STACK — 40% OFF →</button>
            <button style={{ padding: "16px 32px", background: "transparent", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 13, border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, cursor: "pointer" }}>Or start with Essentials Pro</button>
          </div>
          <div style={{ display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
            {["90-day guarantee (quarterly)", "30-day guarantee (monthly)", "Free shipping", "Cancel anytime", "NSF Certified"].map((t, i) => (
              <span key={i} style={{ fontFamily: "'DM Sans'", fontSize: 10.5, color: "rgba(255,255,255,0.2)" }}>✓ {t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div style={{ background: "#030303", padding: "18px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 9.5, color: "rgba(255,255,255,0.12)", maxWidth: 540, margin: "0 auto", lineHeight: 1.5 }}>
          *These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease. **Free Welcome Kit for new subscribers only. © 2026 IM8® Health.
        </p>
      </div>
    </div>
  );
};


