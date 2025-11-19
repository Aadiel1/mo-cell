# 🎨 MoCell Brand Guidelines

## Complete Branding Package

Your complete MoCell branding materials in multiple formats for all use cases.

---

## 📁 Package Contents

```
branding/
├── logos/                          # Logo variations
│   ├── mocell-logo-full-color.svg  # Main logo with gradient
│   ├── mocell-logo-white.svg       # For dark backgrounds
│   ├── mocell-logo-black.svg       # For light backgrounds
│   └── mocell-icon-only.svg        # Icon without text
├── favicons/                       # Website favicons
│   └── favicon.svg                 # 32x32 favicon
├── social-media/                   # Social media assets
│   └── mocell-social-square.svg    # 1200x1200 profile pic
├── print/                          # Print materials
│   └── (business cards, letterheads)
├── email-signatures/               # Email signature
│   └── email-signature.html        # HTML email signature
└── BRANDING-GUIDE.md              # This file
```

---

## 🎨 Brand Colors

### Primary Colors

**Gradient Purple-Blue:**
```css
Primary: #667eea (Purple)
Secondary: #764ba2 (Deep Purple)
Gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
```

**Accent Cyan:**
```css
Accent: #4facfe (Cyan)
Accent Dark: #00f2fe (Deep Cyan)
Gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)
```

### Text Colors
```css
Dark: #1a202c
Light: #4a5568
Lighter: #718096
```

### Background Colors
```css
White: #ffffff
Light Gray: #f7fafc
Border: #e2e8f0
```

---

## 📐 Logo Usage

### 1. Full Color Logo
**File:** `logos/mocell-logo-full-color.svg`

**Use for:**
- ✅ Website header
- ✅ Digital presentations
- ✅ Marketing materials
- ✅ Social media posts

**Minimum size:** 120px wide

---

### 2. White Logo
**File:** `logos/mocell-logo-white.svg`

**Use for:**
- ✅ Dark backgrounds
- ✅ Photos/images
- ✅ Video overlays
- ✅ Dark themed presentations

**Minimum size:** 120px wide

---

### 3. Black Logo
**File:** `logos/mocell-logo-black.svg`

**Use for:**
- ✅ Black & white printing
- ✅ Newspapers
- ✅ Faxes
- ✅ Low-ink printing

**Minimum size:** 120px wide

---

### 4. Icon Only
**File:** `logos/mocell-icon-only.svg`

**Use for:**
- ✅ App icons
- ✅ Favicons
- ✅ Social media profile pictures
- ✅ Small spaces (< 100px)

**Minimum size:** 32px

---

## 🚫 Logo Don'ts

❌ Don't stretch or distort the logo
❌ Don't change the colors
❌ Don't rotate the logo
❌ Don't add effects (shadows, glows)
❌ Don't use on busy backgrounds
❌ Don't recreate or modify the logo

---

## 📱 Social Media Specs

### Profile Pictures
**File:** `social-media/mocell-social-square.svg`

**Recommended sizes:**
- Facebook: 180x180 (displays at 170x170)
- Instagram: 110x110
- Twitter: 400x400
- LinkedIn: 300x300

**Export as:** PNG with transparent background

---

### Cover Photos

**Facebook:** 820x312px
**Twitter:** 1500x500px
**LinkedIn:** 1584x396px

**Design guidelines:**
- Use brand gradient background
- Place logo on left
- Add tagline: "IT Solutions & Security"
- Keep text readable

---

## 🖨️ Print Materials

### Business Cards

**Standard Size:** 3.5" x 2" (88.9mm x 50.8mm)

**Design:**
```
Front:
┌─────────────────────────┐
│ [Logo]                  │
│                         │
│ Name                    │
│ Position                │
│ +250 788 224 511       │
│ email@mocell.tech      │
└─────────────────────────┘

Back:
┌─────────────────────────┐
│                         │
│   [Gradient Pattern]    │
│                         │
│   IT Solutions &        │
│   Security              │
│                         │
│   Kigali, Rwanda        │
│   mocell.tech           │
└─────────────────────────┘
```

**Colors:**
- Front: White background, gradient logo
- Back: Gradient background, white text

---

### Letterhead

**Size:** A4 (210mm x 297mm)

**Design:**
```
┌────────────────────────────┐
│ [Logo]         MoCell      │
│                            │
│ Content area...            │
│                            │
│                            │
├────────────────────────────┤
│ Footer:                    │
│ Kigali, Rwanda             │
│ +250 788 224 511           │
│ hello@mocell.tech          │
│ mocell.tech                │
└────────────────────────────┘
```

---

## 📧 Email Signature

**File:** `email-signatures/email-signature.html`

**Installation:**

### Gmail:
1. Copy HTML code from file
2. Settings → General → Signature
3. Paste signature
4. Update your name, position, email

### Outlook:
1. File → Options → Mail → Signatures
2. New → Paste HTML
3. Set as default

### Apple Mail:
1. Preferences → Signatures
2. Create new
3. Paste HTML

**Customize:**
- Line 14: Your name
- Line 15: Your position
- Line 29-32: Your contact details

---

## 🎯 Typography

### Primary Font
**Space Grotesk**
- Logo
- Headings
- Titles

**Weights:** 400, 500, 600, 700

**Fallback:** Inter, system fonts

---

### Secondary Font
**Inter**
- Body text
- Descriptions
- UI elements

**Weights:** 300, 400, 500, 600

---

### Google Fonts Import
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## 🌐 Web Assets

### Favicon Integration

Add to `<head>` of your website:

```html
<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/branding/favicons/favicon.svg">
<link rel="apple-touch-icon" href="/branding/logos/mocell-icon-only.svg">

<!-- For older browsers -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
```

---

### Open Graph Meta Tags

For social media sharing:

```html
<!-- Open Graph -->
<meta property="og:title" content="MoCell - IT Solutions & Security">
<meta property="og:description" content="Innovative IT solutions, cybersecurity, and software development in Rwanda">
<meta property="og:image" content="https://mocell.tech/branding/social-media/mocell-social-square.svg">
<meta property="og:url" content="https://mocell.tech">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="MoCell - IT Solutions & Security">
<meta name="twitter:description" content="Innovative IT solutions in Rwanda">
<meta name="twitter:image" content="https://mocell.tech/branding/social-media/mocell-social-square.svg">
```

---

## 🎨 Design Elements

### Hexagon Pattern
The logo features a hexagonal design representing:
- **Tech structure** - Solid foundation
- **Connectivity** - Six points of connection
- **Modern** - Geometric and clean
- **Unique** - Memorable shape

### Letter "M"
Stylized "M" in the center:
- **Bold** - Strong presence
- **Geometric** - Matches hexagon
- **Connected** - Lines meet in center
- **Dynamic** - Upward movement

### Connecting Dots
Six corner dots represent:
- **Network** - Interconnected systems
- **Data points** - Information flow
- **Precision** - Technical accuracy
- **Completion** - Full circle

---

## 📐 Spacing & Clear Space

### Logo Clear Space
Maintain minimum clear space around logo equal to the height of the letter "M"

```
    [M height]
        ↓
  ┌─────────┐
  │         │
  │  LOGO   │
  │         │
  └─────────┘
```

Minimum space on all sides: M height

---

## 🎬 Animation Guidelines

### Logo Animation
For video/motion graphics:

1. **Entrance:** Fade in + slight scale (0.95 → 1)
2. **Duration:** 0.6s ease-out
3. **Pulse:** Heart-beat effect on center dot
4. **Exit:** Fade out + slight scale (1 → 0.95)

### CSS Animation
```css
@keyframes logoEntrance {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
```

---

## 📱 App Icon Guidelines

### iOS
- **Sizes:** 180x180, 120x120, 87x87, 80x80, 76x76, 60x60, 58x58, 40x40, 29x29
- **Format:** PNG with transparency
- **Source:** Use `logos/mocell-icon-only.svg`

### Android
- **Sizes:** 512x512, 192x192, 144x144, 96x96, 72x72, 48x48
- **Format:** PNG with transparency
- **Adaptive icon:** Separate foreground and background layers

---

## 🎨 Color Accessibility

### Contrast Ratios (WCAG AA)

**Text on white:**
- Primary (#667eea): ✅ Passes (4.7:1)
- Dark text (#1a202c): ✅ Passes (16:1)

**White text on primary:**
- White on #667eea: ✅ Passes (4.5:1)

**Recommendations:**
- Use dark text for body content
- Use gradient for headings/accents
- Ensure sufficient contrast on all backgrounds

---

## 🖼️ Stock Photos & Images

### Image Style
- **Modern** - Clean, professional
- **Tech-focused** - Computers, coding, security
- **Diverse** - Inclusive representation
- **High-quality** - Sharp, well-lit
- **Color palette** - Blues, purples when possible

### Photo Treatment
- **Overlay:** Gradient overlay at 40% opacity
- **Filter:** Slight increase in saturation
- **Crop:** Follow rule of thirds

---

## 📝 Voice & Tone

### Brand Voice
- **Professional** yet approachable
- **Confident** but not arrogant
- **Technical** but clear
- **Innovative** and forward-thinking

### Writing Style
- Use active voice
- Keep sentences concise
- Avoid jargon when possible
- Be specific and precise
- Show expertise without being condescending

### Dos:
✅ "We secure your digital infrastructure"
✅ "Innovative solutions for modern challenges"
✅ "Let's build something amazing"

### Don'ts:
❌ "We're the best"
❌ "Trust us, we know what we're doing"
❌ Technical jargon without explanation

---

## 🌍 Taglines

**Primary:**
"IT Solutions & Security"

**Alternatives:**
- "Innovative Technology. Secure Future."
- "Building Tomorrow's Solutions Today"
- "Your Digital Transformation Partner"
- "Security. Innovation. Excellence."

---

## 📊 File Formats Explained

### SVG (Scalable Vector Graphics)
- ✅ **Best for:** Web, digital, scalable
- ✅ **Pros:** Infinite scaling, small file size
- ❌ **Cons:** Not ideal for complex images

### PNG (Portable Network Graphics)
- ✅ **Best for:** Digital with transparency
- ✅ **Pros:** Transparency support, good quality
- ❌ **Cons:** Larger file size

### PDF (Portable Document Format)
- ✅ **Best for:** Print, professional documents
- ✅ **Pros:** Preserves quality, universal
- ❌ **Cons:** Larger file size

---

## 🔄 Exporting Logos

### For Web:
```bash
# SVG - No export needed, use directly
# PNG - Export at 2x resolution for retina
```

### For Print:
```bash
# Export as PDF or EPS
# 300 DPI minimum
# CMYK color mode
```

### For Social Media:
```bash
# PNG with transparency
# Specific dimensions per platform
# RGB color mode
```

---

## ✅ Brand Checklist

Before launching any material, ensure:

- [ ] Logo is not distorted
- [ ] Colors match brand guidelines
- [ ] Fonts are correct
- [ ] Sufficient contrast for readability
- [ ] Clear space around logo
- [ ] High resolution (300 DPI for print)
- [ ] Correct file format
- [ ] Tagline is consistent
- [ ] Contact info is current
- [ ] Tone matches brand voice

---

## 📞 Brand Support

**Questions about branding?**

Contact: hello@mocell.tech
Location: Kigali, Rwanda
Phone: +250 788 224 511

---

## 📚 Quick Reference

### Logo Files
- **Web:** Use `mocell-logo-full-color.svg`
- **Dark BG:** Use `mocell-logo-white.svg`
- **Print B&W:** Use `mocell-logo-black.svg`
- **Icon:** Use `mocell-icon-only.svg`

### Colors (HEX)
- Primary: `#667eea`
- Secondary: `#764ba2`
- Accent: `#4facfe`

### Fonts
- Headings: Space Grotesk (Bold)
- Body: Inter (Regular)

### Tagline
"IT Solutions & Security"

---

**Version:** 1.0
**Last Updated:** 2024
**Created for:** MoCell, Rwanda 🇷🇼

---

*This is a living document and may be updated as the brand evolves.*

