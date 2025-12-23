# 🗺️ m43x2 Project Roadmap

This document outlines the development phases of the **m43x2** mobile app. Our mission is to celebrate the Micro Four Thirds heritage through a blend of technical precision and hand-drawn art.

## 🟢 Phase 1: Foundation (The MVP)

*Focus: Core data structures and basic photography tools.*

* [x] **Camera Wiki**: Implement the `CameraWikiScreen` using `FlashList`.
* [x] **EXIF Engine**: Build a utility to parse image metadata (ISO, Focal Length, Aperture).
* [x] **Smart Border (V1)**: A basic canvas to add a white border with text (Model Name & 2x focal length).
* [ ] **Asset Library**: Initial set of hand-drawn icons for PEN and OM-D series.

## 🟡 Phase 2: User Experience (The Polish)

*Focus: Making the app "smart" and personal.*

* [ ] **The Backpack**: Persistent storage (Zustand + AsyncStorage) for "My Cameras".
* [ ] **Auto-Match Logic**: Automatically link imported photos to the Wiki database via EXIF tags.
* [ ] **Dynamic UI**: UI themes that change colors based on the camera's `PrimaryColor`.
* [ ] **Enhanced Wiki**: Detailed "Wikipedia-style" views for each camera with `AdvancedSpecs`.
* [ ] **Weather Integration**: "BeforeDark" widget showing golden hour and local weather.

## 🟠 Phase 3: Creative Tools

*Focus: Advanced image processing and storytelling.*

* [ ] **Live Preview Editor**: Real-time border adjustment (Ratio, Width, Padding) using **RN Skia**.
* [ ] **Recipes**: A section to store and share custom JPEG color settings.
* [ ] **Equivalence Calculator**: Tool to compare M43 depth-of-field and reach with Full Frame.
* [ ] **Hand-drawn Overlays**: Artistic sticker packs

## 🔴 Phase 4: Community & Beyond (Open Source)

*Focus: Scaling and collaborative data.*

* [ ] **Recipe Export**: Export color recipes as beautiful, shareable cards.
* [ ] **Community Contributions**: Standardized PR process for users to add their own camera Wiki entries.
* [ ] **Localization**: English, Chinese, and Japanese support.

---

### 💡 Tips for managing this:

* **GitHub Issues**: Convert each bullet point above into a GitHub Issue. It makes your project look "alive" to potential contributors.
* **GitHub Projects**: Use a **Kanban Board** to move these items from "Todo" to "Done".

**Would you like me to help you write the `README.md` now, or should we focus on building the "Camera Detail" screen for your Wiki?**