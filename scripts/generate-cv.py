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

INK = (0.039, 0.098, 0.161)  # #0A1929
INK_SOFT = (0.180, 0.263, 0.353)
MUTED = (0.400, 0.459, 0.529)
ACCENT = (0.008, 0.490, 0.992)  # #027DFD
DEEP = (0.039, 0.098, 0.161)  # #0A1929
PAPER = (1.0, 1.0, 1.0)
RULE = (0.804, 0.878, 0.949)

BOLD = "hebo"
REG = "helv"
OBL = "heit"

FONTS = {REG: fitz.Font("helv"), BOLD: fitz.Font("hebo"), OBL: fitz.Font("heit")}


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
        # warm accent bar down the left edge
        self.page.draw_rect(fitz.Rect(0, 0, 6, PAGE_H), color=None, fill=ACCENT)
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
    s.page.insert_text((MARGIN_X, s.y + 26), latin1("Hamama Komal"), fontsize=26, fontname=BOLD, color=INK)
    s.y += 34
    s.page.insert_text(
        (MARGIN_X, s.y + 11),
        latin1("Flutter Developer  |  Building Smart Mobile Apps with AI"),
        fontsize=10.5,
        fontname=REG,
        color=ACCENT,
    )
    s.y += 19
    s.page.insert_text(
        (MARGIN_X, s.y + 9),
        latin1("Bhakkar, Pakistan   ·   +92 302 1976361   ·   Hamama.komal.00@gmail.com"),
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
        "Flutter developer building production mobile applications with a strict clean-architecture "
        "approach, working full-time at Devlix Technologies. Started in native Android and moved into "
        "Flutter, where clean, scalable app structure became the focus. Alongside that, part-time AI "
        "Engineer and AI/ML Instructor at XOKSIS — building LLM and RAG-powered features and teaching "
        "those concepts to developers starting out. 30+ apps built, 10+ live on Google Play.",
        gap=2,
    )

    # ---- Experience ----
    s.heading("Experience")

    s.role("Flutter App Developer — Full-Time", "Devlix Technologies", "June 2026 – Present")
    s.bullets(
        [
            "Build and ship production Flutter applications end to end, from product requirement to Play Store release.",
            "Apply clean architecture, state management and dependency injection across the codebase.",
            "Integrate REST APIs and third-party services; optimise UI performance and responsiveness.",
            "Own feature development and ongoing improvements to live applications.",
        ]
    )

    s.role("AI Engineer & AI/ML Instructor — Part-Time", "XOKSIS", "January 2026 – Present")
    s.bullets(
        [
            "Teach AI and Machine Learning concepts, LLM fundamentals and RAG pipeline architecture.",
            "Build practical AI features, RAG systems and automation pipelines for production use.",
            "Guide students through hands-on, job-oriented AI projects.",
        ]
    )

    s.role("Mobile Application Developer", "ETOS Way", "March 2025 – August 2025")
    s.bullets(
        [
            "Built 5+ Flutter applications with AI-powered features.",
            "Worked with Firebase, REST APIs and GetX state management.",
            "Established clean architecture patterns and reusable UI systems.",
        ]
    )

    s.role("Android Developer", "BISM Software House", "June 2024 – September 2024")
    s.bullets(
        [
            "Developed native Android applications using Firebase, Room and Android Jetpack.",
            "Applied MVVM architecture and asynchronous programming patterns.",
        ]
    )

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

    # ---- Published apps ----
    s.heading("Published Applications — Google Play")
    for name, detail in [
        ("Football Wallpapers", "High-resolution football wallpaper app (Ronaldo, Messi, Neymar)."),
        ("14 August Photo Editor", "Themed photo editor built around Pakistan's Independence Day."),
        ("Voice Changer", "On-device audio effects engine with instant playback."),
        ("Hide Photos & Videos", "Private vault with gallery lock for photos and videos."),
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

    # ---- Featured project ----
    s.heading("Featured Project")
    s.role("YouTube AI Learning Assistant", "Python · FastAPI · LLMs · RAG · Vector DBs", "Side project")
    s.bullets(
        [
            "Turns a YouTube video into an interactive learning experience.",
            "Interactive Q&A over video content, AI quiz generation and flashcards for revision.",
        ]
    )

    s.doc.set_metadata(
        {
            "title": "Hamama Komal — CV",
            "author": "Hamama Komal",
            "subject": "Flutter App Developer | AI Explorer | Software Developer",
        }
    )
    s.doc.save("public/Hamama-Komal-CV.pdf", deflate=True, garbage=4)
    print(f"public/Hamama-Komal-CV.pdf — {s.doc.page_count} page(s)")


if __name__ == "__main__":
    build()
