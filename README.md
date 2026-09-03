# Sparkathon Frontier Frontend

SPARKATHON 2026 — PHASE 1: FRONTEND & DESIGN

I want to convert this existing Framer website into a fully functional web application:

https://sparkathon2026.framer.website/

This is the PRIMARY visual reference for the entire project.

PROJECT TECHNOLOGY

Use:

Next.js

React

TypeScript

Tailwind CSS

Framer Motion

MongoDB Atlas later

Auth.js / NextAuth later

Sanity.io later where appropriate

Vercel for deployment

GitHub for version control

Use the Next.js App Router.

PHASE 1 OBJECTIVE

For this phase, ONLY build the complete public-facing frontend.

Do NOT implement:

MongoDB

Authentication

User accounts

Teams

Submissions

Admin dashboard

Backend APIs

Database functionality

Those will be implemented in later phases.

The goal of this phase is to make the website visually match the Framer reference as closely as possible.

DESIGN REQUIREMENT

Carefully inspect:

https://sparkathon2026.framer.website/

Recreate its:

Layout

Typography

Colors

Spacing

Backgrounds

Illustrations

Images

Cards

Buttons

Borders

Decorative elements

Section hierarchy

Wild West / Frontier theme

Overall visual atmosphere

Do NOT redesign it into a generic hackathon website.

The final website should feel like the same website as the Framer reference, but implemented in Next.js and React.

HOMEPAGE

Create the complete homepage with the sections shown in the reference:

Navigation

Hero

Statistics

Frontier Roles

Journey

Registration / Plan Your Journey

Bounty Board

Final CTA

Contact

Footer

Match the original section order and visual hierarchy.

NAVBAR

Create a responsive navbar.

Desktop:

Sparkathon branding/logo

Navigation links

CTA button

Mobile:

Hamburger menu

Animated mobile navigation

Proper spacing

Smooth open/close animation

Navigation should work properly.

HERO

Recreate the hero section accurately.

Include:

Background artwork

Main heading

Supporting text

CTA buttons

Decorative graphics

Use Framer Motion for:

Initial fade-in

Slide-up animation

Staggered text

Button hover effects

Keep animations subtle and professional.

STATISTICS

Create reusable statistic components matching the reference.

Statistics should visually match the original design.

Use placeholder/static values for now.

Structure the components so the values can later be connected to MongoDB.

FRONTIER ROLES

Recreate the Frontier Roles section.

Use reusable role cards.

Each card should support:

Title

Description

Image/icon

Hover interaction

Match the exact visual style of the reference.

Add scroll-reveal animations using Framer Motion.

JOURNEY

Recreate the Journey section.

Match:

Numbering

Typography

Layout

Descriptions

Images

Decorative elements

Create reusable JourneyStep components.

Animate them as they enter the viewport.

REGISTRATION SECTION

Recreate the registration section visually.

For now, the form does NOT need to connect to a database.

Create the complete UI including:

Input fields

Labels

CTA

Validation-ready structure

Hover states

Focus states

The actual backend functionality will be implemented in Phase 2.

BOUNTY BOARD

Recreate the Bounty Board visually.

For now use realistic placeholder data.

Create reusable BountyCard components.

Each card can contain:

Bounty title

Description

Category

Territory

Difficulty

Status

Reward

Image

The data will become dynamic in Phase 2.

CONTACT SECTION

Recreate the Contact section visually.

Create the form UI with:

Name

Email

Message

Submit button

Backend functionality will be implemented later.

FOOTER

Recreate the footer from the Framer reference.

Include all relevant:

Branding

Navigation

Contact information

Social links if present

Copyright

ANIMATIONS

Use Framer Motion for:

Hero animations

Scroll reveal

Card hover

Button interactions

Mobile navigation

Section transitions

Do NOT overuse animations.

Respect prefers-reduced-motion.

RESPONSIVENESS

The website must work properly on:

Desktop

Laptop

Tablet

Mobile

Do not simply shrink the desktop design.

Create proper responsive layouts.

Pay special attention to:

Hero artwork

Typography

Navigation

Cards

Forms

Bounty board

Footer

CODE QUALITY

Use:

TypeScript

Reusable components

Clean component architecture

Tailwind CSS

Semantic HTML

Avoid:

Huge components

Duplicate code

any unless absolutely necessary

Unnecessary dependencies

Use Server Components by default.

Only use Client Components when interaction requires them.

IMPORTANT

Do NOT implement Phase 2, 3, 4 or 5 yet.

Do NOT create fake backend functionality.

Focus entirely on creating an accurate, polished frontend based on the Framer reference.

When finished, make sure the application runs without errors and is responsive.

STOP after Phase 1 so I can review the design before continuing.                                                  
FIRST COMPLETE THE PHASE 1 then i will provide PHASE 2,3,4,5

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/dc477a11-4415-4818-b72c-7938fba86c20).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
