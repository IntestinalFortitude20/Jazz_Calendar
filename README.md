# Chicago Jazz Live: A full-stack mobile event locator for the Chicagoland jazz scene

## Description
This is a mobile app designed to solve the "fragmented data" problem in Chicago's live music community. Instead of scrolling through multiple venue websites, radio listings, or scrolling through WDCB's jazz calendar (which is not optimized for mobile devices and does not have advanced search or filter features), this app centralizes everything into a single, mobile-optimized interface. It includes specific search and filter features, allowing users to find specific artists or venues, as well as giving the user the ability to directly view maps and add information to connected apps. It’s built to work on both iOS and Android.

## Why I built it
As a musician and supporter of local live music, I got tired of the "search friction" involved in finding where my peers were playing or where the best sessions were on any given night. My background in **Psychology** makes me hyper-aware of how "choice overload" and "decision fatigue" can stop people from going out. I wanted to build something that removed the stress of the search and the ambiguity of where to go to see high quality musicians performing in accessible venues. I also to give exposure to musicians who are out there working, and support for the venues who invest in them.

## Tech Stack

**Mobile Frontend:** React Native & Expo
**Backend:** Node.js & Express.js
**Development Tools:** Expo for development and bundling
**Data Handling:** Python with Beautiful Soup (for HTML parsing of WDCB jazz calendars)
**Mapping:** Google Maps API Integration (using dynamic event cards and custom markers)

## Project Status: Active Development (MVP)

[x] **Done**: Python scraper successfully extracting WDCB and venue data.
[x] **Done**: Google Maps API integration with custom event cards.
[x] **Done**: Building the Node.js middleware to serve live JSON data to the mobile app.
[ ] **Up Next**: User authentication so musicians can "Check-in" to sessions.
[ ] **Up Next**: Personal calendar integration, push notifications, user-saved venues

---
*Developed by Patrick Ruckman | Software Developer, Music Program Director, Guitarist*
