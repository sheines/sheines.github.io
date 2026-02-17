from manim import *

class EbeneEbene1(ThreeDScene):
    def construct(self):

        # Hintergrundfarbe
        self.camera.background_color = None

        # ---------------------------
        # Koordinatensystem
        # ---------------------------
        axes = ThreeDAxes(
            x_range=[-5, 5, 1],
            y_range=[-5, 5, 1],
            z_range=[-2, 4, 1],
            x_length=8,
            y_length=8,
            z_length=6,
            axis_config={
                "stroke_width": 2,
                "include_tip": True,
                "tip_length": 0.25,
                "tip_width": 0.1,
                "color": GREY_B  # dezentes Grau für alle Achsen
            },
            x_axis_config={"include_ticks": False},
            y_axis_config={"include_ticks": False},
            z_axis_config={"include_ticks": False},
        )

        # Achsenlabels in TeX & klein
        # labels = VGroup(
        #     MathTex("x").scale(0.6).next_to(axes.x_axis.get_end(), RIGHT),
        #     MathTex("y").scale(0.6).next_to(axes.y_axis.get_end(), UP),
        #     MathTex("z").scale(0.6).next_to(axes.z_axis.get_end(), UP),
        # )

        self.add(axes) # , labels

        # ---------------------------
        # Ebene in Parameterform
        # ---------------------------
        # Parameterbereich u,v
        u_range = (-1.25, 1.25)
        v_range = (-1.25, 1.25)

        # Ebene: P(u,v) = P0 + u*dir1 + v*dir2
        P0 = np.array([0, 0, -0.5])   # Stützpunkt
        dir1 = np.array([2.5,0,-0.5]) # Richtungsvektor 1
        dir2 = np.array([0,2.5,-0.5]) # Richtungsvektor 2

        def plane1(u, v):
            return P0 + u*dir1 + v*dir2

        # Mesh erzeugen
        plane_surface1 = Surface(
            lambda u, v: plane1(u, v),
            u_range=u_range,
            v_range=v_range,
            resolution=(1,1),
        )

        # Farbe + Transparenz
        plane_surface1.set_fill(SVGNAMES.DARKGOLDENROD, opacity=0.5)
        plane_surface1.set_stroke(SVGNAMES.DARKGOLDENROD, width=1)

        # Ebene hinzufügen
        self.add(plane_surface1)


        # Ebene: P(u,v) = P0 + u*dir1 + v*dir2
        P0 = np.array([0, 0, 1.5])   # Stützpunkt
        dir1 = np.array([2.5,0,-0.5]) # Richtungsvektor 1
        dir2 = np.array([0,2.5,-0.5]) # Richtungsvektor 2

        def plane2(u, v):
            return P0 + u*dir1 + v*dir2

        # Mesh erzeugen
        plane_surface2 = Surface(
            lambda u, v: plane2(u, v),
            u_range=u_range,
            v_range=v_range,
            resolution=(1,1),
        )

        # Farbe + Transparenz
        plane_surface2.set_fill(SVGNAMES.AQUA, opacity=0.5)
        plane_surface2.set_stroke(SVGNAMES.AQUA, width=1)

        # Ebene hinzufügen
        self.add(plane_surface2)


        # ---------------------------
        # Punkt im Raum
        # ---------------------------

        # punkt1 = Dot3D(point=np.array([2, 1, 3]), radius=0.05, color=RED)
        # punkt2 = Dot3D(point=np.array([1, 1, 0]), radius=0.05, color=GREEN)
        # punkt_label = MathTex("P").scale(0.6).next_to(punkt, UP)

        # self.add(punkt1, punkt2)


        # # ---------------------------
        # # Gerade in Parameterform: R(t) = R0 + t*dir
        # # ---------------------------
        # R0 = np.array([1, 1, 1])
        # dir_vec = np.array([1, -1, 0])

        # def ger(t):
        #     return R0 + t*dir_vec

        # # Gerade als Linie mit Mesh (z.B. 20 Punkte)
        # t_values = np.linspace(-1.75, 1.75, 2)
        # line_points = [ger(t) for t in t_values]
        # gerade = Line3D(line_points[0], line_points[-1], color=SVGNAMES.MAGENTA)
        # gerade.set_stroke(width=1)
        # # gerade_label = MathTex("g").scale(0.6).next_to(line_points[-1], RIGHT)

        # self.add(gerade)

        # ---------------------------
        # Kamera initial position
        # ---------------------------
        self.set_camera_orientation(phi=65 * DEGREES, theta=0 * DEGREES, zoom=0.9)

        # ---------------------------
        # Ambient Rotation (gleichmäßig um z-Achse)
        # ---------------------------
        self.begin_ambient_camera_rotation(rate=1 * TAU / 10)  
        # rate = 2π / duration → 1 Loop über 10 Sekunden (TAU=2π)

        self.wait(10)  # Länge des Loops