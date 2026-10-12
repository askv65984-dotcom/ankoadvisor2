import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Fonts and the logo never change between requests, so they are read once when the module loads.
const bold = await readFile(join(process.cwd(), "src/assets/lato-700.ttf"));
const regular = await readFile(join(process.cwd(), "src/assets/lato-400.ttf"));
const logo = `data:image/png;base64,${(await readFile(join(process.cwd(), "src/assets/brand/anoka-advisors-logo.png"))).toString("base64")}`;

export const alt = "Anoka Advisors: operations consulting for healthcare, telehealth and pharmacy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The site's palette: deep teal to blue, gold for actions, and one color per practice area.
const c = { teal: "#0b5271", blue: "#127cab", deep: "#094561", fg: "#ffffff", soft: "#d6e7f0", gold: "#efb04a", bright: "#25aedd", coral: "#e4484f" };

const areas = [
  { color: c.gold, label: "Healthcare operations" },
  { color: c.bright, label: "Telehealth" },
  { color: c.coral, label: "Pharmacy operations" },
];

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundImage: `linear-gradient(30deg, ${c.teal} 0%, ${c.blue} 100%)`,
          padding: "56px 80px",
          fontFamily: "Lato",
          color: c.fg,
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain img elements */}
        <img src={logo} width={218} height={84} alt="" />
        <div style={{ display: "flex", marginTop: 56, fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 980 }}>
          Operations consulting for healthcare, telehealth and pharmacy.
        </div>
        <div style={{ display: "flex", marginTop: 22, fontSize: 28, fontWeight: 400, color: c.soft }}>
          Book a video consultation at anokaadvisors.com
        </div>

        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 92, display: "flex", alignItems: "center", gap: 40, padding: "0 80px", background: c.deep }}>
          {areas.map((area) => (
            <div key={area.label} style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, fontWeight: 700 }}>
              <div style={{ width: 22, height: 22, borderRadius: 4, background: area.color }} />
              {area.label}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Lato", data: bold, style: "normal", weight: 700 },
        { name: "Lato", data: regular, style: "normal", weight: 400 },
      ],
    },
  );
}
