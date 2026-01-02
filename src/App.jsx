import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {

  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const buttonRef = useRef(null);

  const goToFeatures = () =>
    document.getElementById("features").scrollIntoView({ behavior: "smooth" });

  const goToGallery = () =>
    document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });

  const goToLast = () =>
    document.getElementById("last").scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    // 1️⃣ Reduced motion support
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReduced.matches) return;

    // 2️⃣ Hero intro animation
    gsap.from([headingRef.current, paraRef.current, buttonRef.current], {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });

    // 3️⃣ Section scroll reveal animations
    gsap.utils.toArray(["#features", "#gallery", "#last"]).forEach((sec) => {
      gsap.from(sec, {
        scrollTrigger: {
          trigger: sec,
          start: "top 85%"
        },
        opacity: 0,
        y: 120,
        duration: 1
      });
    });

    // 4️⃣ Parallax bg animation
    gsap.to(".parallax-bg", {
      scrollTrigger: {
        trigger: ".parallax-bg",
        start: "top bottom",
        scrub: true
      },
      backgroundPosition: "50% 25%"
    });

    // 5️⃣ cleanup (important)
    return () => {
      gsap.killTweensOf("*");
      ScrollTrigger.kill();
    };
  }, []);

  // 🔥 Stylish button shared style
  const btnStyle = {
    padding: "12px 26px",
    borderRadius: "999px",
    fontSize: "16px",
    fontWeight: 700,
    border: "1px solid rgba(255,255,255,0.3)",
    background:
      "linear-gradient(135deg, rgba(34,197,94,1), rgba(34,197,94,0.6))",
    color: "black",
    boxShadow: "0 10px 25px rgba(0,0,0,.35)",
    backdropFilter: "blur(6px)",
    cursor: "pointer",
    transition: "all .25s ease"
  };

  return (
    <>
      {/* HERO SECTION */}
      <div
        className="parallax-bg"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          backgroundImage: "url('https://picsum.photos/1200/800')",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          color: "white",
          position: "relative"
        }}
      >
        {/* dark overlay for text clarity */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.55)" }} />

        <h1 ref={headingRef} style={{ zIndex: 1, fontSize: "46px", fontWeight: 800 }}>
          GSAP Product Landing Page
        </h1>

        <p ref={paraRef} style={{ zIndex: 1 }}>
          Amazing animations powered by GSAP
        </p>

        <button
          ref={buttonRef}
          onClick={goToFeatures}
          style={btnStyle}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
          onMouseUp={(e) => (e.target.style.transform = "scale(1.08)")}
        >
          Get Started 🚀
        </button>
      </div>

      {/* FEATURES */}
      <div
        id="features"
        style={{
          height: "100vh",
          background: "#020617",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px"
        }}
      >
        <h2>⭐ Features Page</h2>

        <button
          onClick={goToGallery}
          style={btnStyle}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Next →
        </button>
      </div>

      {/* GALLERY */}
      <div
        id="gallery"
        style={{
          minHeight: "100vh",
          background: "#020617",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px"
        }}
      >
        <h2>🖼️ Gallery Page</h2>

        <button
          onClick={goToLast}
          style={btnStyle}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Next →
        </button>
      </div>

      {/* LAST */}
      <div
        id="last"
        style={{
          height: "100vh",
          background: "#020617",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px"
        }}
      >
        <h2>🎉 Last Page Reached</h2>
        <p>Thank You – project complete 🚀</p>
      </div>
    </>
  );
}

export default App;
