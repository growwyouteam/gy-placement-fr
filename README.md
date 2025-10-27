# GrowwYou Job Portal - Vanilla HTML/CSS/JS Version devloped by Anuj

This is a vanilla HTML, CSS, and JavaScript conversion of the React-based GrowwYou Job Portal application. The frontend has been converted to simple, static files while maintaining the same design and functionality.

## 📁 Project Structure

```
vanilla/
├── index.html          # Home page with all main sections
├── about.html          # About page
├── jobs.html           # Jobs listing page
├── service.html        # Services page
├── client.html         # Employer/Client page
├── styles.css          # Consolidated CSS styles
├── app.js              # Vanilla JavaScript functionality
└── README.md           # This file
```

## 🚀 Features

- **Fully Static**: No build process required - just open HTML files in a browser
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Same UI/UX**: Maintains the exact same look and feel as the React version
- **Navigation**: Multi-page structure with consistent navbar and footer
- **Interactive Elements**: 
  - Mobile menu toggle
  - Testimonial slider (using Swiper.js)
  - Dynamic job listings
  - Smooth scrolling
  - Toast notifications

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No frameworks, pure JS
- **External Libraries**:
  - Remix Icons (for icons)
  - Swiper.js (for testimonial slider)
  - Google Fonts (Poppins)

## 📦 Getting Started

### Option 1: Direct File Opening
Simply open `index.html` in your web browser:
```bash
# Navigate to the vanilla directory
cd vanilla

# Open in default browser (Windows)
start index.html

# Or just double-click index.html in File Explorer
```

### Option 2: Local Server (Recommended)
For better asset loading and testing, use a local server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

**Using Node.js (http-server):**
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000

# Open http://localhost:8000
```

**Using VS Code Live Server:**
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📄 Pages

1. **Home (index.html)**: 
   - Hero section
   - Company marquee
   - Job categories
   - Featured jobs (first 6)
   - Services overview
   - How it works
   - Testimonials

2. **About (about.html)**:
   - Company story
   - Mission statement
   - Statistics
   - Core values
   - Team members

3. **Jobs (jobs.html)**:
   - Complete job listings
   - All available positions

4. **Services (service.html)**:
   - Service offerings
   - Process workflow
   - Benefits
   - Call-to-action

5. **Client (client.html)**:
   - Employer services
   - Pricing plans
   - Success stories
   - CTA for employers

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
  --primary-color: #0FFF73;
  --secondary-color: #1a2332;
  --dark-bg: #0a1628;
  --darker-bg: #050d1a;
  --text-dark: #ffffff;
  --text-light: #b8c5d6;
}
```

### Jobs Data
Edit the jobs array in `app.js`:
```javascript
const jobs = [
  {
    title: 'Job Title',
    location: 'Location',
    salary: 'Salary Range',
    qualification: 'Requirements',
    experience: 'Experience Level',
    keyskills: 'Key Skills',
  },
  // Add more jobs...
];
```

## 🔧 Key Differences from React Version

### Removed Dependencies:
- ❌ React & ReactDOM
- ❌ React Router
- ❌ React Toastify
- ❌ Axios
- ❌ Vite build system
- ❌ Node modules

### Simplified:
- ✅ Multi-page navigation instead of SPA routing
- ✅ Simple localStorage for auth state
- ✅ Direct DOM manipulation instead of state management
- ✅ Vanilla JS event listeners
- ✅ No build/compile step needed

## 📱 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🐛 Known Limitations

1. **No Backend Integration**: API calls are removed (can be added back with fetch/XMLHttpRequest)
2. **Static Content**: All content is hardcoded in HTML/JS
3. **No Form Submission**: Login/registration forms need backend integration
4. **Asset Paths**: Update image paths in HTML files to match your asset location

## 🔄 Converting Back to React

If you need to convert back to React:
1. Use the original React components as reference
2. The HTML structure is identical to JSX (just remove className → class)
3. CSS is already modular and can be split back into component files
4. JavaScript functions can be converted to React hooks

## 📝 Notes

- All external dependencies (Swiper, Remix Icons) are loaded via CDN
- The design is fully responsive with mobile-first approach
- Smooth scrolling and animations are CSS-based
- Toast notifications use vanilla JS implementation

## 🤝 Contributing

To add new features:
1. Add HTML structure to appropriate page
2. Add styles to `styles.css`
3. Add JavaScript functionality to `app.js`

## 📞 Support

For issues or questions about the vanilla version, refer to the original React codebase structure.

## ⚡ Performance

- **No Build Time**: Instant loading, no compilation
- **Lightweight**: Minimal external dependencies
- **Fast**: Direct browser rendering without framework overhead
- **SEO Friendly**: Static HTML is easily crawlable

---

**Original React Version**: `frontend/frontend/`  
**Vanilla Version**: `frontend/vanilla/`

Enjoy your vanilla JavaScript application! 🎉
