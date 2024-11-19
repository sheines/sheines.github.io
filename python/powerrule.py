from manim import *

class PowerRule(Scene):
    def construct(self):
        # Create the text for the statement of the Power Rule
        power_rule_text = Tex(
            r"$\text{Power Rule:} \ f(x) = x^n \quad \Rightarrow \quad f'(x) = n \cdot x^{n-1}$"
        )
        
        # Position the text in the scene
        power_rule_text.to_edge(UP)
        self.play(Write(power_rule_text))
        self.wait(1)

        # Create the function and its derivative
        function_graph = FunctionGraph(lambda x: x**2, color=BLUE)
        derivative_graph = FunctionGraph(lambda x: 2*x, color=RED)
        
        # Set axes
        axes = Axes(
            x_range=[-3, 3],
            y_range=[-3, 3],
            axis_config={"color": WHITE},
        )

        # Display the axes
        self.play(Create(axes))

        # Display the function graph (f(x) = x^2)
        self.play(Create(function_graph))
        self.wait(1)

        # Animate the derivative graph (f'(x) = 2x)
        self.play(Transform(function_graph, derivative_graph))
        self.wait(1)

        # Add labels for the graphs
        function_label = Tex(r"f(x) = x^2").next_to(function_graph, UP)
        derivative_label = Tex(r"f'(x) = 2x").next_to(derivative_graph, UP)

        self.play(Write(function_label))
        self.wait(1)

        # Add the derivative label
        self.play(Transform(function_label, derivative_label))
        self.wait(1)
