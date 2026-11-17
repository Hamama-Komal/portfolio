"""Build public/Hamama-Komal-CV.pdf from the resume content in assets/Updated.txt.

Run with:  python scripts/generate-cv.py
Replace the generated file with a hand-made PDF any time — the site only cares
about the path.
"""

import fitz  # PyMuPDF

PAGE_W, PAGE_H = 595, 842  # A4 in points
MARGIN_X = 52
TOP = 44
BOTTOM = 38

# Same palette as the site: warm ink on bone, one rust accent.
INK = (0.071, 0.067, 0.059)  # #12110F
INK_SOFT = (0.290, 0.278, 0.259)  # #4A4742
MUTED = (0.486, 0.467, 0.435)  # #7C776F
ACCENT = (0.604, 0.204, 0.071)  # #9A3412 — the text-safe rust
ACCENT_BAR = (0.761, 0.255, 0.047)  # #C2410C — the fill rust
DEEP = (0.071, 0.067, 0.059)
PAPER = (0.973, 0.965, 0.953)  # #F8F6F3
RULE = (0.863, 0.851, 0.824)  # #DCD9D2

BOLD = "hebo"
REG = "helv"
OBL = "heit"
# Times stands in for the site's Instrument Serif on the name. It is one of the
# base-14 faces, so nothing has to be embedded.
SERIF = "tiro"

FONTS = {
    REG: fitz.Font("helv"),
    BOLD: fitz.Font("hebo"),
    OBL: fitz.Font("heit"),
    SERIF: fitz.Font("tiro"),
}


def wrapped_lines(content, width, size, fontname):
    """Line count for `content` once it is wrapped into `width`."""
    font = FONTS[fontname]
    total = 0
    for paragraph in content.splitlines() or [""]:
        current = ""
        for word in paragraph.split(" "):
            trial = (current + " " + word).strip()
            if not current or font.text_length(trial, size) <= width:
                current = trial
            else:
                total += 1
                current = word
        total += 1
    return total


# Base-14 Helvetica is Latin-1 encoded; characters outside it (em dash, bullet)
# render as "?" or vanish, so normalise before anything reaches the page.
SUBS = {"—": " - ", "–": "-", "•": "·", "’": "'", "“": '"', "”": '"'}


def latin1(text):
    for bad, good in SUBS.items():
        text = text.replace(bad, good)
    return text.encode("latin-1", "replace").decode("latin-1")


class Sheet:
    def __init__(self):
        self.doc = fitz.open()
        self.page = None
        self.y = 0
        self.new_page()

    def new_page(self):
        self.page = self.doc.new_page(width=PAGE_W, height=PAGE_H)
        self.page.draw_rect(fitz.Rect(0, 0, PAGE_W, PAGE_H), color=None, fill=PAPER)
        # rust bar down the left edge, matching the site
        self.page.draw_rect(fitz.Rect(0, 0, 6, PAGE_H), color=None, fill=ACCENT_BAR)
        self.y = TOP

    def space(self, amount):
        self.y += amount

    def room(self, needed):
        if self.y + needed > PAGE_H - BOTTOM:
            self.new_page()

    def text(self, content, size=9.5, font=REG, color=INK_SOFT, leading=1.38, indent=0, gap=0):
        width = PAGE_W - MARGIN_X * 2 - indent
        line_h = size * leading
        content = latin1(content)
        height = wrapped_lines(content, width, size, font) * line_h

        self.room(height + gap)
        rect = fitz.Rect(MARGIN_X + indent, self.y, PAGE_W - MARGIN_X, self.y + height + line_h)
        self.page.insert_textbox(
            rect, content, fontsize=size, fontname=font, color=color, lineheight=leading
        )
        self.y += height + gap

    def heading(self, label):
        label = latin1(label)
        self.room(46)
        self.space(7)
        self.page.insert_text(
            (MARGIN_X, self.y + 8),
            label.upper(),
            fontsize=8.5,
            fontname=BOLD,
            color=DEEP,
        )
        self.y += 13
        self.page.draw_line(
            fitz.Point(MARGIN_X, self.y),
            fitz.Point(PAGE_W - MARGIN_X, self.y),
            color=RULE,
            width=0.7,
        )
        self.y += 8

    def role(self, title, org, period):
        title, org, period = latin1(title), latin1(org), latin1(period)
        self.room(40)
        self.page.insert_text((MARGIN_X, self.y + 9), title, fontsize=10.5, fontname=BOLD, color=INK)
        w = fitz.get_text_length(period, fontname=REG, fontsize=8.5)
        self.page.insert_text(
            (PAGE_W - MARGIN_X - w, self.y + 9), period, fontsize=8.5, fontname=REG, color=MUTED
        )
        self.y += 12
        self.page.insert_text((MARGIN_X, self.y + 8), org, fontsize=9.5, fontname=OBL, color=ACCENT)
        self.y += 13

    def bullets(self, items):
        for item in items:
            self.room(16)
            self.page.insert_text(
                (MARGIN_X + 3, self.y + 8), "·", fontsize=13, fontname=BOLD, color=ACCENT
            )
            self.text(item, size=9.5, indent=14, gap=1)
        self.space(2)


def build():
    s = Sheet()

    # ---- Header ----
    s.page.insert_text(
        (MARGIN_X, s.y + 28), latin1("Hamama Komal"), fontsize=30, fontname=SERIF, color=INK
    )
    s.y += 36
    s.page.insert_text(
        (MARGIN_X, s.y + 11),
        latin1("Flutter Developer  ·  Application Instructor"),
        fontsize=10.5,
        fontname=REG,
        color=ACCENT,
    )
    s.y += 19
    s.page.insert_text(
        (MARGIN_X, s.y + 9),
        latin1("Bhakkar, Pakistan   ·   +92 302 1976361   ·   hamama.komal.00@gmail.com"),
        fontsize=8.8,
        fontname=REG,
        color=MUTED,
    )
    s.y += 12
    s.page.insert_text(
        (MARGIN_X, s.y + 9),
        latin1("linkedin.com/in/hamama-komal   ·   github.com/Hamama-Komal"),
        fontsize=8.8,
        fontname=REG,
        color=MUTED,
    )
    s.y += 16
    s.page.draw_line(
        fitz.Point(MARGIN_X, s.y), fitz.Point(PAGE_W - MARGIN_X, s.y), color=ACCENT, width=1.6
    )
    s.y += 6

    # ---- Profile ----
    s.heading("Profile")
    s.text(
        "Flutter developer and application instructor building production Android applications. "
        "Full-time at Devlix Technologies, and Flutter Developer & Application Instructor at "
        "XOKSIS. Started in native Android with Java and MVVM, then moved to Flutter, where clean "
        "architecture became the focus. 24 applications shipped to Google Play, most built end to "
        "end from requirement to release and the largest past 10,000 downloads — two of them under "
        "HK Craft Labs, my own developer account.",
        gap=8,
    )

    # ---- Experience ----
    s.heading("Experience")

    s.role("Founder & Solo Developer — Independent", "HK Craft Labs", "2026 – Present")
    s.bullets(
        [
            "Own developer account on Google Play: design, build, release and support my own app ideas in Flutter.",
            "Shipped Posely, a pose-guide camera that overlays a pose outline on the live viewfinder, and Study Desk, an offline focus timer with notes and flashcards.",
        ]
    )

    s.role("Flutter App Developer — Full-Time", "Devlix Technologies", "Jun 2026 – Present")
    s.bullets(
        [
            "Build and ship production Flutter applications end to end, from product requirement to Play Store release.",
            "Apply clean architecture, state management and dependency injection across the codebase.",
        ]
    )

    s.role("Flutter Developer & Application Instructor — Part-Time", "XOKSIS", "Jan 2026 – Present")
    s.bullets(
        [
            "Build Flutter applications, and teach the stack they are built on.",
            "Take students from Dart fundamentals through state management and clean architecture to a real Play Store release.",
        ]
    )

    s.role("Mobile Application Developer — Contract", "ETOS Way", "Mar 2025 – Aug 2025")
    s.bullets(
        [
            "Built 5+ Flutter applications with AI-powered features.",
            "Worked with Firebase, REST APIs and GetX state management.",
        ]
    )

    s.role("Android Developer — Internship", "BISM Software House", "Jun 2024 – Sep 2024")
    s.bullets(
        [
            "Developed native Android applications using Firebase, Room and Android Jetpack.",
        ]
    )

    # ---- Published apps ----
    s.heading("Selected Applications — Google Play (24 published)")
    for name, detail in [
        ("Posely", "Pose-guide camera overlaying a pose on the live viewfinder (HK Craft Labs)."),
        ("Study Desk", "Offline focus timer, notes, flashcards and daily plan (HK Craft Labs)."),
        ("15 August Tiranga Frames", "Independence Day frames and wallpapers. 10,000+ downloads."),
        ("14 August Photo Frames", "Themed photo editor, photo to export in three taps. 1,000+ downloads."),
        ("Diwali Wallpapers: 4K & Live", "4K and animated live wallpapers. 1,000+ downloads."),
        ("Voice Changer", "On-device audio effects engine with instant playback. 500+ downloads."),
        ("GPS Land Area Calculator", "Map-based area measurement on Google Maps. 500+ downloads, 4.4 stars."),
        ("AI Grammar Checker", "Writing assistant with grammar correction (ETOS Way). 4.5 stars."),
    ]:
        s.room(16)
        s.page.insert_text((MARGIN_X + 3, s.y + 8), "·", fontsize=13, fontname=BOLD, color=ACCENT)
        s.page.insert_text((MARGIN_X + 14, s.y + 8), latin1(name), fontsize=9.5, fontname=BOLD, color=INK)
        w = fitz.get_text_length(latin1(name), fontname=BOLD, fontsize=9.5)
        s.page.insert_text(
            (MARGIN_X + 18 + w, s.y + 8), latin1("- " + detail), fontsize=9.5, fontname=REG, color=INK_SOFT
        )
        s.y += 13
    s.space(2)

    # ---- Skills ----
    s.heading("Technical Skills")
    for label, items in [
        ("Mobile", "Flutter · Dart · Android · Provider · GetX · Dependency Injection · Material Design"),
        ("Architecture", "Clean Architecture · MVVM · Repository Pattern · SOLID · State Management"),
        (
            "AI / ML",
            "LLMs · Prompt Engineering · RAG Pipelines · Agentic AI · Vector Databases · Curriculum Design",
        ),
        ("Backend", "Firebase · REST APIs · Python · FastAPI · PostgreSQL · Authentication"),
        ("Tools", "Git & GitHub · Android Studio · VS Code · Docker · Play Console"),
    ]:
        s.room(20)
        s.page.insert_text((MARGIN_X, s.y + 8), label, fontsize=9.5, fontname=BOLD, color=INK)
        s.text(items, size=9.5, indent=78, gap=2)
    s.space(2)

    s.doc.set_metadata(
        {
            "title": "Hamama Komal — CV",
            "author": "Hamama Komal",
            "subject": "Flutter Developer | Application Instructor",
        }
    )
    s.doc.save("public/Hamama-Komal-CV.pdf", deflate=True, garbage=4)
    print(f"public/Hamama-Komal-CV.pdf — {s.doc.page_count} page(s)")


if __name__ == "__main__":
    build()
