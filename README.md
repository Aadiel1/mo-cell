# MoCell - IT Solutions & Cybersecurity

A modern, elegant static website for MoCell IT business, showcasing software development, integration, deployment, and security services.

## Features

### Design Highlights
- **Modern UI/UX**: Clean, professional design with gradient accents
- **Responsive Layout**: Perfectly adapts to mobile, tablet, and desktop screens
- **Smooth Animations**: Elegant scroll animations and hover effects
- **Interactive Elements**: Dynamic navigation, form validation, and more
- **Custom Logo**: Unique SVG logo with hexagonal tech-inspired design

### Sections
1. **Hero Section**: Eye-catching introduction with animated background
2. **Services**: Comprehensive showcase of IT services with detailed cards
3. **About**: Company values, statistics, and expertise levels
4. **Technologies**: Tech stack showcase organized by category
5. **Contact**: Professional contact form with company information
6. **Footer**: Navigation links and company details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript**: Interactive features without dependencies
- **SVG**: Custom logo with gradient effects
- **Google Fonts**: Inter and Space Grotesk typefaces

## File Structure

```
mo-cell/
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # Interactive JavaScript
├── assets/
│   └── logo.svg       # Custom MoCell logo
└── README.md          # This file
```

## Getting Started

### Option 1: Open Directly
Simply open `index.html` in your web browser.

### Option 2: Local Server (Recommended)
For the best experience, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## Customization Guide

### Updating Content

#### Company Information
Edit `index.html`:
- **Phone Number**: Line 320 - `<a href="tel:+250788224511">` - **+250 788 224 511**
- **Email**: Line 311 - `<a href="mailto:hello@mocell.tech">`
- **Address**: Line 329 - **Kigali, Rwanda**

#### Services
Modify service cards starting at line 96 in `index.html`. Each service card includes:
- Icon (SVG)
- Title
- Description
- Feature list

#### Colors
Edit CSS variables in `styles.css` (lines 11-22):
```css
--primary: #667eea;
--secondary: #764ba2;
--accent: #4facfe;
```

#### Fonts
Change fonts in `index.html` (line 9) or update CSS variables:
```css
--font-primary: 'Inter', sans-serif;
--font-heading: 'Space Grotesk', sans-serif;
```

### Logo Customization
The logo is located at `assets/logo.svg`. You can:
- Edit the SVG file directly to change colors
- Replace with your own logo (maintain similar dimensions)
- Update gradient colors to match your brand

### Adding New Sections
1. Add HTML structure in `index.html`
2. Style in `styles.css`
3. Add interactivity in `script.js` if needed
4. Update navigation links in the navbar

## Form Integration

The contact form currently simulates submission. To connect it to a backend:

### Option 1: FormSpree
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: Custom API
Update the form submission handler in `script.js` (line 97):
```javascript
const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});
```

### Option 3: Email Service (EmailJS)
```javascript
emailjs.send("service_id", "template_id", formData)
    .then(response => { /* success */ });
```

## Deployment

### GitHub Pages
1. Push to GitHub repository
2. Go to Settings > Pages
3. Select branch and deploy

### Netlify
1. Drag and drop the `mo-cell` folder to [Netlify](https://app.netlify.com)
2. Or connect your GitHub repository

### Vercel
```bash
npx vercel
```

### Traditional Hosting
Upload all files to your web hosting via FTP/SFTP.

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Features
- Optimized CSS animations
- Lazy loading ready (add `data-src` to images)
- Minimal JavaScript dependencies
- Efficient intersection observers
- CSS Grid and Flexbox for layouts

## SEO Optimization
The website includes:
- Semantic HTML5 elements
- Meta descriptions
- Proper heading hierarchy
- Alt text ready for images
- Fast loading times

## Accessibility
- Keyboard navigation support
- ARIA labels on interactive elements
- Reduced motion media queries
- Color contrast compliance
- Screen reader friendly

## Future Enhancements
- [ ] Add blog section
- [ ] Integrate CMS (like Netlify CMS)
- [ ] Add testimonials carousel
- [ ] Include case studies
- [ ] Add multilingual support
- [ ] Implement dark mode toggle
- [ ] Add analytics (Google Analytics/Plausible)

## Support

For questions or customization help:
- Email: hello@mocell.tech
- Website: [Your Website]

## License

This website template is created for MoCell. Customize as needed for your business.

---

**Built with ❤️ for MoCell**
