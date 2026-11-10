# SUPRAGNA 2K27 • School of Engineering Departments Page
### Siddhartha Academy of Higher Education (VRSEC)
**Theme: Sakura • Dragon • Eastern Mythic (Japanese/Chinese Aesthetics)**

---

## 🐉 Overview & Highlights

This is a premier, high-octane **School of Engineering Departments Display Page** crafted for **Supragna 2K27**, designed with Eastern Mythic aesthetics (Sakura blossoms, Azure Dragon, Torii Gate architecture, and Hanko seal stamps).

### 🌸 The Six Elemental Dragon Gates (Alphabetical Order):
1. **Artificial Intelligence & Data Science (AI)** - *The Celestial Dragon of Mind & Neural Nexus (神龍・電脳)*
2. **Civil Engineering (CE)** - *The Earth Dragon of Grand Monoliths (磐石龍・土木)*
3. **Computer Science & Engineering (CSE)** - *The Void Dragon of Algorithmic Mastery (虚空龍・計算)*
4. **Electrical & Electronics Engineering (EEE)** - *The Thunder Dragon of High-Voltage Surge (雷神龍・電光)*
5. **Electronics & Communication Engineering (ECE)** - *The Storm Dragon of Silicon Waves (嵐龍・電波)*
6. **Mechanical Engineering (ME)** - *The Forge Dragon of Kinetic Titans (焔鉄龍・機巧)*

*(Supports dynamic toggling between Full Department Name sorting and Code Acronym sorting with 100% mathematical precision).*

---

## ⚡ Technical Features

- **🌸 Interactive Sakura Particle Engine (`SakuraCanvas.tsx`)**:
  - Full HTML5 Canvas particle physics with 3D petal tumbling, natural wind vectors, and cursor turbulence interaction.
  - Interactive pill to toggle between *Tranquil Breeze* and *Sakura Storm* modes.
- **🐉 Serpentine Azure Dragon Watermark (`DragonBackground.tsx`)**:
  - Mythic dragon vector with flowing whiskers, dorsal fins, Kumomon (雲文) traditional Asian clouds, and the Flaming Sacred Pearl of Wisdom.
- **⛩️ Grand Torii Gate Architecture (`ToriiHeader.tsx`)**:
  - Vermilion & gold Kasagi top beam, swaying paper lanterns (提灯), live fuzzy search bar, and domain category filter chips.
- **🎴 3D Parallax Tilt Cards (`DepartmentCard.tsx`)**:
  - Dynamic cursor tilt angles with light glare tracking, gold leaf corner brackets, and authentic red cinnabar Hanko stamps (印鑑).
- **📜 Silk Dragon Scroll Modal (`DepartmentDetailModal.tsx`)**:
  - Unrolls a traditional oriental parchment scroll displaying full event details, prize breakdown, venue, timing, rules, and coordinator hotlines.
- **🎐 Synthesized Web Audio API Chimes (`audio.ts`)**:
  - Zero-external MP3 dependency! Generates pentatonic koto plucks, bamboo water taps, and resonant taiko drum beats in real-time.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run dev server (defaults to port 5174 to avoid conflict with port 5173)
npm run dev

# 3. Build for production
npm run build
```

---

## 🔌 Drop-in Integration into Main Supragna 2K27 App

You can either:
1. **Import directly as Level 2 in `Supragna2K27Events.tsx`**:
```tsx
import EngineeringDepartmentsSection from '../path/to/EngineeringDepartmentsSection';

// Inside your School of Engineering condition:
{selectedSchool.id === 'engineering' && (
  <EngineeringDepartmentsSection
    onBackToSchools={() => setSelectedSchool(null)}
    onSelectEvent={(event, dept) => {
      console.log('Selected Event:', event.name);
    }}
  />
)}
```
2. **Or mount as a dedicated Route in `App.tsx`**:
```tsx
<Route path="/engineering" element={<EngineeringDepartmentsPage />} />
```
