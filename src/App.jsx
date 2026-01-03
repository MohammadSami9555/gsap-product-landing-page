import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {

  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const buttonRef = useRef(null);

  const [active, setActive] = useState("home");

  const goTo = (id) =>
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });

  useEffect(() => {

    // hero animation
    gsap.fromTo(
      [headingRef.current, paraRef.current, buttonRef.current],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );

    // section reveal
    ["features", "gallery", "last"].forEach((sec) => {
      gsap.from(`#${sec}`, {
        scrollTrigger: { trigger: `#${sec}`, start: "top 85%" },
        opacity: 0,
        y: 80,
        duration: 1,
      });
    });

    // Scroll active navbar
    ["features", "gallery", "last"].forEach((id) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        onEnter: () => setActive(id),
        onEnterBack: () => setActive(id),
      });
    });

  }, []);

  const btn = {
    padding: "10px 22px",
    borderRadius: "999px",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg,#22c55e,#16a34a)",
    color: "black",
  };

  return (
    <>

      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(10px)",
          color: "white",
          zIndex: 999,
        }}
      >
        <h3>GSAP Landing</h3>

        <div style={{ display: "flex", gap: "18px" }}>
          {["features", "gallery", "last"].map((x) => (
            <button
              key={x}
              onClick={() => goTo(x)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontWeight: 700,
                color: active === x ? "#22c55e" : "white",
              }}
            >
              {x.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section
        id="home"
        style={{
          paddingTop: "80px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          backgroundImage: "url('https://picsum.photos/1200/800')",
          backgroundSize: "cover",
          color: "white",
        }}
      >
        <h1 ref={headingRef}>GSAP Product Landing Page</h1>
        <p ref={paraRef}>Amazing animations powered by GSAP 🚀</p>

        <button ref={buttonRef} style={btn} onClick={() => goTo("features")}>
          Get Started
        </button>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        style={{
          height: "100vh",
          background: "#020617",
          color: "white",
          textAlign: "center",
          paddingTop: "80px",
        }}
      >
        <h2>✨ Powerful Features</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            marginTop: "40px",
          }}
        >
          {["Smooth Animations", "Scroll Trigger", "Parallax Effects"].map(
            (text, i) => (
              <div
                key={i}
                style={{
                  padding: "20px 30px",
                  borderRadius: "18px",
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(8px)",
                  cursor: "pointer",
                  transition: "all .25s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)";
                  e.target.style.background = "rgba(34,197,94,0.3)";
                  e.target.style.boxShadow =
                    "0 20px 40px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.background = "rgba(255,255,255,0.08)";
                  e.target.style.boxShadow = "none";
                }}
              >
                {text}
              </div>
            )
          )}
        </div>

        <br />
        <button style={btn} onClick={() => goTo("gallery")}>
          Next →
        </button>
      </section>

      {/* GALLERY */}
      <section
        id="gallery"
        style={{
          height: "100vh",
          background: "#020617",
          color: "white",
          textAlign: "center",
          paddingTop: "80px",
        }}
      >
        <h2>🖼️ Gallery</h2>

        <button style={btn} onClick={() => goTo("last")}>
          Next →
        </button>
      </section>

      {/* LAST */}
      <section
        id="last"
        style={{
          height: "100vh",
          background: "#020617",
          color: "white",
          textAlign: "center",
          paddingTop: "80px",
        }}
      >
        <h2>🎉 Last Page Reached</h2>
        <p>Thank you 🚀</p>
      </section>
    </>
  );
}

export default App;
