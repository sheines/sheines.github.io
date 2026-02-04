from manim import *

class Intro(Scene):
    def construct(self):
        title = Text("Hallo Web!", font_size=72)
        subtitle = Text("Animation mit Manim", font_size=36)
        subtitle.next_to(title, DOWN)

        self.play(Write(title))
        self.play(FadeIn(subtitle))
        self.wait(1)