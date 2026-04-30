# 🦷 Sky Dental — Website

A complete, professional dental clinic website for Dr. Arun Teja's Sky Dental clinic.

---

## 📁 Project Structure

```
sky-dental/
├── index.html          ← Home page
├── about.html          ← About Dr. Arun page
├── services.html       ← All Services page
├── testimonials.html   ← Patient Testimonials page
├── appointment.html    ← Book Appointment page (includes map + contact info)
│
├── css/
│   └── style.css       ← Global stylesheet (one file for all pages)
│
├── js/
│   ├── components.js   ← Navbar + Footer injected into all pages
│   ├── main.js         ← Scroll animations + testimonials slider
│   └── appointment.js  ← Appointment form validation + email sending
│
└── images/             ← Place all images here
```

---

## 🖼️ How to Add the Doctor's Photo

1. Copy Dr. Arun's photo into the `images/` folder. Name it `dr-arun.jpg`

2. Open `index.html`, find:
   ```html
   <div class="doctor-photo-placeholder" id="doctor-photo-home">
   ```
   Add inside it:
   ```html
   <img src="images/dr-arun.jpg" class="doctor-actual-photo" alt="Dr. Arun Teja" />
   ```

3. Do the same in `about.html` inside `#doctor-photo-about`.

---

## 📧 Changing the Appointment Email

1. Open `js/appointment.js`
2. Find and replace `mohammedtaif@gmail.com` with the doctor's actual email.

> **First-time:** FormSubmit sends a confirmation email — click the link to activate delivery.

---

## 📞 Updating Phone Numbers

Search for `+91 90000 00000` across all files and replace with the actual number.

---

## 📍 Updating the Google Maps Embed

1. Go to maps.google.com → search the clinic → Share → Embed a map
2. Copy the iframe `src` URL
3. Replace the existing map src in `index.html` and `appointment.html`

---

## 🚀 How to Run

Open `index.html` in any web browser. No server required for local viewing.
Host on any web server (GitHub Pages, Netlify, Hostinger etc.) for form submission to work.

---

## ✅ Features

- ✅ Fully mobile responsive
- ✅ Sticky navbar with hamburger menu
- ✅ Active page highlighting
- ✅ Hero section with stats
- ✅ Services overview + detailed page
- ✅ Doctor bio with photo placeholder
- ✅ Auto-playing testimonials carousel (with swipe support)
- ✅ Full Testimonials page with ratings, reviews grid, video placeholders
- ✅ Why Choose Us section
- ✅ Google Maps embed in Book Appointment page
- ✅ Appointment form (Name, Phone, Email, Date, Time, Service, Message)
- ✅ Email delivery via FormSubmit (no backend)
- ✅ Scroll-reveal animations
- ✅ WhatsApp quick booking button
- ✅ Shared footer with social links

---

## 🎨 Color Scheme

| Color     | Variable      | Hex       |
|-----------|---------------|-----------|
| Navy Blue | `--blue-dark` | `#1a3e72` |
| Mid Blue  | `--blue-mid`  | `#1e5096` |
| Gold      | `--gold`      | `#e8a020` |
| Off White | `--off-white` | `#f5f7fb` |
