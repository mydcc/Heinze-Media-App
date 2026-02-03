---
title: "[EN Copy] Pat-Man Arcade Game"
date: "2025-06-09T12:43:08.000Z"
slug: "pat-man"
type: "work"
image: "/images/work/pat-man.png"
published: true
---

# Pat-Man Arcade Game

## **Dynamic and Captivating Gaming Experience**

A demonstration of modern web technologies to create a dynamic and captivating gaming experience in the browser.

### 1\. Project Overview

**Pat-Man** is a browser-based arcade game developed as a tribute to the timeless classic, Pac-Man. However, the project goes beyond a mere copy, enhancing the original gameplay with a variety of modern features. The goal was to prove that a complex, high-performance, and visually appealing gaming experience with high replayability can be created using only pure HTML, CSS, and JavaScript.

The game was developed from scratch, with a focus on procedural level generation, advanced AI behaviors, and a rewarding player progression system.

### 2\. Project Goals

* **Reinventing a Classic:** The well-known and beloved gameplay principle was to be retained but modernized with innovative features.
* **Demonstrating Technical Feasibility:** To show that complex 2D games can be realized without external game engines, using only the HTML5 Canvas and Vanilla JavaScript.
* **Creating High Replayability:** Dynamic and unpredictable elements should make every playthrough unique.
* **A Responsive and Accessible Experience:** The game should work equally well on desktop and mobile devices, including touch controls.

### 3\. Core Features and Technical Highlights

The true complexity of "Pat-Man" lies in the details. The following features were implemented:

* **Procedural Level Generation:**
  * Instead of static levels, a new, random map layout is generated based on a template for each game. This ensures that no two rounds are exactly the same, and players constantly face new challenges.
* **Enhanced Power-Ups:**
  * **Classic Power Pellets:** Make ghosts vulnerable for a short time.
  * **Speed Boosts (▲):** Give the player a temporary speed boost.
  * **Freeze Pellets (❄):** Freeze all ghosts in place for a few seconds, creating strategic escape opportunities.
  * **Bonus Items (🍒):** Appear randomly for a short time and provide extra points.
* **Sophisticated Ghost AI:**
  * The ghosts are more than just simple chasers. Each ghost has its own "personality" and tactics (e.g., direct chaser, ambusher, patroller).
  * The AI operates in global phases (`Chase` and `Scatter`), leading to organic and less predictable ghost behavior.
* **Diverse Game Modes and Difficulties:**
  * **Levels Mode:** The player must master a series of increasingly difficult, predefined level structures.
  * **Survival Mode:** An endless mode where the speed and difficulty continuously increase.
  * **Three Difficulty Levels (Easy, Normal, Hard):** These affect parameters such as player lives, enemy speed, and the duration of power-ups.
* **Responsive Design and Controls:**
  * The game board and user interface dynamically adapt to the screen size.
  * The game can be controlled conventionally via the keyboard (arrow keys or WASD) or on mobile devices using an on-screen touch interface.
* **Player Progression:**
  * A local **High Score System** saves the best performances.
  * An **Achievement System** rewards players for reaching special milestones (e.g., "Ate all ghosts with one power-up").

### 4\. Technical Implementation

* **Graphics Engine:** The entire game is rendered in real-time on an **HTML5 `<canvas>` element**.
* **Game Logic:** The entire logic—from movement control and collision detection to the AI—is implemented in object-oriented **Vanilla JavaScript**. A central game loop (`requestAnimationFrame`) ensures smooth animations.
* **Styling:** The user interface was designed with **Tailwind CSS** for a fast and responsive layout, supplemented by custom CSS for the retro feel and visual effects.

### 5\. Challenges and Solutions

* **Performant Collision Detection:** A grid-based logic was developed to detect collisions between the player, ghosts, and walls efficiently and pixel-perfectly without impacting performance.
* **AI Design:** The biggest challenge was developing a ghost AI that is demanding but not unfair. The solution was a hybrid approach of target-chasing (the player or fixed points), personality algorithms, and global states.
* **State Management:** Managing the numerous game states (e.g., `gameRunning`, `gamePaused`, `gameOver`, `frightenedMode`) was solved through a clear and modular code structure to minimize bugs.

### 6\. Result

The "Pat-Man" project is a complete success. It is an entertaining, challenging, and infinitely replayable browser game that impressively demonstrates the capabilities of modern web technologies. It serves as an excellent example of implementing procedural logic, artificial intelligence, and real-time graphics rendering using standard web tools.

[

Open Web App

](/apps/patman.html)
