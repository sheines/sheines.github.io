from manim import *

class PowerRule(Scene):
    def construct(self):

        # You can split the string in parts
        basis = r"x"
        basis2 = r"n"
        exponent = r"^n"
        exponent2 = r"^{n-1}"
        tex = MathTex(basis, exponent).scale(2)

        # Finally you can color accordingly
        

        self.play(Write(tex))

        self.wait(1)

        self.play(FadeToColor(tex[1], color=RED), run_time=2)

        self.wait(1)