# Winter of Code 5.0 - Organisation Application
## OpenMindWell

---

## 1️⃣ Organisation Details

**Organisation Name:** OpenMindWell

**Organisation Logo:** *(Please attach a high-quality PNG logo separately with this submission)*

**Organisation Website:** https://github.com/techkeshav23/OpenMindWell *(Update with actual website if available)*

**Short Description:**  
A free, anonymous, privacy-first mental health peer support platform empowering individuals to track their mental wellness, connect with peers, and access crisis resources—all without compromising privacy.

---

## 2️⃣ Project Details

### 🔹 Project Name
**OpenMindWell - Anonymous Mental Health Support Platform**

### 🔹 Tech Stack
- **Frontend:** React 18.2, TypeScript 5.0, Vite, Tailwind CSS 3.4
- **Backend:** Supabase (PostgreSQL, Real-time subscriptions, Authentication)
- **State Management:** Zustand
- **UI Libraries:** Lucide React, React Hot Toast
- **Additional:** React Router DOM, Date-fns, clsx

### 🔹 Detailed Project Description

#### **Problem Statement**

**Mental health support is inaccessible, expensive, and comes with stigma - especially in regions like India and the US where professional help is costly and not everyone feels comfortable seeking it.**

Mental health support faces a global crisis of accessibility, affordability, and acceptability. In 2025, despite increased awareness, millions suffer in silence due to systemic barriers.

#### Key Problems Being Solved:

**1. Financial Barriers 💰**
- Professional therapy costs $100-$300 per session in the US (₹1,000-₹3,000 in India)
- Annual therapy costs: $1,200-$3,600 (₹12,000-₹36,000)
- Insurance often doesn't cover mental health adequately
- Out of pocket expenses prohibitive for most in developing countries

**2. Privacy & Cultural Stigma 🔒**
- Fear of judgment from family, friends, and employers prevents seeking help
- Medical records can negatively affect insurance and employment
- Cultural shame around mental health, especially in Asian countries
- Religious and societal expectations to "stay strong"
- Small communities where confidentiality is nearly impossible

**3. Geographic Accessibility 🌍**
- Rural areas severely lack mental health professionals
- Urban areas have 6-12 month waiting lists for appointments
- Developing countries: Only 1 psychiatrist per 100,000+ people
- Limited transportation options for in-person therapy sessions

**4. Immediate Crisis Support Gap 🚨**
- Suicide hotlines often busy or overwhelmed during peak hours
- Mental health crises don't happen during business hours
- Need for peer support when professionals aren't available
- Emergency rooms not adequately equipped for mental health crises

**5. Fragmented Tools & Solutions 📱**
- Journaling apps don't integrate with support networks
- Habit trackers lack mental health context and understanding
- Resources scattered across multiple platforms
- No holistic mental wellness ecosystem available

#### **OpenMindWell's Solution:**

OpenMindWell addresses these challenges by providing a comprehensive, privacy-first platform that combines:

✅ **100% Free & Anonymous** - No cost, no personal information required, no data collection

✅ **24/7 Peer Support** - Real-time anonymous chat rooms for different mental health topics

✅ **AI Crisis Detection** - Automatic emotion analysis with immediate resource suggestions

✅ **Integrated Self-Help Tools** - Private journaling, habit tracking, mood monitoring, and curated resources in one platform

✅ **Self-Hosted Option** - Complete data privacy and control with deployment flexibility

✅ **Open Source** - Transparent, community-driven, auditable, and customizable code

**Mission:** Make mental health peer support accessible to everyone, regardless of financial status, location, or cultural barriers, while maintaining complete privacy and anonymity.

#### **Why OpenMindWell is Different:**

Unlike commercial platforms (BetterHelp, Talkspace) that require subscriptions ($260-$400/month) and personal information, or fragmented free apps (7 Cups, Reddit) that lack integrated tools and privacy guarantees, OpenMindWell provides:

- **True Anonymity:** No email, phone, or personal info - just pseudonymous accounts
- **Complete Privacy:** Self-hostable, data never leaves user control
- **Holistic Approach:** Peer support + journaling + habits + resources in one ecosystem
- **Cultural Sensitivity:** Built for both US and India with localized crisis resources
- **Community Ownership:** Open source means no vendor lock-in or surprise shutdowns
- **AI-Powered Safety:** Real-time crisis detection that commercial forums lack

The platform ensures zero personal data collection—no emails, no passwords, no tracking—making it a safe space for vulnerable individuals who need support without fear of exposure or judgment.

#### **Focus Areas for Student Contributions**

Students participating in Winter of Code 5.0 can contribute across multiple domains:

**1. Frontend Development & UI/UX Enhancements**
   - Improve accessibility (WCAG compliance, screen reader support)
   - Add dark mode theme support
   - Create data visualization components for mood trends and habit analytics
   - Enhance mobile responsiveness across all pages
   - Implement progressive web app (PWA) features
   - Add animations and micro-interactions for better UX

**2. Backend & Database Development**
   - Optimize Supabase queries and database schema
   - Implement proper database indexing for performance
   - Add data export functionality (JSON, CSV)
   - Create backup and restore mechanisms
   - Implement rate limiting and security enhancements
   - Add end-to-end encryption for journal entries

**3. Feature Development**
   - **Chat Moderation System:** AI-based content moderation, reporting mechanisms
   - **Enhanced Mood Analytics:** Graphs, trends, correlations with habits
   - **Gamification:** Badges, achievements, streak milestones
   - **Community Features:** Group challenges, shared resources
   - **Notification System:** Habit reminders, mood check-in prompts
   - **Resource Library:** Curated mental health articles, exercises, meditation guides

**4. Testing & Quality Assurance**
   - Write unit tests (React Testing Library, Vitest)
   - Implement E2E tests (Playwright, Cypress)
   - Add integration tests for Supabase interactions
   - Perform accessibility testing
   - Load testing and performance optimization

**5. Documentation & DevOps**
   - Improve developer documentation and setup guides
   - Create user documentation and help center
   - Set up CI/CD pipelines (GitHub Actions)
   - Containerization with Docker
   - Add deployment guides for various platforms

**6. Security & Privacy**
   - Implement additional encryption layers
   - Add security headers and CSP
   - Perform security audits
   - Add privacy-preserving analytics
   - Implement secure session management

#### **Student Contribution Guide (Idea Page)**

**What Students Will Work On:**

Contributors will have the opportunity to work on meaningful features that directly impact mental health support accessibility. Here are specific project ideas:

**Beginner-Friendly Issues:**
- Fix UI bugs and improve responsiveness
- Add loading states and error boundaries
- Improve form validation
- Create reusable UI components
- Write documentation for existing features
- Add tooltips and help text

**Intermediate Projects:**
- Implement mood analytics dashboard with charts
- Create habit streak visualization
- Add journal entry search and filtering
- Implement chat room moderation tools
- Build notification system
- Add data export features

**Advanced Projects:**
- Implement end-to-end encryption for journals
- Create AI-based crisis keyword detection system
- Build real-time analytics dashboard
- Implement comprehensive testing suite
- Add WebRTC for peer support audio calls
- Create mobile app using React Native

**Expected Outcomes:**
- Improved user experience and accessibility
- Enhanced privacy and security features
- Better performance and scalability
- Comprehensive test coverage
- Rich mental health resource library
- Active community engagement features

**Milestones:**

**Phase 1 (Community Bonding - Weeks 1-2):**
- Understand codebase architecture
- Set up development environment
- Review assigned issues/features
- Discuss implementation approach with mentors

**Phase 2 (Initial Development - Weeks 3-5):**
- Implement core features
- Create UI components
- Write initial tests
- Regular progress updates

**Phase 3 (Refinement - Weeks 6-7):**
- Bug fixes and optimization
- Documentation
- Code reviews and iterations

**Phase 4 (Final Submission - Week 8):**
- Final testing
- Documentation completion
- Demo preparation
- Merge to main branch

### 🔹 GitHub Repository Link
**https://github.com/techkeshav23/OpenMindWell**

---

## 3️⃣ Mentor Details

### Mentor 1
**Name:** [Your Name]  
**Email:** [Your Email]  
**Discord Username:** [Your Discord Username]  
**LinkedIn Profile:** [Your LinkedIn URL]  
**Role in Organisation:** Project Lead / Founder  
**Short Bio:** [Add 2-3 lines about your experience with mental health tech, mentoring, and relevant technical expertise]

### Mentor 2 (Optional - Add if available)
**Name:** [Mentor 2 Name]  
**Email:** [Mentor 2 Email]  
**Discord Username:** [Mentor 2 Discord]  
**LinkedIn Profile:** [Mentor 2 LinkedIn]  
**Role in Organisation:** [Role]  
**Short Bio:** [2-3 lines about expertise]

**Mentor Availability:**
- Weekly virtual meetings (Tuesdays and Fridays preferred)
- Discord availability for quick queries (Response within 24 hours)
- Code review turnaround: 48 hours maximum
- Regular progress tracking through GitHub Projects
- Office hours: Flexible, scheduled based on student availability

---

## 4️⃣ Point of Contact (PoC)

**Name:** [Your Full Name]  
**Phone Number:** [Your Phone Number]  
**Email:** [Your Email Address]  
**Discord Username:** [Your Discord Username]  
**LinkedIn Profile:** [Your LinkedIn Profile URL]  
**Role/Position:** Project Maintainer & Lead Developer

---

## 📋 Additional Information

### **Contribution Guidelines**

**Getting Started:**
1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Set up Supabase (instructions in README)
5. Create a feature branch
6. Make changes and test thoroughly
7. Submit a pull request

**Code Standards:**
- Follow TypeScript best practices
- Use ESLint configuration provided
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features
- Ensure all tests pass before PR

**Communication Channels:**
- **GitHub Issues:** For bug reports and feature requests
- **Discord:** For real-time discussions and quick help
- **Weekly Sync:** Virtual meetings for progress updates
- **PR Reviews:** Constructive feedback within 48 hours

### **Project Impact**
OpenMindWell aims to make mental health support accessible to everyone, regardless of their financial situation or privacy concerns. Students contributing to this project will:
- Gain experience in building privacy-focused applications
- Learn about mental health tech and ethical design
- Work with modern web technologies
- Contribute to a project with real social impact
- Build features used by people in need

### **Learning Opportunities**
- Real-time application development with Supabase
- State management with Zustand
- TypeScript in production applications
- Privacy-first architecture design
- Accessibility best practices
- Working with mental health domain requirements

---

## ✅ Submission Checklist

✔ Organisation Name: **OpenMindWell**  
✔ Organisation Logo: **To be attached separately**  
✔ Project Name: **OpenMindWell - Anonymous Mental Health Support Platform**  
✔ Tech Stack: **React, TypeScript, Vite, Tailwind CSS, Supabase**  
✔ Project Description: **Complete with problem statement, focus areas, and contribution guide**  
✔ GitHub Repository: **https://github.com/techkeshav23/OpenMindWell**  
✔ Mentor Details: **Provided above (please fill in specific details)**  
✔ PoC Details: **Provided above (please fill in specific details)**  
✔ Contribution Guidelines: **Included**

---

**Thank you for considering OpenMindWell for Winter of Code 5.0!**

We're excited to mentor passionate students and build features that make mental health support more accessible and privacy-respecting.

---

**Submission Date:** November 28, 2025  
**Contact for Queries:** [Your Email]
